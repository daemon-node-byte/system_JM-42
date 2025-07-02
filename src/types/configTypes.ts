export interface MovementConfig {
  tiltAmount: number;
  dampingFactor: number;
  bankingReturnSpeed: number;
  speed: number;
  rollSpeed: number;
  spinSpeed: number;
  maxRollAngle: number;
}

export interface LaserConfig {
  speed: number;
  lifeTime: number; // in seconds
  fireRate: number; // shots per second
  color: string;
  size: number;
  damage: number;
}
