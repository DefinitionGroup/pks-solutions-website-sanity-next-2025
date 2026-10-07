import { FC } from "react";
import { ContentSection as ContentSectionType } from "@/types/types";
import EditorialText from './EditorialText';
import styles from './editorial.module.css';

interface ContentSectionProps extends ContentSectionType {
  locale?: string;
  // First block of a page without a hero: clears the floating navigation and carries the page's H1
  isPageStart?: boolean;
}

const ContentSection: FC<ContentSectionProps> = ({ content: rawContent, containerClass, layout = 'reading', isPageStart = false }) => {
  const content = isPageStart && rawContent?.[0]?.style === 'h2' ? [{ ...rawContent[0], style: 'h1' }, ...rawContent.slice(1)] : rawContent;
  const split = layout === 'introColumns' && ['h1', 'h2'].includes(content?.[0]?.style ?? '');
  return (
    <section className={`${styles.section} ${split ? '' : styles.reading} ${isPageStart ? styles.pageStart : ''} ${containerClass || ''}`}>
      <div className={split ? styles.split : undefined}>
        {split ? <><EditorialText content={content.slice(0, 1)} /><EditorialText content={content.slice(1)} /></> : <EditorialText content={content} />}
      </div>
    </section>
  );
};

export default ContentSection;
