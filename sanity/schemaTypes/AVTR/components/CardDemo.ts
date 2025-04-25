import { defineType, defineField } from "sanity";

export default defineType({
  name: "cardDemoAVT",
  title: "Card Demo",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Card title (optional)",
    }),
    defineField({
      name: "videoCloudinary",
      title: "Video",
      type: "cloudinary.asset",
      description: "Video to display in the card",
    }),

    defineField({
      name: "videoClassName",
      title: "Video Class Name",
      type: "string",
      description: "Optional CSS classes for the video element",
      initialValue:
        "flex-grow flex-1 mt-8 w-full h-full scale-100 max-h-[40vh] object-cover",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Card Demo",
      };
    },
  },
});
