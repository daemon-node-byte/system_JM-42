import { Canvas } from '@react-three/fiber'
import './App.css'

function App() {

  return (
    <>
      <div className='canvas-container'>
        <Canvas>
          <mesh>
            <boxGeometry args={[2,2,2]} />
            <meshStandardMaterial color='orange' />
          </mesh>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 0, 0]} intensity={1} color={'blue'}/>
        </Canvas>
      </div>
    </>
  )
}

export default App
