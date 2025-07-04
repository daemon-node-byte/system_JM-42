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
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  turnLeft: boolean;
  turnRight: boolean;
  setKey: (key: keyof KeyboardStoreSlice, value: boolean) => void;
}

export type AppStore = SceneSlice & PlayerStatsSlice & KeyboardStoreSlice;

export type KeyboardKeys =
  | "forward"
  | "backward"
  | "left"
  | "right"
  | "up"
  | "down"
  | "turnLeft"
  | "turnRight";
