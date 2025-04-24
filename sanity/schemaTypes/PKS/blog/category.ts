import { defineType, defineField } from "sanity";

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
      },
    }),
    defineField({
      name: "channel",
      title: "Channel",
      type: "string",
      options: {
        list: [
          { title: "PKS Website", value: "pksWeb" },
          { title: "Avtr Website", value: "avtWeb" },
        ],
        layout: "radio",
      },
      initialValue: (context: any) => {
        return context.document?.__inferMetadata?.params?.channel || "pksWeb";
      },
      readOnly: true,
      description: "Automatically set channel based on creation location",
    }),
  ],
});
