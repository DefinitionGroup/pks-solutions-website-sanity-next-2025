"use client";
import { useEffect, useState } from "react";
import { Plus } from "@phosphor-icons/react";
import styles from "./blog.module.css";

type Heading = { id: string; title: string };

// Highlights the section currently being read; links stay plain anchors so the list works without JavaScript
export default function ArticleToc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!targets.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  const list = (
    <ol className={styles.tocList}>
      {headings.map((heading) => (
        <li key={heading.id}>
          <a href={`#${heading.id}`} className={styles.tocLink} aria-current={active === heading.id ? "true" : undefined}>
            {heading.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <nav aria-label="Inhalt dieses Beitrags" className={styles.toc}>
      <div className="hidden lg:block">
        <p className={styles.tocLabel}>Inhalt</p>
        {list}
      </div>
      <details className={`${styles.tocMobile} lg:hidden`}>
        <summary>
          Inhalt
          <Plus size={18} aria-hidden="true" />
        </summary>
        {list}
      </details>
    </nav>
  );
}
