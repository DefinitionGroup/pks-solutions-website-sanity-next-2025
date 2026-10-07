# Sanity Studio upgrade plan

**Repository:** `pks-solutions-website-sanity-next-2025` (branch `martindev2`)
**Planning for:** the single tree at the repository root, via `package-lock.json` (npm 11.19.0). The Studio is embedded in the Next.js App Router app at `app/studio/[[...tool]]/page.tsx` (`NextStudio` from `next-sanity/studio`), configured by `sanity.config.ts` / `sanity.cli.ts`. There are no other lockfiles or Studio trees in the repository.
**Generated:** 2026-10-07
**Current:** sanity 4.13.0 (resolved in `package-lock.json`)
**Target:** sanity **6.18.0**, the `latest` dist-tag, published **2026-10-06** (one day before this plan). Fallback: 6.17.0 (2026-09-29). It has the same dependency shape apart from patch-level ranges (`@sanity/ui ^4.2.7` vs `^4.3.1`, `@sanity/icons ^5.2.2` vs `^5.2.3`, `@sanity/cli ^8.13.0` vs `^8.14.0`, `@sanity/client ^8.7.0` vs `^8.9.0`). The soak-time choice is question 2 in section 9.
**Span:** two major boundaries (v4 → v5, v5 → v6), plus the rest of the v4 line (4.13 → 4.22.1). The embedded Studio also forces **Next.js 15 → 16**, which is covered here only where it gates this upgrade.

> Version data was read from the npm registry on 2026-10-07. Re-verify before acting on this plan if a lot of time has passed. The Vercel install command is `npm install --legacy-peer-deps`. The working tree also has an uncommitted edit to `vercel.json` that adds `--no-audit --no-fund` and keeps `--legacy-peer-deps`.

## Start here

**Sequence**, one commit and deploy per stop:

0. **Prep on 4.13.0.** Pin ranges, remove the v2-era `@sanity/structure`, and test the install without `--legacy-peer-deps`.
1. **sanity 4.22.1 on Next 15.** Finish the v4 line; patch plugins; `@sanity/image-url` v2.
2. **Next 16.4.0 on sanity 4.22.1.** Isolate the framework major.
3. **sanity 5.31.2.** Studio v5, React 19.2+, add the plugin peers.
   - **3b (still 5.31.2):** `@sanity/document-internationalization` v6 plus the `translation.metadata` data migration.
4. **sanity 6.18.0.** Studio v6, `next-sanity` 13, Node ≥ 22.12 on Vercel.

**These invalidate the plan if you skip them:**

- **Do Next 16 before Studio v5. The order is not optional.** `sanity@5.31.2` imports `useEffectEvent` from `react`. The App Router uses Next's vendored React, and that copy does not export it in Next 15.3.8 (`19.2.0-canary-…-20250409`) or in 15.5.27. Next 16.4.0's copy does. The site would build and keep working while `/studio` breaks. See §3.1.
- **With `--legacy-peer-deps`, npm does not install peer dependencies.** From `@sanity/document-internationalization@5.0.1` on, `sanity-plugin-internationalized-array` is a *peer*, and its v5 adds `@sanity/language-filter` as a peer too. They have to be added to `package.json` directly or the Studio will not build (stops 3 and 3b).

**Changes that fail silently:**

- Studio v5 on Next 15 (above): the site works and the Studio fails.
- The `@sanity/document-internationalization` v6 data format. Until `translation.metadata` documents are migrated, the Studio does not show existing translation links. Nothing errors.
- Smart typography is on by default in v5. Straight quotes and `--` are rewritten as editors type, in three Portable Text fields.
- The v6 search default (`groq2024`). Blog posts stop matching on author name, because `author.name` resolves through a reference.

**Decisions needed before starting:** 10 questions in §9. The two that block work are the Node version on Vercel and whether `translation.metadata` documents exist.

## 1. Summary

The Studio itself is a small upgrade: one config file, around 45 schema files that only use `defineType`/`defineField`, no `@sanity/ui` or `@sanity/icons` imports, no custom components or tools, no `auth` block, and no internal APIs. Most of the work is around the Studio:

1. **The Next.js major.** Every `next-sanity` release that accepts Studio v6 requires `next ^16`. Studio v5 cannot run inside Next 15's App Router anyway (§3.1). So Next 16 is a hard requirement, and it brings three build-breaking edits in this repository (the custom `webpack` block, `next lint`, `middleware.ts`).
2. **Plugin peers under `--legacy-peer-deps`.** The i18n plugins moved dependencies into `peerDependencies` during v5. The install flag hides that, so the packages have to be added by hand.
3. **One content migration.** `@sanity/document-internationalization` v6 needs a one-time migration of `translation.metadata` documents.

Overall size is moderate: roughly a week, most of it on Next 16 and verification, not on Studio code.

## 2. Already satisfied

