export type Bingo = {
  id: number;
  title: string;
  revealed: boolean;
  number?: number;
  style?: number;
  words: number;
};

export type Project = {
  name: string;
  link?: string;
};

import tokens from "../data/tokens.json";

export const bingos: Bingo[] = tokens as Bingo[];

export const contract = "0xcb6b570b8aeabe38b449aff31f901b8e1b91e396";

export const projects: Project[][] = [
  [
    {
      name: "PWEI",
      link: "https://www.discogs.com/master/384493-Pop-Will-Eat-Itself-New-Noise-Designed-By-A-Sadist/image/SW1hZ2U6NTc2MDMzMw==",
    },
  ],
  [
    {
      name: "HRDFLR",
      link: "https://www.discogs.com/release/10621542-Hardfloor-The-Business-Of-Basslines/image/SW1hZ2U6MzA0OTU1NjA=",
    },
  ],
  [
    {
      name: "Autechre NTS",
      link: "https://www.thedesignersrepublic.com/nts-sessions",
    },
  ],
  [
    {
      name: "Dr-Nuronfont (PACMAN)",
    },
  ],
  [
    {
      name: "FX Fusion",
      link: "https://www.thedesignersrepublic.com/formula-fusion",
    },
  ],
  [{ name: "barcodes" }],
  [
    {
      name: "WipEout 2097",
      link: "https://www.thedesignersrepublic.com/wipeout",
    },
  ],
  [{ name: "Bed" }],
  [{ name: "Warp", link: "https://warp.net/" }],
  [
    {
      name: "WipEout",
      link: "https://www.thedesignersrepublic.com/wipeout",
    },
    {
      name: "Model 500",
    },
  ],
  [
    {
      name: "Humanoid",
      link: "https://www.discogs.com/master/2402128-Humanoid-sT8818r-Humanoid/image/SW1hZ2U6Njk4OTc4NzQ=",
    },
    {
      name: "LFO (Sheath)",
      link: "https://www.discogs.com/release/187073-LFO-Sheath/image/SW1hZ2U6MTA3NDQ0OQ==",
    },
  ],
  [
    {
      name: "Pho-Ku",
      link: "https://www.pinterest.com/pin/563864815828912534/",
    },
  ],
  [
    {
      name: "Gatecrasher",
      link: "https://www.thedesignersrepublic.com/global-sound-system",
    },
  ],
  [{ name: "POG" }],
  [
    {
      name: "Autechre (Oversteps)",
      link: "https://www.thedesignersrepublic.com/oversteps",
    },
  ],
  [
    {
      name: "LFO (Tied Up)",
      link: "https://www.discogs.com/release/1482999-LFO-Tied-Up/image/SW1hZ2U6NTk4MTg2Mg==",
    },
  ],
  [
    {
      name: "DR.NO-B",
      link: "https://y2kaestheticinstitute.tumblr.com/image/183109255679",
    },
  ],
  [{ name: "ZAT" }],
  [{ name: "NEW NOW WOW" }],
  [
    {
      name: "Jazz em Agosto",
      link: "https://www.thedesignersrepublic.com/jazz-em-agosto",
    },
  ],
  [
    {
      name: "Autechre (Chiastic Slide)",
      link: "https://www.thedesignersrepublic.com/chiastic-slide",
    },
  ],
  [],
];
