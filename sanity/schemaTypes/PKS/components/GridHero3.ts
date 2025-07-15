import { defineType, defineField } from "sanity";

export default defineType({
  name: "gridHero3",
  title: "Grid Hero 3",
  type: "object",
  fields: [
    // Left Section: Contains the subtitle and title (e.g. "Unsere", "Mission:")
    defineField({
      name: "leftSection",
      title: "Left Section",
      type: "object",
      fields: [
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "string",
          description: 'Subtitle text, e.g. "Unsere"',
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          description: 'Title text, e.g. "Mission:"',
        }),
        defineField({
          name: "quoteLeft",
          title: "Quote",
          type: "text",
          description:
            'Quote text for the AnimationWrapper elements, e.g. "Software für die Ermittlung von Prozesskennzahlen in Produktion und Verwaltung von Industriebetrieben einführen und pflegen."',
        }),
      ],
    }),
    // Middle Section: Contains a title, subtitle and a video URL (from Cloudinary)
    defineField({
      name: "middleSection",
      title: "Middle Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          description: "Title text for the middle section",
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "string",
          description: "Subtitle text for the middle section",
        }),

        defineField({
          name: "videoCloudinary",
          title: "Card Video (Cloudinary)",
          type: "cloudinary.asset",
          description: "Cloudinary asset for the background video",
        }),
      ],
    }),
    // Right Section: Contains a quote and a button text
    defineField({
      name: "rightSection",
      title: "Right Section",
      type: "object",
      fields: [
        defineField({
          name: "quoteRight",
          title: "Quote",
          type: "text",
          description:
            'Quote text for the right section, e.g. "Software für die Ermittlung von Prozesskennzahlen in Produktion und Verwaltung von Industriebetrieben einführen und pflegen."',
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
    }),
  ],
  preview: {
    select: {
      leftSubtitle: "leftSection.subtitle",
      leftTitle: "leftSection.title",
      middleTitle: "middleSection.title",
      rightButton: "rightSection.buttonText",
    },
    prepare({ leftSubtitle, leftTitle, middleTitle, rightButton }) {
      return {
        title:
          `${leftSubtitle || ""} ${leftTitle || ""}`.trim() || "Grid Hero 3",
        subtitle: `${middleTitle || "No Middle Title"} | Button: ${rightButton || ""}`,
      };
    },
  },
});
