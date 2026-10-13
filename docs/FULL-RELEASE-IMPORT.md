# Full release import and verification

The current GitHub branch is **not yet a complete mirror** of the v1.9.0 release. Do not treat the current repository as a production-ready copy until the missing application, intelligence, migration, and asset paths have been imported.

## Safe import from a machine with GitHub access

1. Download the complete release archive from the ChatGPT conversation: `OSA_Global_AI_Intelligence_Research_Center_v1.9.0.zip`.
2. Clone this repository and enter its root.
3. Run `bash scripts/import-full-release.sh /absolute/path/to/OSA_Global_AI_Intelligence_Research_Center_v1.9.0.zip`.
4. Inspect `git status --short` and review the diff. The script deliberately does not commit or push.
5. Confirm no `.env.local`, API keys, Supabase service-role key, editor token, user data, `node_modules`, or `.next` output is staged.
6. Commit on a new branch, push it, and open a pull request.
7. Verify the expected files in GitHub and wait for CI.

## Verify after import

At minimum, these files should exist on the pushed branch:
- `app/api/intelligence/admin/route.ts`
- `lib/intelligence/sources/openalex.ts`
- `scripts/collect-intelligence.mjs`
- `app/cinema/page.tsx` and `components/InteractiveCinema.tsx`
- `public/slides/slide-01.svg`
- `docs/intelligence/SETUP-RU.md`
- all four SQL migrations for the intelligence center
- `package-lock.json` (only if generated and validated using the project's supported Node/npm versions)

The release archive contains source code and documentation; it is not proof of a successful production build or deployment. Run install, typecheck, lint, contract tests, and production build after importing. Never commit real secrets or unlicensed paid media.
