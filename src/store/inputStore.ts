import type { StateCreator } from "zustand";
import type { InputStoreSlice, AppStore } from "@/types/storeSliceTypes";

export const createInputSlice: StateCreator<
  AppStore,
  [],
  [],
  InputStoreSlice
> = (set) => ({
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
  mouseMovement: {
    x: 0,
    y: 0
  },
  updateKeys: (keys) =>
    set((state) => ({
      keys: { ...state.keys, ...keys }
    })),
  updateMouseMovement: (movement) =>
    set((state) => ({
      mouseMovement: { ...state.mouseMovement, ...movement }
    }))
});
