export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      {/* <pointLight position={[10, 10, 10]} intensity={6} /> */}
      <directionalLight position={[-5, 5, 5]} intensity={6} />
    </>
  );
}
