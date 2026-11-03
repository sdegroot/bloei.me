# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Video: the cover ("Wat als we software samen financieren?") is now the first frame of the video,
  held for half a second before fading into the opening, so previews that use the first frame look
  right (now 94 s). `pnpm cover` also renders it as an image (`out/bloei-me-cover-1x1.png` and
  `-9x16.png`) to upload as a custom thumbnail.
- `video/`: Remotion project for a ~90 s Dutch explainer video for LinkedIn (1:1, plus a 9:16
  variant), using Epistola auto-translation as the worked example.

### Changed

- Video: the opening now sets up the problem more slowly: "Stel je voor: Gemeente Oost maakt
  haar brieven met Epistola. Dat werkt goed. Maar er mist één ding: automatisch vertalen." The
  languages appear as dashed "not there yet" chips (now 93 s).
- Video: call to action is now "Wat denk jij? Zou zo'n platform kunnen werken? Laat het weten in
  de reacties.", with the email address as a secondary option.
- Video: the voiceover generator reuses clips by content rather than position, so inserting a
  line keeps the existing takes.
- Video: "bloei.me" is now spoken as "bloei me" (soft *me*, as in *mezelf*) via a new
  `_pronounce` map in `voiceover/lines.json`; the line at ~0:51 now reads "Als het klaar is, laat
  de leverancier zien dat het werkt." for a more natural follow-up to "start de bouw".
- Website (`index.html`): rewrote all text in plain Dutch (B1 level) for civil servants. Jargon such
  as "canoniek netwerk", "verrekeningsnota", "maximale blootstelling", "max-min eerlijk" and
  "idempotentie" is replaced with everyday words; "scenario's" are now "voorbeelden". Structure and
  interactive behaviour are unchanged. The mockup's "Eén canoniek netwerk" now reads "Eén netwerk
  voor iedereen".
- Video: scene 3 now frames the problem as cost plus not knowing others want the same; the
  closing message explains "Eén keer bouwen / Weinig moeite / Transparant" in a sentence each;
  slower pacing in the busier scenes (now 89.5 s).
- Video: shows that anyone, suppliers included, can submit a proposal, and that the supplier
  co-funds (€ 10.000) visibly alongside the organisations.
- Video: background music (CC BY 4.0, Kevin MacLeod; "Easy Lemon" or "Carefree") with
  automatic ducking, a placeholder Dutch voiceover (macOS `say`) synced per segment to the
  on-screen text, and loudness mastering to -14 LUFS.
- Video: voiceover generated with ElevenLabs (Dutch voice "Roos"); new call to action
  "Wat denk jij? … Laat van je horen!".

### Fixed

- Website: removed the links to the design documents (plan, besluiten, API, voorbeelden,
  juridisch, open vragen, incl. "Bekijk alle vragen"). Those documents are not published, so every
  link returned 404.
- Video: voiceover clips are now levelled reliably (measure → gain → limiter). Short clips were
  up to 8 dB too quiet with single-pass `loudnorm` (e.g. "Er wordt opgeleverd" at -25 LUFS); all
  clips now sit within about 1 LU of -17 LUFS.
