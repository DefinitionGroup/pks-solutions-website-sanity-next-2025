import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Info", default: true },
    { name: "media", title: "Media" },
    { name: "relations", title: "Client Relations" },
    { name: "publishing", title: "Channels & Publishing" },
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
      type: "string",
      title: "Project Name",
      validation: (Rule) => Rule.required(),
      group: "basic",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
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
      group: "media",
    }),
    defineField({
      name: "headerImage",
      type: "cloudinary.asset",
      title: "Header Image",
      group: "media",
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
      description: "Select the channels where this project will be displayed",
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
        Rule.required().custom(async (channels, context) => {
          if (!channels || channels.length === 0) {
            return "At least one channel is required";
          }

          // Get the client reference from the document
          const clientRef = (context.document?.client as { _ref: string })
            ?._ref;
          if (!clientRef) {
            return true; // Skip validation if no client is selected yet
          }

          // Get the client document to check its channels
          const { getClient } = context;
          const client = getClient({ apiVersion: "2021-03-25" });

          // Fetch the client document with its channels
          const clientDoc = await client.fetch(
            `*[_id == $clientId][0]{channels}`,
            { clientId: clientRef }
          );

          if (!clientDoc || !clientDoc.channels) {
            return "The referenced client must have channels defined";
          }

          // Check if all project channels are also in client channels
          const invalidChannels = channels.filter(
            (channel) => !clientDoc.channels.includes(channel)
          );

          if (invalidChannels.length > 0) {
            return `The following channels are not available for the selected client: ${invalidChannels.join(", ")}. A project can only be published to channels where its client is also published.`;
          }

          return true;
        }),
    }),

    defineField({
      name: "client",
      type: "reference",
      title: "Client",
      group: "relations",
      to: [{ type: "client" }],
      options: {
        filter: ({ document }) => {
          // Only show clients in the same language as the current project
          return {
            filter: "language == $language",
            params: { language: document?.language || "de" },
          };
        },
      },
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          if (!value?._ref) {
            return "A client reference is required";
          }

          // Get the client document to check if it's published
          const { getClient } = context;
          const client = getClient({ apiVersion: "2021-03-25" });

          // Check if the referenced client exists and is published
          const clientDoc = await client.fetch(
            `*[_id == $clientId && !(_id in path("drafts.**"))][0]`,
            { clientId: value._ref }
          );

          if (!clientDoc) {
            return "The referenced client must be published before this project can be published";
          }

          return true;
        }),
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
