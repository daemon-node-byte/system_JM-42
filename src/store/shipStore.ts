import type { StateCreator } from "zustand";
import { Vector3, Euler } from "three";
import type {
  ShipStateSlice,
  ShipStoreSlice,
  AppStore
} from "@/types/storeSliceTypes";

const initialShipState: ShipStateSlice = {
  position: new Vector3(0, 0, 0),
  rotation: new Euler(0, 0, 0),
  targetRotation: new Euler(0, 0, 0),
  velocity: new Vector3(0, 0, 0),
  isEngineActive: false,
  lasers: [],
  lastFireTime: 0,
  isAiming: false,
  aimPosition: { x: 0, y: 0 },
  aimOffset: new Vector3(0, 0, 0),
  tiltAmount: 0
};

export const createShipSlice: StateCreator<AppStore, [], [], ShipStoreSlice> = (
  set
) => ({
  ...initialShipState,

  setPosition: (position) => set({ position }),
  setRotation: (rotation) => set({ rotation }),
  setTargetRotation: (targetRotation) => set({ targetRotation }),
  setVelocity: (velocity) => set({ velocity }),
  toggleEngine: () =>
    set((state) => ({ isEngineActive: !state.isEngineActive })),
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
