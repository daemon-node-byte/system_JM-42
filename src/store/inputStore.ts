import type { StateCreator } from "zustand";
import type { InputStoreSlice, AppStore } from "@/types/storeSliceTypes";

export const createInputSlice: StateCreator<
  AppStore,
  [],
  [],
  InputStoreSlice
> = (set, get) => ({
  keys: {
    thrustForward: false,
    thrustBackward: false,
    left: false,
    right: false,
    up: false,
    down: false,
    rollLeft: false,
    rollRight: false,
    spinLeft: false,
    spinRight: false,
    fire: false,
    aimControls: false
  },
  mouseMovement: {
    x: 0,
    y: 0
  },
  mouseButtons: {
    left: false,
    middle: false,
    right: false,
    scrollUp: false,
    scrollDown: false
  },
  keyHistory: [],
  mouseHistory: [],
  updateKeys: (keys) =>
    set((state) => {
      if (state.keys.aimControls) {
        const current = get().keys.aimControls;
        return { keys: { ...state.keys, aimControls: !current } };
      } else {
        return { keys: { ...state.keys, ...keys } };
      }
    }),
  updateMouseMovement: (movement) =>
    set((state) => ({
      mouseMovement: { ...state.mouseMovement, ...movement }
    })),
  addKeyEvent: (key, pressed) =>
    set((state) => ({
      keyHistory: [
        ...state.keyHistory.slice(-99), // Keep last 100 events
        { key, timestamp: Date.now(), pressed }
      ]
    })),
  addMouseEvent: (movement) =>
    set((state) => ({
      mouseHistory: [
        ...state.mouseHistory.slice(-99), // Keep last 100 events
        { movement, timestamp: Date.now() }
      ]
    })),

  clearHistory: () => set({ keyHistory: [], mouseHistory: [] }),

  resetInput: () =>
    set({
      keys: {
        thrustForward: false,
        thrustBackward: false,
        left: false,
        right: false,
        up: false,
        down: false,
        rollLeft: false,
        rollRight: false,
        spinLeft: false,
        spinRight: false,
        fire: false,
        aimControls: false
      },
      mouseMovement: { x: 0, y: 0 },
      keyHistory: [],
      mouseHistory: []
    })
});
