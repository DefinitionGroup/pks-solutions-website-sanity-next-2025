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
  parameters: [
    { name: "channel", title: "Channel", type: "string" },
    { name: "language", title: "Language", type: "string" }
  ],
  value: (params: { channel: string, language: string }) => ({
    channel: params.channel,
    language: params.language || "de",
  }),
};

// Add templates for blog-related types
const blogPostTemplate = {
  id: "blogPost-with-lang",
  title: "Blog Post with Channel",
  schemaType: "blogPost",
  parameters: [{ name: "language", type: "string" }],
  value: (params: { language: string }) => ({
    language: params.language || "de",
  }),
};

const blogCategoryTemplate = {
  id: "blogCategory-with-lang",
  title: "Blog Category with Channel",
  schemaType: "blogCategory",
  parameters: [{ name: "language", type: "string" }],
  value: (params: { language: string }) => ({
    language: params.language || "de",
  }),
};

const blogAuthorTemplate = {
  id: "blogAuthor-with-lang",
  title: "Blog Author with Channel",
  schemaType: "blogAuthor",
  parameters: [{ name: "language", type: "string" }],
  value: (params: { language: string }) => ({
    language: params.language || "de",
  }),
};
const menuWithChannelTemplate = {
  id: "menu-with-channel",
  title: "Menu with Channel",
  schemaType: "menu",
  parameters: [
    { name: "channel", title: "Channel", type: "string" },
    { name: "language", title: "Language", type: "string" }
  ],
  value: (params: { channel: string, language: string }) => ({
    channel: params.channel,
    language: params.language || "de",
  }),
};
const clientWithLanguageTemplate = {
  id: "client-with-language",
  title: "Client with Language",
  schemaType: "client",
  parameters: [{ name: "language", type: "string" }],
  value: (params: { language: string }) => ({
    language: params.language || "de",
  }),
};
const projectWithLanguageTemplate = {
  id: "project-with-language",
  title: "Project with Language",
  schemaType: "project",
  parameters: [{ name: "language", type: "string" }],
  value: (params: { language: string }) => ({
    language: params.language || "de",
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
      blogPostTemplate,
      blogCategoryTemplate,
      blogAuthorTemplate,
      menuWithChannelTemplate,
      clientWithLanguageTemplate,
      projectWithLanguageTemplate,
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
        "project",
      ],
      weakReferences: true,
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
