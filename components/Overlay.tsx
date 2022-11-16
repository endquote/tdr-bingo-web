import classNames from "classnames";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Bingo, contract, fonts } from "../data/constants";
import { selectedBingoAtom } from "../data/state";
import styles from "./Overlay.module.css";

export const Overlay = () => {
  const [selectedBingo, setSelectedBingo] = useAtom(selectedBingoAtom);

  const [displayedBingo, setDisplayedBingo] = useState<Bingo | undefined>();

  // this way the info doesn't disappear while the overlay is closing
  useEffect(() => {
    if (selectedBingo) {
      setDisplayedBingo(selectedBingo);
    }
  }, [selectedBingo]);

  return (
    <div className={styles.overlayContainer}>
      <div
        className={classNames(styles.overlay, selectedBingo ? styles.open : "")}
      >
        <button onClick={() => setSelectedBingo(null)} value="close">
          close
        </button>
        {displayedBingo ? (
          <p>
            id: {displayedBingo.id}
            <br />
            title: {displayedBingo.title}
            <br />
            words: {displayedBingo.words}
            <br />
            number: {displayedBingo.number}
            <br />
            style: {fonts[displayedBingo.style! - 1]}
            <br />
            <a
              href={`https://opensea.io/assets/ethereum/${contract}/${displayedBingo.id}`}
              target="_blank"
              rel="noreferrer"
            >
              opensea
            </a>
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
