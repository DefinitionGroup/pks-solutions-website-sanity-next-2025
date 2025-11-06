# Update Summary and Examples

This document summarizes the changes implemented across Studio, content schemas, and the app, with concise examples for quick adoption.

## Overview
- Cloudinary media hardening and hover component now supports video.
- Removed Superside copy/paste plugin; safer duplication workflows.
- Button + link handling reworked (optional URLs, locale-aware internal links).
- Homepage selection via `isHomepage` with uniqueness validation; Desk shortcuts.
- Sanity + next-sanity upgrades and import updates for visual editing/live APIs.

---

## Cloudinary Media

- Optional chaining and fallbacks added to avoid crashes when Cloudinary fields are missing.
- DirectionAwareHover now supports Cloudinary video and image sources transparently.

Example: safe logo rendering in GridHero2

```tsx
// components/Content/GridHero2.tsx
{(right?.logos ?? []).map((logo, index) => (
  <div key={`${_key}-logo-${index}`} className="...">
    <Image
      aria-hidden
      src={logo?.secure_url || "/images/placeholder.jpg"}
      alt="Logo"
      width={164}
      height={164}
      className="..."
    />
  </div>
))}
```

Example: Direction-aware hover supporting video or image (auto detection)

```tsx
// components/ui/direction-aware-hover.tsx (key bits)
const src = typeof imageUrl === 'string' ? imageUrl : imageUrl?.secure_url || ''
const isVideo = src.includes('/video/upload') || /\.(mp4|webm|ogg)(\?|#|$)/i.test(src)

return (
  <motion.div>
    {isVideo ? (
      <video src={src} autoPlay muted loop playsInline className="object-cover ..." />
    ) : (
      <Image src={src || '/images/placeholder.jpg'} alt="image" width={1000} height={1000} className="object-cover ..." />
    )}
  </motion.div>
)
```

Usage (no changes required):

```tsx
<DirectionAwareHover imageUrl={item.hoverBackgroundCloudinary?.secure_url} ...>
  ...
</DirectionAwareHover>
```

---

## Copy/Paste Plugin Removal

- Removed `@superside-oss/sanity-plugin-copy-paste` from Studio and schemas due to React 19 peer mismatch and custom type (cloudinary.asset) serialization pitfalls.
- Recommended: use Studio’s built-in “Duplicate” action on array items; it’s reliable and schema-safe.

What changed

```diff
// sanity.config.ts
-import { copyPastePlugin } from '@superside-oss/sanity-plugin-copy-paste'
-plugins: [ ..., copyPastePlugin() ]

// Various schema files
-import { copyPaste } from '@superside-oss/sanity-plugin-copy-paste'
-defineField(copyPaste)
```

If needed later: we can add a focused custom “Copy (no media)” action for specific objects.

---

## Buttons and Link Resolution

Goals achieved
- URLs are optional. Buttons render non-clickable UI if no link.
- Internal links are locale-aware (`/${locale}/${slug}`) and work across nested modules.
- External links remain unchanged.

Button component behavior

```tsx
// components/Button2.tsx (behavior summary)
const hasHref = Boolean(href && href.trim())
const isExternal = hasHref && /^(https?:|mailto:|tel:)/.test(href!)

return (
  <div className="...">
    {!hasHref ? (
      <>
        <div className={linkProps.className(true)}>{content(false)}</div>
        <div className={linkProps.className(false)}>{content(true)}</div>
      </>
    ) : isExternal ? (
      <>
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkProps.className(true)}>{content(false)}</a>
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkProps.className(false)}>{content(true)}</a>
      </>
    ) : (
      <>
        <Link href={href as string} className={linkProps.className(true)}>{content(false)}</Link>
        <Link href={href as string} className={linkProps.className(false)}>{content(true)}</Link>
      </>
    )}
  </div>
)
```

Locale-aware link resolver

