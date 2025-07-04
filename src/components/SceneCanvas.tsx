import { Canvas } from "@react-three/fiber";

import PhysicsProvider from "./PhysicsProvider";

import { CANVAS_SETTINGS } from "@/constants";
import { useKeyboardEvents } from "@/hooks";
import { ShipLoader } from "./PlayerShip";
import Lighting from "./Lighting";
import DebugGizmo from "./DebugGizmo";
import DebuggerRuler from "./DebuggerRuler";

// *ANCHOR - Main Scene Canvas Component (root level before app.tsx)
function SceneCanvas() {
  useKeyboardEvents();
  const { camera, gl } = CANVAS_SETTINGS;
  return (
    <Canvas camera={camera} gl={gl}>
      <DebugGizmo />
      <DebuggerRuler />
      <Lighting />
      <PhysicsProvider>
        <ShipLoader />
        {/* Add your 3D scene components here */}
      </PhysicsProvider>
    </Canvas>
  );
}

export default SceneCanvas;
