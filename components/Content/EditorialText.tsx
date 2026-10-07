import { PortableText, type PortableTextComponents } from 'next-sanity';
import type { PortableTextBlock } from '@portabletext/types';
import Button2 from '@/components/Button2';
import { blockText, headingId } from '@/lib/blog';
import styles from './editorial.module.css';

const safeHref = (value: unknown) => {
  const href = typeof value === 'string' ? value.trim() : '';
  return /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(href) ? href : '';
};

type Span = { _type?: string; text?: string; marks?: string[] };
type MarkDef = { _key?: string; _type?: string; href?: string };

// A paragraph that holds nothing but one link is a standalone call to action.
function standaloneLink(block: PortableTextBlock) {
  if ((block.style && block.style !== 'normal') || block.listItem) return null;
  const spans = (block.children as Span[]).filter(span => (span.text ?? '').trim().length > 0);
  if (spans.length !== 1 || spans[0]._type !== 'span') return null;
  const markDefs = (block.markDefs ?? []) as MarkDef[];
  const link = markDefs.find(def => def._type === 'link' && spans[0].marks?.includes(def._key ?? ''));
  const href = safeHref(link?.href);
  return href ? { text: spans[0].text ?? '', href } : null;
}

export const editorialComponents: PortableTextComponents = {
  block: {
    // Anchored so a table of contents can link to each section
    h2: ({ value, children }) => <h2 id={headingId(blockText(value)) || undefined}>{children}</h2>,
    normal: ({ value, children }) => {
      const cta = standaloneLink(value);
      if (!cta) return <p>{children}</p>;
      return (
        <div className={`not-prose ${styles.cta}`}>
          <Button2 text={cta.text} href={cta.href} />
        </div>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href = safeHref(value?.href);
      return href ? <a href={href}>{children}</a> : <>{children}</>;
    },
  },
};

export default function EditorialText({ content }: { content?: PortableTextBlock[] }) {
  if (!content?.length) return null;
  return <div className={styles.prose}><PortableText value={content} components={editorialComponents} /></div>;
}
