import { loadFont } from "@remotion/google-fonts/Inter";

const inter = loadFont("normal", {
  weights: ["500", "700", "800"],
  subsets: ["latin", "cyrillic"],
});

export const FONT = inter.fontFamily;
export const SERIF = "Georgia, 'Times New Roman', serif";

// Brand palette, taken from the bloei.me site (index.html :root).
export const C = {
  ink: "#17342b",
  muted: "#587068",
  paper: "#fbfcf7",
  surface: "#ffffff",
  leaf: "#2e7257",
  leafDark: "#19503a",
  sprout: "#b8d98b",
  lime: "#e8f2c9",
  sun: "#f2b84b",
  rose: "#d97962",
  sky: "#dcefeb",
  sand: "#fae7d6",
  line: "#cfdbd3",
  lineStrong: "#9eb3a8",
} as const;

export type Org = {
  name: string;
  facade: string;
  accent: string;
  variant: "town" | "water";
  /** Maximum percentage pledged. */
  cap: number;
  /** Fair share in euros at the final price of €80.000 (water-filling). */
  share: number;
};

export const FINAL_PRICE = 80_000;
export const MAX_PRICE = 100_000;

// Fictional organisations. Shares follow the site's fairShares() for €80.000:
// equal 20k each → Waterschap capped at 16k → Zuid capped at 20k → rest 22k each.
export const ORGS: Org[] = [
  { name: "Gemeente Oost", facade: C.lime, accent: C.leaf, variant: "town", cap: 50, share: 22_000 },
  { name: "Gemeente West", facade: C.sky, accent: "#3b8b9a", variant: "town", cap: 30, share: 22_000 },
  { name: "Gemeente Zuid", facade: "#fbefd2", accent: "#d9982a", variant: "town", cap: 25, share: 20_000 },
  { name: "Waterschap", facade: "#dde8f6", accent: "#4f7fc0", variant: "water", cap: 20, share: 16_000 },
];

export const euro = (n: number) =>
  "€ " + Math.round(n).toLocaleString("nl-NL").replace(/,/g, ".");
