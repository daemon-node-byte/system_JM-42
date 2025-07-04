import type { ShipDetails } from "@/types";

const MODEL_ROOT = "assets/models/";

// *ANCHOR - Ship List Array

export const SHIP_LIST: ShipDetails[] = [
  {
    name: "Discovery Shuttle",
    label: "NASA Shuttle",
    id: "ship-1",
    modelUrl: MODEL_ROOT + "nasa_shuttle/scene.gltf",
    scale: 0.085,
    offset: {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: -1.57, z: 0 },
      followCamera: {
        x: 0,
        y: 3.5,
        z: 7
      }
    }
  },
  {
    name: "White Ghost",
    label: "SF-1",
    id: "ship-2",
    modelUrl: MODEL_ROOT + "sf-1_white-ghost-starfighter/scene.gltf",
    scale: 1.5,
    offset: {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      followCamera: { x: 0, y: 0, z: 0 }
    }
  },
  {
    name: "Moon Frog",
    label: "iSF-2",
    id: "ship-3",
    modelUrl: MODEL_ROOT + "i_ship/scene.gltf",
    scale: 0.01,
    offset: {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      followCamera: { x: 0, y: 0, z: 0 }
    }
  },
  {
    name: "Guardian",
    label: "AS-724",
    id: "ship-4",
    modelUrl: MODEL_ROOT + "space_fighter/scene.gltf",
    scale: 0.01,
    offset: {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      followCamera: { x: 0, y: 0, z: 0 }
    }
  },
  {
    name: "Stinger",
    label: "ST22",
    id: "ship-5",
    modelUrl: MODEL_ROOT + "spaceship/scene.gltf",
    scale: 0.01,
    offset: {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      followCamera: { x: 0, y: 0, z: 0 }
    }
  }
];

export const DEFAULT_SHIP = SHIP_LIST[0];
