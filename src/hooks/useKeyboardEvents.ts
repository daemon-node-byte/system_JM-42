import { useEffect, useCallback } from "react";
import { useStore } from "@/store";
import type { KeyboardKeys } from "@/types";

const keyMap: Record<string, KeyboardKeys> = {
  KeyW: "thrustForward",
  KeyS: "reverseThrust",
  KeyA: "leftRoll",
  KeyD: "rightRoll",
  KeyQ: "turnLeft",
  KeyE: "turnRight",
  KeyX: "up",
  KeyZ: "down",
  ArrowUp: "pitchUp",
  ArrowDown: "pitchDown",
  ArrowLeft: "left",
  ArrowRight: "right",
  Space: "fireWeapon"
};
//*ANCHOR - Keyboard Controls hook and map
export const useKeyboardEvents = () => {
  const setKey = useStore((state) => state.setKey);
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      // Handle key press events
      console.log("%cKey pressed:", "color: #f0f", event.key);
      const mapped = keyMap[event.code];
      if (mapped) setKey(mapped, true);
    },
    [setKey]
  );

  const handleKeyRelease = useCallback(
    (event: KeyboardEvent) => {
      // Handle key release events
      console.log("%cKey released:", "color: #f0f", event.key);
      const mapped = keyMap[event.code];
      if (mapped) setKey(mapped, false);
    },
    [setKey]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyRelease);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyRelease);
    };
  }, [handleKeyPress, handleKeyRelease]);
};
