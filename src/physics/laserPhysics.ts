import { Vector3, Euler, Vector2 } from "three";
import type {
  Laser,
  LaserConfig,
  KeyState
} from "../components/SpaceShip/types";
import type { RefObject } from "react";

interface UpdateLasersParams {
  lasers: RefObject<Laser[]>;
  delta: number;
  config: LaserConfig;
}

export const updateLasers = ({ lasers, delta }: UpdateLasersParams) => {
  // Update existing lasers
  if (!lasers.current) return;

  lasers.current = lasers.current.filter((laser) => {
    // Move laser forward
    const movement = laser.direction
      .clone()
      .multiplyScalar(laser.speed * delta);
    laser.position.add(movement);

    // Update lifetime
    laser.lifeTime -= delta;

    // Remove expired lasers
    return laser.lifeTime > 0;
  });
};

interface FireLaserParams {
  lasers: RefObject<Laser[]>;
  lastFireTime: RefObject<number>;
  shipPosition: RefObject<Vector3>;
  shipRotation: RefObject<Euler>;
  keys: RefObject<KeyState>;
  config: LaserConfig;
  currentTime: number;
  aimOffset?: Vector2;
}

export const fireLaser = ({
  lasers,
  lastFireTime,
  shipPosition,
  shipRotation,
  keys,
  config,
  currentTime,
  aimOffset
}: FireLaserParams) => {
  // Check if all refs exist
  if (
    !lasers.current ||
    lastFireTime.current === undefined ||
    !shipPosition.current ||
    !shipRotation.current ||
    !keys.current
  ) {
    console.warn("%cFireLaser: Missing refs", "color: #ff8800");
    return;
  }

  // Check if fire key is pressed and enough time has passed
  const timeSinceLastFire = currentTime - lastFireTime.current;
  const fireInterval = 1000 / config.fireRate; // Convert to milliseconds

  if (keys.current.fire && timeSinceLastFire >= fireInterval) {
    // Calculate laser spawn position (slightly in front of ship)
    const laserOffset = new Vector3(0, 0, 1.5);
    laserOffset.applyEuler(shipRotation.current);
    const laserPosition = shipPosition.current.clone().add(laserOffset);

    // Calculate laser direction (forward from ship)
    const laserDirection = new Vector3(0, 0, 1);
    laserDirection.applyEuler(shipRotation.current);

    // Apply aiming offset if present
    if (aimOffset) {
      // Create aiming adjustment based on aim offset
      const aimAdjustment = new Vector3(
        -aimOffset.x * 0.001, // Horizontal aiming
        -aimOffset.y * 0.001, // Vertical aiming (inverted)
        0
      );

      // Apply ship rotation to aim adjustment
      aimAdjustment.applyEuler(shipRotation.current);
      laserDirection.add(aimAdjustment);
    }
    laserDirection.normalize();

    // Create new laser
    const newLaser: Laser = {
      id: `laser_${Date.now()}_${Math.random()}`,
      position: laserPosition,
      direction: laserDirection,
      speed: config.speed,
      lifeTime: config.lifeTime,
      maxLifeTime: config.lifeTime
    };

    lasers.current.push(newLaser);
    lastFireTime.current = currentTime;

    console.log(
      "%cLaser fired!",
      "color: #ff0040",
      `Total lasers: ${lasers.current.length}`,
      `Position: (${laserPosition.x.toFixed(2)}, ${laserPosition.y.toFixed(
        2
      )}, ${laserPosition.z.toFixed(2)})`,
      `Direction: (${laserDirection.x.toFixed(2)}, ${laserDirection.y.toFixed(
        2
      )}, ${laserDirection.z.toFixed(2)})`
    );
  }
};
