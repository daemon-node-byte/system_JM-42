import { Group, Points, Vector3, Euler } from "three";
import type { RefObject } from "react";

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
  fire: boolean;
}

export interface MouseMovement {
  x: number;
  y: number;
}

export interface ShipRefs {
  shipRef: RefObject<Group | null>;
  engineParticlesRef: RefObject<Points | null>;
}

export interface ShipState {
  mouseMovement: RefObject<MouseMovement>;
  targetRotation: RefObject<Euler>;
  currentRotation: RefObject<Euler>;
  velocity: RefObject<Vector3>;
  shipPosition: RefObject<Vector3>;
  keys: RefObject<KeyState>;
  particleTrail: RefObject<Vector3[]>;
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

export interface Laser {
  id: string;
  position: Vector3;
  direction: Vector3;
  speed: number;
  lifeTime: number;
  maxLifeTime: number;
}

export interface LaserConfig {
  speed: number;
  lifeTime: number; // in seconds
  fireRate: number; // shots per second
  color: string;
  size: number;
  damage: number;
}

export const DEFAULT_LASER_CONFIG: LaserConfig = {
  speed: 30,
  lifeTime: 5.0, // Increased for better visibility
  fireRate: 5, // Reduced to 5 shots per second for testing
  color: "#ff0040",
  size: 0.1,
  damage: 10
};

export interface LaserSystemState {
  lasers: RefObject<Laser[]>;
  lastFireTime: RefObject<number>;
  fireKey: boolean;
}
