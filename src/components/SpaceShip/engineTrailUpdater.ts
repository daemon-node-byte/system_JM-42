import { Vector3, Euler, Points, ShaderMaterial } from "three";
import type { KeyState } from "./types";
import type { MutableRefObject } from "react";

interface UpdateEngineTrailParams {
  engineParticlesRef: MutableRefObject<Points | null>;
  engineTrailMaterial: ShaderMaterial;
  keys: MutableRefObject<KeyState>;
  velocity: MutableRefObject<Vector3>;
  shipPosition: MutableRefObject<Vector3>;
  currentRotation: MutableRefObject<Euler>;
  particleTrail: MutableRefObject<Vector3[]>;
  elapsedTime: number;
}

// Reuse these vectors to avoid garbage collection (React Three Fiber best practice)
// Creating vectors in useFrame causes excessive garbage collection and poor performance
const tempVector = new Vector3();
const exhaustOffset = new Vector3();
const randomOffset = new Vector3();

export const updateEngineTrail = ({
  engineParticlesRef,
  engineTrailMaterial,
  keys,
  velocity,
  shipPosition,
  currentRotation,
  particleTrail,
  elapsedTime
}: UpdateEngineTrailParams) => {
  if (!engineParticlesRef.current) return;

  const isMoving = keys.current.forward || keys.current.backward;

  if (isMoving && velocity.current.length() > 0.1) {
    // Calculate exhaust position relative to ship (reuse vectors)
    exhaustOffset.set(0, -0.2, 1.2);
    exhaustOffset.applyEuler(currentRotation.current);

    // Get current exhaust world position
    tempVector.copy(shipPosition.current).add(exhaustOffset);

    // Add new trail point with distance check
    if (
      particleTrail.current.length === 0 ||
      tempVector.distanceTo(particleTrail.current[0]) > 0.12
    ) {
      particleTrail.current.unshift(tempVector.clone());
    }

    // Limit trail length for performance
    const maxTrailLength = 25;
    if (particleTrail.current.length > maxTrailLength) {
      particleTrail.current.pop();
    }

    // Update particle positions
    const positions = engineParticlesRef.current.geometry.attributes.position
      .array as Float32Array;

    const trailLength = Math.min(particleTrail.current.length, 30);

    for (let i = 0; i < trailLength; i++) {
      const trailPos = particleTrail.current[i];

      // Add slight randomness for visual appeal (reuse vector)
      randomOffset.set(
        (Math.random() - 0.5) * 0.08,
        (Math.random() - 0.5) * 0.08,
        (Math.random() - 0.5) * 0.08
      );

      // Apply randomness to position (reuse tempVector)
      tempVector.copy(trailPos).add(randomOffset);

      const idx = i * 3;
      positions[idx] = tempVector.x;
      positions[idx + 1] = tempVector.y;
      positions[idx + 2] = tempVector.z;
    }

    // Clear unused particles
    for (let i = trailLength; i < 30; i++) {
      const idx = i * 3;
      positions[idx] = 0;
      positions[idx + 1] = 0;
      positions[idx + 2] = 0;
    }

    engineParticlesRef.current.geometry.attributes.position.needsUpdate = true;

    // Update shader uniforms
    engineTrailMaterial.uniforms.time.value = elapsedTime;
    engineTrailMaterial.uniforms.intensity.value = keys.current.forward
      ? 1.0
      : 0.5;
  } else {
    // Gradually fade and remove trail when not moving
    engineTrailMaterial.uniforms.intensity.value *= 0.92;

    // Remove trail points gradually for smoother fade
    if (particleTrail.current.length > 0 && Math.random() > 0.7) {
      particleTrail.current.pop();
    }

    // Clear all particles when intensity is very low
    if (engineTrailMaterial.uniforms.intensity.value < 0.05) {
      particleTrail.current = [];

      const positions = engineParticlesRef.current?.geometry.attributes.position
        .array as Float32Array;
      if (positions) {
        for (let i = 0; i < 30; i++) {
          const idx = i * 3;
          positions[idx] = 0;
          positions[idx + 1] = 0;
          positions[idx + 2] = 0;
        }
        engineParticlesRef.current!.geometry.attributes.position.needsUpdate =
          true;
      }
    }
  }
};
