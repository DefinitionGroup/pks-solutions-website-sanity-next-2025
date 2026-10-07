import type { PortableTextBlock } from '@portabletext/types';
import type { CloudinaryAsset, Hero } from './types';

interface EditorialBase {
  _key?: string;
  anchorId?: string;
  title: string;
}

export interface FaqSection extends EditorialBase {
  _type: 'faqSection';
  intro?: string;
  items: { _key: string; question: string; answer: PortableTextBlock[] }[];
}

export interface EditorialMedia extends EditorialBase {
  _type: 'editorialMedia';
  body: PortableTextBlock[];
  media?: CloudinaryAsset;
  mediaAlt?: string;
  caption?: string;
  layout?: 'mediaLeft' | 'mediaRight' | 'mediaWide';
  mediaFit?: 'contain' | 'cover';
  cta?: Hero['ctaButton'];
}

export interface ProcessSteps extends EditorialBase {
  _type: 'processSteps';
  intro?: string;
  steps: { _key: string; title: string; body: PortableTextBlock[] }[];
}

export type EditorialBlock = FaqSection | EditorialMedia | ProcessSteps;
