import type { StateCreator } from "zustand";
import type { AppStore, KeyboardStoreSlice } from "@/types";

export const createKeyboardSlice: StateCreator<
  AppStore,
  [],
  [],
  KeyboardStoreSlice
> = (set) => ({
  forward: false,
  backward: false,
  left: false,
  right: false,
  up: false,
  down: false,
  turnLeft: false,
  turnRight: false,
  setKey: (key, value) => set({ [key]: value })
});
