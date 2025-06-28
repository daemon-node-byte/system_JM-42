import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';

const AdvancedEngineEffect = ({ position = [0, 0, 0] }: { position?: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Core fire */}
      <Sparkles
        count={30}
        scale={[0.5, 1, 2]}
        size={2}
        speed={0.4}
        color="#ff4500"
      />
      {/* Outer glow */}
      <Sparkles
        count={20}
        scale={[0.8, 1.5, 3]}
        size={3}
        speed={0.2}
        color="#ff8c00"
      />
    </group>
  );
};

export const SimpleEngineGlow = ({ position = [0, 0, 0] }: { position?: [number, number, number] }) => {
  const materialRef = useRef<MeshStandardMaterial>(null);
  
  useFrame((state) => {
    if (materialRef.current) {
      // Animate the intensity
      materialRef.current.emissiveIntensity = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.3;
    }
  });

  return (
    <group position={position}>
      <mesh>
        <planeGeometry args={[0.2, 0.4]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#ff4500"
          emissive="#ff2200"
          emissiveIntensity={1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};

export default AdvancedEngineEffect;