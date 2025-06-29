// Main component export
export { default } from "./index";

// Individual components for advanced usage
export { default as ShipModel } from "./ShipModel";
export { default as FallbackLoader } from "./FallbackLoader";

// Hooks and utilities
export { useInputControls } from "./useInputControls";
export { useEngineTrail } from "./useEngineTrail";

// Physics and control functions
export { updateShipRotation, updateShipMovement } from "./shipPhysics";
export { updateCamera } from "./cameraControls";
export { updateEngineTrail } from "./engineTrailUpdater";
export { reduceMouseMovement } from "./mouseUtils";

// Types and constants
export type {
  KeyState,
  MouseMovement,
  ShipRefs,
  ShipState,
  MovementConfig
} from "./types";
export { DEFAULT_MOVEMENT_CONFIG } from "./types";
