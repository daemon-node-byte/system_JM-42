import { useEffect, useRef, useCallback } from "react";
import { useStore } from "@/store";

interface UseMouseAimingProps {
  maxAimRadius?: number;
  tiltSensitivity?: number;
}

export const useMouseAiming = ({
  maxAimRadius = 200,
  tiltSensitivity = 0.003
}: UseMouseAimingProps = {}) => {
  const centerPos = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0
  });

  const { handleAimingUpdate, keys } = useStore();

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!keys.aimControls) return;

      // Calculate offset from screen center
      const offsetX = event.clientX - centerPos.current.x;
      const offsetY = event.clientY - centerPos.current.y;

      // Calculate distance from center
      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

      // Clamp to maximum radius
      let clampedX = offsetX;
      let clampedY = offsetY;
      if (distance > maxAimRadius) {
        const ratio = maxAimRadius / distance;
        clampedX = offsetX * ratio;
        clampedY = offsetY * ratio;
      }

      // Calculate tilt based on offset
      const tiltX = clampedX * tiltSensitivity;
      const tiltY = clampedY * tiltSensitivity;

      // Update store with new aiming data
      handleAimingUpdate({
        isAiming: keys.aimControls,
        aimPosition: {
          x: centerPos.current.x + clampedX,
          y: centerPos.current.y + clampedY
        },
        aimOffset: {
          x: clampedX,
          y: clampedY
        },
        tiltAmount: Math.sqrt(tiltX * tiltX + tiltY * tiltY)
      });
    },
    [keys.aimControls, maxAimRadius, tiltSensitivity, handleAimingUpdate]
  );

  useEffect(() => {
    function updateCenter() {
      centerPos.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      };
    }
    updateCenter();

    window.addEventListener("resize", updateCenter);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", updateCenter);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  // Update aiming state when aimControls key changes
  useEffect(() => {
    if (!keys.aimControls) {
      handleAimingUpdate({
        isAiming: false,
        aimPosition: { x: centerPos.current.x, y: centerPos.current.y },
        aimOffset: { x: 0, y: 0 },
        tiltAmount: 0
      });
    }
  }, [keys.aimControls, handleAimingUpdate]);
};
