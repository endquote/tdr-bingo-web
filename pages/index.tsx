import dynamic from "next/dynamic";
import { Coordinate } from "ol/coordinate";
import { useCallback } from "react";
import { trackEvent } from "../components/Analytics";

const Pyramid = dynamic(() => import("../components/Pyramid"), {
  ssr: false,
});

export default function Home() {
  const click = useCallback((c: Coordinate) => {
    console.log(c);
    trackEvent("pyramid", "click", "token", Math.round(c[0]));
  }, []);

  return <Pyramid onMapClick={click} />;
}
