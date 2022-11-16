import { atom } from "jotai";
import { Bingo } from "./constants";

// which token is selected
const selectedBingoAtom = atom<Bingo | null>(null);
selectedBingoAtom.debugLabel = "selectedBingoAtom";

// all kinds of issues if i don't export as default and import that way
export default selectedBingoAtom;
