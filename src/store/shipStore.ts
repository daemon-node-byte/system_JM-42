import type { StateCreator } from "zustand";
import { Vector3, Euler } from "three";
import type {
  ShipStateSlice,
  ShipStoreSlice,
  SceneStoreSlice
} from "@/types/storeSliceTypes";

const initialShipState: ShipStateSlice = {
  position: new Vector3(0, 0, 0),
  rotation: new Euler(0, 0, 0),
  targetRotation: new Euler(0, 0, 0),
  velocity: new Vector3(0, 0, 0),
  keys: {
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
    rollLeft: false,
    rollRight: false,
    spinLeft: false,
    spinRight: false,
    fire: false
  },
  mouseMovement: { x: 0, y: 0 },
  isEngineActive: false,
  lasers: [],
  lastFireTime: 0,
  isAiming: false,
  aimPosition: { x: 0, y: 0 },
  aimOffset: new Vector3(0, 0, 0),
  tiltAmount: 0
};

export const createShipSlice: StateCreator<
  ShipStoreSlice & SceneStoreSlice,
  [],
  [],
  ShipStoreSlice
> = (set) => ({
  ...initialShipState,

  setPosition: (position) => set({ position }),
  setRotation: (rotation) => set({ rotation }),
  setTargetRotation: (targetRotation) => set({ targetRotation }),
  setVelocity: (velocity) => set({ velocity }),
  toggleEngine: () =>
    set((state) => ({ isEngineActive: !state.isEngineActive })),
  updateKeys: (keys) =>
    set((state) => ({
      keys: { ...state.keys, ...keys }
    })),
  updateMouseMovement: (movement) =>
    set((state) => ({
      mouseMovement: { ...state.mouseMovement, ...movement }
    })),
  fireLaser: (laser) =>
    set((state) => ({
      lasers: [...state.lasers, laser]
    })),
  updateLasers: (lasers) => set({ lasers }),
  setLastFireTime: (time) => set({ lastFireTime: time }),
  setAiming: (isAiming) => set({ isAiming }),
  setAimPosition: (position) => set({ aimPosition: position }),
  setAimOffset: (offset) => set({ aimOffset: offset }),
  setTiltAmount: (tiltAmount) => set({ tiltAmount }),
  resetShip: () => set({ ...initialShipState })
});
