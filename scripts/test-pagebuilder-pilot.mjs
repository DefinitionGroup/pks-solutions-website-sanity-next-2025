import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../lib/pagebuilder-pilot.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { composePagebuilderPilot } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const block = (key, style, text) => ({ _type: 'block', _key: key, style, markDefs: [], children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }] });
const headings = ['Warum Auftragszeiten häufig schwer vergleichbar sind', 'Auftrag, Tätigkeit und Arbeitsplatz zusammenführen', 'Eine bessere Grundlage für Auswertung und Nachkalkulation', 'Auftragszeiten mit PSystem erfassen', 'Häufige Fragen'];
const fixture = [
  { _type: 'hero', headline: 'Unveränderte H1' },
  ...headings.map((heading, i) => ({ _type: 'contentSection', content: i === 4
    ? [block('faq', 'h2', heading), block('q1', 'h3', 'Frage eins?'), block('a1', 'normal', 'Antwort eins.'), block('q2', 'h3', 'Frage zwei?'), block('a2', 'normal', 'Antwort zwei.')]
    : [block(`h${i}`, 'h2', heading), block(`p${i}`, 'normal', `Absatz ${i}`), block(`b${i}`, 'normal', `Zweiter Absatz ${i}`)] })),
  { _type: 'zwischenTitelCta', headline: 'Unveränderter Abschluss' },
];
const original = JSON.stringify(fixture);
const result = composePagebuilderPilot(fixture);
assert.equal(JSON.stringify(fixture), original, 'source not mutated');
assert.deepEqual(result.map(x => x._type), ['hero', 'contentSection', 'processSteps', 'editorialMedia', 'contentSection', 'faqSection', 'zwischenTitelCta']);
assert.equal(result[0], fixture[0]);
assert.equal(result[6], fixture[6]);
assert.equal(result[5].items.length, 2);
assert.deepEqual(result[2].steps.flatMap(x => x.body), fixture[2].content.slice(1));
assert.deepEqual(result[3].body, fixture[4].content.slice(1));
assert.throws(() => composePagebuilderPilot([]), /source changed/);
const changed = structuredClone(fixture);
changed[1].content[0].children[0].text = 'Andere Seite';
assert.throws(() => composePagebuilderPilot(changed), /headings changed/);
changed[1] = fixture[1];
changed[5].content.pop();
assert.throws(() => composePagebuilderPilot(changed), /incomplete/);
console.log('Pilot: mapping, immutable source, copy preservation and drift guards passed.');

// Optional real editorial snapshot; the path is supplied locally, never committed.
if (process.argv[2]) {
  const docs = JSON.parse(await readFile(process.argv[2], 'utf8'));
  const page = docs.find(d => d.slug?.current === 'auftragszeiterfassung-produktion');
  const output = composePagebuilderPilot(page.contentPKS);
  const strings = value => typeof value === 'string' ? [value] : Array.isArray(value) ? value.flatMap(strings) : value && typeof value === 'object' ? Object.values(value).flatMap(strings) : [];
  const outputStrings = strings(output);
  const originalCopy = page.contentPKS.filter(x => x._type === 'contentSection').flatMap(x => x.content).flatMap(x => x.children.map(c => c.text));
  for (const copy of originalCopy) assert.ok(outputStrings.includes(copy), `Missing copy: ${copy}`);
  const originalLinks = page.contentPKS.filter(x => x._type === 'contentSection').flatMap(x => x.content).flatMap(x => x.markDefs || []);
  for (const link of originalLinks) assert.ok(JSON.stringify(output).includes(JSON.stringify(link)), 'Link definition preserved');
  console.log(`Real editorial snapshot: ${originalCopy.length} text spans and ${originalLinks.length} links preserved.`);
}
