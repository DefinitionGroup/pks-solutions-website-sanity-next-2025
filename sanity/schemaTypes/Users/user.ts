import { defineType, defineField } from "sanity";

export default defineType({
  name: "user",
  title: "User",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Info", default: true },
    { name: "access", title: "Access & Permissions" },
  ],
  fields: [
    defineField({
      name: "clerkId",
      title: "Clerk User ID",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
      group: "basic",
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "basic",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
      group: "basic",
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
      group: "access",
    }),
    defineField({
      name: "group",
      title: "User Group",
      type: "reference",
      to: [{ type: "userGroup" }],
      group: "access",
    }),
  ],
});
