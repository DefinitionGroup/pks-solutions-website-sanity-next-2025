import { groq } from "next-sanity";
import { PageType } from "../types/types";
import { client } from "./lib/client";
import { ClientPerspective } from "@sanity/client";

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
