import { useRef, useEffect } from "react";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

interface ProjectileProps {
  origin: THREE.Vector3;
  direction: THREE.Vector3;
  onHit: (targetHandle: number) => void;
}

export default function Projectile({
  origin,
  direction,
  onHit
}: ProjectileProps) {
  const ref = useRef<RapierRigidBody>(null);

  useEffect(() => {
    const body = ref.current;
    if (body) {
      const velocity = direction.clone().normalize().multiplyScalar(50);
      body.setLinvel({ x: velocity.x, y: velocity.y, z: velocity.z }, true);
    }
  }, [direction]);

  return (
    <RigidBody
      ref={ref}
      position={origin.toArray()}
      colliders="ball"
      mass={0.1}
      restitution={1}
      onCollisionEnter={({ other }) => {
        const collider = other.collider;
        if (!collider) return;

        const isAsteroid = other.rigidBodyObject?.userData?.type === "asteroid";
        if (isAsteroid) {
          onHit(collider.handle);
        }
      }}
    >
      <mesh>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="orange" emissive="yellow" />
      </mesh>
    </RigidBody>
  );
}
