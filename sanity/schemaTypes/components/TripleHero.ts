import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "tripleHero",
  title: "Triple Hero",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Hero Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "heroItem",
          title: "Hero Item",
          fields: [
            // defineField({
            //   name: "hoverBackground",
            //   title: "Hover Background",
            //   type: "image",
            //   options: { hotspot: true },
            //   description: "Background image for the hover effect",
            // }),
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
            // defineField({
            //   name: "fixedIcon",
            //   title: "Fixed Icon",
            //   type: "image",
            //   options: { hotspot: true },
            //   description: "Icon image displayed alongside the fixed title",
            // }),
            // defineField({
            //   name: "fixedIconCloudinary",
            //   title: "Fixed Icon (Cloudinary)",
            //   type: "cloudinary.asset",
            //   description: "Cloudinary asset for fixed icon",
            // }),
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
              name: "buttonText",
              title: "Button Text",
              type: "string",
              description: "Text for the call-to-action button",
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
        }),
      ],
      validation: (Rule) => Rule.required().min(3).max(3),
      description:
        "Define exactly three hero items for the Triple Hero component.",
    }),
  ],
  preview: {
    select: {
      firstTitle: "items.0.fixedTitle",
      secondTitle: "items.1.fixedTitle",
      thirdTitle: "items.2.fixedTitle",
    },
    prepare({ firstTitle, secondTitle, thirdTitle }) {
      return {
        title: `Triple Hero: ${firstTitle || ""}, ${secondTitle || ""}, ${thirdTitle || ""}`,
      };
    },
  },
});
