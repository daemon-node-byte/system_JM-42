import type { StateCreator } from "zustand";
import { Vector3 } from "three";
import type { SharedStoreSlice, AppStore } from "@/types/storeSliceTypes";

export const createSharedSlice: StateCreator<
  AppStore,
  [],
  [],
  SharedStoreSlice
> = (set, get) => ({
  // Game state
  isPaused: false,
  gameSpeed: 1.0,

  // Cross-slice actions
  togglePause: () => {
    const currentState = get();
    set({
      isPaused: !currentState.isPaused
    });
  },

  handleEngineToggle: () => {
    const currentState = get();
    const shouldActivateEngine =
      currentState.keys.thrustForward || currentState.keys.thrustBackward;

    if (currentState.isEngineActive !== shouldActivateEngine) {
      set({ isEngineActive: shouldActivateEngine });
    }
  },

  handleAimingUpdate: (aimingData: {
    isAiming: boolean;
    aimPosition: { x: number; y: number };
    aimOffset: { x: number; y: number };
    tiltAmount: number;
  }) => {
    set({
      isAiming: aimingData.isAiming,
      aimPosition: aimingData.aimPosition,
      aimOffset: aimingData.aimOffset,
      tiltAmount: aimingData.tiltAmount
    });

    // Dispatch event for legacy components
    const aimingStateChangeEvent = new CustomEvent("aimingStateChange", {
      detail: {
        isAiming: aimingData.isAiming,
        aimPosition: aimingData.aimPosition
      }
    });
    window.dispatchEvent(aimingStateChangeEvent);
  },

  updatePerformanceMetrics: (fps: number, frameTime: number) => {
    set({ fps, frameTime });
  },

  resetAll: () => {
    const currentState = get();
    // Call individual reset methods
    currentState.resetShip();
    currentState.resetInput();
    currentState.resetLasers();
    set({
      isPaused: false,
      gameSpeed: 1.0
    });
  },

  // Computed getters as actions (since Zustand doesn't have computed properties)
  getEngineIntensity: () => {
    const state = get();
    let intensity = 0;
    if (state.keys.thrustForward) intensity += 1;
    if (state.keys.thrustBackward) intensity += 0.5;
    return Math.min(intensity, 1);
  },

  getMovementVector: () => {
    const state = get();
    const movement = new Vector3(0, 0, 0);

    if (state.keys.thrustForward) movement.z += 1;
    if (state.keys.thrustBackward) movement.z -= 1;
    if (state.keys.left) movement.x -= 1;
    if (state.keys.right) movement.x += 1;
    if (state.keys.up) movement.y += 1;
    if (state.keys.down) movement.y -= 1;

    return movement.normalize();
  }
});
