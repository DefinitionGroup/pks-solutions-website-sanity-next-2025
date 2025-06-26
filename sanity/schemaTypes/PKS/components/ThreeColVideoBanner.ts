// schemas/threeColumnVideoBanner.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "threeColumnVideoBanner",
  title: "Three-Column Video Banner",
  type: "object",

  // define tabs
  groups: [
    { name: "background", title: "Background" },
    { name: "column1", title: "Column 1" },
    { name: "column2", title: "Column 2" },
    { name: "column3", title: "Column 3" },
  ],

  fields: [
    // Background
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
      name: "title",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "column1",
    }),
    defineField({
      name: "highlight",
      title: "Highlight Text",
      type: "string",
      description: "Text wrapped in <Highlight>…</Highlight>",
      group: "column1",
    }),

    // Column 2
    defineField({
      name: "primaryDescription",
      title: "Primary Description",
      type: "text",
      group: "column2",
    }),
    defineField({
      name: "secondaryDescription",
      title: "Secondary Description",
      type: "text",
      group: "column2",
    }),

    // Column 3
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
              description: "Text displayed on the button",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "link",
              title: "Button Link",
              type: "link",
              description:
                "Link for the button (can be external or reference to an internal page)",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
      group: "column3",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "videoCloudinary",
      firstButton: "ctaButtons.0.name",
    },
    prepare({ title, media, firstButton }) {
      return {
        title,
        subtitle: firstButton
          ? `First CTA: ${firstButton}`
          : "No CTA buttons defined",
        media,
      };
    },
  },
});
