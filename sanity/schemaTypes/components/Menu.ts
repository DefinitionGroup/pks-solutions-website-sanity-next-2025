import { defineField, defineType } from "sanity";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaYoutube, FaElementor } from "react-icons/fa";
import React from "react";
export default defineType({
  name: "menu",
  title: "Menu",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Automatically matches menu type",
      hidden: ({ document }) => !!document?.menuType,
      initialValue: "Menu",
    }),
    defineField({
      name: "menuType",
      title: "Menu Type",
      type: "string",
      options: {
        list: [
          { title: "Navbar", value: "Navbar" },
          { title: "Footer", value: "Footer" },
        ],
        layout: "radio"
      },
      validation: (Rule) => Rule.required(),
    }),

    /* Navbar Fields */
    defineField({
      name: "menuItems",
      title: "Navigation Items",
      type: "array",
      of: [{
        type: "object",
        icon: FaElementor,
        fields: [
          defineField({ 
            name: "page",
            title: "Page",
            type: "reference",
            to: [{ type: "page" }]
          }),
          defineField({
            name: "displayName",
            title: "Display Name",
            type: "string"
          })
        ]
      }],
      hidden: ({ parent }) => parent?.menuType !== "Navbar"
    }),

    /* Shared Fields */
    defineField({
      name: "imageCloud",
      title: "Logo",
      type: "cloudinary.asset",
      description: "Main logo (used in both header and footer)"
    }),

    /* Footer Fields */
    defineField({
      name: "footerColumns",
      title: "Footer Columns",
      type: "array",
      of: [{
        type: "object",
        icon: FaElementor,
        fields: [
          defineField({
            name: "title",
            title: "Column Title",
            type: "string"
          }),
          defineField({
            name: "links",
            title: "Links",
            type: "array",
            of: [{
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  description: "Automatically matches link name",
                  hidden: ({ document }) => !!document?.menuType,
                  initialValue: "Menu",
                }),
                defineField({
                  name: "linkType",
                  title: "Link Type",
                  type: "string",
                  options: {
                    list: [
                      { title: "Internal Page", value: "internal" },
                      { title: "External URL", value: "external" }
                    ],
                    layout: "radio"
                  }
                }),
                defineField({
                  name: "page",
                  title: "Page",
                  type: "reference",
                  to: [{ type: "page" }],
                  hidden: ({ parent }) => parent?.linkType !== "internal"
                }),
                defineField({
                  name: "externalUrl",
                  title: "External URL",
                  type: "url",
                  hidden: ({ parent }) => parent?.linkType !== "external"
                }),
                defineField({
                  name: "displayName",
                  title: "Link Name",
                  type: "string"
                })
              ],
              preview: {
                select: {
                  title: "displayName",
                  subtitle: "linkType"
                },
                prepare({ title, subtitle }) {
                  return {
                    title: title || "Untitled link",
                    subtitle: subtitle ? `${subtitle} link` : ""
                  };
                }
              }
            }]
          })
        ]
      }],
      hidden: ({ parent }) => parent?.menuType !== "Footer"
    }),

    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      icon: IoShareSocialOutline,
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({
            name: "platform",
            type: "string",
            options: {
              list: [
                { title: "Facebook", value: "Facebook" },
                { title: "Instagram", value: "Instagram" },
                { title: "X (Twitter)", value: "X",  },
                { title: "GitHub", value: "GitHub" },
                { title: "YouTube", value: "YouTube" }
              ]
            }
          }),
          defineField({
            name: "url",
            title: "Profile URL",
            type: "url"
          })
        ],
        preview: {
          select: {
            platform: "platform",
            url: "url"
          },
          prepare({ platform, url }) {
            const icons = {
              Facebook: FaFacebook,
              Instagram: FaInstagram,
              X: FaTwitter,
              GitHub: FaGithub,
              YouTube: FaYoutube
            };
            
            return {
              title: platform,
              subtitle: url,
              media: icons[platform as keyof typeof icons] ? React.createElement(icons[platform as keyof typeof icons]) : null
            };
          }
        }
      }],
      hidden: ({ parent }) => parent?.menuType !== "Footer"
    }),

    defineField({
      name: "copyright",
      title: "Copyright Text",
      type: "string",
      hidden: ({ parent }) => parent?.menuType !== "Footer"
    }),

    
   
  ],
  // Document-level validation to enforce a singleton per menu type.
  validation: (Rule) =>
    Rule.custom(async (doc, context) => {
      // If no document or menuType is set, skip further validation.
      if (!doc || !doc.menuType) return true;

      // Get the current document id.
      const id = doc._id || "";
      // Normalize the id by removing the "drafts." prefix, if it exists.
      const baseId = id.replace(/^drafts\./, "");

      const client = context.getClient({ apiVersion: "2023-01-01" });

      // Query for any other document with the same menuType but with an id
      // that is not either the current id or the base (published) id.
      const query = `
        *[_type == "menu" && menuType == $menuType && !(_id in [$id, $baseId])] {
          _id
        }
      `;
      const params = { menuType: doc.menuType, id, baseId };

      const result = await client.fetch(query, params);

      if (result.length > 0) {
        return `Only one ${doc.menuType} menu is allowed.`;
      }

      return true;
    }),
  // Add this preview configuration
  preview: {
    select: {
      menuType: "menuType",
    },
    prepare({ menuType }) {
      return {
        title: menuType ? `${menuType} Menu` : "Menu",
      };
    },
  },
});
