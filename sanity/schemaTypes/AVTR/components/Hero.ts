import { defineType, defineField } from "sanity";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";

export default defineType({
  name: "heroAVT",
  title: "Hero AVT",
  type: "object",
  fields: [
    defineField(copyPaste),

    defineField({
      name: "modules",
      title: "Additional Modules",
      type: "array",
      of: [
        { type: "sciFiBlockAVT" },
        { type: "gridHeroAVT" },
        { type: "gridHeroVariantAVT" },
        { type: "fourColumnVideoBanner" },
        { type: "threeColumnVideoBanner" },
      ],
      description:
        "Additional content modules to render below the main HeroHighlight section",
    }),

    defineField({
      name: "channel",
      title: "Channel",
      type: "string",
      initialValue: "avtWeb",
      hidden: true,
    }),
  ],
  preview: {
    select: {
      moduleCount: "modules.length",
      firstModuleType: "modules.0._type",
      firstModuleTitle: "modules.0.title",
    },
    prepare({ moduleCount, firstModuleType, firstModuleTitle }) {
      return {
        title: firstModuleTitle || "Hero AVT",
        subtitle: moduleCount
          ? `${moduleCount} module(s) - First: ${firstModuleType || "none"}`
          : "No modules added",
      };
    },
  },
});
