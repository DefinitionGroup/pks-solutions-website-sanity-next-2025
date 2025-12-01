import { defineType, defineField } from "sanity";

export default defineType({
  name: "blogAuthor",
  title: "Blog Author",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Info", default: true },
    { name: "media", title: "Media" },
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
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "basic",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      group: "media",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      group: "basic",
    }),
  ],
});
