export default {
  name: "page",
  _type: "page",
  title: "Page",
  type: "document",
  fields: [
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
  ],
};
