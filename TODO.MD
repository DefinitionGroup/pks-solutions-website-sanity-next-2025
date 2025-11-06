# TODO: Folder Slugs Implementation (Do Not Apply Yet)

This checklist captures the exact changes to enable path-like slugs (e.g., `services/consulting`) without modifying code now.

## 1) Sanity: Allow `/` in page slugs
- [ ] File: `sanity/schemaTypes/page.ts`
  - [ ] In the `slug` field `options`, update `slugify` to allow `/` and normalize input:
    - Keep letters, numbers, `_`, `-`, and `/`.
    - Collapse multiple slashes and trim leading/trailing slashes.
    - Example:
      ```ts
      slugify: (input: string) =>
        input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9/_-]+/g, '')
          .replace(/\/{2,}/g, '/')
          .replace(/^\/+|\/+$/g, '')
      ```
  - [ ] Add extra validation on the `slug` field to prevent invalid paths:
    ```ts
    validation: (Rule) =>
      Rule.required().custom((slug) => {
        if (!slug) return 'Slug is required'
        if (slug.includes('//')) return 'Slug must not contain //'
        if (slug.startsWith('/') || slug.endsWith('/')) return 'No leading/trailing /'
        return true
      })
    ```
  - [ ] Keep existing `isUnique` logic (no changes required).

## 2) Next.js: Catch‑all route to handle nested slugs
- [ ] Rename:
  - [ ] `app/[locale]/[slug]/page.tsx` ➜ `app/[locale]/[...slug]/page.tsx`
- [ ] Update page params and fetch logic:
  - [ ] Function signature: `params: Promise<{ locale: string; slug: string[] }>`
  - [ ] Compute path for GROQ: `const slugPath = Array.isArray(slug) ? slug.join('/') : slug`
  - [ ] Call `getPageBySlug(slugPath, locale, channel, isEnabled)`
- [ ] Update static params:
  - [ ] In `generateStaticParams`, split nested slugs from Sanity:
    ```ts
    return pages.map(({ slug, locale }) => ({
      locale,
      slug: slug.split('/'),
    }))
    ```
- [ ] Links: No changes required; `resolveSanityLink` already returns `/${locale}/${slug}` and supports nested slugs.

## 3) Manual Test Plan
- [ ] In Studio, create a page with slug `services/consulting` in `de` and mark visible.
- [ ] Visit `/de/services/consulting` in dev; confirm render.
- [ ] Verify internal links pointing to nested pages resolve correctly.
- [ ] Validate Studio slug form blocks leading `/`, trailing `/`, and `//`.

## 4) Rollback / Safety Notes
- [ ] All changes are confined to `page.ts` (Sanity) and a single Next.js route file rename + param handling.
- [ ] If needed, revert to single-segment slugs by restoring the previous route and slugify.

## 5) Optional Enhancements
- [ ] Add a helper util to normalize slugs on the client when constructing links manually (defensive measure).
- [ ] Extend `getAllPageSlugsAndLocales` to include a boolean for nested paths if needed for analytics.
