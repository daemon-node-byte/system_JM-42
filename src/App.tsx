import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import "./App.css";
import SpaceShip from "./components/SpaceShip";

function App() {
  return (
    <>
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 2, -5], fov: 75 }}>
          {/* <ambientLight intensity={0.5} /> */}
          <directionalLight position={[10, 10, 5]} intensity={6} />

          <Stars />

          <SpaceShip url="models/space_fighter/scene.gltf" />

          <mesh position={[5, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="orange" />
          </mesh>
          <pointLight position={[0, 0, 0]} intensity={1} />
        </Canvas>
      </div>
    </>
  );
}

export default App;
