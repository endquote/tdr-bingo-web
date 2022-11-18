import classNames from "classnames";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Bingo, contract, projects } from "../data/constants";
import selectedBingoAtom from "../data/state";
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

  const project = useMemo(
    () =>
      displayedBingo && displayedBingo.style
        ? projects[displayedBingo.style - 1]
        : undefined,
    [displayedBingo]
  );

  const ProjectLink = () => {
    if (project && project.name && project.link) {
      return (
        <>
          <br />
          project:{" "}
          <Link href={project.link} target="_blank">
            {project.name}
          </Link>
        </>
      );
    }
    if (project && project.name && !project.link) {
      return (
        <>
          <br />
          project: {project.name}
        </>
      );
    }

    return <></>;
  };

  return (
    <div className={styles.overlayContainer}>
      <div
        className={classNames(styles.overlay, selectedBingo ? styles.open : "")}
      >
        <button onClick={() => setSelectedBingo(undefined)} value="close">
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
            <ProjectLink />
            <br />
            <Link
              href={`https://opensea.io/assets/ethereum/${contract}/${displayedBingo.id}`}
              target="_blank"
            >
              opensea
            </Link>
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
