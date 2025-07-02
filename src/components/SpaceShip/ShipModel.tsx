import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Trail } from "@react-three/drei";
import { Group, Vector3, Euler } from "three";

import LaserRenderer from "./LaserRenderer";

import { useInputControls, useMouseAiming, useLaserSystem } from "@/hooks";
import {
  updateShipRotation,
  updateShipMovement,
  updateLasers,
  fireLaser
} from "@/physics";

import { updateCamera, reduceMouseMovement } from "@/utils";

import { DEFAULT_MOVEMENT_CONFIG, DEFAULT_LASER_CONFIG } from "@/config";
import type { KeyState, MouseMovement } from "@/types";

const ShipModel = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  const shipRef = useRef<Group>(null);
  const exhaustRef = useRef<Group>(null);
  const { camera } = useThree();

  // Engine state that gets updated in useFrame
  const [isEngineActive, setIsEngineActive] = useState(false);

  // Laser system
  const laserSystem = useLaserSystem();

  // Mouse aiming system
  const mouseAiming = useMouseAiming({
    maxAimRadius: 250,
    tiltSensitivity: 0.004
  });

  // Ship state
  const mouseMovement = useRef<MouseMovement>({ x: 0, y: 0 });
  const targetRotation = useRef(new Euler(0, 0, 0));
  const currentRotation = useRef(new Euler(0, 0, 0));
  const velocity = useRef(new Vector3(0, 0, 0));
  const shipPosition = useRef(new Vector3(0, 0, 0));
  const keys = useRef<KeyState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
    rollLeft: false,
    rollRight: false,
    spinLeft: false,
    spinRight: false,
    fire: false
  });

  // Initialize input controls
  useInputControls({ keys, mouseMovement });

  // Dispatch aiming state changes to parent component
  useEffect(() => {
    const aimingStateChangeEvent = new CustomEvent("aimingStateChange", {
      detail: {
        isAiming: mouseAiming.isAiming,
        aimPosition: mouseAiming.aimPosition
      }
    });
    window.dispatchEvent(aimingStateChangeEvent);
  }, [mouseAiming.isAiming, mouseAiming.aimPosition]);

  // Debug: Log when model loads
  console.log("%cShip model loaded:", "color: #0fc", scene);

  useFrame((_, delta) => {
    if (!shipRef.current) return;

    // Update engine active state based on current key state
    const engineActive = keys.current.forward || keys.current.backward;
    if (engineActive !== isEngineActive) {
      setIsEngineActive(engineActive);
    }

    // Debug: Log key states occasionally
    if (Math.random() < 0.01) {
      // Log ~1% of frames
      const activeKeys = Object.entries(keys.current)
        .filter(([, active]) => active)
        .map(([key]) => key);
      if (activeKeys.length > 0) {
        console.log("%cActive keys:", "color: #0f0", activeKeys);
      }
    }

    // Update ship rotation based on input
    updateShipRotation({
      mouseMovement,
      targetRotation,
      currentRotation,
      keys,
      config: DEFAULT_MOVEMENT_CONFIG,
      delta,
      aimTilt: mouseAiming.isAiming ? mouseAiming.tiltAmount : undefined
    });

    // Apply rotation to ship
    shipRef.current.rotation.copy(currentRotation.current);

    // Update ship movement and position
    updateShipMovement({
      keys,
      currentRotation,
      velocity,
      shipPosition,
      config: DEFAULT_MOVEMENT_CONFIG,
      delta
    });

    // Apply position to ship
    shipRef.current.position.copy(shipPosition.current);

    updateLasers({
      lasers: laserSystem.lasers,
      delta,
      config: DEFAULT_LASER_CONFIG
    });

    // Fire lasers
    fireLaser({
      lasers: laserSystem.lasers,
      lastFireTime: laserSystem.lastFireTime,
      shipPosition,
      shipRotation: currentRotation,
      keys,
      config: DEFAULT_LASER_CONFIG,
      currentTime: Date.now(),
      aimOffset: mouseAiming.isAiming ? mouseAiming.aimOffset : undefined
    });

    // Update exhaust position in world space (only if exhaustRef exists)
    if (exhaustRef.current) {
      const exhaustOffset = new Vector3(0, 0.2, -1.8);
      exhaustOffset.applyEuler(currentRotation.current);
      exhaustRef.current.position.copy(shipPosition.current).add(exhaustOffset);
    }

    // Update camera to follow ship
    updateCamera({
      camera,
      shipPosition,
      currentRotation
    });

    // Gradually reduce mouse movement influence
    reduceMouseMovement(mouseMovement);
  });

  //   const isEngineActive = keys.current.forward || keys.current.backward;

  return (
    <>
      {/* Ship Model */}
      <group ref={shipRef}>
        <primitive scale={[0.12, 0.12, 0.12]} object={scene} />
      </group>

      {/* Laser System */}
      <LaserRenderer lasers={laserSystem.lasers} />

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
