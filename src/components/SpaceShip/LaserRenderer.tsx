import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import type { Laser } from "@/types";
import type { RefObject } from "react";

interface LaserRendererProps {
  lasers: RefObject<Laser[]>;
}

const LaserRenderer = ({ lasers }: LaserRendererProps) => {
  const [, setTick] = useState(0);
  useFrame(() => {
    setTick((tick) => tick + 1);
  });

  // Debug: Log laser count
  if (lasers.current?.length) {
    console.log(
      "%cLasers in renderer:",
      "color: #ff0040",
      `Count: ${lasers.current.length}`,
      lasers.current.map(
        (l, i) =>
          `Laser ${i}: pos(${l.position.x.toFixed(1)}, ${l.position.y.toFixed(
            1
          )}, ${l.position.z.toFixed(1)}) life:${l.lifeTime.toFixed(1)}`
      )
    );
  }

  // Render each laser as a individual mesh
  return (
    <group>
      {lasers.current?.map((laser, index) => (
        <LaserBeam key={laser.id} laser={laser} index={index} />
      ))}
    </group>
  );
};

interface LaserBeamProps {
  laser: Laser;
  index: number;
}

const LaserBeam = ({ laser }: LaserBeamProps) => {
  const intensity = Math.max(0.1, laser.lifeTime / laser.maxLifeTime);

  return (
    <mesh position={[laser.position.x, laser.position.y, laser.position.z]}>
      {/* <boxGeometry args={[0.1, 0.1, laserLength]} /> */}
      <sphereGeometry args={[0.2, 8, 4]} />
      <meshBasicMaterial
        color={`hsl(${350}, 100%, ${60 + intensity * 40}%)`}
        transparent
        opacity={0.9 * intensity}
      />
    </mesh>
  );
};

export default LaserRenderer;
