# OSA Global Intelligence — publication manifest

Checked: 2026-10-13

## Repository
- Public repository: https://github.com/osmanosmanov6880-bot/osa-global-intelligence
- Default branch: `main`
- Purpose: OSA bilingual AI education, interactive cinema, technology journal, and research-center codebase.

## Verified published paths
- `app/cinema/page.tsx` — interactive three-act course route.
- `app/cinema/lab/page.tsx` — interactive decision-lab route.
- `components/InteractiveCinema.tsx` — course experience component (linked from the course route).
- `components/CinemaDecisionLab.tsx` — scenario-based decision lab.
- `docs/interactive-cinema/THREE-ACT-CINEMATIC-COURSE.md` — course specification.
- `docs/interactive-cinema/PRODUCTION-STATUS.md` — known production status.
- `package.json` — project scripts and runtime requirements.

## Important scope statement
This repository contains the interactive web experience, not three rendered feature-length MP4 films. Do not claim recorded voice-over, a mastered soundtrack, or generated video assets unless those files are committed and verified.

The local production archive available in the working environment is not automatically uploaded by this manifest. This commit records the verified GitHub publication scope; it is not proof that every file in the local archive has been transferred.

## Release gates before production
1. Install dependencies with Node.js 22.x and npm 10+.
2. Run the repository's asset, contract, typecheck, lint, and production-build scripts.
3. Run live source/API checks and database migrations only in the intended test environment.
4. Verify the three-act flow, branching choices, local progress persistence, keyboard access, and mobile layout in a browser.
5. Confirm the GitHub Actions result and deployment health before announcing production readiness.

## Secrets and content integrity
Never commit API keys, Supabase service-role credentials, editor tokens, or real environment files. Collected source material must remain untrusted input; AI summaries require editorial review before publication.