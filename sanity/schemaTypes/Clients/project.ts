import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
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
      type: "string",
      title: "Project Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title", // Changed from "name" to "title"
        maxLength: 96,
        slugify: (input: string, _type: any, context: any) => {
          return input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");
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
            _type == "project" && // Changed from "client" to "project"
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
      name: "logo",
      title: "Project Logo",
      type: "cloudinary.asset",
      description: "Upload the client's logo",
    }),
    defineField({
      name: "headerImage",
      type: "cloudinary.asset",
      title: "Header Image",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "A brief description of the client",
    }),

    defineField({
      name: "client",
      type: "reference",
      title: "Client",
      to: [{ type: "client" }],
      options: {
        filter: ({ document }) => {
          // Only show clients in the same language as the current project
          return {
            filter: 'language == $language',
            params: { language: document?.language || 'de' }
          }
        }
      }
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description", // Changed from "industry" to "description"
      media: "logo",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle || "No description",
        media,
      };
    },
  },
});
