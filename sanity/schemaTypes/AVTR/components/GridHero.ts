import { defineType, defineField } from "sanity";

export default defineType({
  name: "gridHeroAVT",
  title: "Grid Hero",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Main title for the grid section",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Subtitle text for the grid section",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Description text for this grid item",
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
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Grid Hero",
        subtitle: subtitle || "",
      };
    },
  },
});
