import { useMemo } from "react";
import { BufferGeometry, BufferAttribute, ShaderMaterial } from "three";
import engineVertexShader from "../../../shaders/engineTrail.vert.glsl";
import engineFragmentShader from "../../../shaders/engineTrail.frag.glsl";

export const useEngineTrail = () => {
  const engineTrailGeometry = useMemo(() => {
    const particleCount = 30; // Reduced from 50 for better performance and more focused trail
    const geometry = new BufferGeometry();

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Initial positions (will be updated in useFrame)
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      // Blue-white engine colors with gradient
      const intensity = 1 - i / particleCount; // Fade towards the back
      colors[i * 3] = 0.3 + Math.random() * 0.4 * intensity; // R
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.3 * intensity; // G
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B

      // Varying sizes that get smaller towards the back
      sizes[i] = (Math.random() * 2 + 1) * intensity;
    }

    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("color", new BufferAttribute(colors, 3));
    geometry.setAttribute("size", new BufferAttribute(sizes, 1));

    return geometry;
  }, []);

  const engineTrailMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: engineVertexShader,
      fragmentShader: engineFragmentShader,
      uniforms: {
        time: { value: 0 },
        intensity: { value: 1.0 }
      },
      transparent: true,
      depthWrite: false,
      blending: 2 // AdditiveBlending
    });
  }, []);

  return {
    engineTrailGeometry,
    engineTrailMaterial
  };
};
