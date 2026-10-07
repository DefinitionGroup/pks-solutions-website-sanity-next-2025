import { useId } from 'react';
import type { ProcessSteps as ProcessStepsType } from '@/types/editorial';
import EditorialText from './EditorialText';
import styles from './editorial.module.css';

export default function ProcessSteps({ title, intro, steps, anchorId }: ProcessStepsType) {
  const headingId = useId();
  if (!steps?.length) return null;
  return (
    <section id={anchorId} aria-labelledby={headingId} className={`${styles.section} ${styles.process}`}>
      <header className={styles.processHeading}>
        <h2 id={headingId} className={styles.title}>{title}</h2>
        {intro && <p className={styles.intro}>{intro}</p>}
      </header>
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <li key={step._key}>
            <span className={styles.stepNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <EditorialText content={step.body} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
