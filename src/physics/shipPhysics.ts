import { Vector3, Euler, Vector2 } from "three";
import type { KeyState, MouseMovement, MovementConfig } from "@/types";
import type { RefObject } from "react";

interface UpdateRotationParams {
  mouseMovement: RefObject<MouseMovement>;
  targetRotation: RefObject<Euler>;
  currentRotation: RefObject<Euler>;
  keys: RefObject<KeyState>;
  config: MovementConfig;
  delta: number;
  aimTilt?: Vector2;
}

export const updateShipRotation = ({
  mouseMovement,
  targetRotation,
  currentRotation,
  keys,
  config,
  delta,
  aimTilt
}: UpdateRotationParams) => {
  const {
    tiltAmount,
    dampingFactor,
    bankingReturnSpeed,
    rollSpeed,
    spinSpeed,
    maxRollAngle
  } = config;

  // Update ship rotation based on mouse movement
  targetRotation.current.x += mouseMovement.current.y * tiltAmount;
  targetRotation.current.y += mouseMovement.current.x * tiltAmount;

  // Add aiming tilt if present
  if (aimTilt) {
    targetRotation.current.x += aimTilt.y * 0.3; // Pitch based on vertical aim
    targetRotation.current.y += aimTilt.x * 0.3; // Yaw based on horizontal aim

    // Add slight roll based on horizontal aiming for more natural feel
    targetRotation.current.z += aimTilt.x * 0.2;
  }

  // Add manual roll control (A/D keys)
  if (keys.current.rollLeft) {
    targetRotation.current.z -= rollSpeed * delta;
  }
  if (keys.current.rollRight) {
    targetRotation.current.z += rollSpeed * delta;
  }

  // Clamp roll angle to prevent over-rotation
  targetRotation.current.z = Math.max(
    -maxRollAngle,
    Math.min(maxRollAngle, targetRotation.current.z)
  );

  // Add spin control (Q/E keys)
  if (keys.current.spinLeft) {
    targetRotation.current.y += spinSpeed * delta;
  }
  if (keys.current.spinRight) {
    targetRotation.current.y -= spinSpeed * delta;
  }

  // Calculate banking based on turning (only if not manually rolling)
  if (!keys.current.rollLeft && !keys.current.rollRight) {
    const turningSpeed = mouseMovement.current.x;
    const targetBankAngle = -turningSpeed * tiltAmount * 5;
    // Also clamp automatic banking
    const clampedBankAngle = Math.max(
      -maxRollAngle,
      Math.min(maxRollAngle, targetBankAngle)
    );
    targetRotation.current.z = clampedBankAngle;
  }

  // Smooth interpolation to target rotation
  currentRotation.current.x +=
    (targetRotation.current.x - currentRotation.current.x) * dampingFactor;
  currentRotation.current.y +=
    (targetRotation.current.y - currentRotation.current.y) * dampingFactor;

  const bankingDamping =
    Math.abs(mouseMovement.current.x) > 0.01
      ? dampingFactor
      : bankingReturnSpeed;
  currentRotation.current.z +=
    (targetRotation.current.z - currentRotation.current.z) * bankingDamping;
};

interface UpdateMovementParams {
  keys: RefObject<KeyState>;
  currentRotation: RefObject<Euler>;
  velocity: RefObject<Vector3>;
  shipPosition: RefObject<Vector3>;
  config: MovementConfig;
  delta: number;
}

export const updateShipMovement = ({
  keys,
  currentRotation,
  velocity,
  shipPosition,
  config,
  delta
}: UpdateMovementParams) => {
  const { speed } = config;

  // Calculate movement vectors based on ship's rotation
  const forward = new Vector3(0, 0, -1);
  forward.applyEuler(currentRotation.current);

  // Calculate horizontal-only right vector to prevent elevation changes during strafing
  const horizontalRight = new Vector3(1, 0, 0);
  const horizontalRotation = new Euler(0, currentRotation.current.y, 0);
  horizontalRight.applyEuler(horizontalRotation);

  const up = new Vector3(0, 1, 0);

  // Reset velocity
  velocity.current.set(0, 0, 0);

  // Apply movement based on keys
  if (keys.current.forward)
    velocity.current.add(forward.clone().multiplyScalar(-speed));
  if (keys.current.backward)
    velocity.current.add(forward.clone().multiplyScalar(speed));
  if (keys.current.up) velocity.current.add(up.clone().multiplyScalar(speed));
  if (keys.current.down)
    velocity.current.add(up.clone().multiplyScalar(-speed));

  if (keys.current.rollLeft) {
    velocity.current.add(horizontalRight.clone().multiplyScalar(speed * 0.5));
  }
  if (keys.current.rollRight) {
    velocity.current.add(horizontalRight.clone().multiplyScalar(-speed * 0.5));
  }

  // Update ship position
  shipPosition.current.add(velocity.current.clone().multiplyScalar(delta));
};
