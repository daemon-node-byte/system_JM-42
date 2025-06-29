import { Vector3, Euler, Camera } from "three";
import type { MutableRefObject } from "react";

interface UpdateCameraParams {
  camera: Camera;
  shipPosition: MutableRefObject<Vector3>;
  currentRotation: MutableRefObject<Euler>;
}

export const updateCamera = ({
  camera,
  shipPosition,
  currentRotation
}: UpdateCameraParams) => {
  // Update camera to follow ship
  const cameraOffset = new Vector3(0, 2, -8);
  cameraOffset.applyEuler(currentRotation.current);

  const targetCameraPosition = new Vector3()
    .copy(shipPosition.current)
    .add(cameraOffset);

  // Smooth camera following
  camera.position.lerp(targetCameraPosition, 0.1);

  // Make camera look at ship
  const lookAtTarget = new Vector3().copy(shipPosition.current);
  lookAtTarget.y += 0.5; // Look slightly above the ship
  camera.lookAt(lookAtTarget);
};
