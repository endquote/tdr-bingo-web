import classNames from "classnames";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Bingo, contract, Project, projects } from "../data/constants";
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

  const bingoProjects = useMemo(
    () =>
      displayedBingo && displayedBingo.style
        ? projects[displayedBingo.style - 1]
        : [],
    [displayedBingo]
  );

  const ProjectLink = ({ project }: { project: Project }) => {
    if (project && project.name && project.link) {
      return (
        <div>
          <Link href={project.link} target="_blank">
            {project.name}
          </Link>
        </div>
      );
    }
    if (project && project.name && !project.link) {
      return <div>{project.name}</div>;
    }

    return <></>;
  };

  const BingoProjects = () => {
    if (!bingoProjects.length) {
      return <></>;
    }

    return (
      <div>
        <p>
          project{bingoProjects.length > 1 ? "s" : ""}:
          <br />
          {bingoProjects.map((p, i) => (
            <ProjectLink key={i} project={p} />
          ))}
        </p>
      </div>
    );
  };

  return (
    <div className={styles.overlayContainer}>
      <div
        className={classNames(styles.overlay, selectedBingo ? styles.open : "")}
      >
        <button onClick={() => setSelectedBingo()} value="close">
          close
        </button>
        <div>
          <p>
            id: {displayedBingo?.id}
            <br />
            title: {displayedBingo?.title}
            <br />
            words: {displayedBingo?.words}
            <br />
            number: {displayedBingo?.number}
          </p>
        </div>
        <BingoProjects />
        <p>
          <Link
            href={`https://opensea.io/assets/ethereum/${contract}/${displayedBingo?.id}`}
            target="_blank"
          >
            opensea
          </Link>
        </p>
      </div>
    </div>
  );
};
