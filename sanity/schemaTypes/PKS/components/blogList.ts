import { defineType, defineField, defineArrayMember } from "sanity";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";

export default defineType({
  name: "blogList",
  title: "Blog List",
  type: "object",
  fields: [
    defineField(copyPaste),

    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Latest Blog Posts",
    }),
    defineField({
      name: "subtitle",
      title: "Section Subtitle",
      type: "text",
      initialValue: "Explore our latest articles and updates",
    }),
    defineField({
      name: "postsPerPage",
      title: "Posts per Page",
      type: "number",
      initialValue: 6,
      validation: (Rule) => Rule.min(1).max(12),
    }),
    defineField({
      name: "selectedPosts",
      title: "Selected Blog Posts",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "blogPost" }],
          options: { disableNew: true },
        }),
      ],
      description:
        "Select specific blog posts to display (leave empty to show all)",
    }),
    defineField({
      name: "selectionType",
      title: "Selection Type",
      type: "string",
      options: {
        list: [
          { title: "Automatic", value: "auto" },
          { title: "Manual", value: "manual" },
        ],
        layout: "radio",
      },
      initialValue: "auto",
      description:
        "Automatic: Show recent posts (based on Posts per Page)\nManual: Select specific posts below", // Added description
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Blog Post List",
        subtitle: subtitle || "Displays a grid of blog posts",
      };
    },
  },
});
