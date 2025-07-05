import { useStore } from "@/store";
import { Vector3 } from "three";

export function useControls() {
  const {
    thrustForward,
    reverseThrust,
    left,
    right,
    up,
    down,
    turnLeft,
    turnRight
  } = useStore((state) => state);

  const move = new Vector3(
    (left ? -1 : 0) + (right ? 1 : 0),
    (up ? 1 : 0) + (down ? -1 : 0),
    (thrustForward ? -1 : 0) + (reverseThrust ? 1 : 0)
  )
    .normalize()
    .multiplyScalar(0.5);

  const rotate = new Vector3(0, turnLeft ? 0.05 : turnRight ? -0.05 : 0, 0);

  return { move, rotate };
}
