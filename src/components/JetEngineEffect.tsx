import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  BufferGeometry, 
  BufferAttribute, 
  Points, 
  AdditiveBlending,
} from 'three';

interface EngineEffectProps {
  position?: [number, number, number];
  intensity?: number;
  isThrusting?: boolean;
}

const JetEngineEffect = ({ 
  position = [0, 0, 0], 
  intensity = 1.0,
  isThrusting = true 
}: EngineEffectProps) => {
  const coreFlameRef = useRef<Points>(null);
  const outerFlameRef = useRef<Points>(null);
  const sparkRef = useRef<Points>(null);
  
  const particleCount = 150;
  const sparkCount = 30;

  // Core flame particles (blue-white center)
  const coreFlame = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const ages = new Float32Array(particleCount);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Start near engine nozzle
      positions[i3] = (Math.random() - 0.5) * 0.05;     // x - tight cone
      positions[i3 + 1] = (Math.random() - 0.5) * 0.05; // y - tight cone
      positions[i3 + 2] = Math.random() * 0.1;          // z - just behind nozzle
      
      // High velocity backward with slight spread
      velocities[i3] = (Math.random() - 0.5) * 0.3;      // x spread
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.3;  // y spread  
      velocities[i3 + 2] = -Math.random() * 8 - 4;       // z fast backward
      
      ages[i] = Math.random();
      sizes[i] = Math.random() * 0.15 + 0.05;
    }
    
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('size', new BufferAttribute(sizes, 1));
    
    return { geometry, velocities, ages, positions };
  }, []);

  // Outer flame particles (orange-red outer flame)
  const outerFlame = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const ages = new Float32Array(particleCount);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Start slightly wider than core
      positions[i3] = (Math.random() - 0.5) * 0.15;     // x - wider cone
      positions[i3 + 1] = (Math.random() - 0.5) * 0.15; // y - wider cone
      positions[i3 + 2] = Math.random() * 0.2;          // z - behind core
      
      // Slower velocity with more spread
      velocities[i3] = (Math.random() - 0.5) * 0.8;      // x more spread
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.8;  // y more spread
      velocities[i3 + 2] = -Math.random() * 6 - 2;       // z slower backward
      
      ages[i] = Math.random();
      sizes[i] = Math.random() * 0.25 + 0.1;
    }
    
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('size', new BufferAttribute(sizes, 1));
    
    return { geometry, velocities, ages, positions };
  }, []);

  // Sparks for realism
  const sparks = useMemo(() => {
    const positions = new Float32Array(sparkCount * 3);
    const velocities = new Float32Array(sparkCount * 3);
    const ages = new Float32Array(sparkCount);
    const sizes = new Float32Array(sparkCount);
    
    for (let i = 0; i < sparkCount; i++) {
      const i3 = i * 3;
      
      positions[i3] = (Math.random() - 0.5) * 0.1;
      positions[i3 + 1] = (Math.random() - 0.5) * 0.1;
      positions[i3 + 2] = Math.random() * 0.05;
      
      velocities[i3] = (Math.random() - 0.5) * 1.2;
      velocities[i3 + 1] = (Math.random() - 0.5) * 1.2;
      velocities[i3 + 2] = -Math.random() * 10 - 5;
      
      ages[i] = Math.random();
      sizes[i] = Math.random() * 0.08 + 0.02;
    }
    
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('size', new BufferAttribute(sizes, 1));
    
    return { geometry, velocities, ages, positions };
  }, []);

  useFrame((state, delta) => {
    if (!isThrusting) return;

    const time = state.clock.elapsedTime;
    const thrustVariation = 0.8 + Math.sin(time * 20) * 0.2; // Engine flutter

    // Update core flame
    if (coreFlameRef.current) {
      const positions = coreFlameRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Update positions
        positions[i3] += coreFlame.velocities[i3] * delta * intensity * thrustVariation;
        positions[i3 + 1] += coreFlame.velocities[i3 + 1] * delta * intensity * thrustVariation;
        positions[i3 + 2] += coreFlame.velocities[i3 + 2] * delta * intensity * thrustVariation;
        
        // Update age
        coreFlame.ages[i] += delta * 3;
        
        // Reset particle if too old or too far
        if (coreFlame.ages[i] > 1.0 || positions[i3 + 2] < -4) {
          positions[i3] = (Math.random() - 0.5) * 0.05;
          positions[i3 + 1] = (Math.random() - 0.5) * 0.05;
          positions[i3 + 2] = Math.random() * 0.1;
          
          coreFlame.velocities[i3] = (Math.random() - 0.5) * 0.3;
          coreFlame.velocities[i3 + 1] = (Math.random() - 0.5) * 0.3;
          coreFlame.velocities[i3 + 2] = -Math.random() * 8 - 4;
          
          coreFlame.ages[i] = 0;
        }
      }
      
      coreFlameRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Update outer flame
    if (outerFlameRef.current) {
      const positions = outerFlameRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Update positions
        positions[i3] += outerFlame.velocities[i3] * delta * intensity * thrustVariation;
        positions[i3 + 1] += outerFlame.velocities[i3 + 1] * delta * intensity * thrustVariation;
        positions[i3 + 2] += outerFlame.velocities[i3 + 2] * delta * intensity * thrustVariation;
        
        // Update age
        outerFlame.ages[i] += delta * 2;
        
        // Reset particle if too old or too far
        if (outerFlame.ages[i] > 1.0 || positions[i3 + 2] < -6) {
          positions[i3] = (Math.random() - 0.5) * 0.15;
          positions[i3 + 1] = (Math.random() - 0.5) * 0.15;
          positions[i3 + 2] = Math.random() * 0.2;
          
          outerFlame.velocities[i3] = (Math.random() - 0.5) * 0.8;
          outerFlame.velocities[i3 + 1] = (Math.random() - 0.5) * 0.8;
          outerFlame.velocities[i3 + 2] = -Math.random() * 6 - 2;
          
          outerFlame.ages[i] = 0;
        }
      }
      
      outerFlameRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Update sparks
    if (sparkRef.current) {
      const positions = sparkRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < sparkCount; i++) {
        const i3 = i * 3;
        
        positions[i3] += sparks.velocities[i3] * delta * intensity;
        positions[i3 + 1] += sparks.velocities[i3 + 1] * delta * intensity;
        positions[i3 + 2] += sparks.velocities[i3 + 2] * delta * intensity;
        
        sparks.ages[i] += delta * 4;
        
        if (sparks.ages[i] > 1.0 || positions[i3 + 2] < -8) {
          positions[i3] = (Math.random() - 0.5) * 0.1;
          positions[i3 + 1] = (Math.random() - 0.5) * 0.1;
          positions[i3 + 2] = Math.random() * 0.05;
          
          sparks.velocities[i3] = (Math.random() - 0.5) * 1.2;
          sparks.velocities[i3 + 1] = (Math.random() - 0.5) * 1.2;
          sparks.velocities[i3 + 2] = -Math.random() * 10 - 5;
          
          sparks.ages[i] = 0;
        }
      }
      
      sparkRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={position}>
      {/* Core flame - blue-white center */}
      <points ref={coreFlameRef} geometry={coreFlame.geometry}>
        <pointsMaterial
          size={0.15}
          color="#00aaff"
          transparent
          opacity={0.9}
          blending={AdditiveBlending}
          sizeAttenuation={true}
          vertexColors={false}
        />
      </points>

      {/* Outer flame - orange-red */}
      <points ref={outerFlameRef} geometry={outerFlame.geometry}>
        <pointsMaterial
          size={0.25}
          color="#ff4400"
          transparent
          opacity={0.7}
          blending={AdditiveBlending}
          sizeAttenuation={true}
          vertexColors={false}
        />
      </points>

      {/* Sparks - white hot */}
      <points ref={sparkRef} geometry={sparks.geometry}>
        <pointsMaterial
          size={0.08}
          color="#ffffff"
          transparent
          opacity={0.8}
          blending={AdditiveBlending}
          sizeAttenuation={true}
          vertexColors={false}
        />
      </points>

      {/* Engine glow cone */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.1, 0.3, 5]} />
        <meshBasicMaterial
          color="#0088ff"
          transparent
          opacity={0.3}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default JetEngineEffect;