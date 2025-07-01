# SpaceShip Component

A modular spaceship component for 3D space simulation with keyboard/mouse controls, physics, aiming system, and laser weapons.

## Folder Structure

```
src/components/SpaceShip/
├── index.tsx                     # Main export
├── README.md                     # Documentation
├── types.ts                      # Type definitions
├── exports.ts                    # Barrel exports
├── components/                   # React components
│   ├── ShipModel.tsx            # Core ship rendering
│   ├── LaserRenderer.tsx        # Laser beam rendering
│   ├── FallbackLoader.tsx       # Loading fallback
│   ├── DreiTrailEngine.tsx      # Alternative engine trail
│   └── UI/
│       ├── Crosshairs.tsx       # Aiming crosshairs
│       └── Crosshairs.css       # Crosshairs styling
├── hooks/                        # Custom React hooks
│   ├── useInputControls.ts      # Input handling
│   ├── useLaserSystem.ts        # Laser state management
│   ├── useEngineTrail.ts        # Engine particle effects
│   └── useMouseAiming.ts        # Mouse aiming system
├── physics/                      # Game physics logic
│   ├── shipPhysics.ts           # Ship movement/rotation
│   ├── laserPhysics.ts          # Laser physics/firing
│   └── engineTrailUpdater.ts   # Legacy engine trail
└── utils/                        # Utility functions
    ├── mouseUtils.ts            # Mouse utilities
    └── cameraControls.ts        # Camera following
```

## Core Components

### Main Components

- **`ShipModel.tsx`** - Core ship rendering and game loop integration
- **`LaserRenderer.tsx`** - 3D laser beam rendering with physics
- **`UI/Crosshairs.tsx`** - HUD crosshairs for aiming system

### Custom Hooks

- **`useInputControls.ts`** - Keyboard and mouse input handling
- **`useLaserSystem.ts`** - Laser state and lifecycle management
- **`useMouseAiming.ts`** - Mouse aiming with limited radius
- **`useEngineTrail.ts`** - Engine particle effect management

### Physics Systems

- **`shipPhysics.ts`** - Ship movement, rotation, and banking
- **`laserPhysics.ts`** - Laser firing, movement, and collision
- **`engineTrailUpdater.ts`** - Custom engine trail particles

### Utilities

- **`cameraControls.ts`** - Camera following and positioning
- **`mouseUtils.ts`** - Mouse movement smoothing utilities

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
