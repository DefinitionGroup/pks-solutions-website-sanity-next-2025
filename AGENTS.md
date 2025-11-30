# Repository Guidelines

## Project Structure & Module Organization
- `app/[locale]/...`: Next.js App Router pages (`page.tsx`, `layout.tsx`).
- `app/api/*/route.ts`: API routes (e.g., `contact`, `draft-mode`).
- `app/studio`: Embedded Sanity Studio at `/studio`.
- `components/`: Reusable React UI (PascalCase files, e.g., `HeroHighlight.tsx`).
- `sanity/`: Schemas, config, and utils (`sanity.config.ts`, `sanity/env.ts`).
- `types/`, `utils/`, `lib/`: Shared types, helpers, clients. Assets in `public/`.

## Build, Test, and Development Commands
- `npm run dev`: Start Next.js with Turbo at `http://localhost:3000` (+ `/studio`).
- `npm run devl`: Start Next.js without Turbo.
- `npm run build`: Create production build.
- `npm start`: Serve production build.
- `npm run lint` / `npm run lint -- --fix`: ESLint check / auto-fix.
- `npm run typecheck`: TypeScript project type-check.

## Coding Style & Naming Conventions
- Language: TypeScript (`strict: true`); 2-space indent, single quotes, trailing commas.
- Components: PascalCase; variables/functions: camelCase.
- App Router files: `page.tsx`, `layout.tsx`; API files: `route.ts` under `app/api/*`.
- Imports: use path aliases like `@/*` and `@/components/*`.
- Styling: Tailwind CSS and `clsx`; avoid inline styles when possible.

## Testing Guidelines
- No unit test framework configured.
- Validate changes with `npm run typecheck` and `npm run lint`.
- For UI/logic changes, document manual test steps and include screenshots in PRs.

## Commit & Pull Request Guidelines
- Commits: short, imperative, and scoped (e.g., "Fix contact form routing"); reference issues (`#123`) when relevant.
- PRs must include: purpose, notable changes, testing notes, screenshots for UI, affected routes, and any env/config updates.
- Ensure lint/typecheck pass locally before requesting review.

## Security & Configuration Tips
- Required env vars (Sanity): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` (optional: `NEXT_PUBLIC_SANITY_API_VERSION`).
- Email (contact API): `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `FROM_EMAIL`, `TO_EMAIL`.
- Do not commit secrets. Keep `.env` local; use Vercel/hosted env management for deployments.

## Common Workflows
- Add a page: create `app/[locale]/<slug>/page.tsx` exporting a default component; use path aliases for imports. Start dev server with `npm run dev` and visit `/<locale>/<slug>`.
- Add an API route: create `app/api/<name>/route.ts` and export `GET`/`POST` handlers. Return `NextResponse.json(...)`; validate inputs and sanitize outputs.
- Edit Sanity schema: update files under `sanity/schemas/*` and run `npm run dev`. Open `/studio` to migrate content or test schema changes. Restart if types or config change.
