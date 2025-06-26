import { defineType, defineField } from "sanity";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";

export default defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField(copyPaste),
    defineField({
      name: "showTopHero",
      title: "Show Top Hero",
      type: "boolean",
      description: "Toggle display of the top hero section",
      initialValue: true,
    }),
    defineField({
      name: "className",
      title: "Class Name",
      type: "string",
      description: "Optional CSS classes for the outer container",
      initialValue: "container",
      hidden: ({ parent }) => parent?.showTopHero === false,
    }),
    defineField({
      name: "containerClassName",
      title: "Container Class Name",
      type: "string",
      description: "Optional custom classes for the inner container",
      hidden: ({ parent }) => parent?.showTopHero === false,
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
      hidden: ({ parent }) => parent?.showTopHero === false,
    }),
    // Headline & Highlight text (the headline is split into two parts)
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: 'Headline text (e.g. "Ihr Unternehmen fährt gelassen")',
      hidden: ({ parent }) => parent?.showTopHero === false,
    }),
    defineField({
      name: "highlightText",
      title: "Highlight Text",
      type: "string",
      description:
        'Text to be highlighted within the headline (e.g. "in die Zukunft.")',
      hidden: ({ parent }) => parent?.showTopHero === false,
    }),
    // Descriptions for the grid sections
    defineField({
      name: "leftDescription",
      title: "Left Description",
      type: "text",
      description: "Left description text below the headline",
      hidden: ({ parent }) => parent?.showTopHero === false,
    }),
    defineField({
      name: "rightDescription",
      title: "Right Description",
      type: "text",
      description:
        "Right description text that appears alongside the CTA button",
      hidden: ({ parent }) => parent?.showTopHero === false,
    }),
    // Call-to-action button
    defineField({
      name: "ctaButton",
      title: "CTA Button",
      type: "object",
      hidden: ({ parent }) => parent?.showTopHero === false,
      fields: [
        defineField({
          name: "name",
          title: "Button Name",
          type: "string",
          description: "Text displayed on the button",
        }),
        defineField({
          name: "link",
          title: "Button Link",
          type: "link",
          description:
            "Link for the button (can be external or reference to an internal page)",
        }),
      ],
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
        { type: "threeColumnVideoBanner" },
        { type: "fourColumnVideoBanner" },
      ],
      description:
        "Additional content modules to render below the main HeroHighlight section",
    }),
    defineField({
      name: "channel",
      title: "Channel",
      type: "string",
      initialValue: "pksWeb",
      hidden: true,
    }),
  ],
  preview: {
    select: {
      headline: "headline",
      highlight: "highlightText",
      visible: "showTopHero",
    },
    prepare({ headline, highlight, visible }) {
      return {
        title: headline
          ? `${headline}${highlight ? " - " + highlight : ""}`
          : "Hero Highlight",
        subtitle: visible ? "Top Hero shown" : "Top Hero hidden",
      };
    },
  },
});