```ts
// utils/linkResolver.ts
export const resolveSanityLink = (link: any, locale?: string): string => {
  if (!link) return ''
  if (link.linkType === 'external') return link.externalUrl || ''
  if (link.linkType === 'internal') {
    const slug = link.internalReference?.slug?.current
    return slug ? (locale ? `/${locale}/${slug}` : `/${slug}`) : ''
  }
  return ''
}
```

GROQ link dereferencing

- Internal references are dereferenced (→) to include `slug.current`, both at top-level content blocks and inside nested hero modules.

```groq
// sanity/fetchData.ts (excerpt)
contentPKS[] {
  ...,
  _type == 'gridHero' => {
    ...,
    sectionOne { middle { ctaButton { name, link { ..., linkType, externalUrl, internalReference-> { slug { current } } } } } },
    sectionTwo { rightSection { ctaButton { name, link { ..., linkType, externalUrl, internalReference-> { slug { current } } } } } }
  },
  // ...gridHero2/gridHero3/zwischenTitelCta/sciFiBlock/tripleHero items/banner ctas
}
```

Passing locale into components

```tsx
// components/RenderContent.tsx
<GridHero {...(block as GridHeroType)} locale={locale} />
<GridHero2 {...(block as GridHero2Type)} locale={locale} />
<GridHero3 {...(block as GridHero3Type)} locale={locale} />
<ZwischenTitelCta {...(block as ZwischenTitelCtaType)} locale={locale} />
<TripleHero {...(block as SciFiBlockType).tripleHero} locale={locale} />
```

---

## Homepage Selection

- Added `isHomepage` boolean to `page` with unique-per-language+channel validation.
- Added `getHomepage(locale, channel, draft?)` and switched `app/[locale]/page.tsx` to use it.
- Desk shows a dedicated “Homepage” item under each channel/language and preview subtitle includes a house badge.

Schema (field + validation)

```ts
// sanity/schemaTypes/page.ts (excerpt)
defineField({
  name: 'isHomepage',
  title: 'Homepage',
  type: 'boolean',
  initialValue: false,
  validation: (Rule: any) =>
    Rule.custom(async (value: boolean, context: any) => {
      if (!value) return true
      const { document, getClient } = context
      const language = document?.language || 'de'
      const channel = document?.channel || 'pksWeb'
      const baseId = (document?._id || '').replace(/^drafts\./, '')
      const client = getClient({ apiVersion: '2024-10-01' })
      const query = `count(*[_type == \"page\" && isHomepage == true && language == $language && channel == $channel && !(_id in [$draftId, $publishedId])])`
      const params = { language, channel, draftId: `drafts.${baseId}`, publishedId: baseId }
      const count = await client.fetch(query, params)
      return count === 0 || 'Another homepage already exists for this language + channel.'
    }),
})
```

Fetching and rendering homepage

```ts
// sanity/fetchData.ts
export const getHomepage = async (locale: string, channel: string, draft = false) => {
  const query = groq`*[_type=='page' && language==$locale && channel==$channel && isHomepage==true][0]{
    title, slug, contentPKS[]{ ... /* link derefs included */ }, language, channel
  }`
  const options = draft ? { perspective: 'previewDrafts', useCdn: false, stega: true } : {}
  return client.fetch(query, { locale, channel }, options)
}
```

```tsx
// app/[locale]/page.tsx (excerpt)
const channel = 'pksWeb'
const [page, navbarMenu, footerMenu] = await Promise.all([
  getHomepage(locale, channel, isEnabled),
  getMenuByType('Navbar', locale, isEnabled),
  getFooterMenu(locale, isEnabled),
])
```

Desk shortcut and preview badge

```ts
// sanity/deskStructure.ts (excerpt under each channel/language)
S.listItem()
  .title('Homepage')
  .icon(MdWeb)
  .child(
    S.documentTypeList('page')
      .title(`Homepage (${lang.title})`)
      .filter('_type == "page" && channel == $channel && language == $language && isHomepage == true')
      .params({ channel: channelValue, language: lang.id })
  )
