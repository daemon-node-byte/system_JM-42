import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, BufferAttribute, Points, AdditiveBlending } from "three";

const EngineFireEffect = ({ position = [0, 0, 0] }: { position?: [number, number, number] }) => {
  const pointsRef = useRef<Points>(null);
  const particleCount = 50;
  
  const { positions, velocities, ages } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const ages = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Start at engine position with slight randomness
      positions[i3] = (Math.random() - 0.5) * 0.1;     // x
      positions[i3 + 1] = (Math.random() - 0.5) * 0.1; // y  
      positions[i3 + 2] = 0;                           // z (engine rear)
      
      // Fire particles move backward and spread out
      velocities[i3] = (Math.random() - 0.5) * 0.5;     // x spread
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.5; // y spread
      velocities[i3 + 2] = -Math.random() * 2 - 1;      // z backward movement
      
      ages[i] = Math.random(); // Random starting age
    }
    
    return { positions, velocities, ages };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Update positions based on velocities
      positionsArray[i3] += velocities[i3] * delta;
      positionsArray[i3 + 1] += velocities[i3 + 1] * delta;
      positionsArray[i3 + 2] += velocities[i3 + 2] * delta;
      
      // Update age
      ages[i] += delta;
      
      // Reset particle if too old or too far
      if (ages[i] > 1.0 || positionsArray[i3 + 2] < -3) {
        positionsArray[i3] = (Math.random() - 0.5) * 0.1;
        positionsArray[i3 + 1] = (Math.random() - 0.5) * 0.1;
        positionsArray[i3 + 2] = 0;
        
        velocities[i3] = (Math.random() - 0.5) * 0.5;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.5;
        velocities[i3 + 2] = -Math.random() * 2 - 1;
        
        ages[i] = 0;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <group position={position}>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.1}
          color="#ff4500"
          transparent
          opacity={0.8}
          blending={AdditiveBlending}
          sizeAttenuation={true}
        />
      </points>
    </group>
  );
};

export default EngineFireEffect;