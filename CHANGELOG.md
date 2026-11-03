# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- `video/`: Remotion project for a ~90 s Dutch explainer video for LinkedIn (1:1, plus a 9:16
  variant), using Epistola auto-translation as the worked example.

### Changed

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
