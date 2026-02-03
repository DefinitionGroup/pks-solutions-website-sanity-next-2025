"use client";

import { FC } from "react";
import { PortableText } from "next-sanity";
import { ContentSection as ContentSectionType } from "@/types/types";

interface ContentSectionProps extends ContentSectionType {
  locale?: string;
}

const ContentSection: FC<ContentSectionProps> = ({ content, containerClass = "container mx-auto px-4 py-8" }) => {
  return (
    <div className={containerClass}>
      <div className="prose dark:prose-invert max-w-none">
        <PortableText value={content} />
      </div>
    </div>
  );
};

export default ContentSection;
