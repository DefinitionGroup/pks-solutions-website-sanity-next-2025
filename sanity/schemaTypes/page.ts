import { defineField } from "sanity";
export default {
  name: "page",
  _type: "page",
  title: "Page",
  type: "document",
  i18n: {
    base: "de",
    languages: [
      { id: "en", title: "English" },
      { id: "de", title: "German" },
    ],
    referenceBehavior: "weak",
  },
  groups: [
    { name: "basic", title: "Basic Info", default: true },
    { name: "content", title: "Content" },
    { name: "publishing", title: "Publishing Settings" },
    { name: "access", title: "Access Control" },
  ],
  fields: [
    defineField({
      name: "isHomepage",
      title: "Homepage",
      type: "boolean",
      description: "Mark this page as the homepage for its language and channel.",
      initialValue: false,
      group: "publishing",
      validation: (Rule: any) =>
        Rule.custom(async (value: boolean, context: any) => {
          if (!value) return true;
          const { document, getClient } = context;
          const language = document?.language || 'de';
          const channel = document?.channel || 'pksWeb';
          const baseId = (document?._id || '').replace(/^drafts\./, '');
          const client = getClient({ apiVersion: '2024-10-01' });
          const query = `count(*[_type == "page" && isHomepage == true && language == $language && channel == $channel && !(_id in [$draftId, $publishedId])])`;
          const params = {
            language,
            channel,
            draftId: `drafts.${baseId}`,
            publishedId: baseId,
          };
          try {
            const count = await client.fetch(query, params);
            return count === 0 || 'Another homepage already exists for this language + channel.';
          } catch (e) {
            return true;
          }
        }),
    }),
    {
      name: "language",
      title: "Language",
      type: "string",
      readOnly: true,
      hidden: true,
      description:
        "Managed by @sanity/document-internationalization; do not edit manually.",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      group: "basic",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (
          input: string,
          type: object,
          context: { parent?: { channel?: string } }
        ) => {
          // Get the base slug (standard slugify process)
          const baseSlug = input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");

          return baseSlug;
        },
        isUnique: async (
          slug: string,
          context: {
            document?: { channel?: string; _id: string; language?: string };
            getClient: (options: { apiVersion: string }) => any;
          }
        ) => {
          const { document, getClient } = context;
          const channel = document?.channel || "pksWeb";
          const language = document?.language || "de";
          const client = getClient({ apiVersion: "2021-03-25" });

          // Get the base ID without drafts prefix
          const baseId = document?._id.replace(/^drafts\./, "");

          // Query to check for conflicting slugs
          const query = `*[
            _type == "page" && 
            slug.current == $slug && 
            channel == $channel && 
            language == $language && 
            !(_id in [$draftId, $publishedId])
          ][0]`;
          const params = {
            slug: slug,
            channel: channel,
            language: language,
            draftId: `drafts.${baseId}`,
            publishedId: baseId,
          };

          const existingDoc = await client.fetch(query, params);
          return !existingDoc;
        },
      },
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      group: "basic",
    },

    {
      name: "contentPKS",
      title: "Content PKS",
      type: "array",
      group: "content",
      of: [
        { type: "hero" },
        { type: "blogList" },
        { type: "projectList" },
        { type: "clientsList" },
        { type: "contactForm" },
        { type: "showcaseTabs" },
        // Allow module types at top level as requested
        { type: "sciFiBlock" },
        { type: "gridHero" },
        { type: "gridHero2" },
        { type: "gridHero3" },
        { type: "zwischenTitelCta" },
        { type: "threeColumnVideoBanner" },
        { type: "fourColumnVideoBanner" },
      ],
      hidden: ({ parent }: { parent?: { channel?: string } }) =>
        parent?.channel !== "pksWeb",
    },
    {
      name: "contentAVT",
      title: "Content AVT",
      type: "array",
      group: "content",
      of: [
        { type: "heroAVT" },
        { type: "blogList" },
        { type: "projectList" },
        { type: "clientsList" },
        // Allow AVT-specific module types at top level
        { type: "sciFiBlockAVT" },
        { type: "gridHeroAVT" },
        { type: "gridHeroVariantAVT" },
        // Shared banners also available top level
        { type: "threeColumnVideoBanner" },
        { type: "fourColumnVideoBanner" },
      ],
      hidden: ({ parent }: { parent?: { channel?: string } }) =>
        parent?.channel !== "avtWeb",
    },

    {
      name: "channel",
      title: "Channel",
      type: "string",
      group: "publishing",
      options: {
        list: [
          { title: "PKS Website", value: "pksWeb" },
          { title: "Avtr Website", value: "avtWeb" },
        ],
        layout: "radio",
      },
      initialValue: (context: {
        document?: { __inferMetadata?: { params?: { channel?: string } } };
      }) => {
        return context.document?.__inferMetadata?.params?.channel || "pksWeb";
      },
      readOnly: true,
      description: "Automatically set channel based on creation location",
    },
    {
      name: "protected",
      title: "Protected Page",
      type: "boolean",
      initialValue: false,
      description: "Restrict access to this page by user group.",
      group: "access",
    },
    {
      name: "allowedGroups",
      title: "Allowed User Groups",
      type: "array",
      group: "access",
      of: [{ type: "reference", to: [{ type: "userGroup" }] }],
      hidden: ({ parent }: { parent?: { protected?: boolean } }) =>
        !parent?.protected,
      description:
        "Only users in these groups can access this page if protected.",
    },
  ],
  preview: {
    select: {
      title: "title",
      channel: "channel",
      isHomepage: "isHomepage",
    },
    prepare({
      title,
      channel,
      isHomepage,
    }: {
      title: string;
      channel: string;
      isHomepage?: boolean;
    }) {
      const channelLabel = channel === "pksWeb" ? "PKS Website" : "AVTR Website";
      const suffix = isHomepage ? " • 🏠 Homepage" : "";
      return {
        title: title || "Untitled Page",
        subtitle: `${channelLabel}${suffix}`,
      };
    },
  },
};
