import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "gridHero2",
  title: "Grid Hero 2",
  type: "object",
  fields: [
    // Left Column: Title text (e.g. "Erfahrung")
    defineField({
      name: "leftTitle",
      title: "Left Title",
      type: "string",
      description: 'Title for the left column, e.g. "Erfahrung".',
    }),
    // Middle Column: Contains two text fields for descriptions.
    defineField({
      name: "middle",
      title: "Middle Column",
      type: "object",
      fields: [
        defineField({
          name: "description1",
          title: "Primary Description",
          type: "text",
          description:
            'Main description text, e.g. "Mit angewandten Methoden der Statistik … digital erfüllt."',
        }),
        defineField({
          name: "description2",
          title: "Secondary Description",
          type: "text",
          description:
            'Additional description text, e.g. "Für die schlanke Bewirtschaftung von Planzeiten … weiterentwickelt."',
        }),
      ],
    }),
    // Right Column: Contains a title, a grid of logos, and a button text.
    defineField({
      name: "right",
      title: "Right Column",
      type: "object",
      fields: [
        defineField({
          name: "logoTitle",
          title: "Logo Section Title",
          type: "text",
          description:
            "Title text above the logo grid, e.g. the header text from the logos section.",
        }),
        defineField({
          name: "logos",
          title: "Logos",
          type: "array",
          of: [
            defineArrayMember({
              type: "cloudinary.asset",
              title: "Cloudinary Logo",
            }),
          ],
          description:
            "An array of logo images to be displayed in the grid. Upload your images here.",
        }),
        defineField({
          name: "buttonText",
          title: "Button Text",
          type: "string",
          description: 'Text for the button, e.g. "Referenzen und Kunden".',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      leftTitle: "leftTitle",
      logoTitle: "right.logoTitle",
    },
    prepare({ leftTitle, logoTitle }) {
      return {
        title: leftTitle || "Grid Hero 2",
        subtitle: logoTitle ? `Logo Section: ${logoTitle}` : "",
      };
    },
  },
});
