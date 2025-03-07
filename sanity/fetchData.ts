import { groq } from "next-sanity";
import { PageType } from "../types/types";
import { client } from "./lib/client";

export const getPageBySlug = async (slug: string): Promise<PageType> => {
  const query = groq`*[_type == "page" && slug.current == $slug][0]{
    title,
    _id,
    _createdAt,
    _updatedAt,
    slug,
    content
}`;
  return client.fetch(query, { slug });
};
