# OSA repository transfer status

Checked: 2026-10-13

Repository: https://github.com/osmanosmanov6880-bot/osa-global-intelligence
Default branch: `main`
Visibility: public
Verified repository metadata through the connected GitHub integration. The current README is present and describes the interactive cinema and Research Center modules.

## Important: this is not a verified full-project mirror yet

The GitHub repository reports a size of approximately 61 KB. The separately prepared local release archive `OSA_Global_AI_Intelligence_Research_Center_v1.9.0.zip` was reported as containing 312 files, but the current execution environment does not expose that archive's bytes or the source directory to the GitHub connector. Therefore a byte-for-byte upload and full file-by-file comparison could not be performed in this operation. Do not treat the current repository as a verified mirror of that release until the checks below pass.

## Expected release deliverables to verify

- [ ] Full Next.js application source, including all `app/`, `components/`, `lib/`, `public/`, and script directories.
- [ ] All three interactive cinema parts and decision-lab implementation.
- [ ] Global AI Intelligence / Research Center modules and all source adapters.
- [ ] All migrations, including the Research Center migrations.
- [ ] All 36 presentation slides and the lecture PDF/whitepaper.
- [ ] Premium visual system, images/assets, and PWA files.
- [ ] All contract tests, UX/PWA/visual tests, and quality-gate scripts.
- [ ] `package.json`, lockfile (if generated), TypeScript/Tailwind/Next configuration, and CI workflows.
- [ ] Documentation, source registry, editorial standards, setup and release checklists.
- [ ] No real secrets, `.env.local`, service-role keys, API keys, or private user data.

## Verification procedure

1. Upload/extract the full release into this repository while preserving relative paths; do not replace the project with only a ZIP unless that is an intentional artifact-release strategy.
2. Ensure `.gitignore` excludes local env files, dependencies, build output, and generated secrets.
3. Commit the full file tree to a dedicated branch and open a pull request for review.
4. Compare the local release file inventory against `git ls-tree -r --name-only HEAD`; verify all expected source files are tracked and no secret files are included.
5. Run CI on GitHub Actions: dependency install, quality gate, contract tests, strict typecheck, lint, and production build.
6. Verify GitHub Actions status and commit SHA, then compare the uploaded release archive SHA-256 with the local artifact.
7. Only after those checks pass, mark this transfer complete.

## Security

Never commit production API keys, Supabase service-role keys, editor tokens, Resend credentials, or real environment files. Use GitHub Actions secrets and hosting-provider environment settings. Public source code must contain only placeholder values.
