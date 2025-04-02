import { groq } from "next-sanity";
import { PageType } from "../types/types";
import { client } from "./lib/client";
import { ClientPerspective } from "@sanity/client";
import { MenuType } from "../types/types";
import { BlogList, BlogPost } from "../types/types";
export const getPageBySlug = async (
  slug: string,
  draft: boolean = false
): Promise<PageType> => {
  const query = groq`*[_type == "page" && slug.current == $slug][0]{
    title,
    _id,
    _createdAt,
    _updatedAt,
    slug,
    content
}`;

  const options = draft
    ? {
        perspective: "previewDrafts" as ClientPerspective,
        useCdn: false,
        stega: true,
      }
    : {};

  return client.fetch(query, { slug }, options);
};


export const getMenuByType = async (
  menuType: string,
  draft: boolean = false
): Promise<MenuType | null> => {
  const query = groq`*[_type == "menu" && menuType == $menuType][0]{
    _id,
    _type,
    title,
    menuType,
    menuItems[] {
      _key,
      displayName,
      page-> {
        slug {
          current
        }
      }
    },
    imageCloud,
    text,
    copyright
  }`;

  const options = draft ? {
    perspective: "previewDrafts" as ClientPerspective,
    useCdn: false,
    stega: true,
  } : {};

  return client.fetch(query, { menuType }, options);
};

export async function getFooterMenu() {
  const query = groq`*[_type == "menu" && menuType == "Footer"][0]{
    footerColumns[] {
      title,
      links[] {
        displayName,
        linkType,
        externalUrl,
        page->{ slug }
      }
    },
    socialLinks[] {
      platform,
      url
    },
    copyright,
    imageCloud
  }`;
  return client.fetch(query);
}

export async function getBlogPosts(block: BlogList, draft: boolean = false): Promise<BlogPost[]> {
  const options = draft
    ? {
        perspective: "previewDrafts" as ClientPerspective,
        useCdn: false,
        stega: true,
      }
    : {};

  if (block.selectionType === "auto") {
    const query = groq`*[_type == "blogPost"] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      author->{name}
    }`;
    
    return client.fetch(query, {
      limit: block.postsPerPage || 6
    }, options);
  }

  const query = groq`*[_type == "blogPost" && _id in $ids] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    author->{name}
  }`;
  
  return client.fetch(query, {
    ids: block.selectedPosts?.map(p => p._id) || []
  }, options);
}

export async function getBlogPostBySlug(slug: string, draft: boolean = false): Promise<BlogPost> {
  const options = draft
    ? {
        perspective: "previewDrafts" as ClientPerspective,
        useCdn: false,
        stega: true,
      }
    : {};

  const query = groq`*[_type == "blogPost" && slug.current == $slug][0]{
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
    }
  }`;
  
  return client.fetch(query, { slug }, options);
}

export async function getAllBlogPostSlugs() {
  const query = groq`*[_type == "blogPost"]{ "slug": slug.current }`;
  return client.fetch<{ slug: string }[]>(query);
}
