// schemas/fourColumnVideoBanner.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "fourColumnVideoBanner",
  title: "Four-Column Video Banner",
  type: "document",

  // Define your groups (tabs)
  groups: [
    { name: "background", title: "Background" },
    { name: "column1", title: "Column 1" },
    { name: "column2", title: "Column 2" },
    { name: "column3", title: "Column 3" },
    { name: "column4", title: "Column 4" },
  ],

  fields: [
    // Background group
    defineField({
      name: "videoCloudinary",
      title: "Background Video (Cloudinary)",
      type: "cloudinary.asset",
      description: "Cloudinary asset for the background video",
      validation: (Rule) => Rule.required(),
      group: "background",
    }),

    // Column 1
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      description: "E.g. “AVATR”",
      validation: (Rule) => Rule.required(),
      group: "column1",
    }),
    defineField({
      name: "headline",
      title: "Main Headline",
      type: "string",
      description: "E.g. “Machine Learning und AI Decision Making Support”",
      validation: (Rule) => Rule.required(),
      group: "column1",
    }),
    defineField({
      name: "headlineHighlight",
      title: "Headline Highlight",
      type: "string",
      description: "Text wrapped in <Highlight>, e.g. “AI”",
      group: "column1",
    }),

    // Column 2
    defineField({
      name: "column2Title",
      title: "Column 2 Title",
      type: "string",
      description: "E.g. “Butterfly-Effekt.”",
      group: "column2",
    }),
    defineField({
      name: "column2Description",
      title: "Column 2 Description",
      type: "text",
      description: "Smaller paragraph under column 2 title",
      group: "column2",
    }),

    // Column 3
    defineField({
      name: "column3Title",
      title: "Column 3 Title",
      type: "string",
      description: "Optional heading for column 3 (leave blank if none)",
      group: "column3",
    }),
    defineField({
      name: "column3Description",
      title: "Column 3 Description",
      type: "text",
      description: "Paragraph for column 3",
      group: "column3",
    }),

    // Column 4: CTA buttons
    defineField({
      name: "ctaButtons",
      title: "CTA Buttons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Button Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "link",
              title: "Button Link",
              type: "link",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(2),
      group: "column4",
    }),
  ],

  preview: {
    select: {
      title: "headline",
      media: "videoCloudinary",
      buttons: "ctaButtons.0.name",
    },
    prepare({ title, media, buttons }) {
      return {
        title,
        subtitle: buttons ? `First CTA: ${buttons}` : "No CTAs",
        media,
      };
    },
  },
});
