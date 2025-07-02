import type { StateCreator } from "zustand";
import type { SceneStoreSlice, AppStore } from "@/types";

export const createSceneSlice: StateCreator<
  AppStore,
  [],
  [],
  SceneStoreSlice
> = (set) => ({
  isLoading: false,
  setLoading: (loading: boolean) => set({ isLoading: loading })
});
