import { atom } from "jotai";
import { Bingo } from "./constants";

// which token is selected
export const selectedBingoAtom = atom<Bingo | null>(null);
selectedBingoAtom.debugLabel = "selectedBingoAtom";
