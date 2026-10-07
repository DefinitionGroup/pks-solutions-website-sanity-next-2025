import { useId } from 'react';
import type { FaqSection as FaqSectionType } from '@/types/editorial';
import EditorialText from './EditorialText';
import styles from './editorial.module.css';

export default function FaqSection({ title, intro, items, anchorId }: FaqSectionType) {
  const headingId = useId();
  if (!items?.length) return null;
  return (
    <section id={anchorId} aria-labelledby={headingId} className={`${styles.section} ${styles.faq}`}>
      <div className={styles.split}>
        <header>
          <h2 id={headingId} className={styles.title}>{title}</h2>
          {intro && <p className={styles.intro}>{intro}</p>}
        </header>
        <div className={styles.questions}>
          {items.map(item => (
            <details key={item._key} className={styles.question}>
              <summary>
                <h3>{item.question}</h3>
                <svg className={styles.plus} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12h16" stroke="currentColor" strokeWidth="1.5" />
                  <path className={styles.plusVertical} d="M12 4v16" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </summary>
              <div className={styles.answer}><EditorialText content={item.answer} /></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
