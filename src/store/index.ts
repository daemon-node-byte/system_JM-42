import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createShipSlice } from "./shipStore";
import { createSceneSlice } from "./sceneStore";
import { createInputSlice } from "./inputStore";
import type { AppStore } from "@/types";

export const useStore = create<AppStore>()(
  devtools(
    (...a) => ({
      ...createShipSlice(...a),
      ...createSceneSlice(...a),
      ...createInputSlice(...a)
    }),
    { name: "AppStore" }
  )
);
