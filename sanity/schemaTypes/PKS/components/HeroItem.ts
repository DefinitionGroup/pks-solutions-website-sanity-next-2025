import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroItem",
  title: "Hero Item",
  type: "object",
  fields: [
    defineField({
      name: "hoverBackgroundCloudinary",
      title: "Hover Background (Cloudinary)",
      type: "cloudinary.asset",
      description: "Cloudinary asset for hover background",
    }),
    defineField({
      name: "fixedTitle",
      title: "Fixed Title",
      type: "string",
      description: 'Text shown in fixed content (e.g. "PSYSTEM")',
    }),
    defineField({
      name: "fixedIconCloudinary",
      title: "Fixed Icon (Cloudinary)",
      type: "cloudinary.asset",
      description: "Cloudinary asset for fixed icon",
    }),
    defineField({
      name: "hoverTitle",
      title: "Hover Title",
      type: "string",
      description: 'Title displayed on hover (e.g. "AI Analyse")',
      initialValue: "AI Analyse",
    }),
    defineField({
      name: "hoverDescription",
      title: "Hover Description",
      type: "text",
      description: "Description text displayed on hover",
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
      fixedTitle: "fixedTitle",
      buttonText: "buttonText",
    },
    prepare({ fixedTitle, buttonText }) {
      return {
        title: fixedTitle,
        subtitle: buttonText,
      };
    },
  },
});
