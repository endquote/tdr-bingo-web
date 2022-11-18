import { atom } from "jotai";
import { atomWithHash, RESET } from "jotai/utils";
import { Router } from "next/router";
import aboutModeAtom from "./aboutMode";
import { Bingo, bingos } from "./constants";

// https://jotai.org/docs/utils/atom-with-hash
// https://jotai.org/docs/guides/nextjs#sync-with-router
const selectedBingoIdAtom = atomWithHash<number | undefined>("id", undefined, {
  replaceState: false,
  delayInit: true,
  subscribe: (callback) => {
    Router.events.on("routeChangeComplete", callback);
    window.addEventListener("hashchange", callback);
    return () => {
      Router.events.off("routeChangeComplete", callback);
      window.removeEventListener("hashchange", callback);
    };
  },
});

selectedBingoIdAtom.debugLabel = "selectedBingoIdAtom";

// https://jotai.org/docs/basics/primitives#atom
const selectedBingoAtom = atom(
  (get) => {
    const id = get(selectedBingoIdAtom);
    return bingos.find((b) => b.id === id);
  },
  (
    get,
    set,
    update: Bingo | undefined | ((prev: Bingo | undefined) => Bingo | undefined)
  ) => {
    let val;
    if (update === undefined) {
      val = RESET;
    } else if ("id" in update) {
      val = update.id;
    } else {
      val = update(get(selectedBingoAtom))?.id || RESET;
    }
    set(selectedBingoIdAtom, val);
    set(aboutModeAtom, false);
  }
);

selectedBingoAtom.debugLabel = "selectedBingoAtom";

export default selectedBingoAtom;
