import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import type { Group } from "three";
import { Vector3, Euler } from "three";

import { useInputControls } from "@/hooks";
import { useStore } from "@/store";
import { updateShipMovement } from "@/physics";
import { updateCamera } from "@/utils";

import { DEFAULT_MOVEMENT_CONFIG } from "@/config";

const ShipModelRevamp = ({ url }: { url: string }) => {
  const {
    position,
    rotation,
    velocity,
    keys,
    setPosition,
    setRotation,
    setVelocity
  } = useStore((state) => state);
  const { scene } = useGLTF(url);
  const shipRef = useRef<Group>(null);

  // Create refs for physics calculations
  const positionRef = useRef(position.clone());
  const rotationRef = useRef(rotation.clone());
  const velocityRef = useRef(velocity.clone());
  const keysRef = useRef(keys);
  const { camera } = useThree();
  useInputControls();

  useEffect(() => {
    if (!shipRef.current) return;
    console.log(`%cShipModelRevamp: `, "color: orange", shipRef.current, keys);
    positionRef.current.copy(position);
    rotationRef.current.copy(rotation);
    velocityRef.current.copy(velocity);
    keysRef.current = keys;
  }, [keys, position, rotation, velocity]);

  useFrame((_, delta) => {
    if (!shipRef.current) return;

    // Update ship movement based on input controls
    updateShipMovement({
      keys: keysRef,
      currentRotation: rotationRef,
      velocity: velocityRef,
      shipPosition: positionRef,
      config: { ...DEFAULT_MOVEMENT_CONFIG },
      delta
    });
    setPosition(positionRef.current.clone());
    setRotation(rotationRef.current.clone());
    setVelocity(velocityRef.current.clone());
    // Update ship position and rotation
    shipRef.current.position.copy(positionRef.current);
    shipRef.current.rotation.copy(rotationRef.current);

    // Update camera position based on ship position  });
  });
  return (
    <>
      <group
        scale={[0.1, 0.1, 0.1]}
        position={[0, 0, 0]}
        rotation={[0, Math.PI, 0]}
        ref={shipRef}
      >
        <primitive object={scene} />
      </group>
    </>
  );
};

export default ShipModelRevamp;
