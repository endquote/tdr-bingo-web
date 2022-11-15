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
  const [selectedBingo, setSelectedBingo] = useAtom(selectedBingoAtom);

  const click = useCallback(
    (c: Coordinate) => {
      const [style, number] = c;
      const bingo =
        bingos.find((b) => b.style === style && b.number === number) || null;

      setSelectedBingo((selectedBingo) =>
        bingo === selectedBingo ? null : bingo
      );
    },
    [setSelectedBingo]
  );

  return (
    <>
      <Pyramid
        onMapClick={click}
        col={selectedBingo?.style}
        row={selectedBingo?.number}
      />
      <Overlay />
    </>
  );
}
