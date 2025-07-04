import { useMemo, type ReactElement } from "react";
import { Line, Text, Grid } from "@react-three/drei";

type DebugRulerProps = {
  axisLength?: number;
  gridSize?: number;
  gridDivisions?: number;
};

export default function DebugRuler({
  axisLength = 10,
  gridSize = 20,
  gridDivisions = 20
}: DebugRulerProps) {
  // Axis lines
  const axes = useMemo(
    () => [
      // X axis (red)
      {
        points: [
          [-axisLength, 0, 0] as [number, number, number],
          [axisLength, 0, 0] as [number, number, number]
        ],
        color: "red"
      },
      // Y axis (green)
      {
        points: [
          [0, -axisLength, 0] as [number, number, number],
          [0, axisLength, 0] as [number, number, number]
        ],
        color: "green"
      },
      // Z axis (blue)
      {
        points: [
          [0, 0, -axisLength] as [number, number, number],
          [0, 0, axisLength] as [number, number, number]
        ],
        color: "blue"
      }
    ],
    [axisLength]
  );

  // Unit ticks and labels for each axis
  const ticks = useMemo(() => {
    const arr: ReactElement[] = [];
    for (let i = -axisLength; i <= axisLength; i++) {
      if (i === 0) continue;
      // X ticks
      arr.push(
        <Line
          key={`x-tick-${i}`}
          points={[
            [i, 0, -0.1] as [number, number, number],
            [i, 0, 0.1] as [number, number, number]
          ]}
          color="red"
          lineWidth={2}
        />
      );
      arr.push(
        <Text
          key={`x-label-${i}`}
          position={[i, 0.2, 0] as [number, number, number]}
          fontSize={0.3}
          color="red"
          anchorX="center"
          anchorY="middle"
        >
          {i}
        </Text>
      );
      // Y ticks
      arr.push(
        <Line
          key={`y-tick-${i}`}
          points={[
            [-0.1, i, 0] as [number, number, number],
            [0.1, i, 0] as [number, number, number]
          ]}
          color="green"
          lineWidth={2}
        />
      );
      arr.push(
        <Text
          key={`y-label-${i}`}
          position={[0, i, 0.2] as [number, number, number]}
          fontSize={0.3}
          color="green"
          anchorX="center"
          anchorY="middle"
        >
          {i}
        </Text>
      );
      // Z ticks
      arr.push(
        <Line
          key={`z-tick-${i}`}
          points={[
            [0, -0.1, i] as [number, number, number],
            [0, 0.1, i] as [number, number, number]
          ]}
          color="blue"
          lineWidth={2}
        />
      );
      arr.push(
        <Text
          key={`z-label-${i}`}
          position={[0.2, 0, i] as [number, number, number]}
          fontSize={0.3}
          color="blue"
          anchorX="center"
          anchorY="middle"
        >
          {i}
        </Text>
      );
    }
    return arr;
  }, [axisLength]);

  return (
    <>
      {/* Axes */}
      {axes.map((axis, idx) => (
        <Line key={idx} points={axis.points} color={axis.color} lineWidth={3} />
      ))}
      {/* Ticks and labels */}
      {ticks}
      {/* Floor grid (XZ plane, centered on Z axis) */}
      <Grid
        position={[0, 0, 0]}
        args={[gridSize, gridSize, gridDivisions, gridDivisions]}
        sectionColor={"#fff"}
        cellColor={"#fff"}
        fadeDistance={0}
        infiniteGrid={true}
        rotation={[0, 0, 0]}
      />
    </>
  );
}
