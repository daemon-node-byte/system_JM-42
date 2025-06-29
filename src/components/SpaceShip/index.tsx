import { Suspense } from "react";
import ShipModel from "./ShipModel";
import FallbackLoader from "./FallbackLoader";

function SpaceShip({ url }: { url: string }) {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <ShipModel url={url} />
    </Suspense>
  );
}

export default SpaceShip;
