import { IoShareSocialOutline } from "react-icons/io5";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaYoutube,
  FaElementor,
} from "react-icons/fa";
import React from "react";

export default {
  // Changed from defineType({...}) to export default {...}
  name: "menu",
  title: "Menu",
  type: "document",
  i18n: {
    base: "de",
    languages: [
      { id: "en", title: "English" },
      { id: "de", title: "German" },
    ],
    referenceBehavior: "weak",
  },
  fields: [
    // Removed defineField wrappers from all fields below
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
      description: "Automatically matches menu type",
      hidden: ({ document }: { document: any }) => !!document?.menuType, // Added type annotation for document
      initialValue: "Menu",
    },
    {
      name: "menuType",
      title: "Menu Type",
      type: "string",
      options: {
        list: [
          { title: "Navbar", value: "Navbar" },
          { title: "Footer", value: "Footer" },
        ],
        layout: "radio",
      },
      validation: (Rule: any) => Rule.required(),
    },

    /* Navbar Fields */
    {
      name: "menuItems",
      title: "Navigation Items",
      type: "array",
      of: [
        {
          type: "object",
          icon: FaElementor,
          fields: [
            {
              name: "page",
              title: "Page",
              type: "reference",
              to: [{ type: "page" }],
              options: {
                // Modify filter to directly reference document's language
                // Remove filterParams entirely
                filter: ({ document }: { document: { language?: string } }) => {
                  if (!document?.language) {
                    // If language isn't set on the menu yet, maybe show no pages?
                    // Or return a filter that matches nothing, e.g., '_id == "___"'
                    return { filter: '_id == "___"' }; // Filter matching nothing
                  }
                  return {
                    filter: 'language == $language',
                    params: { language: document.language },
                  };
                },
              },
            },
            {
              name: "displayName",
              title: "Display Name",
              type: "string",
            },
          ],
        },
      ],
      hidden: ({ parent }: { parent: any }) => parent?.menuType !== "Navbar",
    },

    /* Shared Fields */
    {
      name: "imageCloud",
      title: "Logo",
      type: "cloudinary.asset",
      description: "Main logo (used in both header and footer)",
    },

    /* Footer Fields */
    {
      name: "footerColumns",
      title: "Footer Columns",
      type: "array",
      of: [
        {
          type: "object",
          icon: FaElementor,
          fields: [
            {
              // Removed defineField
              name: "title",
              title: "Column Title",
              type: "string",
            },
            {
              // Removed defineField
              name: "links",
              title: "Links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      // Removed defineField
                      name: "title",
                      title: "Title",
                      type: "string",
                      description: "Automatically matches link name",
                      hidden: ({ document }: { document: any }) =>
                        !!document?.menuType, // Added type annotation
                      initialValue: "Menu",
                    },
                    {
                      // Removed defineField
                      name: "linkType",
                      title: "Link Type",
                      type: "string",
                      options: {
                        list: [
                          { title: "Internal Page", value: "internal" },
                          { title: "External URL", value: "external" },
                        ],
                        layout: "radio",
                      },
                    },
                    {
                      // Removed defineField
                      name: "page",
                      title: "Page",
                      type: "reference",
                      to: [{ type: "page" }],
                      hidden: ({ parent }: { parent: any }) =>
                        parent?.linkType !== "internal",
                      options: {
                         // Modify filter to directly reference document's language
                         // Remove filterParams entirely
                        filter: ({ document }: { document: { language?: string } }) => {
                          if (!document?.language) {
                            return { filter: '_id == "___"' }; // Filter matching nothing
                          }
                          return {
                            filter: 'language == $language',
                            params: { language: document.language },
                          };
                        },
                      },
                    },
                    {
                      // Removed defineField
                      name: "externalUrl",
                      title: "External URL",
                      type: "url",
                      hidden: ({ parent }: { parent: any }) =>
                        parent?.linkType !== "external", // Added type annotation
                    },
                    {
                      // Removed defineField
                      name: "displayName",
                      title: "Link Name",
                      type: "string",
                    },
                  ],
                  preview: {
                    select: {
                      title: "displayName",
                      subtitle: "linkType",
                    },
                    prepare({
                      title,
                      subtitle,
                    }: {
                      title: string;
                      subtitle: string;
                    }) {
                      // Added type annotation
                      return {
                        title: title || "Untitled link",
                        subtitle: subtitle ? `${subtitle} link` : "",
                      };
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      hidden: ({ parent }: { parent: any }) => parent?.menuType !== "Footer", // Added type annotation
    },

    {
      name: "socialLinks",
      title: "Social Media Links",
      icon: IoShareSocialOutline,
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              // Removed defineField
              name: "platform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "Facebook" },
                  { title: "Instagram", value: "Instagram" },
                  { title: "X (Twitter)", value: "X" },
                  { title: "GitHub", value: "GitHub" },
                  { title: "YouTube", value: "YouTube" },
                ],
              },
            },
            {
              // Removed defineField
              name: "url",
              title: "Profile URL",
              type: "url",
            },
          ],
          preview: {
            select: {
              platform: "platform",
              url: "url",
            },
            prepare({ platform, url }: { platform: string; url: string }) {
              // Added type annotation
              const icons: Record<string, React.ElementType> = {
                // Added type annotation for icons
                Facebook: FaFacebook,
                Instagram: FaInstagram,
                X: FaTwitter,
                GitHub: FaGithub,
                YouTube: FaYoutube,
              };

              return {
                title: platform,
                subtitle: url,
                media: icons[platform]
                  ? React.createElement(icons[platform])
                  : null,
              };
            },
          },
        },
      ],
      hidden: ({ parent }: { parent: any }) => parent?.menuType !== "Footer", // Added type annotation
    },

    {
      name: "copyright",
      title: "Copyright Text",
      type: "string",
      hidden: ({ parent }: { parent: any }) => parent?.menuType !== "Footer", // Added type annotation
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
    {
      name: "validationRule", // This rule enforces uniqueness correctly
      title: "Unique Menu Type Validation",
      type: "string",
      readOnly: true,
      hidden: true,
      validation: (Rule: any) =>
        Rule.custom(async (value: any, context: any) => {
          const { document, getClient } = context;
          if (!document?.menuType || !document?.language || !document?.channel) {
            return true; // Not enough info yet
          }

          const client = getClient({ apiVersion: "2023-10-09" });
          // Checks if another menu of the same type, language, and channel exists
          const query = `count(*[_type == "menu" && menuType == $menuType && language == $language && channel == $channel && _id != $documentId && !(_id in [$draftId])])`; // Added draft check
          const draftId = `drafts.${document._id.replace("drafts.", "")}`;
          const params = {
            menuType: document.menuType,
            language: document.language,
            channel: document.channel,
            documentId: document._id.replace("drafts.", ""),
            draftId: draftId, // Pass draft ID to exclude it
          };

          try {
            const count = await client.fetch(query, params);
            if (count > 0) {
              // This is the error message you are seeing
              return `Only one ${document.menuType} menu is allowed per language and channel.`;
            }
          } catch (error) {
            console.error("Validation query failed:", error);
            return "Validation check failed, please try again.";
          }

          return true; // Validation passes
        }),
    },
  ],
  preview: {
    select: {
      menuType: "menuType",
    },
    prepare({ menuType }: { menuType: string }) {
      // Added type annotation
      return {
        title: menuType ? `${menuType} Menu` : "Menu",
      };
    },
  },
}; // Closed the export default object
