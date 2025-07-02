export interface KeyState {
  thrustForward: boolean;
  thrustBackward: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  rollLeft: boolean;
  rollRight: boolean;
  spinLeft: boolean;
  spinRight: boolean;
  fire: boolean;
  aimControls: boolean;
}

export interface MouseMovement {
  x: number;
  y: number;
}

export interface MouseButtons {
  left: boolean;
  middle: boolean;
  right: boolean;
  scrollUp: boolean;
  scrollDown: boolean;
}
