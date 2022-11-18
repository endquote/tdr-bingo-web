import classNames from "classnames";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import aboutModeAtom from "../data/aboutMode";
import { Bingo, contract, Project, projects } from "../data/constants";
import selectedBingoAtom from "../data/selectedBingo";
import styles from "./Overlay.module.css";

export const Overlay = () => {
  const [selectedBingo, setSelectedBingo] = useAtom(selectedBingoAtom);

  const [displayedBingo, setDisplayedBingo] = useState<Bingo | undefined>();

  const [aboutMode] = useAtom(aboutModeAtom);

  const scrollRef = useRef<HTMLDivElement>(null!);

  // this way the info doesn't disappear while the overlay is closing
  useEffect(() => {
    if (selectedBingo) {
      setDisplayedBingo(selectedBingo);
    }
  }, [selectedBingo]);

  useEffect(() => {
    scrollRef.current.scrollTo({ top: 0 });
  }, [displayedBingo]);

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
        <div style={{ display: "block" }}>
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

  const TokenInfo = ({ bingo }: { bingo: Bingo }) => {
    return (
      <>
        <div>{bingo.title}</div>
        <div>&nbsp;</div>
        <div>
          id: {bingo.id}
          <br />
          words: {bingo.words}
          <br />
          number: {bingo.number}
          <br />
          style: {bingo.style}
        </div>
        <div>&nbsp;</div>
        <div style={{ display: bingoProjects.length ? "block" : "none" }}>
          {bingoProjects.map((p, i) => (
            <ProjectLink key={i} project={p} />
          ))}
        </div>
        <div style={{ display: bingoProjects.length ? "block" : "none" }}>
          &nbsp;
        </div>
        <Link
          href={`https://opensea.io/assets/ethereum/${contract}/${bingo.id}`}
          target="_blank"
        >
          OpenSea
        </Link>
      </>
    );
  };

  const AboutInfo = () => {
    return (
      <div>
        <div>
          Eyes Down! <Link href="http://tdrbingo.com">TDRBingo®</Link> is the
          first TDR™XNFT action delivered unto you by{" "}
          <Link href="https://www.thedesignersrepublic.com/">
            The Designers Republic™
          </Link>{" "}
          and Divine Rights. Made especially for you with us in mind.
        </div>
        <div>&nbsp;</div>
        <div>
          This app was created by the{" "}
          <Link href="https://discord.gg/SzeHH3cfXE">Discord</Link> community to
          explore the tokens organized by the font and number traits. Click a
          token for details, including links to the TDR projects the font was
          used in.
        </div>
        <div>&nbsp;</div>
        <div>
          built by <Link href="https://endquote.com">endquote</Link>, based on
          research from <Link href="https://bio.link/tangent23">LightCity</Link>
          , <Link href="https://twitter.com/arch5tanton1">ic</Link>, and
          neokidbam
        </div>
      </div>
    );
  };

  return (
    <div className={styles.overlayContainer}>
      <div
        ref={scrollRef}
        onClick={() => setSelectedBingo()}
        style={{ overflowY: "auto" }}
        className={classNames(
          styles.overlay,
          selectedBingo || aboutMode ? styles.open : ""
        )}
      >
        {displayedBingo ? <TokenInfo bingo={displayedBingo} /> : <AboutInfo />}
      </div>
    </div>
  );
};
