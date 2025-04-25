import { defineType, defineField } from "sanity";

export default defineType({
  name: "gridHeroVariantAVT",
  title: "Grid Hero Variant",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Title for the right card section",
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
      description: "Description text for the right card section",
    }),
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
    }),
    defineField({
      name: "imageCloudinary",
      title: "Image",
      type: "cloudinary.asset",
      description: "Image for this grid item",
      hidden: ({ parent }) => parent?.mediaType !== "image",
    }),
    defineField({
      name: "videoCloudinary",
      title: "Video",
      type: "cloudinary.asset",
      description: "Video for this grid item",
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Text",
          type: "string",
          description: "Button text",
        }),
        defineField({
          name: "link",
          title: "Link",
          type: "string",
          description: "Button link URL",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      highlightText: "highlightText",
    },
    prepare({ title, highlightText }) {
      return {
        title: title || "Grid Hero Variant",
        subtitle: highlightText ? `Mission: ${highlightText}` : "",
      };
    },
  },
});
