import { useStore } from "@/store";

export function useControlsRaw() {
  const {
    thrustForward,
    reverseThrust,
    left,
    right,
    up,
    down,
    pitchUp,
    pitchDown,
    turnLeft,
    turnRight,
    rightRoll,
    leftRoll
  } = useStore((state) => state);

  return {
    thrustForward,
    reverseThrust,
    left,
    right,
    up,
    down,
    pitchUp,
    pitchDown,
    yawLeft: turnLeft,
    yawRight: turnRight,
    rightRoll,
    leftRoll
  };
}
