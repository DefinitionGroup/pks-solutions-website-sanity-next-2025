import { defineType, defineField } from "sanity";

export default defineType({
  name: "userGroup",
  title: "User Group",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Group Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});
