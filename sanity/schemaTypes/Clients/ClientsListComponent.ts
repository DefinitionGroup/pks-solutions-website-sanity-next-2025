import { defineField, defineType } from "sanity";
import { MdPeople } from "react-icons/md";

export default defineType({
  name: "clientsList",
  title: "Clients List",
  type: "object",
  icon: MdPeople,
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
      name: "clients",
      title: "Clients",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "client" }],
          description: "Reference to clients",
          options: {
            filter: ({ document }) => {
              // Only show clients in the same language as the current document
              return {
                filter: "language == $language",
                params: { language: document?.language || "de" },
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.min(1).warning("At least one client should be selected"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Clients List",
        subtitle: subtitle,
      };
    },
  },
});
