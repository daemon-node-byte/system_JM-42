import { useEffect } from "react";
import type { KeyState, MouseMovement } from "./types";
import type { MutableRefObject } from "react";

interface UseInputControlsProps {
  keys: MutableRefObject<KeyState>;
  mouseMovement: MutableRefObject<MouseMovement>;
}

export const useInputControls = ({
  keys,
  mouseMovement
}: UseInputControlsProps) => {
  useEffect(() => {
    // const handleMouseMove = (event: MouseEvent) => {
    //   const sensitivity = 0.002;
    //   mouseMovement.current.x = -(event.movementX || 0) * sensitivity;
    //   mouseMovement.current.y = (event.movementY || 0) * sensitivity;
    // };

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
          keys.current.up = true;
          break;
        case "KeyS":
          keys.current.down = true;
          break;
        case "KeyA":
          keys.current.rollLeft = true;
          keys.current.spinLeft = true;
          break;
        case "KeyD":
          keys.current.rollRight = true;
          keys.current.spinRight = true;
          break;
        case "KeyQ":
          keys.current.spinLeft = true;
          break;
        case "KeyE":
          keys.current.spinRight = true;
          break;
        case "Space":
          event.preventDefault();
          keys.current.fire = true;
          break;
        case "ShiftLeft":
          keys.current.forward = true;
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
          keys.current.up = false;
          break;
        case "KeyS":
          keys.current.down = false;
          break;
        case "KeyA":
          keys.current.rollLeft = false;
          keys.current.spinLeft = false;
          break;
        case "KeyD":
          keys.current.rollRight = false;
          keys.current.spinRight = false;
          break;
        case "KeyQ":
          keys.current.spinLeft = false;
          break;
        case "KeyE":
          keys.current.spinRight = false;
          break;
        case "Space":
          event.preventDefault();
          keys.current.fire = false;
          break;
        case "ShiftLeft":
          keys.current.forward = false;
          break;
      }
    };

    console.info("%cMouse and keyboard listeners added", "color: #0fc");
    // window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      // window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keys, mouseMovement]);
};
