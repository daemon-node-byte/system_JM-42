import { useRef, Suspense, useState, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { Vector3, Quaternion } from "three";
import { useStore } from "@/store";
import { getShipInfoById } from "@/utils";
import type { ShipDetails } from "@/types";
import { useControlsRaw } from "@/hooks";

import Projectile from "./Projectile";
import LoadingSVG from "../LoadingSVG";

// *ANCHOR - Player Ship
export default function SpaceCraft() {
  const keys = useControlsRaw();
  const { currentShipId, fireWeapon } = useStore((state) => state);
  const shipInfo: ShipDetails | null = getShipInfoById(currentShipId);
  const [shots, setShots] = useState<ReactNode[]>([]);
  // const shipScale = getShipScaleFromDetails(shipInfo);
  const ref = useRef<RapierRigidBody>(null);
  const body = ref.current;
  const { scene } = useGLTF(shipInfo?.modelUrl as string);
  const { scale, offset } = shipInfo;
  // const { move, rotate } = useControls();

  const handleProjectileHit = (targetHandle: number) => {
    console.log("Hit asteroid with ID:", targetHandle);
    // Optionally filter out the shot
    setShots((prev) => prev.slice(1));
  };

  const fireShot = (origin: Vector3, direction: Vector3) => {
    setShots((prev) => [
      ...prev,
      <Projectile
        key={crypto.randomUUID()}
        origin={origin.clone()}
        direction={direction.clone()}
        onHit={handleProjectileHit}
      />
    ]);
  };

  useFrame((state) => {
    if (!body) return;
    const shipPos = new Vector3(...Object.values(body.translation()));
    const shipQuat = new Quaternion(...Object.values(body.rotation()));

    // Calculate forward vector from orientation
    const forward = new Vector3(0, 0, -1).applyQuaternion(shipQuat);
    const reverse = new Vector3(0, 0, 1).applyQuaternion(shipQuat);
    // const fireOrigin = shipPos.clone().add(forward.clone().multiplyScalar(2));

    // 🛠️ Rotation controls (simulate pitch/yaw/roll)
    const localTorque = new Vector3(
      keys.pitchUp ? 0.5 : keys.pitchDown ? -0.5 : 0, // pitch
      keys.yawLeft ? 0.5 : keys.yawRight ? -0.5 : 0, // yaw
      keys.leftRoll ? 0.5 : keys.rightRoll ? -0.5 : 0 // roll
    );
    const shipTorque = localTorque.clone().applyQuaternion(shipQuat);

    body.applyTorqueImpulse(shipTorque, true);

    // 🚀 Thrust forward ONLY if 'W' is pressed
    if (keys.thrustForward) {
      const thrust = forward.clone().multiplyScalar(5); // adjust power here
      body.applyImpulse(thrust, true);
    }
    if (keys.reverseThrust) {
      const thrust = reverse.clone().multiplyScalar(2);
      body.applyImpulse(thrust, true);
    }

    // 🎥 Chase camera
    const followOffset = new Vector3(
      offset.followCamera.x,
      offset.followCamera.y,
      offset.followCamera.z
    );

    const cameraPos = followOffset
      .clone()
      .applyQuaternion(shipQuat)
      .add(shipPos);
    state.camera.position.lerp(cameraPos, 0.1);
    state.camera.lookAt(shipPos);

    // 🔫 Fire weapon
    if (fireWeapon) {
      const fireOrigin = shipPos
        .clone()
        .add(new Vector3(0, 0, -2).applyQuaternion(shipQuat));
      const fireDirection = new Vector3(0, 0, -1).applyQuaternion(shipQuat);
      fireShot(fireOrigin.clone(), fireDirection.clone());
    }
  });

  return (
    <>
      <RigidBody
        ref={ref}
        colliders="hull"
        mass={10}
        linearDamping={0.2}
        angularDamping={0.4}
      >
        <group>
          <primitive
            object={scene}
            scale={scale}
            position={[offset.position.x, offset.position.y, offset.position.z]}
            rotation={[offset.rotation.x, offset.rotation.y, offset.rotation.z]}
          />
        </group>
      </RigidBody>
      {shots.map((ele) => ele)}
    </>
  );
}

export function ShipLoader() {
  return (
    <Suspense fallback={<LoadingSVG />}>
      <SpaceCraft />
    </Suspense>
  );
}
