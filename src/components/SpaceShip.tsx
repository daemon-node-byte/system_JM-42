import { useRef, Suspense, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group, Vector3 } from "three";
// import JetEngineEffect from "./JetEngineEffect";
import EngineTrail from "./EngineTrail";
// import EngineFireEffect from "./EngineFireEffect"; // Import the engine fire effect component
// import AdvancedEngineEffect, { SimpleEngineGlow } from "./AdvanceEngineEffect";



const ShipModel = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  const shipRef = useRef<Group>(null);
  const { camera } = useThree();
    const [isThrusting, setIsThrusting] = useState(true);
  const [thrustIntensity, setThrustIntensity] = useState(1.0);
  
// Debug: Log when model loads
  console.log("Ship model loaded:", scene);

  useFrame((state) => {
    if (shipRef.current) {
      // Position ship relative to camera
      const offset = new Vector3(0, -0.5, -5);
      offset.applyQuaternion(camera.quaternion);
      shipRef.current.position.copy(camera.position).add(offset);
      
      // Make ship follow camera rotation
      shipRef.current.rotation.copy(camera.rotation);
      shipRef.current.rotateY(Math.PI); // Face forward
      
      // Add subtle floating animation
      shipRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.01;

      // Dynamic thrust intensity
      setThrustIntensity(0.5 + Math.sin(state.clock.elapsedTime * 5) * 0.3);
    }
  });

  return (
    <group ref={shipRef}>
      <primitive scale={[0.12, 0.12, 0.12]} object={scene} />
      <EngineTrail 
      position={[0, -0.1, -0.5]} 
      intensity={thrustIntensity} 
      isActive={isThrusting}
      maxParticles={60}
      />
    </group>
  );
};

function FallbackLoader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='blue' />
    </mesh>
  );
}

function SpaceShip({ url }: { url: string }) {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <ShipModel url={url} />
    </Suspense>
  );
}

export default SpaceShip;

export const SpaceshipFlyControls = () => {
  const { camera } = useThree();
  const velocity = useRef(new Vector3());
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false
  });

  useFrame((state, delta) => {
    const speed = 10;
    const direction = new Vector3();
    
    // Get camera direction
    camera.getWorldDirection(direction);
    const right = new Vector3().crossVectors(direction, camera.up).normalize();
    
    // Reset velocity
    velocity.current.set(0, 0, 0);
    
    // Apply movement based on keys
    if (keys.forward) velocity.current.add(direction.clone().multiplyScalar(speed));
    if (keys.backward) velocity.current.add(direction.clone().multiplyScalar(-speed));
    if (keys.left) velocity.current.add(right.clone().multiplyScalar(-speed));
    if (keys.right) velocity.current.add(right.clone().multiplyScalar(speed));
    if (keys.up) velocity.current.y += speed;
    if (keys.down) velocity.current.y -= speed;
    
    // Apply velocity to camera
    camera.position.add(velocity.current.clone().multiplyScalar(delta));
  });

  // Proper keyboard event listeners with useEffect
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW': setKeys(k => ({ ...k, forward: true })); break;
        case 'KeyS': setKeys(k => ({ ...k, backward: true })); break;
        case 'KeyA': setKeys(k => ({ ...k, left: true })); break;
        case 'KeyD': setKeys(k => ({ ...k, right: true })); break;
        case 'Space': 
          event.preventDefault();
          setKeys(k => ({ ...k, up: true })); 
          break;
        case 'ShiftLeft': setKeys(k => ({ ...k, down: true })); break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW': setKeys(k => ({ ...k, forward: false })); break;
        case 'KeyS': setKeys(k => ({ ...k, backward: false })); break;
        case 'KeyA': setKeys(k => ({ ...k, left: false })); break;
        case 'KeyD': setKeys(k => ({ ...k, right: false })); break;
        case 'Space': 
          event.preventDefault();
          setKeys(k => ({ ...k, up: false })); 
          break;
        case 'ShiftLeft': setKeys(k => ({ ...k, down: false })); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return null;
};