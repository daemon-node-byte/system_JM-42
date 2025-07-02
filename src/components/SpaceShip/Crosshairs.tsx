import { useState, useEffect } from "react";
import "@/style/Crosshairs.css";

interface CrosshairsProps {
  aimPosition: { x: number; y: number };
  isAiming: boolean;
}

const Crosshairs = ({ aimPosition, isAiming }: CrosshairsProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Debug logging
  console.log("%cCrosshairs props:", "color: #ff8800", {
    isAiming,
    aimPosition
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({
        x: event.clientX,
        y: event.clientY
      });
    };

    if (isAiming) {
      document.addEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "none"; // Hide default cursor
    } else {
      document.body.style.cursor = "auto";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "auto";
    };
  }, [isAiming]);

  if (!isAiming) return null;

  return (
    <div className="crosshairs-container">
      <div
        className="crosshairs"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: "translate(-50%, -50%)"
        }}
      >
        <div className="crosshair-line horizontal" />
        <div className="crosshair-line vertical" />
        <div className="crosshair-center" />
        <div className="crosshair-ring" />
      </div>
    </div>
  );
};

export default Crosshairs;
