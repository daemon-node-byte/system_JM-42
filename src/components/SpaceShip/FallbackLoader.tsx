import { Text } from "@react-three/drei";

function FallbackLoader() {
  return (
    <mesh>
      <Text anchorX="center" anchorY="middle">
        Loading...
      </Text>
      {/* <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" /> */}
    </mesh>
  );
}

export default FallbackLoader;
