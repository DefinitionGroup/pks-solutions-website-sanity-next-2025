import { defineType, defineField } from "sanity";

export default defineType({
  name: "gridHero",
  title: "Grid Hero",
  type: "object",
  fields: [
    // Section One: The top grid area with left, middle, and right columns.
    defineField({
      name: "sectionOne",
      title: "Section One (Top Grid)",
      type: "object",
      fields: [
        defineField({
          name: "left",
          title: "Left Column",
          type: "object",
          fields: [
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "string",
              description: 'Subtitle text, e.g. "Das ganze Unternehmen."',
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: 'Title text, e.g. "Mobil dabei."',
            }),
          ],
        }),
        defineField({
          name: "middle",
          title: "Middle Column",
          type: "object",
          fields: [
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              description:
                'Quote text, e.g. "Software für die Ermittlung von Prozesskennzahlen in Produktion und Verwaltung von Industriebetrieben einführen und pflegen."',
            }),
            defineField({
              name: "buttonText",
              title: "Button Text",
              type: "string",
              description:
                'Text for the middle column button, e.g. "mehr erfahren"',
            }),
          ],
        }),
        defineField({
          name: "right",
          title: "Right Column",
          type: "object",
          fields: [
            defineField({
              name: "videoCloudinary",
              title: "Card Video (Cloudinary)",
              type: "cloudinary.asset",
              description:
                "Video for the CardDemo2 component. Upload a video to be used in the card.",
            }),
          ],
        }),
      ],
    }),
    // Section Two: The lower grid area with a left card and a right text section.
    defineField({
      name: "showSectionTwo",
      title: "Do you want to add a Section Two (Lower Grid)",
      type: "boolean",
      description: "Toggle to show/hide the lower grid section.",
      initialValue: false,
    }),
    defineField({
      name: "sectionTwo",
      title: "Section Two (Lower Grid)",
      type: "object",
      hidden: ({ parent }) => !parent?.showSectionTwo,
      fields: [
        defineField({
          name: "leftCard",
          title: "Left Card",
          type: "object",
          fields: [
            // defineField({
            //   name: "image",
            //   title: "Image",
            //   type: "image",
            //   options: { hotspot: true },
            //   description: "Background image for the left card",
            // }),
            defineField({
              name: "imageCloudinary",
              title: "Image (Cloudinary)",
              type: "cloudinary.asset",
              description:
                "Background image for the left card (Cloudinary Asset)",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: 'Card title text, e.g. "Wir brauchen Bilder"',
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              description:
                'Card description, e.g. "This card is for some special elements, like displaying background gifs on hover only."',
            }),
          ],
        }),
        defineField({
          name: "rightSection",
          title: "Right Section",
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
              name: "description",
              title: "Description",
              type: "text",
              description:
                "Descriptive text for the right section explaining the mission",
            }),
            defineField({
              name: "buttonText",
              title: "Button Text",
              type: "string",
              description:
                'Text for the right section button, e.g. "Mehr erfahren"',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      leftTitle: "sectionOne.left.title",
      rightTitle: "sectionTwo.rightSection.title",
    },
    prepare({ leftTitle, rightTitle }) {
      return {
        title: leftTitle || "Grid Hero",
        subtitle: rightTitle ? `Right Section: ${rightTitle}` : "",
      };
    },
  },
});