- **Node (local):** v26.7.0. `sanity@6.18.0` declares `engines.node: >=22.12` and the v4/v5 lines declare `>=20.19 <22 || >=22.12`. Both ranges accept 26.7.0 (checked with `semver.satisfies`). `.nvmrc` is `22`. Vercel is a separate question (§9).
- **`moduleResolution`:** `bundler` in `tsconfig.json`, with no `extends`. Subpath type resolution for `@sanity/*` ESM-only packages works.
- **TypeScript:** 5.8.3 is installed. Next 16 needs ≥ 5.1.
- **styled-components:** 6.1.19 is resolved. `sanity@6.18.0` peers `^6.1.15`.
- **No `auth` block** in `sanity.config.ts`, so the v6 change where `auth.providers` replaces the built-ins does not apply.
- **No `enableLegacySearch`, `beta.form.enhancedObjectDialog`, `scheduledPublishing`, `unstable_use*`, `useRawPerspective`, `useClient()`, `sheetList`, `ServerStyleSheet` or `menuItems([])`** in the config or schemas.
- **No `data-slate` references** anywhere outside `node_modules`, so the 6.3.0 Portable Text DOM change does not apply.
- **No `sanity/_internal` or `sanity/_singletons` imports.**
- **No `@sanity/ui` or `@sanity/icons` imports** in project code (structure icons come from `react-icons/md`). The `@sanity/ui` v4 and `@sanity/icons` v5 migrations inside the v6 line are not this project's work.
- **No custom Vite config, `deployment.autoUpdates`, `appId` or `studioHost`** in `sanity.cli.ts`. The Studio is bundled by Next, not by Vite, so the Vite 8 change and the 6.9.0 `autoUpdates` enforcement do not apply.
- **React strict mode:** `next.config.ts` already sets `reactStrictMode: true`, so the embedded Studio already runs under strict mode in development. The v6 `sanity.cli.ts` default only affects `sanity dev`.
- **TypeGen is not used** (no `sanity.types.ts`, no `typegen` config or script), so the v5 TypeGen renames and the 4.5.0 image-type change do not apply.
- **No `sanity` CLI in `package.json` scripts or CI config** (there is no `.github/`), so the 5.15.0 unknown-flag errors and the 5.18.0 `sanity start` deprecation do not apply.
- **Next 16 async request APIs:** `draftMode()` is already awaited (10 call sites) and `params` is typed as `Promise<…>` in every dynamic route. There is no sync `cookies()`/`headers()`, no `generateSitemaps`, no parallel routes, no AMP, and no runtime config. `images.unoptimized: true`, so the Next 16 image default changes have no effect.

## 3. Needs attention before you start

These conditions are in the current tree before any version changes. Each one adds a variable to every stop below, and the first one decides the order of the whole sequence.

### 3.1 Studio v5 cannot run inside the Next 15 App Router (this decides the sequence)

- `sanity@5.31.2` (`lib/_chunks-es/structureTool.js` and others) contains `import { …, useEffectEvent, … } from "react"`. `sanity@5.0.0` still imported the polyfill package `use-effect-event`, so the switch happened inside the v5 line.
- The App Router resolves `react` to Next's vendored copy. In the installed `next@15.3.8`, `dist/compiled/react` is `19.2.0-canary-3fbfb9ba-20250409` and does **not** export `useEffectEvent`. It only exists as `experimental_useEffectEvent`, in `react-experimental`. `next@15.5.27`, the `backport` tag, ships `19.2.0-canary-0bdb9206-20250818`, which also lacks it. `next@16.4.0` ships `19.3.0-canary-278794d7-20261002`, which exports `useEffectEvent` and `Activity`.
- `next-sanity@11.6.13` declares peers `next ^15.1.0-0 || ^16.0.0-0` and `sanity ^4.22.0 || ^5`, so the peer ranges *allow* Studio v5 on Next 15. The vendored React makes that combination fail at runtime.
- **This is inferred from package contents. It was not run.** It is strong enough that the sequence moves Next 16 *before* Studio v5 (stop 2), where it is cheap: Studio 4.22.1 peers `react ^18 || ^19`, and `next-sanity@11.6.13` peers `next ^16`.

### 3.2 `--legacy-peer-deps` hides peer conflicts, and npm will not install the new required peers

`vercel.json` runs `npm install --legacy-peer-deps`. Under that flag npm does not auto-install peer dependencies and does not report peer conflicts. This upgrade depends on peers in two ways:

- `@sanity/document-internationalization@5.0.1+` moves `sanity-plugin-internationalized-array` from `dependencies` to `peerDependencies`, with no `peerDependenciesMeta`, so it is required. `sanity-plugin-internationalized-array@5.x` in turn peers `@sanity/language-filter ^5.0.0` (required) and `@sanity/assist` (marked optional). Neither is in `package.json` today, so both must be added explicitly.
- Peer ranges are how a plugin says it does not support a core major, and the flag currently discards that signal.

Recommendation: at stop 0, find out what the flag is hiding. Run `npm install --package-lock-only` **without** the flag on a branch and read the ERESOLVE output. If it resolves, drop the flag from `vercel.json`. If it does not, name the conflicts and decide. Either way, add the peers listed in §6 explicitly.

### 3.3 Duplicate majors in the current tree

These come from `npm ls --all` against the installed tree, which matches `package-lock.json`:

| Package | Versions present | Pulled in by |
| --- | --- | --- |
| `@sanity/ui` | 3.1.11 (nested under `sanity`, `@sanity/vision`, `@sanity/visual-editing`, `@sanity/document-internationalization`) **and 2.15.13 (hoisted to root)** | 2.x comes from `sanity-plugin-cloudinary@1.4.0` (`@sanity/ui ^2.15.2`), `sanity-plugin-internationalized-array@3.2.0` and `@sanity/language-filter@4.0.5` |
| `react` | 19.1.0 **and 18.3.1** | 18.3.1 is nested under `@sanity/structure` → `@sanity/initial-value-templates` → `@sanity/icons@1.3.10` |
| `@sanity/client` | 7.12.0, 6.29.1, **3.4.1** | 3.4.1 comes from `@sanity/structure`; 6.29.1 from `@sanity/visual-editing` → `@sanity/mutate` |
| `@sanity/types` / `@sanity/util` | 4.13.0, 3.99.0, 2.36.2 | 3.99.0 from `@sanity/mutator` (via doc-i18n) and `@sanity/language-filter`; 2.36.2 from `@sanity/structure` |

