import { atom } from "jotai";
import { atomWithHash, RESET } from "jotai/utils";
import { Router } from "next/router";
import { Bingo, bingos } from "./constants";

// https://jotai.org/docs/utils/atom-with-hash
// https://jotai.org/docs/guides/nextjs#sync-with-router
const selectedBingoIdAtom = atomWithHash<number | undefined>(
  "bingo",
  undefined,
  {
    replaceState: false,
    subscribe: (callback) => {
      Router.events.on("routeChangeComplete", callback);
      window.addEventListener("hashchange", callback);
      return () => {
        Router.events.off("routeChangeComplete", callback);
        window.removeEventListener("hashchange", callback);
      };
    },
  }
);

selectedBingoIdAtom.debugLabel = "selectedBingoIdAtom";

// https://jotai.org/docs/basics/primitives#atom
const selectedBingoAtom = atom(
  (get) => {
    const id = get(selectedBingoIdAtom);
    return bingos.find((b) => b.id === id);
  },
  (get, set, update: (prev: Bingo | undefined) => Bingo | undefined) => {
    const val = update(get(selectedBingoAtom));
    set(selectedBingoIdAtom, val ? val.id : RESET);
  }
);

selectedBingoAtom.debugLabel = "selectedBingoAtom";

export default selectedBingoAtom;
