import { atom } from "jotai";
import { Bingo } from "./constants";

// which token is selected
export const selectedBingoAtom = atom<Bingo | undefined>(undefined);
selectedBingoAtom.debugLabel = "selectedBingoAtom";
