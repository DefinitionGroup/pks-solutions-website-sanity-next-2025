import { defineType, defineField } from "sanity";

export default defineType({
  name: "sciFiBlockAVT",
  title: "Sci-Fi Block",
  type: "object",
  fields: [
    defineField({
      name: "key",
      title: "Component Key",
      type: "string",
      description: "Unique key for the component (e.g. 'login', 'login3')",
      initialValue: "scifi-block",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "object",
      description: "Content to be displayed inside the SciFi Block",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          description: "Main title text",
        }),
        defineField({
          name: "highlightText",
          title: "Highlight Text",
          type: "string",
          description: "Text to be highlighted within the title",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          description: "Main description text",
        }),
        defineField({
          name: "secondaryDescription",
          title: "Secondary Description",
          type: "text",
          description: "Additional description text (smaller font)",
        }),
        defineField({
          name: "videoCloudinary",
          title: "Background Video",
          type: "cloudinary.asset",
          description: "Cloudinary asset for the background video",
        }),
        defineField({
          name: "logoCloudinary",
          title: "Logo",
          type: "cloudinary.asset",
          description: "Logo to display in the block",
        }),
        defineField({
          name: "ctaButton",
          title: "CTA Button",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Button Name",
              type: "string",
              description: "Text displayed on the button",
            }),
            defineField({
              name: "link",
              title: "Button Link",
              type: "link",
              description:
                "Link for the button (can be external or reference to an internal page)",
            }),
          ],
        }),
        defineField({
          name: "hidden",
          title: "Hidden",
          type: "boolean",
          description: "Whether this block should be hidden",
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "content.title",
      highlight: "content.highlightText",
      key: "key",
      hidden: "content.hidden",
    },
    prepare({ title, highlight, key, hidden }) {
      return {
        title: title || `Sci-Fi Block (${key || "unnamed"})`,
        subtitle: `${highlight ? `Highlight: ${highlight}` : ""}${hidden ? " (Hidden)" : ""}`,
      };
    },
  },
});
