import { Group, Points, Vector3, Euler } from "three";
import type { RefObject } from "react";
import type { KeyState, MouseMovement } from "./inputTypes";

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

export interface Laser {
  id: string;
  position: Vector3;
  direction: Vector3;
  speed: number;
  lifeTime: number;
  maxLifeTime: number;
}

export interface LaserSystemState {
  lasers: RefObject<Laser[]>;
  lastFireTime: RefObject<number>;
  fireKey: boolean;
}
