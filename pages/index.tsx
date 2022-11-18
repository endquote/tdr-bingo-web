import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import { Coordinate } from "ol/coordinate";
import { useCallback, useEffect } from "react";
import { Overlay } from "../components/Overlay";
import { Bingo, bingos } from "../data/constants";
import selectedBingoAtom from "../data/state";

const Pyramid = dynamic(() => import("../components/Pyramid"), {
  ssr: false,
});

export default function Home() {
  const [selectedBingo, setSelectedBingo] = useAtom(selectedBingoAtom);

  // when the map is clicked, find the bingo that was clicked and select it
  const onMapClick = useCallback(
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

  // when the map is moved, unselect the bingo
  const onMapChange = useCallback(() => {
    setSelectedBingo();
  }, [setSelectedBingo]);

  // keyboard navigation
  const keyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.repeat || !selectedBingo) {
        return;
      }

      let next: Bingo | undefined = undefined;

      if (e.key === "ArrowDown") {
        next = [...bingos]
          .filter((b) => b.style === selectedBingo.style)
          .sort((a, b) => a.number! - b.number!)
          .find((b) => b.number! > selectedBingo.number!);
      }
      if (e.key === "ArrowUp") {
        next = [...bingos]
          .filter((b) => b.style === selectedBingo.style)
          .sort((a, b) => b.number! - a.number!)
          .find((b) => b.number! < selectedBingo.number!);
      }
      if (e.key === "ArrowRight") {
        next = [...bingos]
          .filter((b) => b.number === selectedBingo.number)
          .sort((a, b) => a.style! - b.style!)
          .find((b) => b.style! > selectedBingo.style!);
      }
      if (e.key === "ArrowLeft") {
        next = [...bingos]
          .filter((b) => b.number === selectedBingo.number)
          .sort((a, b) => b.style! - a.style!)
          .find((b) => b.style! < selectedBingo.style!);
      }

      if (!next) {
        return;
      }

      setSelectedBingo(next);
    },
    [selectedBingo, setSelectedBingo]
  );

  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    return () => window.removeEventListener("keydown", keyDown);
  }, [keyDown]);

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
