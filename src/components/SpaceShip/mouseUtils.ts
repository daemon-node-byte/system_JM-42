import type { MouseMovement } from "./types";
import type { MutableRefObject } from "react";

export const reduceMouseMovement = (
  mouseMovement: MutableRefObject<MouseMovement>
) => {
  mouseMovement.current.x *= 0.95;
  mouseMovement.current.y *= 0.95;
};
