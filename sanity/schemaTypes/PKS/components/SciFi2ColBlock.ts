import { defineType, defineField } from "sanity";

export default defineType({
    name: "sciFi2ColBlock",
    title: "SciFi 2 Column Block",
    type: "object",
    fields: [
        defineField({
            name: "className",
            title: "Class Name",
            type: "string",
            description: "Optional custom CSS classes for the SciFiBlock container",
        }),
        defineField({
            name: "doubleHero",
            title: "Double Hero",
            type: "doubleHero",
            description:
                "Configure the DoubleHero module for the SciFi2ColBlock component",
        }),
    ],
    preview: {
        select: {
            firstHero: "doubleHero.items.0.fixedTitle",
        },
        prepare({ firstHero }) {
            return {
                title: `SciFi 2 Column Block`,
                subtitle: firstHero ? `First Hero: ${firstHero}` : "No hero item set",
            };
        },
    },
});
