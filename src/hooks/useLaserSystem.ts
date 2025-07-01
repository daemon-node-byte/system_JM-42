import { useRef } from "react";
import type { Laser, LaserSystemState } from "../components/SpaceShip/types";

export const useLaserSystem = (): LaserSystemState => {
  const lasers = useRef<Laser[]>([]);
  const lastFireTime = useRef<number>(0);

  return {
    lasers,
    lastFireTime,
    fireKey: false // This will be updated by input controls
  };
};
