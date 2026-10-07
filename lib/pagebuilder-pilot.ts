import type { PortableTextBlock } from '@portabletext/types';
import type { ContentSection, PageType } from '@/types/types';
import type { EditorialBlock, FaqSection } from '@/types/editorial';

const text = (block: PortableTextBlock) => block.children.map(child => 'text' in child ? child.text : '').join('');

/** Pure, lossless composition for the local pilot. Does not read or write the CMS. */
export function composePagebuilderPilot(content: PageType['contentPKS']): PageType['contentPKS'] {
  const sections = content.filter((block): block is ContentSection => block._type === 'contentSection');
  if (sections.length !== 5 || content.length !== 7) throw new Error('Pilot source changed: review the editorial mapping before continuing.');
  const [intro, process, analysis, product, faq] = sections;
  const expected = ['Warum Auftragszeiten häufig schwer vergleichbar sind', 'Auftrag, Tätigkeit und Arbeitsplatz zusammenführen', 'Eine bessere Grundlage für Auswertung und Nachkalkulation', 'Auftragszeiten mit PSystem erfassen', 'Häufige Fragen'];
  if (sections.some((section, i) => section.content[0]?.style !== 'h2' || text(section.content[0]) !== expected[i])) throw new Error('Pilot headings changed: no automatic remapping.');
  if (process.content.length !== 3) throw new Error('Pilot process copy changed: review the step mapping.');
  const questions: FaqSection['items'] = [];
  for (const block of faq.content.slice(1) as PortableTextBlock[]) {
    if (block.style === 'h3') {
      if (!block._key) throw new Error('FAQ question requires a stable key.');
      questions.push({ _key: block._key, question: text(block), answer: [] });
    }
    else if (questions.length) questions[questions.length - 1].answer.push(block);
    else throw new Error('FAQ answer without question.');
  }
  if (!questions.length || questions.some(item => !item.answer.length)) throw new Error('Pilot FAQ is incomplete.');
  const processBlock: EditorialBlock = {
    _type: 'processSteps', _key: 'pilot-process', anchorId: 'erfassungsregeln', title: text(process.content[0]),
    steps: [
      { _key: process.content[1]._key, title: 'Zuordnung festlegen', body: [process.content[1]] },
      { _key: process.content[2]._key, title: 'Nebenzeiten berücksichtigen', body: [process.content[2]] },
    ],
  };
  const mediaBlock: EditorialBlock = {
    _type: 'editorialMedia', _key: 'pilot-product', anchorId: 'psystem', title: text(product.content[0]), body: product.content.slice(1),
    layout: 'mediaRight', mediaFit: 'cover',
    media: {
      _type: 'cloudinary.asset', resource_type: 'image', format: 'jpg', width: 1280, height: 720,
      public_id: '585853_Manufacture_Machines_Helmet_Man_By_Pressmaster_Artlist_HD-mp41280_an56fj',
      secure_url: 'https://res.cloudinary.com/dghsgqy88/video/upload/so_1,w_1280,f_jpg/v1762375642/585853_Manufacture_Machines_Helmet_Man_By_Pressmaster_Artlist_HD-mp41280_an56fj.jpg',
    },
    mediaAlt: 'Mitarbeiter mit Schutzhelm zwischen Maschinen in einer Produktionshalle.',
    caption: 'Industrieaufnahme aus der bestehenden PKS-Website. Keine Softwareansicht.',
  };
  return [content[0], { ...intro, containerClass: undefined, layout: 'introColumns' }, processBlock, mediaBlock,
    { ...analysis, containerClass: undefined, layout: 'introColumns' },
    { _type: 'faqSection', _key: 'pilot-faq', anchorId: 'haeufige-fragen', title: text(faq.content[0]), items: questions }, content[6]];
}
