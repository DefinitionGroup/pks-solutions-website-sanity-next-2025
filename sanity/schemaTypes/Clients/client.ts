import { defineType, defineField } from "sanity";
import { MdPeople } from "react-icons/md"; // Import the icon for fallback

export default defineType({
  name: "client",
  title: "Client",
  type: "document",
  icon: MdPeople, // Fallback icon if logo isn't available
  groups: [
    { name: "basic", title: "Basic Info", default: true },
    { name: "branding", title: "Branding" },
    { name: "publishing", title: "Channels & Publishing" },
    { name: "relations", title: "Relations" },
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
      name: "name",
      title: "Client Name",
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
      group: "branding",
    }),
    defineField({
      name: "website",
      title: "Website URL",
      type: "url",
      description: "The client's website URL",
      group: "basic",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "A brief description of the client",
      group: "basic",
    }),
    defineField({
      name: "channels",
      title: "Channels",
      type: "array",
      description: "Select the channels where this client will be displayed",
      group: "publishing",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "PKS Website", value: "pksWeb" },
          { title: "AVTR Website", value: "avtWeb" },
        ],
        layout: "list",
      },
    }),
    defineField({
      name: "projects",
      type: "array",
      title: "Connected Projects",
      group: "relations",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
          options: {
            filter: ({ document }) => {
              // Only show projects in the same language as the current client
              return {
                filter: "language == $language",
                params: { language: document?.language || "de" },
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
      logoAsset: "logo",
    },
    prepare({ title, subtitle, logoAsset }) {
      // Create a proper image component instead of using the URL directly
      return {
        title,
        subtitle: subtitle || "No description",
        media:
          logoAsset && logoAsset.secure_url
            ? // Return the asset object itself, not just the URL string
            logoAsset
            : undefined,
      };
    },
  },
});
