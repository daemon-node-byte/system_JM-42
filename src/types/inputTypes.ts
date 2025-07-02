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
