import type { StateCreator } from "zustand";
import type { AppStore, PlayerStatsSlice } from "@/types";

export const createPlayerStatsSlice: StateCreator<
  AppStore,
  [],
  [],
  PlayerStatsSlice
> = (set) => ({
  currentHealth: 100,
  maxHealth: 100,
  score: 0,
  currentShipId: "ship-1", // Default ship ID, can be changed later
  setScore: (score) => set({ score }),
  setMaxHealth: (maxHealth) => set({ maxHealth }),
  takeDamage: (amount) =>
    set((state) => {
      const newHealth = Math.max(state.currentHealth - amount, 0);
      return { currentHealth: newHealth };
    }),
  heal: (amount) =>
    set((state) => {
      const newHealth = Math.min(state.currentHealth + amount, state.maxHealth);
      return { currentHealth: newHealth };
    }),
  setCurrentShipId: (shipId) => set({ currentShipId: shipId })
});
