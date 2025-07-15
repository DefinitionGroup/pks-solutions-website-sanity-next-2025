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
      type: "text",
      description: "A text description for this section",
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
