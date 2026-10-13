# OSA Cinema — Personal Decision Report

## What it does

- Reads the same `osa-cinema-progress-v1` browser-local state as the interactive cinema.
- Turns the three main choices into practical next steps.
- Displays completion counts from locally saved scene progress.
- Exports a plain-text report using a browser-generated Blob.
- Adds a dedicated route at `/cinema/report`; the cinema page links to it.
- Keeps the report private to the browser. No profile is sent to the server, and it is not used for advertising or psychological diagnosis.

## Boundaries

- Progress does not sync across devices and may be unavailable in private browsing or when storage is disabled.
- The report is reflective educational guidance, not a validated assessment of personality, competence, or risk.
- The export includes the user's selections and suggested actions; the user should review it before sharing.

## Validation

Run `node scripts/test-cinema-decision-report.mjs` for the local contract check. This does not replace semantic TypeScript checking, linting, a production build, or browser end-to-end testing.
