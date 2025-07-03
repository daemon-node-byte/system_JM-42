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
}

export interface ShipActions {
  // Position, rotation and movement updates
  setPosition: (position: Vector3) => void;
  setRotation: (rotation: Euler) => void;
  setTargetRotation: (targetRotation: Euler) => void;
  setVelocity: (velocity: Vector3) => void;

  // Engine and visual updates
  toggleEngine: () => void;

  resetShip: () => void; // Reset ship state to initial values
}

export interface ShipStoreSlice extends ShipStateSlice, ShipActions {}

export interface LaserAimingState {
  lasers: Laser[];
  lastFireTime: number;
  isAiming: boolean;
  aimPosition: { x: number; y: number };
  aimOffset: { x: number; y: number };
  tiltAmount: number;
}

export interface LaserAimingActions {
  fireLaser: (laser: Laser) => void;
  updateLasers: (lasers: Laser[]) => void;
  setLastFireTime: (time: number) => void;
  setAiming: (isAiming: boolean) => void;
  setAimPosition: (position: { x: number; y: number }) => void;
  setAimOffset: (offset: { x: number; y: number }) => void;
  setTiltAmount: (tiltAmount: number) => void;
}

export interface LaserAimingSlice
  extends LaserAimingState,
    LaserAimingActions {}

export interface SceneStoreSlice {
  isLoading: boolean;
  fps: number;
  frameTime: number;
  cameraPosition: Vector3;
  setCameraPosition: (position: Vector3) => void;
  setIsLoading: (loading: boolean) => void;
  updatePerformanceMetrics: (fps: number, frameTime: number) => void;
}

export interface InputActions {
  updateKeys: (keys: Partial<KeyState>) => void;
  updateMouseMovement: (movement: Partial<MouseMovement>) => void;
  addKeyEvent: (key: string, pressed: boolean) => void;
  addMouseEvent: (movement: MouseMovement) => void;
  clearHistory: () => void;
}

export interface InputState {
  keys: KeyState;
  mouseMovement: MouseMovement;
  keyHistory: Array<{ key: string; timestamp: number; pressed: boolean }>;
  mouseHistory: Array<{ movement: MouseMovement; timestamp: number }>;
}

export interface InputStoreSlice extends InputState, InputActions {
  resetInput: () => void;
}

export interface SharedStoreSlice {
  // Game state
  isPaused: boolean;
  gameSpeed: number;

  // Cross-slice actions
  togglePause: () => void;
  handleEngineToggle: () => void;
  handleAimingUpdate: (aimingData: {
    isAiming: boolean;
    aimPosition: { x: number; y: number };
    aimOffset: { x: number; y: number };
    tiltAmount: number;
  }) => void;
  updatePerformanceMetrics: (fps: number, frameTime: number) => void;
  resetAll: () => void;

  // Computed getters as actions
  getEngineIntensity: () => number;
  getMovementVector: () => Vector3;
}

export interface LaserAimingSlice extends LaserAimingState, LaserAimingActions {
  resetLasers: () => void;
}

export type AppStore = ShipStoreSlice &
  SceneStoreSlice &
  InputStoreSlice &
  LaserAimingSlice &
  SharedStoreSlice;
