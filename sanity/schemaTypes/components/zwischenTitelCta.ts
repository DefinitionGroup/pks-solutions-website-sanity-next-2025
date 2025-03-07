import { defineType, defineField } from "sanity";

export default defineType({
  name: "zwischenTitelCta",
  title: "Zwischen Titel CTA",
  type: "object",
  fields: [
    defineField({
      name: "integrationTitle",
      title: "Integration Title",
      type: "string",
      description:
        'Text for the small title above the headline, e.g. "INTEGRATION".',
      initialValue: "INTEGRATION",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description:
        'Main headline text, e.g. "Passen Sie sich nicht an Ihre Software."',
      initialValue: "Passen Sie sich nicht an Ihre Software.",
    }),
    defineField({
      name: "subHeadline",
      title: "Sub Headline",
      type: "string",
      description:
        'Sub headline or description text, e.g. "Lassen Sie Ihre Software für Sie arbeiten."',
      initialValue: "Lassen Sie Ihre Software für Sie arbeiten.",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      description:
        'Text for the call-to-action button, e.g. "Kontakt aufnehmen."',
      initialValue: "Kontakt aufnehmen.",
    }),
  ],
  preview: {
    select: {
      integrationTitle: "integrationTitle",
      headline: "headline",
      buttonText: "buttonText",
    },
    prepare({ integrationTitle, headline, buttonText }) {
      return {
        title: headline || "Zwischen Titel CTA",
        subtitle: `${integrationTitle || ""} — Button: ${buttonText || ""}`,
      };
    },
  },
});
