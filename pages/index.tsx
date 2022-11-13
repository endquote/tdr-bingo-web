import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import { Coordinate } from "ol/coordinate";
import { useCallback } from "react";
import { Overlay } from "../components/Overlay";
import { selectedAtom } from "../components/state";

const Pyramid = dynamic(() => import("../components/Pyramid"), {
  ssr: false,
});

export default function Home() {
  const [selected, setSelected] = useAtom(selectedAtom);

  const click = useCallback((c: Coordinate) => {
    setSelected((selected) => !selected);
  }, []);

  return (
    <>
      <Pyramid onMapClick={click} />
      <Overlay />
    </>
  );
}
