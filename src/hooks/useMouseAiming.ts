import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store";

interface MouseAimingState {
  aimOffset: { x: number; y: number };
  isAiming: boolean;
  aimPosition: { x: number; y: number };
  tiltAmount: { x: number; y: number };
}

interface UseMouseAimingProps {
  maxAimRadius?: number;
  tiltSensitivity?: number;
}

export const useMouseAiming = ({
  maxAimRadius = 200,
  tiltSensitivity = 0.003
}: UseMouseAimingProps = {}): MouseAimingState => {
  const centerPos = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0
  });
  const { isAiming, aimOffset, aimPosition, tiltAmount } = useStore(
    (state) => state
  );

  useEffect(() => {
    function updateCenter() {
      // Calculate screen center
      centerPos.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      };
    }
    updateCenter();

    window.addEventListener("resize", updateCenter);

    /* *TODO - Offset calculations
      // Calculate offset from screen center
      const offsetX = event.clientX - centerPos.current.x;
      const offsetY = event.clientY - centerPos.current.y;
      // Calculate distance from center
      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

      // TODO: Implement clamping logic
      // * didn't work with crosshairs, needs to be rethought
      // Clamp to maximum radius
      if (distance > maxAimRadius) {
        // const angle = Math.atan2(offsetY, offsetX);
        // const clampedX = Math.cos(angle) * maxAimRadius;
        // const clampedY = Math.sin(angle) * maxAimRadius;
        // aimOffset.current.set(clampedX, clampedY);
      } else {
        // aimOffset.current.set(offsetX, offsetY);
      }
      */

    // Calculate tilt amounts (normalized)
    // const normalizedX = aimOffset.current.x / maxAimRadius;
    // const normalizedY = aimOffset.current.y / maxAimRadius;

    // tiltAmount.current.set(
    //   normalizedX * tiltSensitivity,
    //   -normalizedY * tiltSensitivity // Invert Y for proper tilt direction
    // );

    // setAimPosition({
    //   x: event.clientX,
    //   y: event.clientY
    // });
    // };

    // Add event listeners

    return () => {
      window.removeEventListener("resize", updateCenter);
    };
  }, [maxAimRadius, tiltSensitivity]);
};
