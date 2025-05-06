import { defineType, defineField } from "sanity";
import type { SlugSourceContext } from "sanity";

export default defineType({
  name: "blogCategory",
  title: "Blog Category",
  type: "document",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      readOnly: true,
      hidden: true,
      description:
        "Managed by @sanity/document-internationalization; do not edit manually.",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string, _type: any, context: SlugSourceContext) => {
          // Get the base slug (standard slugify process)
          const baseSlug = input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");

          return baseSlug;
        },
        isUnique: async (
          slug: string,
          context: {
            document?: { _id: string; language?: string };
            getClient: (options: { apiVersion: string }) => any;
          }
        ) => {
          const { document, getClient } = context;
          const language = document?.language || "de";
          const client = getClient({ apiVersion: "2021-03-25" });

          // Get the base ID without drafts prefix
          const baseId = document?._id.replace(/^drafts\./, "");

          // Query to check for conflicting slugs
          const query = `*[
            _type == "blogCategory" && 
            slug.current == $slug && 
            language == $language && 
            !(_id in [$draftId, $publishedId])
          ][0]`;
          const params = {
            slug: slug,
            language: language,
            draftId: `drafts.${baseId}`,
            publishedId: baseId,
          };

          const existingDoc = await client.fetch(query, params);
          return !existingDoc;
        },
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
