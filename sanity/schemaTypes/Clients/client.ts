import { defineType, defineField } from "sanity";

export default defineType({
  name: "client",
  title: "Client",
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
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
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
            _type == "client" && 
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
      title: "Client Logo",
      type: "cloudinary.asset",
      description: "Upload the client's logo",
    }),
    defineField({
      name: "website",
      title: "Website URL",
      type: "url",
      description: "The client's website URL",
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      description: "The client's industry or sector",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "A brief description of the client",
    }),
    defineField({
      name: "featured",
      title: "Featured Client",
      type: "boolean",
      description: "Mark this client as featured",
      initialValue: false,
    }),
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "text",
      description: "A testimonial from this client (if available)",
    }),
    defineField({
      name: "contactPerson",
      title: "Contact Person",
      type: "string",
      description: "Main contact person at the client",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      description: "Email of the main contact person",
    }),
    defineField({
      name: "projectsCompleted",
      title: "Projects Completed",
      type: "array",
      of: [{ type: "string" }],
      description: "List of projects completed for this client",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "industry",
      media: "logo",
    },
  },
});