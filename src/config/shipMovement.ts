import type { MovementConfig, LaserConfig } from "@/types";

export const DEFAULT_MOVEMENT_CONFIG: MovementConfig = {
  tiltAmount: 0.3,
  dampingFactor: 0.08,
  bankingReturnSpeed: 0.05,
  speed: 8,
  rollSpeed: 2.0,
  spinSpeed: 1.5,
  maxRollAngle: Math.PI / 4
};

export const DEFAULT_LASER_CONFIG: LaserConfig = {
  speed: 30,
  lifeTime: 5.0, // Increased for better visibility
  fireRate: 5, // Reduced to 5 shots per second for testing
  color: "#ff0040",
  size: 0.1,
  damage: 10
};
