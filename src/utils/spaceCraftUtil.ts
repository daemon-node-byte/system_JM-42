import { SHIP_LIST, DEFAULT_SHIP } from "@/constants";
import { type ShipDetails } from "@/types";

export const getShipInfoById = (id: string) => {
  const ship = SHIP_LIST.find((ship) => ship.id === id);
  return ship ? ship : DEFAULT_SHIP;
};

export const getShipScaleFromDetails = (
  details: ShipDetails | null
): [number, number, number] => {
  if (!details) {
    return [1, 1, 1]; // Default scale if no details are provided
  }
  const { scale } = details;
  return scale ? [scale, scale, scale] : [1, 1, 1];
};
