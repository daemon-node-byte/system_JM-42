import type { MouseMovement } from "@/types";
import type { RefObject } from "react";

export const reduceMouseMovement = (
  mouseMovement: RefObject<MouseMovement>
) => {
  mouseMovement.current.x *= 0.95;
  mouseMovement.current.y *= 0.95;
};
