import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import type { Group } from "three";

const PlanetOne = () => {
  const planetRef = useRef<Group>(null);
  const texturePath = "/materials/_texture";
  const texture = useTexture({
    map: texturePath + "/color.jpeg",
    displacementMap: texturePath + "/displace.png",
    normalMap: texturePath + "/normal2.png",
    aoMap: texturePath + "/aomap.png"
  });
  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y -= delta * 0.02;
    }
  });
  return (
    <Suspense fallback={null}>
      <group
        ref={planetRef}
        scale={[500, 500, 500]}
        position={[-500, -500, -100000]}
      >
        <mesh>
          <sphereGeometry args={[3, 1024, 1024]} />
          <meshStandardMaterial {...texture} />
        </mesh>
      </group>
    </Suspense>
  );
};

export default PlanetOne;
