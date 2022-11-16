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

  // when the map is clicked, find the bingo that was clicked and select it
  const onMapClick = useCallback(
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

  // when the map is moved, unselect the bingo
  const onMapChange = useCallback(() => {
    setSelectedBingo(null);
  }, [setSelectedBingo]);

  return (
    <>
      <Pyramid
        onMapClick={onMapClick}
        onMapChange={onMapChange}
        col={selectedBingo?.style}
        row={selectedBingo?.number}
      />
      <Overlay />
    </>
  );
}
