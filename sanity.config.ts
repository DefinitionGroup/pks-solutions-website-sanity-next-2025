"use client";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { cloudinarySchemaPlugin } from "sanity-plugin-cloudinary";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/deskStructure";
import { presentationTool } from "sanity/presentation";
import { documentInternationalization } from "@sanity/document-internationalization";
import { copyPastePlugin } from "@superside-oss/sanity-plugin-copy-paste";
const pageWithChannelTemplate = {
  id: "page-with-channel",
  title: "Page with Channel",
  schemaType: "page",
  parameters: [{ name: "channel", title: "Channel", type: "string" }],
  value: (params: { channel: string }) => ({
    channel: params.channel,
  }),
};

// Add templates for blog-related types
const blogPostWithChannelTemplate = {
  id: "blogPost-with-channel",
  title: "Blog Post with Channel",
  schemaType: "blogPost",
  parameters: [{ name: "channel", title: "Channel", type: "string" }],
  value: (params: { channel: string }) => ({
    channel: params.channel,
  }),
};

const blogCategoryWithChannelTemplate = {
  id: "blogCategory-with-channel",
  title: "Blog Category with Channel",
  schemaType: "blogCategory",
  parameters: [{ name: "channel", title: "Channel", type: "string" }],
  value: (params: { channel: string }) => ({
    channel: params.channel,
  }),
};

const blogAuthorWithChannelTemplate = {
  id: "blogAuthor-with-channel",
  title: "Blog Author with Channel",
  schemaType: "blogAuthor",
  parameters: [{ name: "channel", title: "Channel", type: "string" }],
  value: (params: { channel: string }) => ({
    channel: params.channel,
  }),
};
const menuWithChannelTemplate = {
  id: "menu-with-channel",
  title: "Menu with Channel",
  schemaType: "menu",
  parameters: [{ name: "channel", title: "Channel", type: "string" }],
  value: (params: { channel: string }) => ({
    channel: params.channel,
  }),
};

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schema.types,
    // Add all templates to the array
    templates: (prev) => [
      ...prev,
      pageWithChannelTemplate,
      blogPostWithChannelTemplate,
      blogCategoryWithChannelTemplate,
      blogAuthorWithChannelTemplate,
      menuWithChannelTemplate,
    ],
  },
  plugins: [
    documentInternationalization({
      supportedLanguages: [
        { id: "de", title: "German" },
        { id: "en", title: "English" },
      ],
      schemaTypes: [
        "page",
        "blogPost",
        "blogCategory",
        "blogAuthor",
        "menu",
        "client",
      ],
    }),
    structureTool({ structure }), // Use the imported structure config here
    cloudinarySchemaPlugin(),
    visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      previewUrl: {
        origin:
          process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3000", // Provide a fallback origin
        preview: "/",
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    copyPastePlugin(),
  ],
});
