import { Trail } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";

interface DreiTrailEngineProps {
  isEngineActive: boolean;
}

/**
 * Alternative engine trail implementation using Drei's Trail component
 * This provides a simpler, more performant solution but with less customization
 */
export const DreiTrailEngine = ({ isEngineActive }: DreiTrailEngineProps) => {
  const exhaustRef = useRef<Group>(null);

  if (!isEngineActive) return null;

  return (
    <Trail
      width={0.15} // Trail width
      color="cyan" // Engine color
      length={20} // Trail length
      decay={1.5} // How fast the trail fades
      local={false} // Use world positions
      stride={0.01} // Min distance between trail points
      interval={1} // Frames between calculations
      attenuation={(width) => width * 0.8} // Width tapering function
    >
      {/* This invisible mesh represents the exhaust point */}
      <group ref={exhaustRef} position={[0, -0.2, 1.2]}>
        <mesh visible={false}>
          <sphereGeometry args={[0.01, 4, 4]} />
        </mesh>
      </group>
    </Trail>
  );
};
