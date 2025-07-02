import { useRef, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Trail } from "@react-three/drei";
import { Group, Vector3 } from "three";

import LaserRenderer from "./LaserRenderer";

import { useInputControls, useMouseAiming } from "@/hooks";
import {
  updateShipRotation,
  updateShipMovement,
  updateLasers,
  fireLaser
} from "@/physics";

import { updateCamera, reduceMouseMovement } from "@/utils";

import { DEFAULT_MOVEMENT_CONFIG, DEFAULT_LASER_CONFIG } from "@/config";
import { useStore } from "@/store";

const ShipModel = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  const shipRef = useRef<Group>(null);
  const exhaustRef = useRef<Group>(null);
  const { camera } = useThree();

  // Performance tracking refs
  const frameCount = useRef(0);
  const fpsStartTime = useRef(Date.now());
  const hasLoggedModel = useRef(false);

  // Get state and actions from store
  const {
    // Ship state
    position,
    rotation,
    targetRotation,
    velocity,
    isEngineActive,
    lasers,
    lastFireTime,
    isAiming,
    aimPosition,
    aimOffset,
    tiltAmount,

    // Input state
    keys,
    mouseMovement,

    // Actions
    setPosition,
    setRotation,
    setVelocity,
    updateLasers: updateLasersStore,
    setLastFireTime,
    updateMouseMovement,
    updatePerformanceMetrics
  } = useStore();

  // Create stable refs for physics calculations
  const keysRef = useRef(keys);
  const mouseMovementRef = useRef(mouseMovement);
  const targetRotationRef = useRef(targetRotation);
  const currentRotationRef = useRef(rotation);
  const velocityRef = useRef(velocity);
  const shipPositionRef = useRef(position);
  const lasersRef = useRef(lasers);
  const lastFireTimeRef = useRef(lastFireTime);

  // Log model load only once
  useEffect(() => {
    if (!hasLoggedModel.current && scene) {
      console.log("%cShip model loaded:", "color: #0fc", scene);
      hasLoggedModel.current = true;
    }
  }, [scene]);

  // Sync store state with refs (memoized to prevent unnecessary updates)
  useEffect(() => {
    keysRef.current = keys;
    mouseMovementRef.current = mouseMovement;
    targetRotationRef.current = targetRotation;
    currentRotationRef.current = rotation;
    velocityRef.current = velocity;
    shipPositionRef.current = position;
    lasersRef.current = lasers;
    lastFireTimeRef.current = lastFireTime;
  }, [
    keys,
    mouseMovement,
    targetRotation,
    rotation,
    velocity,
    position,
    lasers,
    lastFireTime
  ]);

  // Mouse aiming with store integration
  const mouseAiming = useMouseAiming({
    maxAimRadius: 250,
    tiltSensitivity: 0.004
  });

  // Input controls with store integration
  useInputControls();

  // Memoized event handler to prevent recreating on every render
  const handleAimingStateChange = useCallback(() => {
    const aimingStateChangeEvent = new CustomEvent("aimingStateChange", {
      detail: { isAiming, aimPosition }
    });
    window.dispatchEvent(aimingStateChangeEvent);
  }, [isAiming, aimPosition]);

  // Dispatch aiming state changes to parent with cleanup
  useEffect(() => {
    handleAimingStateChange();

    // Return cleanup function (though not needed for dispatchEvent)
    return () => {
      // Could add cleanup here if needed
    };
  }, [handleAimingStateChange]);

  useFrame((_, delta) => {
    if (!shipRef.current) return;

    // Performance tracking
    frameCount.current++;
    if (frameCount.current % 60 === 0) {
      const now = Date.now();
      const fps = Math.round(60000 / (now - fpsStartTime.current));
      updatePerformanceMetrics(fps, delta * 1000);
      fpsStartTime.current = now;
    }

    // Update ship physics
    updateShipRotation({
      mouseMovement: mouseMovementRef,
      targetRotation: targetRotationRef,
      currentRotation: currentRotationRef,
      keys: keysRef,
      config: DEFAULT_MOVEMENT_CONFIG,
      delta,
      aimTilt: isAiming ? { x: tiltAmount, y: tiltAmount } : undefined
    });

    updateShipMovement({
      keys: keysRef,
      currentRotation: currentRotationRef,
      velocity: velocityRef,
      shipPosition: shipPositionRef,
      config: DEFAULT_MOVEMENT_CONFIG,
      delta
    });

    // Sync physics results back to store
    setRotation(currentRotationRef.current);
    setPosition(shipPositionRef.current);
    setVelocity(velocityRef.current);

    // Apply transforms
    shipRef.current.rotation.copy(currentRotationRef.current);
    shipRef.current.position.copy(shipPositionRef.current);

    // Update lasers
    updateLasers({
      lasers: lasersRef,
      delta,
      config: DEFAULT_LASER_CONFIG
    });

    fireLaser({
      lasers: lasersRef,
      lastFireTime: lastFireTimeRef,
      shipPosition: shipPositionRef,
      shipRotation: currentRotationRef,
      keys: keysRef,
      config: DEFAULT_LASER_CONFIG,
      currentTime: Date.now(),
      aimOffset: isAiming ? aimOffset : undefined
    });

    // Update store with laser changes
    updateLasersStore(lasersRef.current);
    setLastFireTime(lastFireTimeRef.current);

    // Update exhaust position
    if (exhaustRef.current && isEngineActive) {
      const exhaustOffset = new Vector3(0, 0.2, -1.8);
      exhaustOffset.applyEuler(currentRotationRef.current);
      exhaustRef.current.position
        .copy(shipPositionRef.current)
        .add(exhaustOffset);
    }

    // Update camera
    updateCamera({
      camera,
      shipPosition: shipPositionRef,
      currentRotation: currentRotationRef
    });

    // Reduce mouse movement and sync to store
    reduceMouseMovement(mouseMovementRef);
    updateMouseMovement(mouseMovementRef.current);
  });

  return (
    <>
      {/* Ship Model */}
      <group ref={shipRef}>
        <primitive scale={[0.12, 0.12, 0.12]} object={scene} />
      </group>

      {/* Laser System */}
      <LaserRenderer lasers={lasersRef} />

      {/* Engine Trail - Outside ship group so it doesn't rotate with ship */}
      {isEngineActive && (
        <Trail
          width={isEngineActive ? 2.7 : 0} // Trail width
          color="#00ffff" // Cyan engine color
          length={2} // Trail length
          decay={1} // How fast the trail fades
          local={true} // Use world positions (important!)
          stride={0.002} // Min distance between trail points
          interval={1} // Frames between calculations
          attenuation={(width) => width * 1.2} // Width tapering function
        >
          {/* Exhaust tracking point - follows ship but stays in world space */}
          <group ref={exhaustRef}>
            <mesh visible={false}>
              <sphereGeometry args={[0.02, 4, 4]} />
            </mesh>
          </group>
        </Trail>
      )}
    </>
  );
};

export default ShipModel;
