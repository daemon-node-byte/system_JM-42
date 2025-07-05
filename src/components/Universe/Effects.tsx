import {
  EffectComposer,
  Bloom,
  ChromaticAberration
} from "@react-three/postprocessing";
import { POST_PROCESSING_SETTINGS } from "@/constants";
// import { BlendFunction } from "postprocessing";

const { bloom, chromaticAberration } = POST_PROCESSING_SETTINGS;

export default function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={bloom.intensity}
        luminanceThreshold={bloom.luminanceThreshold}
        blendFunction={bloom.blendFunction}
      />
      <ChromaticAberration offset={chromaticAberration.offset} />
    </EffectComposer>
  );
}
