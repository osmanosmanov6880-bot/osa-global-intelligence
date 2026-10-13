# OSA Interactive Cinema — production status

## Product scope

The interactive cinema experience is a three-act educational narrative:

1. **AI changes the rules** — a practical model-capability experiment, explanation of probabilistic outputs, limitations, and verification.
2. **Knowledge is power** — a decision scenario about access to information, algorithmic influence, provenance, and accountability.
3. **The human in the loop** — a strategy scenario about using AI productively while retaining judgment and responsibility.

The experience should be described as interactive web storytelling, not as a rendered feature film. Do not claim that recorded narration, a mastered soundtrack, or MP4 video exists unless those assets have actually been generated, reviewed, and committed.

## Current known behavior

- The project README documents `/cinema` and `/cinema/lab`.
- Browser-local progress is not cross-device account sync.
- Interactive choices should change the displayed feedback or next scene; do not ship inert buttons.
- External factual claims must link to their primary sources where practical.
- Generated visuals must not be represented as real documentary footage.

## Release gates

Before public production release:

- [ ] Install dependencies in a network-enabled environment and commit the correct lockfile.
- [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build` successfully.
- [ ] Run the project's contract, UX, PWA, and visual tests.
- [ ] Test `/cinema` and `/cinema/lab` at 320 px, 390 px, tablet, and desktop widths.
- [ ] Verify keyboard navigation, visible focus, Escape behavior, captions/transcripts, and reduced-motion mode.
- [ ] Verify browser progress survives refresh and gracefully handles unavailable storage.
- [ ] Check all cited sources and ensure every quantitative claim has a date and source.
- [ ] Test the actual hosting deployment and HTTPS URLs; a Git commit alone does not prove deployment.

## Media integrity

Use these labels accurately:

- **Interactive scene** — HTML/CSS/JS scene rendered by the application.
- **Narration script** — text prepared for recording; not recorded audio.
- **Captions** — only call timed captions final when they match the actual audio timeline.
- **Video** — only call a scene a video when a playable rendered media file exists.

## Suggested production sequence

1. Stabilize the interactive web experience and verify its full application build.
2. Lock the Russian narration script and fact-check references.
3. Record or synthesize narration using a licensed voice provider; review pronunciation and timing.
4. Generate individual visual shots, then edit and master them with licensed music and sound effects.
5. Create WebVTT from the final audio/video timing, not estimated script timing.
6. Add optional video playback while retaining the interactive web version as the accessible fallback.
7. Measure completion, scene drop-off, decision selections, and return visits before investing in a longer production.

## Truthful launch status

This document is a release checklist, not evidence that production gates have passed. Record test commands, timestamps, deployment URL, and commit SHA in the release record after actual execution.