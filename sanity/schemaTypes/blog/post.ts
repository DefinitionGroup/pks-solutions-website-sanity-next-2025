import { defineType, defineField } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        defineField({
          name: "image",
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text"
            }
          ]
        })
      ]
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "blogCategory" } }]
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "blogAuthor" }
    })
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage"
    },
    prepare(selection) {
      const { author } = selection;
      return {
        ...selection,
        subtitle: author && `by ${author}`
      };
    }
  }
});