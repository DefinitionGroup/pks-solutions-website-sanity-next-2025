import { defineType, defineField } from "sanity";

export default defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    defineField({
      name: "clerkId",
      title: "Clerk User ID",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "Admin", value: "admin" },
          { title: "Editor", value: "editor" },
          { title: "Viewer", value: "viewer" },
        ],
      },
      initialValue: "viewer",
    }),
    defineField({
      name: "group",
      title: "User Group",
      type: "reference",
      to: [{ type: "userGroup" }],
    }),
  ],
});
