import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertShader from '../shaders/enginetrail.vert.glsl';
import fragShader from '../shaders/enginetrail.frag.glsl';

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  size: number;
  color: THREE.Color;
}

interface EngineTrailProps {
  position?: [number, number, number];
  intensity?: number;
  isActive?: boolean;
  maxParticles?: number;
}

const EngineTrail: React.FC<EngineTrailProps> = ({
  position = [0, 0, 0],
  intensity = 1.0,
  isActive = true,
  maxParticles = 50
}) => {
  const meshRef = useRef<THREE.Points>(null);
  const particlesRef = useRef<Particle[]>([]);
  const clockRef = useRef(0);

  // Create geometry and material
  const { geometry, material } = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    
    const positions = new Float32Array(maxParticles * 3);
    const colors = new Float32Array(maxParticles * 3);
    const sizes = new Float32Array(maxParticles);
    
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        intensity: { value: intensity }
      },
      vertexShader: vertShader,
      fragmentShader: fragShader,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      vertexColors: true
    });

    // Debug log to verify shaders loaded
    console.log('Vertex shader:', vertShader ? 'loaded' : 'missing');
    console.log('Fragment shader:', fragShader ? 'loaded' : 'missing');

    return { geometry: geom, material: mat };
  }, [maxParticles, intensity]);

  // Update intensity when prop changes
  useEffect(() => {
    if (material) {
      material.uniforms.intensity.value = intensity;
    }
  }, [intensity, material]);

  const addParticle = (worldPosition: THREE.Vector3) => {
    if (particlesRef.current.length >= maxParticles) {
      particlesRef.current.shift();
    }

    const colors = [
      new THREE.Color(0x00ffff), // Cyan
      new THREE.Color(0x0080ff), // Blue  
      new THREE.Color(0x4040ff), // Purple-blue
      new THREE.Color(0xffffff)  // White core
    ];

    const particle: Particle = {
      position: worldPosition.clone(),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 1.0,
        (Math.random() - 0.5) * 0.5,
        -Math.random() * 3 - 2
      ),
      life: 1.0,
      maxLife: 1.0,
      size: Math.random() * 8 + 5, // Increased size
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    particlesRef.current.push(particle);
  };

  const updateParticles = (deltaTime: number) => {
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      const particle = particlesRef.current[i];
      
      // Update position
      particle.position.add(
        particle.velocity.clone().multiplyScalar(deltaTime)
      );
      
      // Update life
      particle.life -= deltaTime * 0.8;
      
      // Apply drag
      particle.velocity.multiplyScalar(0.98);
      
      // Remove dead particles
      if (particle.life <= 0) {
        particlesRef.current.splice(i, 1);
      }
    }
  };

  const updateGeometry = () => {
    if (!geometry) return;

    const positions = geometry.attributes.position.array as Float32Array;
    const colors = geometry.attributes.color.array as Float32Array;
    const sizes = geometry.attributes.size.array as Float32Array;

    for (let i = 0; i < maxParticles; i++) {
      if (i < particlesRef.current.length) {
        const particle = particlesRef.current[i];
        const lifeRatio = particle.life / particle.maxLife;
        
        // Position
        positions[i * 3] = particle.position.x;
        positions[i * 3 + 1] = particle.position.y;
        positions[i * 3 + 2] = particle.position.z;
        
        // Color with life-based intensity
        colors[i * 3] = particle.color.r * lifeRatio;
        colors[i * 3 + 1] = particle.color.g * lifeRatio;
        colors[i * 3 + 2] = particle.color.b * lifeRatio;
        
        // Size based on life
        sizes[i] = particle.size * lifeRatio;
      } else {
        // Hide unused particles
        positions[i * 3] = 0;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = 0;
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 0;
        colors[i * 3 + 2] = 0;
        sizes[i] = 0;
      }
    }
    
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
    geometry.attributes.size.needsUpdate = true;
  };

  useFrame((_state, deltaTime) => {
    if (!isActive || !meshRef.current) return;

    clockRef.current += deltaTime;
    
    // Update shader time
    if (material) {
      material.uniforms.time.value = clockRef.current;
    }

    // Get world position for particle spawn
    const worldPosition = new THREE.Vector3();
    meshRef.current.getWorldPosition(worldPosition);
    
    // Add new particles - increased spawn rate
    if (Math.random() < 0.8) { // Higher spawn rate
      addParticle(worldPosition);
    }
    
    // Always spawn at least some particles for testing
    if (particlesRef.current.length < 5) {
      addParticle(worldPosition);
    }
    
    // Update particles
    updateParticles(deltaTime);
    
    // Update geometry
    updateGeometry();
  });

  return (
    <points ref={meshRef} position={position}>
      <bufferGeometry attach="geometry" {...geometry} />
      <shaderMaterial attach="material" {...material} />
    </points>
  );
};

export default EngineTrail;