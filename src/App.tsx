import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import "./App.css";
// import { useTexture } from "@react-three/drei";
import PlanetOne from "./components/Planets/PlanetOne";
import SpaceShip from "./components/SpaceShip";

function App() {
  // const colorMap = useTexture(
  //   "/materials/Lucid_Realism_A_highly_stylized_seamless_and_square_depiction__0.jpg"
  // );
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
          {/* <group scale={[100, 100, 100]} position={[-500, -500, 1000]}>
            <mesh>
              <sphereGeometry args={[5, 32, 32]} />
              <meshStandardMaterial color={"#8234ff"} />
            </mesh>
          </group> */}
          <PlanetOne />
          <pointLight position={[0, 0, 0]} intensity={1} />
        </Canvas>
      </div>
    </>
  );
}

export default App;
