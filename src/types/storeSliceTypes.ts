import { Vector3, Euler } from "three";
import type { KeyState, MouseMovement, Laser } from "@/types";

export interface ShipStateSlice {
  // Position and rotation
  position: Vector3;
  rotation: Euler;
  targetRotation: Euler;
  velocity: Vector3;

  // Engine and visuals
  isEngineActive: boolean;
  // Laser system
  lasers: Laser[];
  lastFireTime: number;

  // Mouse aiming
  isAiming: boolean;
  aimPosition: { x: number; y: number };
  aimOffset: Vector3;
  tiltAmount: number;
}

export interface ShipActions {
  // Position, rotation and movement updates
  setPosition: (position: Vector3) => void;
  setRotation: (rotation: Euler) => void;
  setTargetRotation: (targetRotation: Euler) => void;
  setVelocity: (velocity: Vector3) => void;

  // Engine and visual updates
  toggleEngine: () => void;

  // Laser system actions
  fireLaser: (laser: Laser) => void;
  updateLasers: (lasers: Laser[]) => void;
  setLastFireTime: (time: number) => void;

  // Mouse aiming actions
  setAiming: (isAiming: boolean) => void;
  setAimPosition: (position: { x: number; y: number }) => void;
  setAimOffset: (offset: Vector3) => void;
  setTiltAmount: (tiltAmount: number) => void;

  resetShip: () => void; // Reset ship state to initial values
}

export interface ShipStoreSlice extends ShipStateSlice, ShipActions {}

export interface SceneStoreSlice {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export interface InputActions {
  updateKeys: (keys: Partial<KeyState>) => void;
  updateMouseMovement: (movement: Partial<MouseMovement>) => void;
}

export interface InputState {
  keys: KeyState;
  mouseMovement: MouseMovement;
}

export interface InputStoreSlice extends InputState, InputActions {}

export type AppStore = ShipStoreSlice & SceneStoreSlice & InputStoreSlice;
