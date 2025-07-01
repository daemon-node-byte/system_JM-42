// Main component export
export { default } from "./index.tsx";

// Component exports
export * from ".";

// Hook exports
export * from "../../hooks";

// Physics exports
export * from "../../physics";

// Utility exports
export * from "../../utils";

// Types and constants
export type {
  KeyState,
  MouseMovement,
  ShipRefs,
  ShipState,
  MovementConfig,
  Laser,
  LaserConfig,
  LaserSystemState
} from "./types";
export { DEFAULT_MOVEMENT_CONFIG, DEFAULT_LASER_CONFIG } from "./types";
