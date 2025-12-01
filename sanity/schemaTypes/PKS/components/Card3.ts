import { defineType, defineField } from "sanity";

export default defineType({
  name: "card3",
  title: "Card 3",
  type: "object",

  groups: [
    { name: "content", title: "Content" },
    { name: "media", title: "Media" },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "video",
      title: "Video (Cloudinary)",
      type: "cloudinary.asset",
      description: "Cloudinary asset for the card's video",
      validation: (Rule) => Rule.required(),
      group: "media",
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "video",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
