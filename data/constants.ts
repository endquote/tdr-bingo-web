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

export const contract = "0xcb6b570b8aeabe38b449aff31f901b8e1b91e396";
