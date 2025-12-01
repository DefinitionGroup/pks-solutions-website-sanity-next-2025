import { defineType, defineField } from "sanity";
import type { SlugSourceContext } from "sanity";
export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Info", default: true },
    { name: "content", title: "Content" },
    { name: "taxonomy", title: "Categories & Authors" },
    { name: "publishing", title: "Publishing" },
  ],
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
      group: "basic",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
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
            _type == "blogPost" && 
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
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      group: "publishing",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 4,
      group: "basic",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        defineField({
          name: "image",
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "taxonomy",
      of: [{ type: "reference", to: { type: "blogCategory" } }],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "taxonomy",
      to: { type: "blogAuthor" },
    }),
    defineField({
      name: "channels",
      title: "Channels",
      type: "array",
      description: "Select the channels where this blog post will be displayed",
      group: "publishing",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "PKS Website", value: "pksWeb" },
          { title: "AVTR Website", value: "avtWeb" },
        ],
        layout: "list",
      },
      validation: (Rule) =>
        Rule.required().min(1).error("At least one channel is required"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return {
        ...selection,
        subtitle: author && `by ${author}`,
      };
    },
  },
});
