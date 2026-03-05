import { defineType, defineField } from "sanity";

export default defineType({
  name: "contentSection",
  title: "Content Section",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      description: "Rich text content to be displayed in a container",
    }),
    defineField({
      name: "containerClass",
      title: "Container Class",
      type: "string",
      description: "Optional custom CSS classes for the container div",
      initialValue: "container mx-auto px-4 py-8",
    }),
  ],
  preview: {
    select: {
      blocks: "content",
    },
    prepare({ blocks }) {
      const block = (blocks || []).find((block: any) => block._type === "block");
      const text = block
        ? block.children
          ?.filter((child: any) => child._type === "span")
          .map((span: any) => span.text)
          .join("")
        : "";

      return {
        title: "Content Section",
        subtitle: text ? `${text.substring(0, 50)}${text.length > 50 ? "..." : ""}` : "Empty content",
      };
    },
  },
});
