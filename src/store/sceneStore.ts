import type { StateCreator } from "zustand";
import type { SceneStoreSlice, AppStore } from "@/types";

export const createSceneSlice: StateCreator<
  AppStore,
  [],
  [],
  SceneStoreSlice
> = (set) => ({
  isLoading: false,
  fps: 0,
  frameTime: 0,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  updatePerformanceMetrics: (fps: number, frameTime: number) =>
    set({ fps, frameTime })
});
