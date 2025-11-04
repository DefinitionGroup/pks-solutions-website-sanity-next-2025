import { defineType, defineField } from "sanity";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";

export default defineType({
  name: "sciFiBlock",
  title: "SciFi Block",
  type: "object",
  fields: [
    // Enable copy/paste for nested blocks inside this object
    defineField(copyPaste),
    defineField({
      name: "className",
      title: "Class Name",
      type: "string",
      description: "Optional custom CSS classes for the SciFiBlock container",
    }),
    // defineField({
    //   name: "content",
    //   title: "Content",
    //   type: "array",
    //   of: [{ type: "block" }],
    //   description: "Rich text content to be displayed inside the SciFiBlock",
    // }),
    defineField({
      name: "tripleHero",
      title: "Triple Hero",
      type: "tripleHero",
      description:
        "Configure the TripleHero module for the SciFiBlock component",
    }),
  ],
  preview: {
    select: {
      firstHero: "tripleHero.items.0.fixedTitle",
    },
    prepare({ firstHero }) {
      return {
        title: `SciFi Block with TripleHero`,
        subtitle: firstHero ? `First Hero: ${firstHero}` : "No hero item set",
      };
    },
  },
});
