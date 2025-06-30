import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Group } from "three";

const PlanetOne = () => {
  const planetRef = useRef<Group>(null);
  const texturePath = "/materials/planetTwo";
  const props = useTexture({
    map: texturePath + "/color.png",
    displacementMap: texturePath + "/displacement.png",
    normalMap: texturePath + "/normal.png",
    aoMap: texturePath + "/ao.png",
    roughnessMap: texturePath + "/specular.png"
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
        scale={[100, 100, 100]}
        position={[-500, -500, 1000]}
      >
        <mesh>
          <sphereGeometry args={[5, 32, 32]} />
          <meshStandardMaterial {...props} />
        </mesh>
      </group>
    </Suspense>
  );
};

export default PlanetOne;
