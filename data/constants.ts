import { Size } from "ol/size";
import tokens from "../data/tokens.json";

export type Bingo = {
  id: number;
  title: string;
  number: number;
  style: number;
  words: number;
};

export type Project = {
  name: string;
  link?: string;
};

export const mapSize: Size = [79288, 111254];

export const tileSize: Size = [mapSize[0] / 22, mapSize[1] / 22];

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
      name: "Hardfloor",
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
      name: "Dr-Nuronfont",
      link: "https://detunedrecords.bandcamp.com/album/la-source",
    },
    {
      name: "PACMAN",
      link: "https://www.discogs.com/release/16160204-Various-Join-The-Pac-Pac-Man-40th-Anniversary-Album-/image/SW1hZ2U6ODU0MDM4NDA=",
    },
  ],
  [
    {
      name: "Formula Fusion",
      link: "https://www.thedesignersrepublic.com/formula-fusion",
    },
  ],
  [
    {
      name: "barcodes",
    },
  ],
  [
    {
      name: "WipEout 2097",
      link: "https://www.thedesignersrepublic.com/wipeout",
    },
  ],
  [
    {
      name: "Bed",
    },
  ],
  [
    {
      name: "Warp",
      link: "https://warp.net/",
    },
  ],
  [
    {
      name: "WipEout",
      link: "https://www.thedesignersrepublic.com/wipeout",
    },
    {
      name: "Model 500",
      link: "https://www.discogs.com/master/137924-Model-500-Be-Brave/image/SW1hZ2U6MzE2NTQ4OQ==",
    },
  ],
  [
    {
      name: "Humanoid",
      link: "https://detunedrecords.bandcamp.com/album/st8818r-humanoid",
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
  [
    {
      name: "Principles of Geometry",
      link: "https://www.principles-of-geometry.com",
    },
  ],
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
      link: "https://www.searchsystem.co/post/630679362397765632",
    },
  ],
  [
    {
      name: "ZAT (unreleased music project)",
    },
  ],
  [
    {
      name: "NEW NOW WOW",
      link: "https://www.experimentadesign.pt/2009/en/index.html",
    },
  ],
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
  [
    {
      name: "TDRBingo®",
      link: "https://www.tdrbingo.com",
    },
  ],
];
