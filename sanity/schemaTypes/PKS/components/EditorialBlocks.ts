import { defineArrayMember, defineField, defineType } from 'sanity';

const title = defineField({ name: 'title', title: 'Überschrift', type: 'string', validation: rule => rule.required() });
const anchor = defineField({ name: 'anchorId', title: 'Sprungmarke (optional)', type: 'string', description: 'Eindeutig auf dieser Seite, z. B. haeufige-fragen.', validation: rule => rule.regex(/^[a-z][a-z0-9-]*$/, { name: 'kleine Buchstaben, Zahlen und Bindestriche' }) });
const intro = defineField({ name: 'intro', title: 'Kurze Einleitung', type: 'text', rows: 3 });
const textBlocks = [defineArrayMember({ type: 'block', styles: [{ title: 'Absatz', value: 'normal' }], marks: { decorators: [{ title: 'Fett', value: 'strong' }, { title: 'Kursiv', value: 'em' }], annotations: [{ name: 'link', type: 'object', title: 'Link', fields: [{ name: 'href', type: 'url', title: 'Adresse', validation: rule => rule.required().uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }) }] }] } })];

export const faqSection = defineType({
  name: 'faqSection', title: 'FAQ – Fragen & Antworten', type: 'object',
  fields: [title, anchor, intro, defineField({ name: 'items', title: 'Fragen', type: 'array', validation: rule => rule.required().min(1), of: [defineArrayMember({ type: 'object', name: 'faqItem', title: 'Frage', fields: [
    defineField({ name: 'question', title: 'Frage', type: 'string', validation: rule => rule.required() }),
    defineField({ name: 'answer', title: 'Antwort', type: 'array', of: textBlocks, validation: rule => rule.required().min(1) }),
  ], preview: { select: { title: 'question' } } })] })],
  preview: { select: { title: 'title', items: 'items' }, prepare: ({ title: heading, items }) => ({ title: heading || 'FAQ', subtitle: `${items?.length || 0} Fragen · aufklappbar` }) },
});

export const editorialMedia = defineType({
  name: 'editorialMedia', title: 'Text & Bild', type: 'object',
  fields: [title, anchor,
    defineField({ name: 'body', title: 'Text', type: 'array', of: textBlocks, validation: rule => rule.required().min(1) }),
    defineField({ name: 'media', title: 'Bild aus Cloudinary', type: 'cloudinary.asset', description: 'Echte Produktansicht oder passendes Kontextbild. Ohne Bild erscheint nur der Text. Diese erste Variante unterstützt Bilder, keine Videos.', validation: rule => rule.custom(value => !value || (value as { resource_type?: string }).resource_type !== 'video' || 'Bitte ein Bild wählen; Video wird in diesem Block nicht unterstützt.') }),
    defineField({ name: 'mediaAlt', title: 'Bildbeschreibung', type: 'string', validation: rule => rule.custom((value, context) => !(context.parent as { media?: unknown })?.media || Boolean(value?.trim()) || 'Ein vorhandenes Bild benötigt eine verständliche Beschreibung.') }),
    defineField({ name: 'caption', title: 'Bildunterschrift', type: 'text', rows: 2 }),
    defineField({ name: 'layout', title: 'Anordnung', type: 'string', initialValue: 'mediaRight', options: { list: [{ title: 'Text links, Bild rechts', value: 'mediaRight' }, { title: 'Bild links, Text rechts', value: 'mediaLeft' }, { title: 'Großes Bild', value: 'mediaWide' }], layout: 'radio' } }),
    defineField({ name: 'mediaFit', title: 'Bilddarstellung', type: 'string', initialValue: 'contain', options: { list: [{ title: 'Vollständig zeigen (Screenshots)', value: 'contain' }, { title: 'Fläche füllen (Fotografie)', value: 'cover' }] } }),
    defineField({ name: 'cta', title: 'Optionaler Link', type: 'object', fields: [defineField({ name: 'name', title: 'Linktext', type: 'string' }), defineField({ name: 'link', title: 'Linkziel', type: 'link' })], validation: rule => rule.custom(value => !value || Boolean(value.name && value.link) || 'Linktext und Linkziel gemeinsam ausfüllen.') }),
  ],
  preview: { select: { title: 'title', layout: 'layout' }, prepare: ({ title: heading, layout }) => ({ title: heading || 'Text & Bild', subtitle: `Text & Bild · ${layout || 'mediaRight'}` }) },
});

export const processSteps = defineType({
  name: 'processSteps', title: 'Prozess – Schritte', type: 'object',
  fields: [title, anchor, intro, defineField({ name: 'steps', title: 'Schritte in Reihenfolge', type: 'array', validation: rule => rule.required().min(2).max(6), of: [defineArrayMember({ name: 'processStep', title: 'Schritt', type: 'object', fields: [title, defineField({ name: 'body', title: 'Erklärung', type: 'array', of: textBlocks, validation: rule => rule.required().min(1) })], preview: { select: { title: 'title' } } })] })],
  preview: { select: { title: 'title', steps: 'steps' }, prepare: ({ title: heading, steps }) => ({ title: heading || 'Prozess', subtitle: `${steps?.length || 0} Schritte` }) },
});
