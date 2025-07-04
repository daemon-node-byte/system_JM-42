import type { StateCreator } from "zustand";
import type { AppStore, SceneSlice } from "@/types";

export const createSceneSlice: StateCreator<AppStore, [], [], SceneSlice> = (
  set
) => ({
  mode: "explore",
  isPaused: false,
  isLoading: false,
  frameTime: 0,
  fps: 60,

  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),

  setLoading: (loading) => set({ isLoading: loading }),

  setFrameTime: (time) => set({ frameTime: time }),

  setFps: (fps) => set({ fps }),

  setMode: (mode) => set({ mode })
});
