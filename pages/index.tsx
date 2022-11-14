import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import { Coordinate } from "ol/coordinate";
import { useCallback } from "react";
import { Overlay } from "../components/Overlay";
import { bingos } from "../data/constants";
import { selectedBingoAtom } from "../data/state";

const Pyramid = dynamic(() => import("../components/Pyramid"), {
  ssr: false,
});

export default function Home() {
  const [, setSelectedBingo] = useAtom(selectedBingoAtom);

  const click = useCallback(
    (c: Coordinate) => {
      const [style, number] = c;
      const bingo = bingos.find(
        (b) => b.style === style && b.number === number
      );

      setSelectedBingo((selectedBingo) =>
        bingo === selectedBingo ? undefined : bingo
      );
    },
    [setSelectedBingo]
  );

  return (
    <>
      <Pyramid onMapClick={click} />
      <Overlay />
    </>
  );
}
