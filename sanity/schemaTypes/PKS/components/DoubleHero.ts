import { defineType, defineField } from "sanity";

export default defineType({
    name: "doubleHero",
    title: "Double Hero",
    type: "object",
    fields: [
        defineField({
            name: "items",
            title: "Hero Items",
            type: "array",
            of: [{ type: "heroItem" }],
            validation: (Rule) => Rule.required().min(2).max(2),
            description:
                "Define exactly two hero items for the Double Hero component.",
        }),
    ],
    preview: {
        select: {
            firstTitle: "items.0.fixedTitle",
            secondTitle: "items.1.fixedTitle",
        },
        prepare({ firstTitle, secondTitle }) {
            return {
                title: `Double Hero: ${firstTitle || ""}, ${secondTitle || ""}`,
            };
        },
    },
});
