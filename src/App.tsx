import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import "./App.css";
import PlanetOne from "./components/Planets/PlanetOne";
import SpaceShip from "./components/SpaceShip";
// import Crosshairs from "./components/SpaceShip/Crosshairs";
import { StoreTestComponent } from "./components/StoreTestComponent";
import { useStore } from "./store";

function App() {
  // Get aiming state directly from store instead of local state
  const { isAiming, fps, isPaused } = useStore();

  return (
    <>
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 10, 22], fov: 75, near: 0.1, far: 1e19 }}
          gl={{ logarithmicDepthBuffer: true }}
        >
          <directionalLight position={[10, 10, 10]} intensity={6} />
          <Stars depth={10000000} factor={128} speed={0} />
          <SpaceShip url={"models/space_fighter_2/scene.gltf"} />
          <PlanetOne />
          <pointLight position={[0, 0, 0]} intensity={6} />
        </Canvas>
      </div>

      {/* Crosshairs overlay */}
      {/* <Crosshairs aimPosition={aimPosition} isAiming={isAiming} /> */}

      {/* Performance and game state overlay */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          color: "white",
          fontFamily: "monospace",
          background: "rgba(0,0,0,0.5)",
          padding: "10px",
          borderRadius: "5px"
        }}
      >
        <div>FPS: {fps}</div>
        {isPaused && <div style={{ color: "yellow" }}>PAUSED</div>}
        {isAiming && <div style={{ color: "cyan" }}>AIMING</div>}
      </div>

      {/* Store Test Component - Remove in production */}
      <StoreTestComponent />
    </>
  );
}

export default App;
