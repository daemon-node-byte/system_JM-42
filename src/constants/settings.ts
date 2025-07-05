import type { CanvasSettings } from "../types/constantTypes";
import type { PhysicsProps } from "@react-three/rapier";

import { BlendFunction } from "postprocessing";
// *ANCHOR - Scene Settings

export const CANVAS_SETTINGS: CanvasSettings = {
  camera: {
    position: [0, 6, 2],
    fov: 75,
    near: 0.1,
    far: 1e19
  },
  gl: {
    logarithmicDepthBuffer: true,
    antialias: true
  }
};

export const PHYSICS_SETTINGS: PhysicsProps = {
  gravity: [0, 0, 0],
  colliders: "hull",
  children: undefined // Placeholder for children components
};

export const POST_PROCESSING_SETTINGS = {
  bloom: {
    intensity: 1.5,
    luminanceThreshold: 0.5,
    blendFunction: BlendFunction.ADD
  },
  chromaticAberration: {
    offset: [0.01, 0.01]
  }
};
