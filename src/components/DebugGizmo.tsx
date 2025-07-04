import {
  GizmoHelper,
  GizmoViewport,
  Grid
  // CameraControls,
  // CameraControlsImpl
} from "@react-three/drei";

export default function DebugGizmo() {
  // const { ACTION } = CameraControlsImpl;
  return (
    <>
      {/* <CameraControls
        mouseButtons={{
          left: ACTION.ROTATE,
          middle: ACTION.DOLLY,
          right: ACTION.TRUCK,
          wheel: ACTION.DOLLY
        }}
      /> */}
      <GizmoHelper alignment="top-left" margin={[60, 60]} renderPriority={1}>
        <GizmoViewport
          axisColors={["red", "green", "blue"]}
          labelColor="white"
        />
      </GizmoHelper>
      <Grid
        args={[20, 20]}
        infiniteGrid={true}
        fadeDistance={250}
        cellSize={1}
        sectionSize={100}
        sectionColor={"#fff"}
        cellColor={"#fff"}
      />
    </>
  );
}