- **`@sanity/structure@2.36.2` is a Studio v2-era package**: its dependencies are `@sanity/client ^3.3.3`, `@sanity/icons ^1.3.4` and `@sanity/initial-value-templates`. Nothing imports it; `sanity/deskStructure.ts` imports `StructureResolver` from `sanity/structure`, which ships with core. It is the only source of React 18 and client v3 in the tree. Remove it at stop 0. This is not a v2 project: `sanity.config.ts` exists and `sanity` resolves to 4.13.0.
- The `@sanity/ui` 2.x copy should go at stop 1 (`internationalized-array` resolves to 3.2.2, which depends on `@sanity/ui ^3.1.11`). The cloudinary copy remains until stop 3. See the version walk in §10.

### 3.4 Imports that resolve only through hoisting

- `app/[locale]/projects/[slug]/page.tsx` imports `@portabletext/react`, and `types/editorial.ts` imports `@portabletext/types`. Neither is in `package.json`; they arrive through `next-sanity`. `next-sanity@11.6.13` depends on `@portabletext/react ^6.0.0` and `13.3.4` on `^7.0.1`, so the version under this import changes at stop 4. Either import `PortableText` from `next-sanity` (it re-exports `@portabletext/react`, verified in the 13.3.4 `dist/index.d.ts`) or declare the package explicitly.

### 3.5 The local `sanity` CLI crashes on Node 26

`npx --no-install sanity --version` fails here with `ReferenceError: require is not defined in ES module scope`, at `node_modules/yargs/yargs:3`. `sanity@4.13.0` depends on `yargs ^17.7.2`. The resolved `yargs@17.7.2` has `"type": "module"`, and its extensionless CommonJS entry file `yargs` is loaded as ESM by Node 26.

This is not an `engines` problem: 26.7.0 satisfies the v4 range. `sanity@4.22.1` still depends on `yargs ^17.7.2`. `sanity@5.31.2` and `6.18.0` do not, and their `@sanity/cli` (6.7.2 / 8.14.0) uses `@oclif/core`.

No script in this repository calls the CLI, so the build is unaffected. It matters at stop 3b, where the data migration runs through `sanity migration run`. On 5.31.2 the yargs path is gone, but **the CLI was not run on Node 26 at that version.** If it fails, run the migration under Node 22 (`nvm use 22`).

## 4. Requirements to meet

| Requirement | Read from | Current | Where to change | Stop |
| --- | --- | --- | --- | --- |
| `react` / `react-dom` `^19.2.2` | `sanity@5.31.2` and `6.18.0` `peerDependencies` | 19.1.0 | `package.json` (19.3.0) | 2 (with Next 16) |
| `react` / `react-dom` `^19.2.3` | `next-sanity@13.3.4` `peerDependencies` | 19.1.0 | same | 2 |
| `next ^16.0.0-0` | `next-sanity@13.3.4` (and every 12.x/13.x) `peerDependencies` | 15.3.8 | `package.json`, `eslint-config-next` | 2 |
| Node `>=22.12` | `sanity@6.18.0`, `@sanity/cli@8.14.0`, `@sanity/visual-editing@6.1.2`, `@sanity/client@8.9.0` `engines` | local 26.7.0 ✓; **Vercel unknown** | Vercel project → Settings → Node.js Version (and optionally `engines.node`) | 4 |
| Node 22.0 to 22.11 rejected | `sanity@4.22.1`/`5.31.2` `engines`: `>=20.19 <22 \|\| >=22.12` | `.nvmrc` = `22` (nvm resolves the newest 22.x) | confirm the patch version on Vercel | 1 |

`engines.node` applies to the build host (Vercel), not to the Content Lake or the browser bundle.

## 5. Breaking changes that apply

### Breaks the build or the Studio

