import { useMemo } from "react";
import {
  InstancedRigidBodies,
  type InstancedRigidBodyProps
} from "@react-three/rapier";
import { MathUtils } from "three";

export default function Asteroids() {
  const asteroids = useMemo<InstancedRigidBodyProps[]>(() => {
    return Array.from({ length: 50 }, () => ({
      key: crypto.randomUUID(),
      position: [
        MathUtils.randFloatSpread(200),
        MathUtils.randFloatSpread(200),
        MathUtils.randFloatSpread(200)
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      scale: [
        1 + Math.random() * 2,
        1 + Math.random() * 2,
        1 + Math.random() * 2
      ]
    }));
  }, []);

  return (
    <InstancedRigidBodies instances={asteroids} colliders="hull">
      <instancedMesh
        args={[undefined, undefined, asteroids.length]}
        count={asteroids.length}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial color={"gray"} />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}
