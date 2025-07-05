import type { ReactNode } from "react";
import { Physics } from "@react-three/rapier";
import { PHYSICS_SETTINGS } from "@/constants";

interface PhysicsProviderProps {
  children: ReactNode | ReactNode[];
}

const PhysicsProvider = ({ children }: PhysicsProviderProps) => {
  const { gravity, colliders } = PHYSICS_SETTINGS;
  return (
    <Physics debug gravity={gravity} colliders={colliders}>
      {children}
    </Physics>
  );
};

export default PhysicsProvider;
