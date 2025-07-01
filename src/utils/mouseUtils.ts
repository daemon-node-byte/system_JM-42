import type { MouseMovement } from "../components/SpaceShip/types";
import type { MutableRefObject } from "react";

export const reduceMouseMovement = (
  mouseMovement: MutableRefObject<MouseMovement>
) => {
  mouseMovement.current.x *= 0.95;
  mouseMovement.current.y *= 0.95;
};
