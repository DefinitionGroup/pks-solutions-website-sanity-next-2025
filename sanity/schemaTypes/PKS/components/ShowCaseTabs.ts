// schemas/showcaseTabs.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "showcaseTabs",
  title: "Showcase Tabs",
  type: "object",
  fields: [
    defineField({
      name: "tabs",
      title: "Tabs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Tab Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Tab Value",
              type: "string",
              description:
                "A unique key for this tab (e.g. “workflow”, “services”…)",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "modules",
              title: "Modules",
              type: "array",
              description:
                "An ordered list of modules to render in this tab’s panel.",
              of: [
                { type: "card3" },
                // future modules go here, e.g. { type: "videoModule" }, etc.
              ],
              validation: (Rule) =>
                Rule.min(1).error("Each tab needs at least one module."),
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.min(1).error("You must define at least one tab"),
    }),
  ],
  preview: {
    select: {
      firstTab: "tabs.0.title",
      firstModule: "tabs.0.modules.0.title",
    },
    prepare({ firstTab, firstModule }) {
      return {
        title: firstTab ? `Showcase: ${firstTab}` : "Showcase Tabs",
        subtitle: firstModule
          ? `First module: ${firstModule}`
          : "No modules defined",
      };
    },
  },
});
