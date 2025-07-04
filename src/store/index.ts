import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createSceneSlice } from "./sceneSlice";
import { createPlayerStatsSlice } from "./playerStatsSlice";
import { createKeyboardSlice } from "./keyboardSlice";

import type { AppStore } from "@/types";

export const useStore = create<AppStore>()(
  devtools((...a) => ({
    ...createSceneSlice(...a),
    ...createPlayerStatsSlice(...a),
    ...createKeyboardSlice(...a)
  }))
);
