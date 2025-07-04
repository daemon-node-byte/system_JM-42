import type { CameraProps, GLProps } from "@react-three/fiber";

export interface CanvasSettings {
  camera: CameraProps;
  gl: GLProps;
}

type Coordinates = { x: number; y: number; z: number };

export type OffsetInterface = {
  position: Coordinates;
  rotation: Coordinates;
  followCamera: Coordinates;
};

export interface ShipDetails {
  name: string;
  label: string;
  id: string;
  modelUrl: string;
  scale: number;
  offset: OffsetInterface;
}
