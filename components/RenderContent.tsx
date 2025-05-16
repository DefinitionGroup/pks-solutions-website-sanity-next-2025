import React from "react";
import HeroHighlightComponent from "@/components/HeroHighLightComponent";
import BlogListComponent from "@/components/BlogListComponent";
import SanityContactForm from "@/components/SanityContactForm";
import {
  BlogList,
  ClientsList,
  Hero,
  ProjectList,
  ContactForm,
} from "@/types/types";
interface RenderContentProps {
  contentPKS: (Hero | BlogList | ProjectList | ClientsList | ContactForm)[];
  locale: string;
}

const RenderContent: React.FC<RenderContentProps> = ({
  contentPKS,
  locale,
}) => {
  if (!contentPKS) {
    return null;
  }

  return (
    <>
      {contentPKS.map((block, index) => {
        switch (block._type) {
          case "hero":
            return <HeroHighlightComponent key={index} {...block} />;
          case "blogList":
            return (
              <BlogListComponent
                key={index}
                block={block as BlogList}
                locale={locale}
              />
            );
          case "contactForm":
            return <SanityContactForm key={index} value={block} />;

          default:
            console.warn(`Unsupported block type: ${block}`);
            return (
              <div
                key={index}
                className="container mx-auto my-4 p-4 border border-dashed border-red-500"
              >
                <p className="text-red-500 font-bold">
                  Unsupported block type: {block._type}
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
