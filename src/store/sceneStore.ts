import type { StateCreator } from "zustand";
import type { SceneStoreSlice, ShipStoreSlice } from "@/types";

export const createSceneSlice: StateCreator<
  SceneStoreSlice & ShipStoreSlice,
  [],
  [],
  SceneStoreSlice
> = (set) => ({
  isLoading: false,
  setLoading: (loading: boolean) => set({ isLoading: loading })
});
