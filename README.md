# OSA — Beyond the Model

**Release source: v1.9.0 — Global AI Intelligence & Research Center.**

OSA is a bilingual intellectual platform for AI, technology, research, and premium educational experiences. This repository is being updated incrementally from the existing OSA project; a commit to the repository should not be mistaken for a completed production deployment.

## Main modules
- Next.js App Router, React, TypeScript and Tailwind CSS.
- Russian and English experiences.
- Technology journal and Research Center.
- Source adapters for Hacker News, arXiv, Crossref and OpenAlex.
- DOI/URL deduplication with provider provenance.
- Human editorial moderation; collected materials are not auto-published.
- Research metadata and visible scholarly retraction signals.
- PWA shell and mobile-first local tools.

## Requirements
- Node.js 22.x
- npm 10+

## Local development
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Verification
```bash
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
