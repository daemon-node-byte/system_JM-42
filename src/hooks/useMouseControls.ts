import { useCallback, useEffect } from "react";

export const useMouseControls = () => {
  const handleMouseMovement = useCallback((event: MouseEvent) => {
    // Handle mouse movement events
    console.log(
      "%cMouse moved:",
      "color: #f0f",
      `x: ${event.clientX}, y: ${event.clientY}`
    );
  }, []);

  const handleMouseClick = useCallback((event: MouseEvent) => {
    // Handle mouse click events
    console.log("%cMouse clicked:", "color: #f0f", event.button);
  }, []);

  const handleMouseRelease = useCallback((event: MouseEvent) => {
    // Handle mouse up events
    console.log("%cMouse button released:", "color: #f0f", event.button);
  }, []);

  const handleMouseScroll = useCallback((event: WheelEvent) => {
    // Handle mouse scroll events
    console.log("%cMouse scrolled:", "color: #f0f", event.deltaY);
  }, []);

  const handleMouseDrag = useCallback((event: MouseEvent) => {
    // Handle mouse drag events
    console.log(
      "Mouse dragged:",
      "color: #f0f",
      event.movementX,
      event.movementY
    );
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMovement);
    window.addEventListener("mousedown", handleMouseClick);
    window.addEventListener("mouseup", handleMouseRelease);
    window.addEventListener("wheel", handleMouseScroll);
    window.addEventListener("drag", handleMouseDrag);
    return () => {
      window.removeEventListener("mousemove", handleMouseMovement);
      window.removeEventListener("mousedown", handleMouseClick);
      window.removeEventListener("mouseup", handleMouseRelease);
      window.removeEventListener("wheel", handleMouseScroll);
      window.removeEventListener("drag", handleMouseDrag);
    };
  }, [
    handleMouseMovement,
    handleMouseClick,
    handleMouseRelease,
    handleMouseScroll,
    handleMouseDrag
  ]);
};
