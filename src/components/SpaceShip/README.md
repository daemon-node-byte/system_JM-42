# SpaceShip Component

A refactored and modular spaceship component for 3D space simulation with keyboard/mouse controls, physics, and particle effects.

## Structure

The component has been broken down into focused, maintainable modules:

### Core Components

- **`index.tsx`** - Main SpaceShip component with Suspense wrapper
- **`ShipModel.tsx`** - Core ship rendering and animation logic
- **`FallbackLoader.tsx`** - Loading fallback component

### Utilities & Hooks

- **`useInputControls.ts`** - Keyboard and mouse input handling
- **`shipPhysics.ts`** - Ship movement and rotation physics
- **`cameraControls.ts`** - Camera following and positioning logic
- **`mouseUtils.ts`** - Mouse movement utilities

### Configuration & Types

- **`types.ts`** - TypeScript interfaces and default configurations
- **`exports.ts`** - Barrel exports for clean imports

## Features

### Controls

- **W/S** - Forward/Backward movement
- **A/D** - Roll left/right
- **Q/E** - Spin left/right (yaw)
- **Space/Shift** - Up/Down movement
- **Mouse** - Pitch and yaw control with automatic banking

### Physics

- Smooth rotation interpolation
- Banking during turns
- Roll angle limiting
- Velocity-based movement
- Camera following with smooth interpolation

### Visual Effects

- **Fixed Engine Particle Trails** using Drei's Trail component that stays properly positioned behind the ship
- Engine trails now render in world space (outside ship group) to prevent moving ahead of the ship
- Smooth trail fading and width attenuation
- Cyan-colored exhaust trail with configurable length and decay
- Performance optimized with conditional rendering (only shows when engine is active)

## Recent Fixes

### Engine Trail Position Fix

- **Problem**: Engine trail was moving ahead of the ship due to being inside the ship's group
- **Solution**: Moved trail outside ship group and use world-space positioning with Drei's Trail component
- **Result**: Trail now properly stays behind the ship's exhaust point, even during complex maneuvers

## Configuration

Movement parameters can be customized through the `MovementConfig` interface:

```typescript
interface MovementConfig {
  tiltAmount: number; // Mouse sensitivity
  dampingFactor: number; // Rotation smoothing
  bankingReturnSpeed: number; // Banking recovery speed
  speed: number; // Movement speed
  rollSpeed: number; // Roll speed for A/D keys
  spinSpeed: number; // Spin speed for Q/E keys
  maxRollAngle: number; // Maximum roll angle (radians)
}
```

## Usage

```tsx
import SpaceShip from "./components/SpaceShip";

function Scene() {
  return <SpaceShip url="/path/to/ship/model.gltf" />;
}
```

## Advanced Usage

Individual components and utilities can be imported for custom implementations:

```tsx
import {
  ShipModel,
  useInputControls,
  useEngineTrail,
  updateShipPhysics,
  DEFAULT_MOVEMENT_CONFIG
} from "./components/SpaceShip/exports";
```

## Benefits of Refactoring

1. **Maintainability** - Each module has a single responsibility
2. **Testability** - Individual functions can be unit tested
3. **Reusability** - Components can be reused in different contexts
4. **Readability** - Complex logic is broken into understandable chunks
5. **Type Safety** - Comprehensive TypeScript interfaces
6. **Performance** - Optimized hooks and memoization
