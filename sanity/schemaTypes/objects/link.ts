import { defineType, defineField } from "sanity";

// Define an interface for the parent object
interface LinkParent {
  linkType?: string;
}

export default defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "linkType",
      title: "Link Type",
      type: "string",
      options: {
        list: [
          { title: "External", value: "external" },
          { title: "Internal", value: "internal" },
        ],
        layout: "radio",
      },
      initialValue: "external",
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      description: "URL for external links",
      hidden: ({ parent }) => (parent as LinkParent)?.linkType !== "external",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
    }),
    defineField({
      name: "internalReference",
      title: "Internal Page",
      type: "reference",
      to: [{ type: "page" }],
      hidden: ({ parent }) => (parent as LinkParent)?.linkType !== "internal",
      options: {
        filter: ({ document }) => {
          const channel = document?.channel || "pksWeb";
          const language = document?.language || "de";

          return {
            filter: "channel == $channel && language == $language",
            params: { channel, language },
          };
        },
      },
    }),
  ],
  preview: {
    select: {
      title: "linkType",
      externalUrl: "externalUrl",
      internalTitle: "internalReference.title",
    },
    prepare({ title, externalUrl, internalTitle }) {
      return {
        title:
          title === "external"
            ? externalUrl
            : internalTitle || "No link selected",
        subtitle: title === "external" ? "External link" : "Internal link",
      };
    },
  },
});
