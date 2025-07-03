import type { StateCreator } from "zustand";
import type { LaserAimingSlice, AppStore } from "@/types";

export const createLaserAimingSlice: StateCreator<
  AppStore,
  [],
  [],
  LaserAimingSlice
> = (set) => ({
  isAiming: false,
  aimPosition: { x: 0, y: 0 },
  aimOffset: { x: 0, y: 0 },
  tiltAmount: 0,
  setAiming: (isAiming) => set({ isAiming }),
  setAimPosition: (position) => set({ aimPosition: position }),
  setAimOffset: (offset) => set({ aimOffset: offset }),
  setTiltAmount: (tiltAmount) => set({ tiltAmount }),
  lasers: [],
  lastFireTime: 0,
  fireLaser: (laser) =>
    set((state) => ({
      lasers: [...state.lasers, laser],
      lastFireTime: Date.now()
    })),
  updateLasers: (lasers) => set({ lasers }),
  setLastFireTime: (time) => set({ lastFireTime: time }),

  resetLasers: () =>
    set({
      lasers: [],
      lastFireTime: 0,
      isAiming: false,
      aimPosition: { x: 0, y: 0 },
      aimOffset: { x: 0, y: 0 },
      tiltAmount: 0
    })
});
