import type { StateCreator } from "zustand";
import type { AppStore, KeyboardStoreSlice } from "@/types";

export const createKeyboardSlice: StateCreator<
  AppStore,
  [],
  [],
  KeyboardStoreSlice
> = (set) => ({
  thrustForward: false,
  reverseThrust: false,
  left: false,
  right: false,
  up: false,
  down: false,
  pitchUp: false,
  pitchDown: false,
  turnLeft: false,
  turnRight: false,
  leftRoll: false,
  rightRoll: false,
  fireWeapon: false,
  setKey: (key, value) => set({ [key]: value })
});
