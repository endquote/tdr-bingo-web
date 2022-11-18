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

export const projects: { name?: string; link?: string }[] = [
  {
    name: "PWEI",
    link: "https://www.shopwilleatitself.com/tshirts-merch/p/newnormal",
  },
  {
    name: "HRDFLR",
    link: "hhttps://hardfloor.bandcamp.com/album/the-business-of-basslines-only-complete-album-2",
  },
  {
    name: "Autechre NTS",
    link: "https://www.thedesignersrepublic.com/nts-sessions",
  },
  {
    name: "Dr-Nuronfont (PACMAN)",
  },
  {
    name: "FX Fusion",
    link: "https://www.thedesignersrepublic.com/formula-fusion",
  },
  { name: "barcodes" },
  {
    name: "WipEout 2097",
    link: "https://www.thedesignersrepublic.com/wipeout",
  },
  { name: "Bed" },
  { name: "Warp", link: "https://warp.net/" },
  {
    name: "WipEout/Model 500",
    link: "https://www.thedesignersrepublic.com/wipeout",
  },
  {
    name: "Humanoid",
    link: "https://www.discogs.com/master/2402128-Humanoid-sT8818r-Humanoid/image/SW1hZ2U6Njk4OTc4NzQ=",
    // also LFO https://www.discogs.com/master/62898-LFO-Sheath/image/SW1hZ2U6MTA3NDQ0OQ==
  },
  { name: "Pho-Ku", link: "https://www.pinterest.com/pin/563864815828912534/" },
  {
    name: "Gatecrasher",
    link: "https://www.thedesignersrepublic.com/global-sound-system",
  },
  { name: "POG" },
  {
    name: "Autechre Oversteps",
    link: "https://www.thedesignersrepublic.com/oversteps",
  },
  { name: "LFO (binary)" },
  {
    name: "DR.NO-B",
    link: "https://y2kaestheticinstitute.tumblr.com/image/183109255679",
  },
  { name: "ZAT" },
  { name: "NEW NOW WOW" },
  { name: "Jazz em Agosto" },
  {
    name: "Autechre Chiastic Slid}e",
    link: "https://www.thedesignersrepublic.com/chiastic-slide",
  },
  {},
];
