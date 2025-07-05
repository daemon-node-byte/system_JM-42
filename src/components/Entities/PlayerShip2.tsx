import { useRef, useState, Suspense, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { Vector3, Quaternion, Object3D } from "three";
import Projectile from "./Projectile2";
import { getShipInfoById } from "@/utils";

export default function PlayerShip() {
  const shipInfo = getShipInfoById("ship-1");
  const shipRef = useRef<RapierRigidBody>(null);
  const fireAnchorRef = useRef<Object3D>(null);
  const { scene } = useGLTF(shipInfo.modelUrl); // replace this
  const [shots, setShots] = useState<ReactNode[]>([]);

  const fireProjectile = () => {
    if (!fireAnchorRef.current) return;

    const origin = new Vector3();
    const direction = new Vector3();

    fireAnchorRef.current.getWorldPosition(origin);
    fireAnchorRef.current.getWorldDirection(direction);

    setShots((prev) => [
      ...prev,
      <Projectile
        key={crypto.randomUUID()}
        origin={origin}
        direction={direction}
        onHit={(handle) => console.log("Hit:", handle)}
      />
    ]);
  };

  useFrame(() => {
    const body = shipRef.current;
    if (!body) return;

    const thrust = new Vector3(0, 0, -1)
      .applyQuaternion(
        new Quaternion(
          body.rotation().x,
          body.rotation().y,
          body.rotation().z,
          body.rotation().w
        )
      )
      .multiplyScalar(5);

    body.applyImpulse(thrust, true);

    // fire projectile every frame (just for demo)
    fireProjectile();
  });

  return (
    <RigidBody ref={shipRef} mass={10} linearDamping={0.2} angularDamping={0.3}>
      <group>
        <primitive
          object={scene}
          scale={shipInfo.scale}
          position={Object.values(shipInfo.offset.position)}
          rotation={Object.values(shipInfo.offset.rotation)}
        />
        <group ref={fireAnchorRef} position={[0, 0, 10]} />
      </group>
      {shots}
    </RigidBody>
  );
}

export function ShipLoader() {
  return (
    <Suspense fallback={null}>
      <PlayerShip />
    </Suspense>
  );
}
