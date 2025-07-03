import type { StateCreator } from "zustand";
import type { SceneStoreSlice, AppStore } from "@/types";
import { Vector3 } from "three";

export const createSceneSlice: StateCreator<
  AppStore,
  [],
  [],
  SceneStoreSlice
> = (set) => ({
  isLoading: false,
  fps: 0,
  frameTime: 0,
  cameraPosition: new Vector3(0, 0, 0),
  setCameraPosition: (position) => set({ cameraPosition: position }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  updatePerformanceMetrics: (fps: number, frameTime: number) =>
    set({ fps, frameTime })
});