| Change | Boundary | Applies because | Action |
| --- | --- | --- | --- |
| **Studio v5 needs React's `useEffectEvent`, which Next 15's vendored React lacks.** Silent: the site works, `/studio` fails. | v5 (inside the line) | Embedded Studio, `next@15.3.8` (§3.1) | Upgrade to Next 16 before sanity 5 (stop 2 before stop 3) |
| **`@sanity/document-internationalization` v6 stores translation languages in a `language` field instead of `_key`.** Silent: existing translation links stop showing in the Studio until migrated. | plugin major (stop 3b) | `documentInternationalization({...})` in `sanity.config.ts`, 7 schema types | Back up, run `migrateToLanguageField(['translation.metadata'])` (§8.3), verify |
| **Required plugin peers are not installed under `--legacy-peer-deps`** | plugin majors (stops 3, 3b) | `vercel.json` install command (§3.2) | Add `sanity-plugin-internationalized-array` and `@sanity/language-filter` to `dependencies` (§6) |
| **`@sanity/image-url` v2 has no `lib/types/types` subpath.** Its `exports` map is only `.` and `./signed`. | `sanity@4.22.1` depends on `@sanity/image-url ^2.0.1` | `sanity/lib/image.ts:2` imports `@sanity/image-url/lib/types/types` | Import the type from the root (§8.1). The default export is now `@deprecated`, so switch to the named export |
| **Next 16: `next build` fails when a custom `webpack` config is present** (Turbopack is the default) | Next 16 | `next.config.ts` has `webpack: (config) => { config.resolve.fallback = {...setImmediate: false} }` | Remove it, or replace it with `turbopack.resolveAlias`, or build with `--webpack` (§8.4). `npm run dev` already uses `--turbo`, so dev has been running without this block |
| **Next 16 removes `next lint`** | Next 16 | `package.json` `"lint": "next lint"`; `.eslintrc.json` (legacy format; `eslint-config-next` 16 defaults to flat config) | Run the reader-side codemod `npx @next/codemod@canary next-lint-to-eslint-cli .` and bump `eslint-config-next` to 16.4.0 |
| **Next 16 deprecates `middleware.ts`; it is now `proxy.ts`** | Next 16 | `middleware.ts` with `export default function middleware` and no `runtime` export (the `nodejs`-only proxy runtime is fine) | Rename the file to `proxy.ts` and the function to `proxy` (§8.5). The `matcher` already excludes `/studio` |
| **Node ≥ 22.12 on the build host** | v6 | Vercel Node version unknown | Set it before stop 4 (§4, §9 Q1) |
| **Plugins without v6 support at the installed versions.** `sanity-plugin-cloudinary@1.4.0` peers `sanity ^3 \|\| ^4.0.0-0` and `@sanity/document-internationalization@4.1.0` peers `sanity ^3.40.0 \|\| ^4.0.0-0`. | v5, v6 | Both are in `plugins` in `sanity.config.ts` | Per-stop versions in §7 and §10 |

### Changes behavior, needs a decision

| Change | Boundary | Applies because | Decision |
| --- | --- | --- | --- |
| **Smart typography on by default.** Writes curly quotes, en/em dashes and ellipses into stored content. This reverses the 4.16.0 default. | v5.0.0 | Portable Text fields: `sanity/schemaTypes/Blog/post.ts:122`, `PKS/components/ContentSection.ts:17`, `PKS/components/EditorialBlocks.ts:6` | Keep it, or disable it globally or per field (§9 Q5) |
| **Default search strategy is now `groq2024`.** Preview fields that resolve through a reference no longer count for matching. | v6.0.0 | `Blog/post.ts` preview selects `author: "author.name"`, and `author` is `type: "reference"`. `objects/link.ts` selects `internalReference.title`, but `link` is an object type, not a document, so it is not searched. The other dotted selects are object paths (`content.title`, `leftSection.subtitle`, …) and are unaffected. | Accept, or set `search: {strategy: 'groqLegacy'}` temporarily (§9 Q4) |
| **`scheduledDrafts` on by default** | v4.14.0 | Every project crossing 4.14 | Keep or disable (§9 Q6) |

### Worth knowing, no action

