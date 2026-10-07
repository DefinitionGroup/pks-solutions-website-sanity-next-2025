import Image from 'next/image';
import { useId } from 'react';
import type { EditorialMedia as EditorialMediaType } from '@/types/editorial';
import { getOptimizedCloudinaryImageUrl, resolveCloudinaryAssetUrl } from '@/utils/cloudinary';
import { resolveSanityLink } from '@/utils/linkResolver';
import Button2 from '@/components/Button2';
import EditorialText from './EditorialText';
import styles from './editorial.module.css';

export default function EditorialMedia({ title, body, media, mediaAlt, caption, layout = 'mediaRight', mediaFit = 'contain', cta, anchorId, locale }: EditorialMediaType & { locale?: string }) {
  const headingId = useId();
  const url = resolveCloudinaryAssetUrl(media);
  const isVideo = media?.resource_type === 'video' || /\.(mp4|webm|mov)(?:\?|$)/i.test(url || '');
  const imageUrl = url && !isVideo ? getOptimizedCloudinaryImageUrl(url, { width: 1600 }) : '';
  const href = resolveSanityLink(cta?.link, locale);
  return (
    <section id={anchorId} aria-labelledby={headingId} className={`${styles.section} ${styles.mediaSection}`}>
      <div className={`${styles.mediaGrid} ${layout === 'mediaLeft' ? styles.mediaLeft : ''} ${layout === 'mediaWide' ? styles.mediaWide : ''} ${!imageUrl ? styles.noMedia : ''}`}>
        <div className={styles.mediaCopy}>
          <h2 id={headingId} className={styles.title}>{title}</h2>
          <EditorialText content={body} />
          {cta?.name && href && <div className={styles.cta}><Button2 text={cta.name} href={href} /></div>}
        </div>
        {imageUrl && (
          <figure className={styles.figure}>
            <div className={styles.mediaFrame}>
              <Image src={imageUrl} alt={mediaAlt || ''} width={media?.width || 1200} height={media?.height || 900} sizes={layout === 'mediaWide' ? '(max-width: 1536px) 100vw, 1536px' : '(max-width: 767px) 100vw, 58vw'} className={mediaFit === 'cover' ? styles.cover : styles.contain} />
            </div>
            {caption && <figcaption>{caption}</figcaption>}
          </figure>
        )}
      </div>
    </section>
  );
}
