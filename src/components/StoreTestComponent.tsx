import { useStore } from "../store";

// Simple test component to verify store integration
export const StoreTestComponent = () => {
  const {
    position,
    velocity,
    isEngineActive,
    keys,
    fps,
    isPaused,
    togglePause,
    handleEngineToggle
  } = useStore();

  return (
    <div
      style={{
        position: "absolute",
        top: "50px",
        left: "10px",
        color: "white",
        fontFamily: "monospace",
        background: "rgba(0,0,0,0.7)",
        padding: "15px",
        borderRadius: "8px",
        fontSize: "12px"
      }}
    >
      <h3>🚀 Ship Store Status</h3>
      <div>
        Position: {position.x.toFixed(2)}, {position.y.toFixed(2)},{" "}
        {position.z.toFixed(2)}
      </div>
      <div>Velocity: {velocity.length().toFixed(2)}</div>
      <div>Engine: {isEngineActive ? "🔥 Active" : "❄️ Inactive"}</div>
      <div>FPS: {fps}</div>
      <div>Game: {isPaused ? "⏸️ Paused" : "▶️ Running"}</div>

      <h4>🎮 Input Status</h4>
      <div>Forward: {keys.thrustForward ? "✅" : "❌"}</div>
      <div>Backward: {keys.thrustBackward ? "✅" : "❌"}</div>
      <div>Aiming: {keys.aimControls ? "🎯" : "❌"}</div>
      <div>Fire: {keys.fire ? "💥" : "❌"}</div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={togglePause} style={{ marginRight: "10px" }}>
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button onClick={handleEngineToggle}>Toggle Engine</button>
      </div>
    </div>
  );
};