- 5.8.0 (v5): pasting a URL into Portable Text now creates a `link` annotation. `EditorialText.tsx` and the default block types already handle `link` marks.
- 5.14.0 (v5): previews without `media` fall back to the schema type icon. 32 `prepare()` functions; most return no `media`, so editors will see icons where previews were blank.
- 5.14.0 (v5): duplicating an array item regenerates nested `_key`s. This matters for the pagebuilder arrays in `page.ts`, but only if something caches by `_key`.
- 6.6.0 (v6): stega characters are stripped when pasting into plain-text fields. Stega is enabled (`sanity/lib/client.ts`). Already-stored stega characters would need `stegaClean`; see §9 Q9.
- 6.7.0 (v6): `Rule.uri({scheme})` combined with other rules accepts custom schemes. `EditorialBlocks.ts` combines `required()` with `uri({scheme: [... 'mailto', 'tel']})`, so `mailto:`/`tel:` links that were wrongly rejected will now validate.
- 6.9.0 (v6): `defineType`/`defineField` return types keep optional properties. Expect possible new `tsc` errors in schema files.
- 6.17.0 (v6, after the reference files' coverage, read from the changelog): long arrays collapse behind a "show all items" toggle. Editors of long pagebuilder arrays will see this.
- 6.17.0: first-class singletons API. This is an opportunity, not a requirement.
- TypeGen is GA (5.10.0) and not used here. It can be adopted later with nothing to migrate.
- `next-sanity` 12 → 13 removed several `SanityLive`/`defineLive` options (`stega`, `fetchOptions`, `refreshOn*`, hooks). `sanity/lib/live.ts` calls `defineLive({client})` only, and `sanityFetch`/`SanityLive` are not used anywhere, so none of those removals apply. The `defineLive({client})` overload still exists in 13.3.4 `dist/live/conditions/default/index.d.ts`.

## 6. Dependency changes

Final state, at stop 4. The per-stop versions are in §10.

```jsonc
"dependencies": {
  "sanity": "6.18.0",                               // was 4.13.0
  "@sanity/vision": "6.18.0",                       // was 4.13.0 - lockstep, peers sanity ^6.0.0-0
  "next-sanity": "13.3.4",                          // was 11.6.4 - peers next ^16, sanity ^5.29.0 || ^6.0.0, react ^19.2.3
  "next": "16.4.0",                                 // was 15.3.8 - required by next-sanity >=12
  "react": "19.3.0",                                // was ^19.1.0 (19.1.0) - sanity peers ^19.2.2, next-sanity ^19.2.3
  "react-dom": "19.3.0",                            // was ^19.1.0 (19.1.0)
  "@sanity/client": "7.27.0",                       // was 7.12.0 - satisfies next-sanity peer ^7.26.2 || ^8 and its dep ^7.26.2
  "@sanity/image-url": "2.1.1",                     // was ^1.1.0 (1.2.0) - matches core's ^2.1.1; code edit §8.1
  "@sanity/document-internationalization": "6.2.39",// was 4.1.0 - peers sanity ^5 || ^6.0.0-0; data migration §8.3
  "sanity-plugin-internationalized-array": "5.3.2", // NEW - required peer of doc-i18n 6.x
  "@sanity/language-filter": "5.0.19",              // NEW - required peer of internationalized-array 5.x
  "sanity-plugin-cloudinary": "2.1.5",              // was 1.4.0 - peers sanity ^5 || ^6.0.0-0
  "styled-components": "6.1.19",                    // was ^6.1.17 - pin to the resolved version; core peers ^6.1.15
  // REMOVED "@sanity/structure"      - v2-era, unused, only source of react 18 / client 3 (§3.3)
  // REMOVED "@sanity/visual-editing" - not imported; next-sanity 13.3.4 depends on ^6.0.4 itself, a 4.0.0 pin adds a second major
  ...
},
"devDependencies": {
  "@sanity/cli": "8.14.0",                          // was 4.13.0 - match sanity@6.18.0's dependency ^8.14.0 (no longer lockstep with core since v5)
  "eslint-config-next": "16.4.0",                   // was 15.3.0
  "@types/react": "^19", "@types/react-dom": "^19", // unchanged; resolve to 19.3.0 / 19.2.3 today
  ...
}
```

`@sanity/react-loader@2.0.0` is also a direct dependency that nothing imports. It does not affect the Studio and can go whenever convenient.

**Expected after stop 4, unverified.** One `@sanity/ui` 4.x and one `@sanity/icons` 5.x in the Studio path. `@sanity/vision@6.18.0` and `sanity@6.18.0` also depend on an `npm:@sanity/ui@5.0.0-alpha.14` alias named `ui5`; that is core's own choice, not a conflict. Two `@sanity/client` majors are expected: 7.x for next-sanity and 8.x nested under `sanity`, which depends on `^8.9.0`. The client carries no React context, so this duplicate is benign. Only a resolver can confirm any of this. Before committing each stop, run:

```sh
npm install --package-lock-only
npm ls --all @sanity/ui @sanity/icons @sanity/client react react-dom styled-components sanity
```

## 7. Plugins

| Plugin | Installed | Latest | Peer `sanity` at latest | Owner (`repository`) | Verdict |
| --- | --- | --- | --- | --- | --- |
| `@sanity/document-internationalization` | 4.1.0 | 6.2.39 (latest modified 2026-09-29) | `^5 \|\| ^6.0.0-0` | `sanity-io/plugins` | Compatible. Bump per stop: 4.1.1 → 5.1.3 → 6.2.3 → 6.2.39. **v6 needs a data migration.** |
| `sanity-plugin-cloudinary` | 1.4.0 | 2.1.5 | `^5 \|\| ^6.0.0-0` | `sanity-io/plugins` | Compatible. Bump per stop: 1.4.1 → 2.0.4 → 2.1.5. `cloudinarySchemaPlugin` (`Plugin<void>`) and the `cloudinary.asset` type name are verified in 2.0.4 and 2.1.5 |
| `sanity-plugin-internationalized-array` (transitive today, direct from stop 3) | 3.2.0 | 5.3.2 | `^5 \|\| ^6.0.0-0` | `sanity-io/plugins` | Add as a direct dependency: 4.0.8 at stop 3, 5.1.4 at 3b, 5.3.2 at stop 4 |
| `@sanity/language-filter` (transitive today, direct from 3b) | 4.0.5 | 5.0.19 | `^5 \|\| ^6.0.0-0` | `sanity-io` | Add as a direct dependency: 5.0.4 at 3b, 5.0.19 at stop 4 |
| `@sanity/vision` | 4.13.0 | 6.18.0 | `^6.0.0-0` | `sanity-io/sanity` | Lockstep with core |
| `structureTool`, `presentationTool` | core | – | – | core (`sanity/structure`, `sanity/presentation`) | Ship with `sanity` |

No plugin blocks the upgrade, and no plugin comes from a private registry.

Notes from the plugins' own manifests and READMEs:

- **doc-i18n `PluginConfig`** (`supportedLanguages`, `schemaTypes`, `weakReferences`) is unchanged in the 4.1.1, 5.1.3, 6.2.3 and 6.2.39 type declarations, so `sanity.config.ts` needs no edit.
- **doc-i18n 6.2.39** imports `@sanity/ui/styles.css` in its type entry. This matches `@sanity/ui` v4, which core also uses at 6.18.0.
- **cloudinary 2.x** depends on `@sanity/studio-secrets ^4` (1.x used `^3`). After stop 3, check in the Studio that the stored Cloudinary credentials are still picked up (§11).

## 8. Code changes

### 8.1 `sanity/lib/image.ts` (stop 1)

The named export and the `SanityImageSource` type were verified in `@sanity/image-url@2.1.1` `lib/index.d.ts`: `export declare function createImageUrlBuilder(`, `export declare type SanityImageSource`, and the default export marked `@deprecated`.

```ts
// before
import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// after
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
```

### 8.2 `package.json` scripts (stop 2)

`"lint": "next lint"` no longer exists in Next 16. Use the official codemod (`npx @next/codemod@canary next-lint-to-eslint-cli .`), which also handles `.eslintrc.json` → flat config. Update `"dev": "next dev --turbo"` to `"next dev"`; Turbopack is now the default.

### 8.3 Translation metadata migration (stop 3b)

The steps come from the `@sanity/document-internationalization@6.2.39` README section "Migrating to v6". The export was verified: `sanity-plugin-internationalized-array@5.1.4` and `5.3.2` both have `./migrations` in `exports`, with `declare function migrateToLanguageField(documentTypes: string[])`.

```ts
// VERIFY: file location/naming convention expected by `sanity migration run`
// (e.g. migrations/<name>/index.ts) - check https://www.sanity.io/docs/cli-reference/cli-migration
import {migrateToLanguageField} from 'sanity-plugin-internationalized-array/migrations'

export default migrateToLanguageField(['translation.metadata'])
```

```sh
npx sanity dataset export production ./backup-before-i18n-v6.tar.gz   # dataset name: check NEXT_PUBLIC_SANITY_DATASET
npx sanity migration run migrateToLanguageField                        # dry run
npx sanity migration run migrateToLanguageField --no-dry-run
```

Frontend GROQ does not read `translation.metadata` (no matches for `translation.metadata`, `_translations` or `translations[` outside `node_modules`), so no query edits are needed. See §3.5 for running the CLI on Node 26.

### 8.4 `next.config.ts` webpack block (stop 2)

Option A, preferred: delete the `webpack` key. Dev already runs on Turbopack (`--turbo`), which ignores it, so if `next build` succeeds without it, it was not needed. Option B: keep Webpack via `"build": "next build --webpack"`. Option C: express the fallback for Turbopack:

```ts
// VERIFY: whether a browser alias is still needed for `setImmediate` at all, and the exact
// resolveAlias shape - see https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack
turbopack: {
  resolveAlias: {
    setImmediate: { browser: './empty.ts' },
  },
},
```

### 8.5 `middleware.ts` → `proxy.ts` (stop 2)

From the Next 16 upgrade guide: rename the file, and rename the default-exported function from `middleware` to `proxy`. `export const config = { matcher: [...] }` stays as is. The codemod `npx @next/codemod@canary upgrade latest` can do both.

## 9. Questions only you can answer

1. **Which Node version does the Vercel project build with?** Stop 4 needs ≥ 22.12. Stops 1 to 3 reject 22.0 to 22.11. `.nvmrc` says `22`, but whether the Vercel setting follows it could not be determined from the repository. If it is 20.x, stop 4 fails at install.
2. **Ship 6.18.0, published 2026-10-06, or soak on 6.17.0?** The recommendation is 6.18.0. The difference is patch-level dependency ranges only (see the header). If your change process wants a week of field reports, pin 6.17.0 / `@sanity/vision@6.17.0` and review on 2026-10-21.
3. **Do `translation.metadata` documents exist, and how many?** Run `count(*[_type == "translation.metadata"])` in Vision. If the result is 0, stop 3b is a version bump only. If it is non-zero, the migration in §8.3 is mandatory before editors use the Studio on doc-i18n v6.
4. **Do editors find blog posts by typing the author's name?** Under `groq2024` that stops matching. If they do, set `search: {strategy: 'groqLegacy'}` for now.
5. **Smart typography:** is Portable Text content (blog body, content sections, editorial blocks) consumed anywhere that matches strings exactly, or rendered in a font missing curly quotes and dashes? If so, disable it before stop 3 goes to editors.
6. **Scheduled drafts** (on by default since 4.14.0): wanted? If not, disable it in config at stop 1.
7. **Why `--legacy-peer-deps`?** If it was added for a non-Sanity package, that conflict needs a separate fix before the flag can go (§3.2).
8. **Is the Studio also deployed anywhere with `sanity deploy`, and does anyone run the `sanity` CLI outside this repository?** `sanity.cli.ts` has no `studioHost`, so this plan assumes `/studio` on Vercel is the only Studio.
9. **Have editors pasted from the preview into plain-text fields?** If so, stored content may contain stega characters that 6.6.0 now strips only on paste. A one-off `stegaClean` pass would be needed. Low likelihood.
10. **Vercel runs `npm install`, not `npm ci`.** Is the lockfile treated as authoritative on deploys? With exact pins (§6) the difference shrinks, but it is worth confirming.

## 10. Suggested sequence

At every stop, run `npm install --package-lock-only`, then the `npm ls` command from §6, then `npm run typecheck`, `npm run build`, and the §11 checks, before deploying a Vercel preview.

**Stop 0: prep on sanity 4.13.0.** Nothing changes version.
- Pin the caret ranges to the lockfile: `react`/`react-dom` 19.1.0, `styled-components` 6.1.19, `@sanity/image-url` 1.2.0.
- Remove `@sanity/structure` and `@sanity/visual-editing`. `next-sanity@11.6.4` already depends on `@sanity/visual-editing ^4.0.0`, so the version in use does not change.
- Run `npm install --package-lock-only` without `--legacy-peer-deps` and record the output (§3.2).
- Answer §9 Q1 and Q3.

**Stop 1: sanity 4.22.1** (the `maintenance-v4` tag; a patch above 4.22.0), still on Next 15.3.8.
- Pins: `sanity`/`@sanity/vision`/`@sanity/cli` 4.22.1, `next-sanity` 11.6.13 (peers `sanity ^4.22.0 || ^5`, `next ^15.1.0-0 || ^16.0.0-0`), `@sanity/client` 7.27.0 (core needs `^7.13.2`), `@sanity/image-url` 2.1.1 plus §8.1, `@sanity/document-internationalization` 4.1.1 (peers `sanity ^3.40.0 || ^4.0.0-0 || ^5`; depends on `@sanity/ui ^3.1.11`, `@sanity/icons ^3.7.4`, matching core's `^3.1.11` / `^3.7.4`), `sanity-plugin-cloudinary` 1.4.1.
- **Accepted duplicate, version walk shown:** `@sanity/ui` 2.x remains through cloudinary. Every 1.x release (1.4.0, 1.4.1) depends on `@sanity/ui ^2.15.2`. The first release on `@sanity/ui` 3, 2.0.0, peers `sanity ^5 || ^6.0.0-0` and `react ^19.2`, so it cannot install on v4. The duplicate is pre-existing (§3.3) and goes away at stop 3.
- Expected: `sanity-plugin-internationalized-array` resolves to 3.2.2 (`@sanity/ui ^3.1.11`), which removes its 2.x copy. Unverified; check with `npm ls`.
- Do not stop on 4.4.0 (malformed `engines`).

**Stop 2: Next 16.4.0 on sanity 4.22.1.**
- `next` 16.4.0, `react`/`react-dom` 19.3.0, `eslint-config-next` 16.4.0, and §8.2, §8.4, §8.5. `next-sanity` stays at 11.6.13 (peers `next ^16.0.0-0` ✓, `react ^18.3 || ^19` ✓). `sanity@4.22.1` peers `react ^18 || ^19` ✓.
- This stop exists because Studio v5 cannot run on Next 15 (§3.1). It also keeps the framework major separate from the Studio majors, so a failure here is a Next problem.

**Stop 3: sanity 5.31.2** (the `maintenance-v5` tag; a patch above 5.31.1).
- `sanity`/`@sanity/vision` 5.31.2, `@sanity/cli` 6.7.2 (core depends on `^6.7.2`), `next-sanity` stays 11.6.13 (peers `sanity ^5`).
- `@sanity/document-internationalization` **5.1.3** (peers `sanity ^5`, `sanity-plugin-internationalized-array ^4.0.2`; depends on `@sanity/ui ^3.1.13`, `@sanity/icons ^3.7.4`). Add **`sanity-plugin-internationalized-array` 4.0.8** (`@sanity/ui ^3.1.13`, `@sanity/icons ^3.7.4`; still on the `_key` format, so no data change yet).
- `sanity-plugin-cloudinary` **2.0.4**. Walk: 2.0.0 to 2.0.4 depend on `@sanity/ui ^3.2.0` and `@sanity/icons ^3.7.4`, which is exactly core 5.31.2's `^3.2.0` / `^3.7.4`. 2.0.5 moves to `@sanity/icons ^4.1.0` and 2.1.1 to `@sanity/ui ^4`, so they are not used here.
- Expected: a single `@sanity/ui` 3.x and a single `@sanity/icons` 3.x. Unverified; check with `npm ls`.
- Decide §9 Q5 (typography) before editors use this stop.

**Stop 3b: doc-i18n v6 on sanity 5.31.2.** This stop is the content migration, kept apart from any core change and done at a stop with one theme major.
- `@sanity/document-internationalization` **6.2.3**. Walk: 6.2.1 to 6.2.3 depend on `@sanity/util ^5.21.0`, `@sanity/ui ^3.2.0` and `@sanity/icons ^3.7.4`, all matching core 5.31.2. 6.2.4+ moves to `@sanity/util ^6`.
- `sanity-plugin-internationalized-array` **5.1.4** (`@sanity/ui ^3.2.0`, `@sanity/util ^5.21.0`, `@sanity/icons ^3.7.4`; 5.1.5+ moves to `@sanity/util ^6`).
- Add `@sanity/language-filter` **5.0.4** (`@sanity/ui ^3.2.0`, `@sanity/icons ^3.7.4`; 5.0.5+ moves to icons 4/5).
- Run §8.3.
- 6.2.3 pins `sanity-plugin-utils@2.0.0`, which peers `rxjs ^7.8`. `rxjs` is present through `sanity`, but it is a hoisting dependency under `--legacy-peer-deps`.

**Stop 4: sanity 6.18.0.**
- `sanity`/`@sanity/vision` 6.18.0, `@sanity/cli` 8.14.0, `next-sanity` 13.3.4, `@sanity/document-internationalization` 6.2.39 (`@sanity/ui ^4.2.7`, `@sanity/icons ^5.2.2`, `@sanity/util ^6.16.0`), `sanity-plugin-internationalized-array` 5.3.2, `@sanity/language-filter` 5.0.19, `sanity-plugin-cloudinary` 2.1.5 (`@sanity/ui ^4.2.7`, `@sanity/icons ^5.2.2`). Core needs `@sanity/ui ^4.3.1` and `@sanity/icons ^5.2.3`; all are the same majors.
- The Vercel Node version must be ≥ 22.12 first. Handle §3.4 (`@portabletext/react` 6 → 7 under the hoisted import).
- **Cost of combining:** `next-sanity` 11 → 13 lands in the same commit as Studio v6. They cannot be split. `next-sanity@11.6.13` does not peer `sanity ^6`. `next-sanity@13.x` before 13.3.2 can run on Studio v5, but pulls `@sanity/visual-editing` 5.4.5+ with `@sanity/icons 5`, or with a direct pin to 5.4.4, `13.1.1` only. That adds a stop whose only content is a library with no applicable breaking changes here (§5, last item). If something breaks at stop 4, the cause could be either the Studio v6 boundary or next-sanity 12/13, so bisect by checking `/studio` (Studio) separately from the site and `draftMode` preview (next-sanity).

## 11. Test checklist

**Build and types (every stop)**

- [ ] `npm install --package-lock-only` resolves; `npm ls` shows the expected single majors (§6, §10)
- [ ] `npm run typecheck`. Expect possible new errors in schema files at stop 4 (6.9.0 `defineType` typing) and in `sanity/lib/image.ts` at stop 1
- [ ] `npm run build` on Vercel preview with the production install command
- [ ] Stop 2: the lint script (post-codemod) runs; `next build` passes without the `webpack` block

**Functional**

- [ ] `/studio` loads, structure lists render: Blogs per language, channel-specific pages and menus (the `S.initialValueTemplateItem(...)` items in `sanity/deskStructure.ts`)
- [ ] Create a page from the "Page with Channel" template; `channel` and `language` are pre-filled
- [ ] doc-i18n: open an existing translated page and blog post, and the translation menu lists the other language. **At stop 3b, check this before and after the migration.**
- [ ] doc-i18n: create a new translation from the menu (`weakReferences: true`)
- [ ] Cloudinary: pick an asset in a `cloudinary.asset` field (for example `Clients/project.ts`). Stored credentials are still recognised after the 2.x bump (stop 3)
- [ ] Presentation tool opens `/` via `/api/draft-mode/enable`; `VisualEditing` overlays are clickable on `/[locale]/[slug]`, `/blog/[slug]`, `/clients`, `/projects`
- [ ] Vision tool runs a query with `defaultApiVersion` from `sanity/env.ts`
- [ ] Portable Text (stop 3+): type `"quote" -- ...` in a blog body and check what is stored, per your Q5 decision
- [ ] Editorial link with `mailto:` while required: validates (stop 4, 6.7.0)
- [ ] Search (stop 4): search for a blog post by author name, per Q4
- [ ] Site routes: `/de`, a retired path returns 410, `/en/...` returns 410 (`proxy.ts` behaves like `middleware.ts`); `/sitemap.xml`; images from `res.cloudinary.com` and `cdn.sanity.io` render

## 12. Sources

- Registry, 2026-10-07: `npm view` of `dist-tags`, `time`, `versions`, `engines`, `peerDependencies`, `peerDependenciesMeta`, `dependencies`, `exports` and `repository` for `sanity` (4.13.0, 4.22.1, 5.31.2, 6.17.0, 6.18.0), `@sanity/vision`, `@sanity/cli`, `next-sanity` (every 11.6.x–13.3.x, peer ranges evaluated with `semver.satisfies`), `next` (15.3.8, 15.5.27, 16.4.0), `@sanity/document-internationalization` (4.1.0–6.2.39), `sanity-plugin-cloudinary` (1.4.0–2.1.5), `sanity-plugin-internationalized-array` (3.2.x–5.3.2), `@sanity/language-filter`, `sanity-plugin-utils`, `@sanity/visual-editing`, `@sanity/image-url`, `@sanity/client`, `@sanity/structure`, `react`, `styled-components`
- Package contents inspected with `npm pack` into a scratch directory outside the repository: `sanity@5.0.0` and `5.31.2` (`useEffectEvent` source), `next@15.5.27` and `16.4.0` (`dist/compiled/react`), the installed `next@15.3.8`, `next-sanity@11.6.13`/`13.1.1`/`13.3.4` type entries, `@sanity/image-url@2.1.1`, doc-i18n 4.1.1/5.1.3/6.2.3/6.2.39 (types and README "Migrating to v6"), cloudinary 2.0.4/2.1.5, internationalized-array 5.1.4/5.3.2 (`migrations` export)
- Sanity changelog (raw, read through 6.18.0): https://raw.githubusercontent.com/sanity-io/sanity/main/CHANGELOG.md. 6.13.0 to 6.18.0 were read directly; 4.13 to 6.12.0 come from the skill's verified reference set (4.0.0 to 6.12.0)
- Studio v5 release: https://www.sanity.io/docs/changelog/fd3ab62e-9264-4e7b-825a-fd4f99abd481
- Studio v6 release: https://www.sanity.io/docs/changelog/studio-NS4zMS4w and https://www.sanity.io/blog/sanity-studio-v6
- next-sanity migration guides: https://github.com/sanity-io/next-sanity/blob/main/packages/next-sanity/MIGRATE-v11-to-v12.md, https://github.com/sanity-io/next-sanity/blob/main/packages/next-sanity/MIGRATE-v12-to-v13.md
- Next.js 16 upgrade guide (docs version 16.3.8, updated 2026-08-25): https://nextjs.org/docs/app/guides/upgrading/version-16
- `@sanity/image-url` v1 → v2 migration guide (referenced from its README): https://github.com/sanity-io/image-url/blob/main/MIGRATE-v1-to-v2.md (not read; the code change in §8.1 was verified from the 2.1.1 type declarations instead)
