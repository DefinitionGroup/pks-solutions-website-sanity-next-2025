import { defineField, defineType } from "sanity";

export default defineType({
  name: "projectList",
  title: "Project List",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      description: "A rich text description for this section",
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
          description: "Reference to projects",
          options: {
            filter: ({ document }) => {
              // Only show projects in the same language as the current document
              return {
                filter: "language == $language",
                params: { language: document?.language || "de" },
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.min(1).warning("At least one project should be selected"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Project List",
        subtitle: subtitle,
      };
    },
  },
});
