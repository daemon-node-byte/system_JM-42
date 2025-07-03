import { useEffect, useCallback } from "react";
import type { KeyState, MouseMovement } from "@/types";
import { useStore } from "@/store";

export const useInputControls = () => {
  const { updateKeys, updateMouseMovement, addKeyEvent } = useStore();

  // Memoize handlers to prevent recreating on every render
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const movement: MouseMovement = {
        x: event.movementX,
        y: event.movementY
      };
      updateMouseMovement(movement);
    },
    [updateMouseMovement]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const keyUpdate = getKeyUpdate(event.code, true);
      if (keyUpdate) {
        updateKeys(keyUpdate);
        addKeyEvent(event.code, true);
      }
    },
    [updateKeys, addKeyEvent]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const keyUpdate = getKeyUpdate(event.code, false);
      if (keyUpdate) {
        updateKeys(keyUpdate);
        addKeyEvent(event.code, false);
      }
    },
    [updateKeys, addKeyEvent]
  );

  useEffect(() => {
    console.info("%cMouse and keyboard listeners added", "color: #0fc");

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup function to prevent memory leaks
    return () => {
      console.info("%cMouse and keyboard listeners removed", "color: #fc0");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleMouseMove, handleKeyDown, handleKeyUp]);
};

function getKeyUpdate(
  code: string,
  pressed: boolean
): Partial<KeyState> | null {
  console.log(
    `%cKey Event: %c${code} - ${pressed ? "%cPressed" : "%cReleased"}`,
    "color: #0fc",
    "color: #fff",
    pressed ? "color: #0f0" : "color: #999"
  );
  switch (code) {
    case "KeyW":
      return { up: pressed };
    case "KeyS":
      return { down: pressed };
    case "KeyA":
      return { rollLeft: pressed };
    case "KeyD":
      return { rollRight: pressed };
    case "KeyQ":
      return { spinLeft: pressed };
    case "KeyE":
      return { spinRight: pressed };
    case "Space":
      return { fire: pressed };
    case "ShiftLeft":
      return { thrustForward: pressed };
    case "KeyR":
      return { thrustBackward: pressed };
    case "KeyT":
      return { aimControls: pressed };
    default:
      return null;
  }
}
