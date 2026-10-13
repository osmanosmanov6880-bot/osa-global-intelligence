# OSA — Beyond the Model

**Interactive Cinema + Decision Lab release.**

OSA is a bilingual intellectual platform for AI, technology, research, and premium educational experiences. The repository is updated incrementally; a commit is not proof of a completed production deployment.

## Interactive experience
- `/cinema` — three-act interactive story with saved local progress.
- `/cinema/lab` — three practical decision scenarios with contextual feedback and source links.
- **Mission Control** on `/cinema` — personalized seven-day AI practice plan for learning, workflow improvement, or AI pilot design; risk-aware guidance, per-day checkoffs, local progress persistence, and plain-text export.
- Progress is stored in browser `localStorage`; it does not sync across devices.
- The experience is an interactive web story, not a rendered feature film. Do not claim recorded narration, a mastered soundtrack, or MP4 assets unless those files are actually present and verified.

## Main modules
- Next.js App Router, React, TypeScript and Tailwind CSS.
- Russian and English experiences.
- Technology journal and Research Center.
- Source adapters for Hacker News, arXiv, Crossref and OpenAlex.
- DOI/URL deduplication with provider provenance.
- Human editorial moderation; collected materials are not auto-published.
- Research metadata and visible scholarly retraction signals.
- PWA shell and mobile-first local tools.

## Interactive cinema production docs
- [Three-act course specification](docs/interactive-cinema/THREE-ACT-CINEMATIC-COURSE.md)
- [Production status and release gates](docs/interactive-cinema/PRODUCTION-STATUS.md)

## Requirements
- Node.js 22.x
- npm 10+

## Local development
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000/cinema and use the Decision Lab link below the experience.

## Verification
```bash
npm install
npm run check:assets
npm run test:contracts
npm run test:field-log
npm run test:intelligence
npm run test:ux
npm run test:pwa
npm run test:visual
npm run check:syntax
npm run typecheck
npm run lint
npm run build
```
Contract tests and syntax transpilation do not replace a full production build. Live source APIs, database migrations, and deployment configuration must be checked in the target environment.

## Secrets
Never commit production API keys, service-role keys, editor tokens, or real environment files. Configure secrets only in the hosting provider.

## License
No open-source license is declared yet; all rights are reserved unless a license is added.
