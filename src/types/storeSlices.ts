export interface SceneSlice {
  mode: "explore" | "combat";
  isPaused: boolean;
  isLoading: boolean;
  frameTime: number;
  fps: number;
  togglePause: () => void;
  setLoading: (loading: boolean) => void;
  setFrameTime: (time: number) => void;
  setFps: (fps: number) => void;
  setMode: (mode: "explore" | "combat") => void;
}

export interface PlayerStatsSlice {
  currentHealth: number;
  maxHealth: number;
  score: number;
  currentShipId: string;
  setScore: (score: number) => void;
  setMaxHealth: (maxHealth: number) => void;
  takeDamage: (amount: number) => void;
  heal: (amount: number) => void;
  setCurrentShipId: (shipId: string) => void;
}

export interface KeyboardStoreSlice {
  thrustForward: boolean;
  reverseThrust: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  pitchUp: boolean;
  pitchDown: boolean;
  turnLeft: boolean;
  turnRight: boolean;
  leftRoll: boolean;
  rightRoll: boolean;
  fireWeapon: boolean;
  setKey: (key: keyof KeyboardStoreSlice, value: boolean) => void;
}

export type AppStore = SceneSlice & PlayerStatsSlice & KeyboardStoreSlice;

export type KeyboardKeys =
  | "thrustForward"
  | "reverseThrust"
  | "left"
  | "right"
  | "up"
  | "down"
  | "pitchUp"
  | "pitchDown"
  | "turnLeft" //spin
  | "turnRight" // spin
  | "leftRoll"
  | "rightRoll"
  | "fireWeapon";
