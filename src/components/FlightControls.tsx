import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

const FlightControls = () => {
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

  useFrame((_state, delta) => {
    const speed = 10;
    const direction = new Vector3();

    // Get camera direction
    camera.getWorldDirection(direction);
    const right = new Vector3().crossVectors(direction, camera.up).normalize();

    // Reset velocity
    velocity.current.set(0, 0, 0);

    // Apply movement based on keys
    if (keys.forward)
      velocity.current.add(direction.clone().multiplyScalar(speed));
    if (keys.backward)
      velocity.current.add(direction.clone().multiplyScalar(-speed));
    if (keys.left)
      velocity.current.add(right.clone().multiplyScalar(speed / 2));
    if (keys.right)
      velocity.current.add(right.clone().multiplyScalar(-speed / 2));
    if (keys.up) velocity.current.y += speed;
    if (keys.down) velocity.current.y -= speed;

    // Apply velocity to camera
    camera.position.add(velocity.current.clone().multiplyScalar(delta));
  });

  // Proper keyboard event listeners with useEffect
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
          setKeys((k) => ({ ...k, forward: true }));
          break;
        case "KeyS":
          setKeys((k) => ({ ...k, backward: true }));
          break;
        case "KeyA":
          setKeys((k) => ({ ...k, left: true }));
          break;
        case "KeyD":
          setKeys((k) => ({ ...k, right: true }));
          break;
        case "Space":
          event.preventDefault();
          setKeys((k) => ({ ...k, up: true }));
          break;
        case "ShiftLeft":
          setKeys((k) => ({ ...k, down: true }));
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
          setKeys((k) => ({ ...k, forward: false }));
          break;
        case "KeyS":
          setKeys((k) => ({ ...k, backward: false }));
          break;
        case "KeyA":
          setKeys((k) => ({ ...k, left: false }));
          break;
        case "KeyD":
          setKeys((k) => ({ ...k, right: false }));
          break;
        case "Space":
          event.preventDefault();
          setKeys((k) => ({ ...k, up: false }));
          break;
        case "ShiftLeft":
          setKeys((k) => ({ ...k, down: false }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return null;
};
export default FlightControls;