```

```ts
// sanity/schemaTypes/page.ts (preview)
prepare({ title, channel, isHomepage }) {
  const channelLabel = channel === 'pksWeb' ? 'PKS Website' : 'AVTR Website'
  const suffix = isHomepage ? ' • 🏠 Homepage' : ''
  return { title: title || 'Untitled Page', subtitle: `${channelLabel}${suffix}` }
}
```

---

## Sanity Upgrade + Imports (FYI)

- Upgraded Sanity toolchain and aligned imports:
  - Visual editing: `import { VisualEditing } from 'next-sanity/visual-editing'`
  - Live API: `import { defineLive } from 'next-sanity/live'`
- Embedded Studio remains at `/studio` using `NextStudio`.

---

## Test Checklist

- Buttons
  - Internal CTA navigates to `/${locale}/${slug}`.
  - External CTA opens new tab.
  - Missing link renders a non-clickable button (no errors).
- Cloudinary
  - Hover blocks render image or video seamlessly.
  - Missing assets no longer crash pages.
- Homepage
  - Exactly one `isHomepage` per language + channel can be published.
  - `/[locale]` renders the flagged page.
  - Desk shows a “Homepage” item under each language.
- Studio
  - No copy/paste plugin field; duplication still works via array item menu.

---

## Notes & Next Ideas
- If you want stricter homepage bounds, we can add a scheduled check (or webhooks) to ensure only one homepage exists per locale/channel.
- If editors want copy-paste again, we can build a targeted field action that excludes media fields (Cloudinary) and preserves structure.

---

## Folder Slugs (e.g., `services/consulting`)

You can allow editors to enter path-like slugs in Sanity and route them via a catch‑all route in Next.js.

### 1) Sanity: allow `/` in slug and validate

Update the `slug` option on the `page` schema to keep slashes and prevent leading/trailing/double slashes.

```ts
// sanity/schemaTypes/page.ts (inside slug.options)
options: {
  source: 'title',
  maxLength: 96,
  slugify: (input: string) =>
    input
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9/_-]+/g, '')   // allow letters, numbers, _, -, and /
      .replace(/\/{2,}/g, '/')        // collapse multiple slashes
      .replace(/^\/+|\/+$/g, ''),     // trim leading/trailing slashes
  isUnique: async (slug, context) => { /* keep existing implementation */ }
},

// Add validation on the slug field
validation: (Rule) =>
  Rule.required().custom((slug) => {
    if (!slug) return 'Slug is required'
    if (slug.includes('//')) return 'Slug must not contain //'
    if (slug.startsWith('/') || slug.endsWith('/')) return 'No leading/trailing /'
    return true
  }),
```

Your `isUnique` can remain unchanged — slashes are just characters.

### 2) Next.js: use a catch‑all route

Rename your route from `app/[locale]/[slug]/page.tsx` to:

```
app/[locale]/[...slug]/page.tsx
```

Update the page component to accept an array and join it for GROQ:

```tsx
// app/[locale]/[...slug]/page.tsx
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/sanity/fetchData'

export async function generateStaticParams() {
  const pages = await getAllPageSlugsAndLocales() // returns { slug: string, locale: string }
  return pages.map(({ slug, locale }) => ({
    locale,
    slug: slug.split('/'), // split nested slugs
  }))
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string[] }> }) {
  const { locale, slug } = await params
  const { isEnabled } = await draftMode()

  const channel = 'pksWeb'
  const slugPath = Array.isArray(slug) ? slug.join('/') : slug

  const page = await getPageBySlug(slugPath, locale, channel, isEnabled)
  if (!page) return notFound()

  // ...render using your existing components
}
```

No changes needed to `resolveSanityLink`: it already returns `/${locale}/${slug}` and works with nested slugs.
