import { Group, Points, Vector3, Euler } from "three";
import type { MutableRefObject } from "react";

export interface KeyState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  rollLeft: boolean;
  rollRight: boolean;
  spinLeft: boolean;
  spinRight: boolean;
}

export interface MouseMovement {
  x: number;
  y: number;
}

export interface ShipRefs {
  shipRef: MutableRefObject<Group | null>;
  engineParticlesRef: MutableRefObject<Points | null>;
}

export interface ShipState {
  mouseMovement: MutableRefObject<MouseMovement>;
  targetRotation: MutableRefObject<Euler>;
  currentRotation: MutableRefObject<Euler>;
  velocity: MutableRefObject<Vector3>;
  shipPosition: MutableRefObject<Vector3>;
  keys: MutableRefObject<KeyState>;
  particleTrail: MutableRefObject<Vector3[]>;
}

export interface MovementConfig {
  tiltAmount: number;
  dampingFactor: number;
  bankingReturnSpeed: number;
  speed: number;
  rollSpeed: number;
  spinSpeed: number;
  maxRollAngle: number;
}

export const DEFAULT_MOVEMENT_CONFIG: MovementConfig = {
  tiltAmount: 0.3,
  dampingFactor: 0.08,
  bankingReturnSpeed: 0.05,
  speed: 8,
  rollSpeed: 2.0,
  spinSpeed: 1.5,
  maxRollAngle: Math.PI / 4
};
