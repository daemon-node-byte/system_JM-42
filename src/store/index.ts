import { create } from "zustand";
import { createShipSlice } from "./shipStore";
import { createSceneSlice } from "./sceneStore";
import type { ShipStoreSlice, SceneStoreSlice } from "@/types";

export const useStore = create<ShipStoreSlice & SceneStoreSlice>()((...a) => ({
  ...createShipSlice(...a),
  ...createSceneSlice(...a)
}));
