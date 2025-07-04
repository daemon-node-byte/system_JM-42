import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { Vector3, Quaternion } from "three";
import { useStore } from "@/store";
import { getShipInfoById } from "@/utils";
import type { ShipDetails } from "@/types";
import { useControls } from "@/hooks";

import LoadingSVG from "./LoadingSVG";

// *ANCHOR - Player Ship
export default function SpaceCraft() {
  const { currentShipId } = useStore((state) => state);
  const shipInfo: ShipDetails | null = getShipInfoById(currentShipId);
  // const shipScale = getShipScaleFromDetails(shipInfo);
  const ref = useRef<RapierRigidBody>(null);
  const { scene } = useGLTF(shipInfo?.modelUrl as string);
  const { scale, offset } = shipInfo;
  const { move, rotate } = useControls();

  useFrame((state) => {
    const body = ref.current;
    if (!body) return;

    const shipRotation = new Quaternion(
      body.rotation().x,
      body.rotation().y,
      body.rotation().z,
      body.rotation().w
    );
    const localImpulse = move.clone().applyQuaternion(shipRotation);

    body.applyImpulse(localImpulse, true);
    body.applyTorqueImpulse(rotate, true);

    const velocity = new Vector3(
      body.linvel().x,
      body.linvel().y,
      body.linvel().z
    );

    if (velocity.length() > 0.1) {
      const desiredQuat = new Quaternion();
      desiredQuat.setFromUnitVectors(
        new Vector3(0, 0, -1), // forward vector
        velocity.clone().normalize()
      );
      shipRotation.slerp(desiredQuat, 0.02);
      body.setRotation(
        {
          x: shipRotation.x,
          y: shipRotation.y,
          z: shipRotation.z,
          w: shipRotation.w
        },
        true
      );
    }

    const followOffset = new Vector3(
      offset.followCamera.x,
      offset.followCamera.y,
      offset.followCamera.z
    );

    const worldPos = new Vector3(
      body.translation().x,
      body.translation().y,
      body.translation().z
    );

    const worldQuat = new Quaternion(
      body.rotation().x,
      body.rotation().y,
      body.rotation().z,
      body.rotation().w
    );

    // Apply offset in local space
    const cameraPos = followOffset
      .clone()
      .applyQuaternion(worldQuat)
      .add(worldPos);
    state.camera.position.lerp(cameraPos, 0.1);
    state.camera.lookAt(worldPos);
  });

  return (
    <RigidBody
      ref={ref}
      colliders="hull"
      mass={10}
      linearDamping={0.1}
      angularDamping={0.2}
      position={[0, 0, 0]}
    >
      <primitive
        object={scene}
        scale={scale}
        position={[offset.position.x, offset.position.y, offset.position.z]}
        rotation={[offset.rotation.x, offset.rotation.y, offset.rotation.z]}
      />
    </RigidBody>
  );
}

export function ShipLoader() {
  return (
    <Suspense fallback={<LoadingSVG />}>
      <SpaceCraft />
    </Suspense>
  );
}
