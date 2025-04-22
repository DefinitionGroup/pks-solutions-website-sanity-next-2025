import type { StructureResolver } from "sanity/structure";
import {
  MdWeb,
  MdBusiness,
  MdArticle,
  MdMenu,
  MdCategory,
  MdPerson,
} from "react-icons/md"; // Import necessary icons

// Define templates for creating documents with pre-filled channel
const createDocWithChannel = (S: any, schemaType: string, channel: string) => {
  // Use the template ID defined in sanity.config.ts
  return S.initialValueTemplateItem(`${schemaType}-with-channel`, { channel });
};

export const structure: StructureResolver = (S) => {
  // Define templates for each channel and document type
  const pksPageTemplate = createDocWithChannel(S, "page", "pksWeb");
  const avtrPageTemplate = createDocWithChannel(S, "page", "avtWeb");
  // Add templates for blog posts, categories, authors
  const pksBlogPostTemplate = createDocWithChannel(S, "blogPost", "pksWeb");
  const avtrBlogPostTemplate = createDocWithChannel(S, "blogPost", "avtWeb");
  const pksBlogCategoryTemplate = createDocWithChannel(
    S,
    "blogCategory",
    "pksWeb"
  );
  const avtrBlogCategoryTemplate = createDocWithChannel(
    S,
    "blogCategory",
    "avtWeb"
  );
  const pksBlogAuthorTemplate = createDocWithChannel(S, "blogAuthor", "pksWeb");
  const avtrBlogAuthorTemplate = createDocWithChannel(
    S,
    "blogAuthor",
    "avtWeb"
  );
  // Add menu templates if needed later
  const pksMenuTemplate = createDocWithChannel(S, "menu", "pksWeb");
  const avtrMenuTemplate = createDocWithChannel(S, "menu", "avtWeb");

  // Helper function to create the structure for a channel
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
          .items([
            // Pages for the channel
            S.listItem()
              .title("Pages")
              .icon(MdWeb)
              .child(
                S.documentTypeList("page")
                  .title(`Pages for ${channelTitle}`)
                  .filter('_type == "page" && channel == $channel')
                  .params({ channel: channelValue })
                  .initialValueTemplates([
                    channelValue === "pksWeb"
                      ? pksPageTemplate
                      : avtrPageTemplate,
                  ])
              ),
            // Blogs section for the channel
            S.listItem()
              .title("Blogs")
              .icon(MdArticle)
              .child(
                S.list()
                  .title(`${channelTitle} Blogs`)
                  .items([
                    S.listItem()
                      .title("Blog Posts")
                      .icon(MdArticle)
                      .child(
                        S.documentTypeList("blogPost") // Assuming 'blogPost' is the schema name
                          .title(`Blog Posts for ${channelTitle}`)
                          .filter('_type == "blogPost" && channel == $channel') // Filter needs channel field in schema
                          .params({ channel: channelValue })
                          .initialValueTemplates([
                            // Use the correct template
                            channelValue === "pksWeb"
                              ? pksBlogPostTemplate
                              : avtrBlogPostTemplate,
                          ])
                      ),
                    S.listItem()
                      .title("Blog Categories")
                      .icon(MdCategory)
                      .child(
                        S.documentTypeList("blogCategory") // Assuming 'blogCategory' is the schema name
                          .title(`Blog Categories for ${channelTitle}`)
                          .filter(
                            '_type == "blogCategory" && channel == $channel'
                          ) // Filter needs channel field in schema
                          .params({ channel: channelValue })
                          .initialValueTemplates([
                            // Use the correct template
                            channelValue === "pksWeb"
                              ? pksBlogCategoryTemplate
                              : avtrBlogCategoryTemplate,
                          ])
                      ),
                    S.listItem()
                      .title("Blog Authors")
                      .icon(MdPerson)
                      .child(
                        S.documentTypeList("blogAuthor") // Assuming 'blogAuthor' is the schema name
                          .title(`Blog Authors for ${channelTitle}`)
                          .filter(
                            '_type == "blogAuthor" && channel == $channel'
                          ) // Filter needs channel field in schema
                          .params({ channel: channelValue })
                          .initialValueTemplates([
                            // Use the correct template
                            channelValue === "pksWeb"
                              ? pksBlogAuthorTemplate
                              : avtrBlogAuthorTemplate,
                          ])
                      ),
                  ])
              ),
            // Menu section for the channel (Add templates if needed)
            S.listItem()
              .title("Menus")
              .icon(MdMenu)
              .child(
                S.documentTypeList("menu") // Assuming 'menu' is the schema name for Nav/Footer menus
                  .title(`Menus for ${channelTitle}`)
                  .filter('_type == "menu" && channel == $channel') // Filter needs channel field in schema
                  .params({ channel: channelValue })
                  .initialValueTemplates([
                    channelValue === "pksWeb"
                      ? pksMenuTemplate
                      : avtrMenuTemplate,
                  ])
              ),
          ])
      );
  };

  return S.list()
    .title("Content")
    .items([
      createChannelStructure("PKS", "pksWeb", MdBusiness), // PKS Section
      createChannelStructure("AVTR", "avtWeb", MdBusiness), // AVTR Section
      S.divider(), // Add a visual separator
      // List other document types that are not channel-specific (if any)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "page",
            "blogPost",
            "blogCategory",
            "blogAuthor",
            "menu", // Add schema names managed within channels here
            // Add any other types managed within the channel structure
          ].includes(listItem.getId() || "")
      ),
    ]);
};
