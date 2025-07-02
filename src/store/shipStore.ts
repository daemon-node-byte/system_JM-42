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
  isEngineActive: false
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
  resetShip: () => set({ ...initialShipState })
});
