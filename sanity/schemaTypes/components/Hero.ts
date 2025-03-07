import { defineType, defineField } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    // Optional CSS class names (for the outer container and inner content)
    defineField({
      name: "className",
      title: "Class Name",
      type: "string",
      description: "Optional CSS classes for the outer container",
      initialValue: "container",
    }),
    defineField({
      name: "containerClassName",
      title: "Container Class Name",
      type: "string",
      description: "Optional custom classes for the inner container",
    }),
    // Main background video
    // defineField({
    //   name: "video",
    //   title: "Background Video",
    //   type: "file",
    //   options: {
    //     accept: "video/*",
    //   },
    //   description: "Upload a video to be used as the background",
    // }),
    defineField({
      name: "videoCloudinary",
      title: "Background Video (Cloudinary)",
      type: "cloudinary.asset",
      description: "Cloudinary asset for the background video",
    }),
    // Headline & Highlight text (the headline is split into two parts)
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: 'Headline text (e.g. "Ihr Unternehmen fährt gelassen")',
    }),
    defineField({
      name: "highlightText",
      title: "Highlight Text",
      type: "string",
      description:
        'Text to be highlighted within the headline (e.g. "in die Zukunft.")',
    }),
    // Descriptions for the grid sections
    defineField({
      name: "leftDescription",
      title: "Left Description",
      type: "text",
      description: "Left description text below the headline",
    }),
    defineField({
      name: "rightDescription",
      title: "Right Description",
      type: "text",
      description:
        "Right description text that appears alongside the CTA button",
    }),
    // Call-to-action button text
    defineField({
      name: "ctaButtonText",
      title: "CTA Button Text",
      type: "string",
      description: 'Text for the call-to-action button (e.g. "mehr erfahren")',
    }),
    // Array of additional modules that appear below the main hero content.
    // You should create separate schemas (e.g. sciFiBlock, gridHero, etc.) for these.
    defineField({
      name: "modules",
      title: "Additional Modules",
      type: "array",
      of: [
        { type: "sciFiBlock" },
        { type: "gridHero" },
        { type: "gridHero2" },
        { type: "zwischenTitelCta" },
        { type: "gridHero3" },
      ],
      description:
        "Additional content modules to render below the main HeroHighlight section",
    }),
  ],
  preview: {
    select: {
      headline: "headline",
      highlight: "highlightText",
    },
    prepare({ headline, highlight }) {
      return {
        title: headline
          ? `${headline}${highlight ? " - " + highlight : ""}`
          : "Hero Highlight",
      };
    },
  },
});
