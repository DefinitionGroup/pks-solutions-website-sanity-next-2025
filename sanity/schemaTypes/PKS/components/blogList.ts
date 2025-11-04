import { defineType, defineField } from "sanity";

export default defineType({
  name: "blogList",
  title: "Blog List",
  type: "object",
  fields: [
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
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Blog Post List",
        subtitle: subtitle || "Displays a grid of latest blog posts",
      };
    },
  },
});
