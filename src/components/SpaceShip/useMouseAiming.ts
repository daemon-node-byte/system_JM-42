import { useEffect, useRef, useState } from "react";
import { Vector2 } from "three";
// import type { RefObject } from "react";

interface MouseAimingState {
  aimOffset: Vector2;
  isAiming: boolean;
  aimPosition: { x: number; y: number };
  tiltAmount: Vector2;
}

interface UseMouseAimingProps {
  maxAimRadius?: number;
  tiltSensitivity?: number;
}

export const useMouseAiming = ({
  maxAimRadius = 200,
  tiltSensitivity = 0.003
}: UseMouseAimingProps = {}): MouseAimingState => {
  const [isAiming, setIsAiming] = useState(false);
  const [aimPosition, setAimPosition] = useState({ x: 0, y: 0 });
  const aimOffset = useRef(new Vector2(0, 0));
  const tiltAmount = useRef(new Vector2(0, 0));
  const centerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Calculate screen center
    const updateCenter = () => {
      centerPos.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      };
    };

    updateCenter();
    window.addEventListener("resize", updateCenter);

    const handleMouseMove = (event: MouseEvent) => {
      if (!isAiming) return;

      // Calculate offset from screen center
      const offsetX = event.clientX - centerPos.current.x;
      const offsetY = event.clientY - centerPos.current.y;

      // Calculate distance from center
      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

      // Clamp to maximum radius
      if (distance > maxAimRadius) {
        const angle = Math.atan2(offsetY, offsetX);
        const clampedX = Math.cos(angle) * maxAimRadius;
        const clampedY = Math.sin(angle) * maxAimRadius;

        aimOffset.current.set(clampedX, clampedY);
      } else {
        aimOffset.current.set(offsetX, offsetY);
      }

      // Calculate tilt amounts (normalized)
      const normalizedX = aimOffset.current.x / maxAimRadius;
      const normalizedY = aimOffset.current.y / maxAimRadius;

      tiltAmount.current.set(
        normalizedX * tiltSensitivity,
        -normalizedY * tiltSensitivity // Invert Y for proper tilt direction
      );

      setAimPosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "KeyR") {
        // Right mouse button alternative
        setIsAiming(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "KeyR") {
        setIsAiming(false);
        aimOffset.current.set(0, 0);
        tiltAmount.current.set(0, 0);
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 2) {
        // Right mouse button
        event.preventDefault();
        setIsAiming(true);
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (event.button === 2) {
        setIsAiming(false);
        aimOffset.current.set(0, 0);
        tiltAmount.current.set(0, 0);
      }
    };

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("resize", updateCenter);
    };
  }, [isAiming, maxAimRadius, tiltSensitivity]);

  return {
    aimOffset: aimOffset.current,
    isAiming,
    aimPosition,
    tiltAmount: tiltAmount.current
  };
};
