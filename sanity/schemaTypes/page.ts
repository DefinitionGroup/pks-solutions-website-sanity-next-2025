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
      // add more locales here…
    ],
    referenceBehavior: "weak", // or "strong" if you prefer
  },
  fields: [
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
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    },

    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "hero" }, { type: "blogList" }],
    },
    {
      name: "channel",
      title: "Channel",
      type: "string",
      options: {
        list: [
          { title: "PKS Website", value: "pksWeb" },
          { title: "Avtr Website", value: "avtWeb" },
        ],
        layout: "radio",
      },
      initialValue: (context: any) => {
        return context.document?.__inferMetadata?.params?.channel || "pksWeb";
      },
      readOnly: true,
      description: "Automatically set channel based on creation location",
    },
  ],
};
