# bloei.me — explainer video

A short (~85 s), text-only animated video for LinkedIn that explains bloei.me through one
example: municipalities co-funding automatic translation in Epistola. Built with
[Remotion](https://www.remotion.dev) (React → MP4); everything is code, so text and timing are
easy to change.

## Usage

```sh
mise install          # node + pnpm (see mise.toml)
pnpm install
pnpm studio           # live preview / scrubbing in the browser
pnpm render           # → out/bloei-me-1x1.mp4   (1080×1080, main LinkedIn version)
pnpm render:vertical  # → out/bloei-me-9x16.mp4  (1080×1920, Reels/Shorts)
```

Scene order and durations live in `src/Video.tsx`; scenes in `src/scenes/`, illustrations in
`src/illustrations.tsx`, brand colours and the example data in `src/theme.ts`.

## Script (v2, Dutch, no voiceover)

Audience: public bodies and municipalities. Message: collectively funding good products, with
little effort, transparently. Call to action: start the conversation.

| # | On screen | Visual |
|---|---|---|
| 1 | Gemeente Oost maakt haar brieven met *Epistola.* → Nu wil ze die brieven ook *automatisch vertalen.* | Town hall, Epistola window produces a letter, language chips appear |
| 2 | Gemeente West wil dat ook. En Zuid. *En het waterschap.* | Three more organisations with the same wish |
| 3 | Ieder apart is *een flinke klus.* / Eigen aanvraag, eigen inkooptraject, eigen offerte — voor precies hetzelfde. → Dus blijft het *liggen.* | Paper piles grow, then everything greys out |
| 4 | Op bloei.me *bundel je die vraag.* | Network to the logo; proposal card, four endorsements |
| 5 | Een leverancier doet *één concreet aanbod.* | Campaign card: criteria + maximum price € 100.000 |
| 6 | Meedoen? *Zeg een maximum toe.* / Uit je eigen, gereserveerde budget. Meer niet. | Pledges fill the coverage bar, plant grows, "Volledig gedekt" |
| 7 | Pas na bewijs *wordt het geaccepteerd.* | Evidence card, four checks, stamp |
| 8 | Ieder betaalt *een eerlijk deel.* / Nooit meer dan beloofd. | € 100.000 → € 80.000, four amounts |
| 9 | En iedereen *kan meekijken.* / Wie financierde en wat er is opgeleverd: openbaar. | Public campaign page, plant blooms |
| 10 | Samen *goede producten* financieren. | Samen · Weinig moeite · Transparant |
| 11 | Is dit iets wat *we willen?* / Welke uitdagingen zie jij? Hoe lossen we die op? / Reageer of praat met ons mee — sander@epistola.app | End card |

Notes:

- Organisations are fictional. Shares (22k / 22k / 20k / 16k of € 80.000 with maxima
  50/30/25/20 %) follow the water-filling rule used on the site (`fairShares()` in `index.html`).
- The video names procurement only as the *problem*; it deliberately does not claim bloei.me
  replaces a procurement process, since that is still an open legal question.
- No audio yet; add music/voiceover later via `<Audio>` in `src/Video.tsx`.
