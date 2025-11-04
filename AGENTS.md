# Repository Guidelines

## Project Structure & Module Organization
- `app/[locale]/...`: Next.js App Router pages (`page.tsx`, `layout.tsx`).
- `app/api/*/route.ts`: API routes (e.g., `contact`, `draft-mode`).
- `app/studio`: Embedded Sanity Studio at `/studio`.
- `components/`: Reusable React UI (PascalCase files).
- `sanity/`: Schemas, data utils, and config (`sanity.config.ts`, `sanity/env.ts`).
- `public/`: Static assets. `types/`, `utils/`, `lib/`: shared types, helpers, and clients.

## Build, Test, and Development Commands
- `npm run dev`: Start Next.js (Turbo). Visit `http://localhost:3000` and `/studio`.
- `npm run devl`: Start Next.js without Turbo.
- `npm run build`: Production build.
- `npm start`: Serve production build.
- `npm run lint`: ESLint check (use `npm run lint -- --fix` to auto-fix).
- Studio: embedded at `/studio`; optionally `npx sanity dev` to run Studio tooling directly.

## Coding Style & Naming Conventions
- Language: TypeScript (`strict: true`). Prefer 2-space indent, single quotes, trailing commas.
- Components: PascalCase (e.g., `HeroHighLightComponent.tsx`). Vars/functions: camelCase.
- App Router files: `page.tsx`, `layout.tsx`, API `route.ts` under `app/api/*`.
- Imports: use path aliases (`@/*`, `@/components/*`).
- Styling: Tailwind CSS and `clsx`; avoid inline styles when possible.

## Testing Guidelines
- No unit test framework configured. Validate with:
  - Type check: `npm run typecheck`
  - Lint: `npm run lint`
- For UI/logic changes, include manual test steps and screenshots in PRs.

## Commit & Pull Request Guidelines
- Commits: short, imperative, and scoped (e.g., "Fix contact form routing"). Reference issues (`#123`) when applicable.
- PRs must include: purpose, notable changes, testing notes, screenshots for UI, affected routes, and any env/config updates.
- Ensure CI-lint passes locally before requesting review.

## Security & Configuration Tips
- Required env vars (see `sanity/env.ts`): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` (optional: `NEXT_PUBLIC_SANITY_API_VERSION`).
- Email (see `app/api/contact/route.ts`): `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `FROM_EMAIL`, `TO_EMAIL`.
- Do not commit secrets. Keep `.env` local; use Vercel/hosted env management for deployments.
