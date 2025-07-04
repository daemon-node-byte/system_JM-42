import type { CanvasSettings } from "../types/constantTypes";
import type { PhysicsProps } from "@react-three/rapier";

// *ANCHOR - Scene Settings

export const CANVAS_SETTINGS: CanvasSettings = {
  camera: {
    position: [0, 1, 2],
    fov: 75,
    near: 0.1,
    far: 1e19
  },
  gl: {
    logarithmicDepthBuffer: true
  }
};

export const PHYSICS_SETTINGS: PhysicsProps = {
  gravity: [0, 0, 0],
  colliders: "hull",
  children: undefined // Placeholder for children components
};
