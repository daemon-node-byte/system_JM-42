import { Suspense } from "react";
import { useTexture } from "@react-three/drei";

const PlanetOne = () => {
  const props = useTexture({
    map: "/materials/planetOne-texture/color.jpg",
    displacementMap:
      "/materials/planetOne-texture/textture_SSBump_inverted.jpg",
    normalMap: "/materials/planetOne-texture/textture_Normal.jpg",
    roughnessMap: "/materials/planetOne-texture/textture_SSBump_inverted.jpg",
    aoMap: "/materials/planetOne-texture/ao.jpg"
  });
  return (
    <Suspense fallback={null}>
      <group scale={[100, 100, 100]} position={[-500, -500, 1000]}>
        <mesh>
          <sphereGeometry args={[5, 32, 32]} />
          <meshStandardMaterial {...props} />
        </mesh>
      </group>
    </Suspense>
  );
};

export default PlanetOne;
