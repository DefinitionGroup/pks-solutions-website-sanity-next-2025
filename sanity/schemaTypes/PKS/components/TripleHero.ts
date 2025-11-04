import { defineType, defineField } from "sanity";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";

export default defineType({
  name: "tripleHero",
  title: "Triple Hero",
  type: "object",
  fields: [
    // Enable copy/paste within TripleHero items
    defineField(copyPaste),
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
