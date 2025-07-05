import { Canvas } from "@react-three/fiber";

import PhysicsProvider from "./PhysicsProvider";

import { CANVAS_SETTINGS } from "@/constants";
import { useKeyboardEvents } from "@/hooks";
import { ShipLoader } from "../Entities/PlayerShip";
import Lighting from "./Lighting";
import Asteroids from "../Entities/Asteriods";
import DebugGizmo from "../DebugGizmo";
import DebuggerRuler from "../DebuggerRuler";

// *ANCHOR - Main Scene Canvas Component (root level before app.tsx)
function SceneCanvas() {
  useKeyboardEvents();
  const { camera, gl } = CANVAS_SETTINGS;
  return (
    <Canvas shadows camera={camera} gl={gl}>
      <DebugGizmo />
      <DebuggerRuler />
      <Lighting />
      <PhysicsProvider>
        <ShipLoader />
        <Asteroids />a{/* Add your 3D scene components here */}
      </PhysicsProvider>
    </Canvas>
  );
}

export default SceneCanvas;
