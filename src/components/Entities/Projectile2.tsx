import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";

type Props = {
  origin: Vector3;
  direction: Vector3;
  onHit: (handle: number) => void;
};

export default function Projectile({ origin, direction, onHit }: Props) {
  const ref = useRef<RapierRigidBody>(null);

  useEffect(() => {
    const body = ref.current;
    if (!body) return;

    const velocity = direction.clone().normalize().multiplyScalar(40);
    body.setLinvel(velocity, true);
  }, [direction]);

  return (
    <RigidBody
      ref={ref}
      position={origin.toArray()}
      colliders="ball"
      mass={0.1}
      restitution={1}
      onCollisionEnter={({ other }) => {
        const handle = other.collider?.handle;
        if (handle) onHit(handle);
      }}
    >
      <mesh>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="yellow" emissive="orange" />
      </mesh>
    </RigidBody>
  );
}
