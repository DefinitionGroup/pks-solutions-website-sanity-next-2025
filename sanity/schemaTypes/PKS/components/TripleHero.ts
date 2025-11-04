import { defineType, defineField } from "sanity";

export default defineType({
  name: "tripleHero",
  title: "Triple Hero",
  type: "object",
  fields: [
    // copy/paste plugin removed
    defineField({
      name: "items",
      title: "Hero Items",
      type: "array",
      of: [{ type: "heroItem" }],
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
