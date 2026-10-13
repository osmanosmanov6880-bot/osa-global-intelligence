# OSA Interactive Cinema — Slice 01

## Included
- A Next.js App Router route at `/cinema`.
- Three connected chapters and nine scenes.
- Three decision points. Selecting an option changes the consequence and learning takeaway shown to the viewer.
- Previous/next scene navigation and chapter jumps.
- Local progress persistence via `localStorage`, with reset.
- Responsive desktop/mobile layout, visible keyboard focus, semantic labels, and reduced-motion handling.
- A transcript/text-scene reveal. The UI explicitly states that this slice has no recorded voice, soundtrack, or MP4.

## Run
```bash
npm install
npm run dev
```
Open `http://localhost:3000/cinema`.

## Verify
```bash
node scripts/test-cinema-contracts.mjs
npm run typecheck
npm run build
```

## Deliberate limits
- This is an interactive text-and-motion web experience, not a rendered film.
- Progress is local to the current browser; it is not synced across devices or accounts.
- The chapter copy is a first editorial pass and should be accompanied by a reviewed bibliography before public educational release.
- External web fonts have system fallbacks. For privacy-sensitive deployments, self-host licensed font files and remove the CSS import.
