import { groq } from "next-sanity";
import { PageType } from "../types/types";
import { client } from "./lib/client";
import { ClientPerspective } from "@sanity/client";
import { MenuType } from "../types/types";
import { BlogList, BlogPost } from "../types/types";

// Updated getPageBySlug to include locale
export const getPageBySlug = async (
  slug: string,
  locale: string, // Add locale parameter
  channel: string,
  draft: boolean = false
): Promise<PageType> => {
  const query = groq`*[_type == "page" && slug.current == $slug && language == $locale && channel == $channel][0]{
    title,
    _id,
    _createdAt,
    _updatedAt,
    slug,
    contentPKS,
    language, // Include language if needed elsewhere
    channel // Add channel field
}`;

  const options = draft
    ? {
        perspective: "previewDrafts" as ClientPerspective,
        useCdn: false,
        stega: true,
      }
    : {};

  // Pass locale to the query parameters
  return client.fetch(query, { slug, locale, channel }, options);
};

// Updated getMenuByType to include locale
export const getMenuByType = async (
  menuType: string,
  locale: string, // Add locale parameter
  draft: boolean = false
): Promise<MenuType | null> => {
  // Assuming menus are also localized by a 'language' field
  const query = groq`*[_type == "menu" && menuType == $menuType && language == $locale][0]{
    _id,
    _type,
    title,
    menuType,
    language, // Include language if needed
    menuItems[] {
      _key,
      displayName,
      page-> {
        slug {
          current
        },
        language // Ensure linked pages respect locale if needed for URL generation
      }
    },
    imageCloud,
    text,
    copyright
  }`;

  const options = draft
    ? {
        perspective: "previewDrafts" as ClientPerspective,
        useCdn: false,
        stega: true,
      }
    : {};

  // Pass locale to the query parameters
  return client.fetch(query, { menuType, locale }, options);
};

// Updated getFooterMenu to include locale
export async function getFooterMenu(locale: string, draft: boolean = false) {
  // Add locale and draft parameters
  // Assuming footer menus are also localized by a 'language' field
  const query = groq`*[_type == "menu" && menuType == "Footer" && language == $locale][0]{
    footerColumns[] {
      title,
      links[] {
        displayName,
        linkType,
        externalUrl,
        page->{ slug, language } // Fetch language for locale-specific links
      }
    },
    socialLinks[] {
      platform,
      url
    },
    copyright,
    imageCloud,
    language // Include language if needed
  }`;

  const options = draft
    ? {
        perspective: "previewDrafts" as ClientPerspective,
        useCdn: false,
        stega: true,
      }
    : {};

  // Pass locale to the query parameters
  return client.fetch(query, { locale }, options);
}

// Updated getBlogPosts to remove channel dependency
export async function getBlogPosts(
  block: BlogList,
  locale: string,
  draft: boolean = false
): Promise<BlogPost[]> {
  // Add locale parameter
  const options = draft
    ? {
        perspective: "previewDrafts" as ClientPerspective,
        useCdn: false,
        stega: true,
      }
    : {};

  // Removed channel filter, only filter by language
  if (block.selectionType === "auto") {
    const query = groq`*[_type == "blogPost" && language == $locale] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      author->{name},
      language // Include language if needed
    }`;

    return client.fetch(
      query,
      {
        limit: block.postsPerPage || 6,
        locale, // Pass locale to the query parameters
      },
      options
    );
  }

  // Fetch selected posts, ensuring they match the locale if necessary
  // Removed channel filter
  const query = groq`*[_type == "blogPost" && _id in $ids && language == $locale] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    author->{name},
    language // Include language if needed
  }`;

  return client.fetch(
    query,
    {
      ids: block.selectedPosts?.map((p) => p._id) || [], // Use _ref for references
      locale, // Pass locale to the query parameters
    },
    options
  );
}

// Updated getBlogPostBySlug to remove channel dependency
export async function getBlogPostBySlug(
  slug: string,
  locale: string,
  draft: boolean = false
): Promise<BlogPost> {
  // Add locale parameter
  const options = draft
    ? {
        perspective: "previewDrafts" as ClientPerspective,
        useCdn: false,
        stega: true,
      }
    : {};

  // Removed channel filter, only filter by language
  const query = groq`*[_type == "blogPost" && slug.current == $slug && language == $locale][0]{
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    content,
    author->{
      name,
      image,
      bio
    },
    categories[]->{
      title,
      slug
    },
    language // Include language if needed
  }`;

  // Pass locale to the query parameters
  return client.fetch(query, { slug, locale }, options);
}

// Updated getAllBlogPostSlugs to remove channel dependency
export async function getAllBlogPostSlugs(locale: string) {
  // Add locale parameter
  // Removed channel filter, only filter by language
  const query = groq`*[_type == "blogPost" && language == $locale]{ "slug": slug.current }`;
  // Pass locale to the query parameters
  return client.fetch<{ slug: string }[]>(query, { locale });
}

// Add function to get all page slugs and locales for generateStaticParams
export async function getAllPageSlugsAndLocales() {
  const query = groq`*[_type == "page" && defined(slug.current) && defined(language)]{
    "slug": slug.current,
    "locale": language,
    "channel": channel // Add channel field
  }`;
  // No draft options needed usually for static generation
  // Update the return type to include channel
  return client.fetch<{ slug: string; locale: string; channel: string }[]>(
    query
  );
}
