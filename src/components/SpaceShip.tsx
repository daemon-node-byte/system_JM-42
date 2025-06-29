import { useRef, Suspense, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group, Vector3, Euler } from "three";

const ShipModel = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  const shipRef = useRef<Group>(null);
  const { camera } = useThree();
  const mouseMovement = useRef({ x: 0, y: 0 });
  const targetRotation = useRef(new Euler(0, 0, 0));
  const currentRotation = useRef(new Euler(0, 0, 0));
  const velocity = useRef(new Vector3(0, 0, 0));
  const shipPosition = useRef(new Vector3(0, 0, 0));
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
    rollLeft: false,
    rollRight: false,
    spinLeft: false,
    spinRight: false
  });

  // Debug: Log when model loads
  console.log("%cShip model loaded:", "color: #0fc", scene);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const sensitivity = 0.002;
      mouseMovement.current.x = -(event.movementX || 0) * sensitivity;
      mouseMovement.current.y = (event.movementY || 0) * sensitivity;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
          keys.current.forward = true;
          break;
        case "KeyS":
          keys.current.backward = true;
          break;
        case "KeyA":
          keys.current.rollLeft = true;
          break;
        case "KeyD":
          keys.current.rollRight = true;
          break;
        case "KeyQ":
          keys.current.spinLeft = true;
          break;
        case "KeyE":
          keys.current.spinRight = true;
          break;
        case "Space":
          event.preventDefault();
          keys.current.up = true;
          break;
        case "ShiftLeft":
          keys.current.down = true;
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
          keys.current.forward = false;
          break;
        case "KeyS":
          keys.current.backward = false;
          break;
        case "KeyA":
          keys.current.rollLeft = false;
          break;
        case "KeyD":
          keys.current.rollRight = false;
          break;
        case "KeyQ":
          keys.current.spinLeft = false;
          break;
        case "KeyE":
          keys.current.spinRight = false;
          break;
        case "Space":
          event.preventDefault();
          keys.current.up = false;
          break;
        case "ShiftLeft":
          keys.current.down = false;
          break;
      }
    };

    console.info("%cMouse and keyboard listeners added", "color: #0fc");
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (shipRef.current) {
      const tiltAmount = 0.3;
      const dampingFactor = 0.08;
      const bankingReturnSpeed = 0.05;
      const speed = 8;
      const rollSpeed = 2.0;
      const spinSpeed = 1.5;
      const maxRollAngle = Math.PI / 4;

      // Update ship rotation based on mouse movement
      targetRotation.current.x += mouseMovement.current.y * tiltAmount;
      targetRotation.current.y += mouseMovement.current.x * tiltAmount;

      // Add manual roll control (A/D keys)
      if (keys.current.rollLeft) {
        targetRotation.current.z -= rollSpeed * delta;
      }
      if (keys.current.rollRight) {
        targetRotation.current.z += rollSpeed * delta;
      }

      // Clamp roll angle to prevent over-rotation
      targetRotation.current.z = Math.max(
        -maxRollAngle,
        Math.min(maxRollAngle, targetRotation.current.z)
      );

      // Add spin control (Q/E keys)
      if (keys.current.spinLeft) {
        targetRotation.current.y += spinSpeed * delta;
      }
      if (keys.current.spinRight) {
        targetRotation.current.y -= spinSpeed * delta;
      }

      // Calculate banking based on turning (only if not manually rolling)
      if (!keys.current.rollLeft && !keys.current.rollRight) {
        const turningSpeed = mouseMovement.current.x;
        const targetBankAngle = -turningSpeed * tiltAmount * 5;
        // Also clamp automatic banking
        const clampedBankAngle = Math.max(
          -maxRollAngle,
          Math.min(maxRollAngle, targetBankAngle)
        );
        targetRotation.current.z = clampedBankAngle;
      }

      // Smooth interpolation to target rotation
      currentRotation.current.x +=
        (targetRotation.current.x - currentRotation.current.x) * dampingFactor;
      currentRotation.current.y +=
        (targetRotation.current.y - currentRotation.current.y) * dampingFactor;

      const bankingDamping =
        Math.abs(mouseMovement.current.x) > 0.01
          ? dampingFactor
          : bankingReturnSpeed;
      currentRotation.current.z +=
        (targetRotation.current.z - currentRotation.current.z) * bankingDamping;

      shipRef.current.rotation.copy(currentRotation.current);

      // Calculate movement vectors based on ship's rotation
      const forward = new Vector3(0, 0, -1);
      forward.applyEuler(currentRotation.current);

      // Calculate horizontal-only right vector to prevent elevation changes during strafing
      const horizontalRight = new Vector3(1, 0, 0);
      const horizontalRotation = new Euler(0, currentRotation.current.y, 0);
      horizontalRight.applyEuler(horizontalRotation);

      const up = new Vector3(0, 1, 0);

      // Reset velocity
      velocity.current.set(0, 0, 0);

      // Apply movement based on keys
      if (keys.current.forward)
        velocity.current.add(forward.clone().multiplyScalar(-speed));
      if (keys.current.backward)
        velocity.current.add(forward.clone().multiplyScalar(speed));
      if (keys.current.up)
        velocity.current.add(up.clone().multiplyScalar(speed));
      if (keys.current.down)
        velocity.current.add(up.clone().multiplyScalar(-speed));

      if (keys.current.rollLeft) {
        velocity.current.add(
          horizontalRight.clone().multiplyScalar(speed * 0.5)
        );
      }
      if (keys.current.rollRight) {
        velocity.current.add(
          horizontalRight.clone().multiplyScalar(-speed * 0.5)
        );
      }

      // Update ship position
      shipPosition.current.add(velocity.current.clone().multiplyScalar(delta));
      shipRef.current.position.copy(shipPosition.current);

      // Update camera to follow ship
      const cameraOffset = new Vector3(0, 2, -8);
      cameraOffset.applyEuler(currentRotation.current);

      const targetCameraPosition = new Vector3()
        .copy(shipPosition.current)
        .add(cameraOffset);

      // Smooth camera following
      camera.position.lerp(targetCameraPosition, 0.1);

      // Make camera look at ship
      const lookAtTarget = new Vector3().copy(shipPosition.current);
      lookAtTarget.y += 0.5; // Look slightly above the ship
      camera.lookAt(lookAtTarget);

      // Add subtle floating animation
      shipRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.035;

      // Gradually reduce mouse movement influence
      mouseMovement.current.x *= 0.95;
      mouseMovement.current.y *= 0.95;
    }
  });

  return (
    <group ref={shipRef}>
      <primitive scale={[0.12, 0.12, 0.12]} object={scene} />
    </group>
  );
};

function FallbackLoader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
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
