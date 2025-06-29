import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import "./App.css";
import SpaceShip from "./components/SpaceShip";

function App() {
  return (
    <>
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 2, -5], fov: 75, near: 0.1, far: 10000 }}
        >
          {/* <ambientLight intensity={0.5} /> */}
          <directionalLight position={[10, 10, 5]} intensity={6} />

          <Stars depth={5000} factor={128} speed={0} />

          <SpaceShip url="models/space_fighter/scene.gltf" />
          <group scale={[100, 100, 100]} position={[-500, -500, 1000]}>
            <mesh>
              <sphereGeometry args={[5, 32, 32]} />
              <meshStandardMaterial color="orange" />
            </mesh>
          </group>
          <pointLight position={[0, 0, 0]} intensity={1} />
        </Canvas>
      </div>
    </>
  );
}

export default App;
