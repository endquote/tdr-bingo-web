export const fonts = [
  "PWEI",
  "HRDFLR/CDG",
  "Autechre NTS",
  "Dr-Nuronfont (PACMAN)",
  "FX Fusion",
  "barcodes",
  "WipEout 2097",
  "Bed",
  "Warp",
  "WipEout/Model 500",
  "Humanoid",
  "Pho-Ku",
  "Gatecrasher",
  "POG",
  "Autechre Oversteps",
  "LFO (binary)",
  "DR.NO-B",
  "ZAT",
  "NEW NOW WOW",
  "Jazz em Agosto",
  "Autechre Chiastic Slide",
  "TBA",
];

export type Bingo = {
  id: number;
  title: string;
  revealed: boolean;
  number?: number;
  style?: number;
  words: number;
};

import tokens from "../data/tokens.json";

export const bingos: Bingo[] = tokens as Bingo[];
