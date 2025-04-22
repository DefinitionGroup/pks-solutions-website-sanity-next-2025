import React from "react";
import HeroHighlightComponent from "@/components/HeroHighLightComponent"; // Adjust path if needed
import BlogListComponent from "@/components/BlogListComponent"; // Adjust path if needed
import { BlogList, Hero } from "@/types/types"; // Assuming BlogList type is defined
interface RenderContentProps {
  content: (Hero | BlogList)[]; // Consider defining a more specific type for content blocks
  locale: string; // Pass locale down if child components need it
}

const RenderContent: React.FC<RenderContentProps> = ({ content, locale }) => {
  if (!content) {
    return null;
  }

  return (
    <>
      {content.map((block, index) => {
        // console.log("Rendering block:", block._type, block); // For debugging
        switch (block._type) {
          case "hero":
            // Spread block props to the component
            return <HeroHighlightComponent key={index} {...block} />;
          case "blogList":
            // Pass the specific block data and locale to BlogListComponent
            // Ensure BlogListComponent is adapted to receive 'block' and 'locale' props
            return (
              <BlogListComponent
                key={index}
                block={block as BlogList}
                locale={locale}
              />
            );
          // Add cases for other block types you have (e.g., textBlock, imageGallery, etc.)
          // case 'textBlock':
          //   return <TextBlockComponent key={index} {...block} />;
          default:
            // Optionally render a placeholder or log a warning for unhandled types
            console.warn(`Unsupported block type: ${block}`);
            return (
              <div
                key={index}
                className="container mx-auto my-4 p-4 border border-dashed border-red-500"
              >
                <p className="text-red-500 font-bold">
                  Unsupported block type: {block}
                </p>
                <pre className="text-xs text-gray-400">
                  {JSON.stringify(block, null, 2)}
                </pre>
              </div>
            );
        }
      })}
    </>
  );
};

export default RenderContent;
