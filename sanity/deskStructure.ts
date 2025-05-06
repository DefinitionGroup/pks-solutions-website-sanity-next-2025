import type { StructureResolver } from "sanity/structure";
import {
  MdWeb,
  MdBusiness,
  MdArticle,
  MdMenu,
  MdCategory,
  MdPerson,
  MdTranslate, // Import language icon
} from "react-icons/md"; // Import necessary icons

// Define templates for creating documents with pre-filled channel
const createDocWithChannel = (S: any, schemaType: string, channel: string) => {
  // Use the template ID defined in sanity.config.ts
  return S.initialValueTemplateItem(`${schemaType}-with-channel`, { channel });
};

// Define supported languages (can also be imported from config if preferred)
const supportedLanguages = [
  { id: "de", title: "German" },
  { id: "en", title: "English" },
];

export const structure: StructureResolver = (S) => {
  // Define templates for each channel and document type (remains the same)
  const pksPageTemplate = createDocWithChannel(S, "page", "pksWeb");
  const avtrPageTemplate = createDocWithChannel(S, "page", "avtWeb");
  // Remove channel-specific blog templates since blogs are now channel-independent
  const pksMenuTemplate = createDocWithChannel(S, "menu", "pksWeb");
  const avtrMenuTemplate = createDocWithChannel(S, "menu", "avtWeb");

  // Create a shared blogs structure that's independent of channels
  const createBlogsStructure = () => {
    return S.listItem()
      .title("Blogs")
      .icon(MdArticle)
      .child(
        S.list()
          .title("Blog Content")
          .items(
            // Create a list item for each language
            supportedLanguages.map((lang) =>
              S.listItem()
                .title(`${lang.title} (${lang.id.toUpperCase()})`)
                .icon(MdTranslate)
                .child(
                  S.list()
                    .title(`Blogs - ${lang.title}`)
                    .items([
                      S.listItem()
                        .title("Blog Posts")
                        .icon(MdArticle)
                        .child(
                          S.documentTypeList("blogPost")
                            .title(`Blog Posts (${lang.title})`)
                            .filter('_type == "blogPost" && language == $language')
                            .params({ language: lang.id })
                        ),
                      S.listItem()
                        .title("Blog Categories")
                        .icon(MdCategory)
                        .child(
                          S.documentTypeList("blogCategory")
                            .title(`Blog Categories (${lang.title})`)
                            .filter('_type == "blogCategory" && language == $language')
                            .params({ language: lang.id })
                        ),
                      S.listItem()
                        .title("Blog Authors")
                        .icon(MdPerson)
                        .child(
                          S.documentTypeList("blogAuthor")
                            .title(`Blog Authors (${lang.title})`)
                            .filter('_type == "blogAuthor" && language == $language')
                            .params({ language: lang.id })
                        ),
                    ])
                )
            )
          )
      );
  };

  // Helper function to create the structure for a channel, now including language separation
  const createChannelStructure = (
    channelTitle: string,
    channelValue: string,
    channelIcon: React.ElementType
  ) => {
    return S.listItem()
      .title(channelTitle)
      .icon(channelIcon)
      .child(
        S.list()
          .title(`${channelTitle} Content`)
          .items(
            // Create a list item for each language
            supportedLanguages.map((lang) =>
              S.listItem()
                .title(`${lang.title} (${lang.id.toUpperCase()})`)
                .icon(MdTranslate) // Use a language icon
                .child(
                  S.list()
                    .title(`${channelTitle} - ${lang.title}`)
                    .items([
                      // Pages for the channel and language
                      S.listItem()
                        .title("Pages")
                        .icon(MdWeb)
                        .child(
                          S.documentTypeList("page")
                            .title(`Pages (${lang.title})`)
                            .filter(
                              '_type == "page" && channel == $channel && language == $language' // Add language filter
                            )
                            .params({ channel: channelValue, language: lang.id }) // Add language param
                            .initialValueTemplates([
                              // Templates remain channel-specific
                              channelValue === "pksWeb"
                                ? pksPageTemplate
                                : avtrPageTemplate,
                            ])
                        ),
                      // Menu section for the channel and language
                      S.listItem()
                        .title("Menus")
                        .icon(MdMenu)
                        .child(
                          S.documentTypeList("menu")
                            .title(`Menus (${lang.title})`)
                            .filter(
                              '_type == "menu" && channel == $channel && language == $language' // Add language filter
                            )
                            .params({ channel: channelValue, language: lang.id }) // Add language param
                            .initialValueTemplates([
                              channelValue === "pksWeb"
                                ? pksMenuTemplate
                                : avtrMenuTemplate,
                            ])
                        ),
                    ])
                )
            )
          )
      );
  };

  return S.list()
    .title("Content")
    .items([
      createChannelStructure("PKS", "pksWeb", MdBusiness), // PKS Section
      createChannelStructure("AVTR", "avtWeb", MdBusiness), // AVTR Section
      createBlogsStructure(), // Add the shared blogs structure
      S.divider(), // Add a visual separator
      // List other document types that are not channel-specific or language-specific (if any)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "page",
            "blogPost",
            "blogCategory",
            "blogAuthor",
            "menu", // Add schema names managed within channels/languages here
            // Add any other types managed within the channel/language structure
          ].includes(listItem.getId() || "")
      ),
    ]);
};
