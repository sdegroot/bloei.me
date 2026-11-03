# bloei.me — explainer video

A short (~90 s), text-only animated video for LinkedIn that explains bloei.me through one
example: municipalities co-funding automatic translation in Epistola. Built with
[Remotion](https://www.remotion.dev) (React → MP4); everything is code, so text and timing are
easy to change.

## Usage

```sh
mise install          # node + pnpm (see mise.toml)
pnpm install
pnpm voiceover        # regenerate voiceover clips from voiceover/lines.json
pnpm studio           # live preview / scrubbing in the browser
pnpm render           # → out/bloei-me-1x1.mp4   (1080×1080, main LinkedIn version)
pnpm render:vertical  # → out/bloei-me-9x16.mp4  (1080×1920, Reels/Shorts)

# other music track:
npx remotion render BloeiSquare out/.raw.mp4 --props='{"music":"carefree"}' \
  && node scripts/master.mjs out/.raw.mp4 out/bloei-me-1x1-carefree.mp4
```

Renders are mastered to -14 LUFS / -1.5 dBTP (`scripts/master.mjs`).

## Audio

- **Voiceover:** `voiceover/lines.json` holds the spoken text per scene, as segments with the
  (scene-relative) frame at which each should start, aligned with the on-screen text. The
  generator writes `public/vo/*.mp3` and `src/voiceover.json`; scenes stretch automatically when
  their voiceover runs longer. The current clips are a **placeholder** (macOS `say`, voice
  Xander); swap in a real voice by replacing the clips (same file names) or the generator.
- **Music** (ducked under the voice, fades in/out), both CC BY 4.0 — credit required in the post:
  - "Easy Lemon" (default) — Kevin MacLeod (incompetech.com), Licensed under Creative Commons:
    By Attribution 4.0 License, http://creativecommons.org/licenses/by/4.0/
  - "Carefree" — Kevin MacLeod (incompetech.com), same license.

  The end card also shows the credit.

Scene order and durations live in `src/Video.tsx`; scenes in `src/scenes/`, illustrations in
`src/illustrations.tsx`, brand colours and the example data in `src/theme.ts`.

## Script (v3, Dutch, no voiceover)

Audience: public bodies and municipalities. Message: collectively funding good products, with
little effort, transparently. Call to action: start the conversation.

| # | On screen | Visual |
|---|---|---|
| 1 | Gemeente Oost maakt haar brieven met *Epistola.* → Nu wil ze die brieven ook *automatisch vertalen.* | Town hall, Epistola window produces a letter, language chips appear |
| 2 | Gemeente West wil dat ook. En Zuid. *En het waterschap.* | Three more organisations with the same wish |
| 3 | Ieder apart is het *te duur.* / Eigen budget, eigen inkooptraject, eigen offerte. → Maar ze weten niet eens *dat de rest het ook wil.* / Dus blijft het liggen. | A € 100.000 price tag over each one; then walls and question marks, everything greys out |
| 4 | Op bloei.me *vinden ze elkaar.* / Iedereen kan een voorstel doen, ook een leverancier. | Network to the logo, a supplier joins too; proposal card, four endorsements |
| 5 | Een leverancier doet *één concreet aanbod.* | Campaign card: criteria, maximum price € 100.000, supplier carries € 10.000 itself |
| 6 | Meedoen? *Zeg een maximum toe.* / Uit je eigen, gereserveerde budget. Meer niet. | Supplier contribution + four pledges fill the coverage bar, plant grows, "Volledig gedekt" |
| 7 | Pas na bewijs *wordt het geaccepteerd.* | Evidence card, four checks, stamp |
| 8 | Ieder betaalt *een eerlijk deel.* / Nooit meer dan beloofd. | € 100.000 → € 80.000; 18k / 18k / 18k / 16k + supplier 10k |
| 9 | En iedereen *kan meekijken.* / Wie financierde en wat er is opgeleverd: openbaar. | Public campaign page, plant blooms |
| 10 | Samen *goede producten* financieren. / **Eén keer bouwen** — Eén gedeelde vraag, één aanbod. Ieder betaalt een eerlijk deel. / **Weinig moeite** — Sluit aan bij een campagne en zeg een maximum toe. Meer hoeft niet. / **Transparant** — Wie betaalt, wat er wordt gemaakt en wat het kost: voor iedereen zichtbaar. | Three rows with icons, one at a time |
| 11 | Is dit iets wat *we willen?* / Welke uitdagingen zie jij? Hoe lossen we die op? / Reageer of praat met ons mee — sander@epistola.app | End card |

Notes:

- Organisations are fictional. The supplier carries a fixed € 10.000 itself; the remaining
  € 70.000 is split with the water-filling rule used on the site (`fairShares()` in
  `index.html`), maxima 50/30/25/20 % of the final price → 18k / 18k / 18k / 16k.
  How a supplier contribution interacts with fair shares is an assumption made for the video.
- The video names procurement only as the *problem*; it deliberately does not claim bloei.me
  replaces a procurement process, since that is still an open legal question.
