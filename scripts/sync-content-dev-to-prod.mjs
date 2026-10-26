// Copies the approved editorial content from the development dataset to production.
//
//   node scripts/sync-content-dev-to-prod.mjs           dry run: reads both datasets, writes nothing
//   node scripts/sync-content-dev-to-prod.mjs --apply   backs up production, uploads missing images,
//                                                       publishes the documents, removes their stale drafts
//
// Run --apply only after martindev2 is deployed to production (the content uses faqSection,
// coverImage and other fields the old Studio and frontend do not know) and after the
// translation-metadata-language-field migration has run on production.
import { mkdir, writeFile } from 'node:fs/promises';
import { createClient } from '@sanity/client';

process.loadEnvFile('.env.local');

const APPLY = process.argv.includes('--apply');
const SOURCE = 'development';
const TARGET = 'production';

// The 16 pages of the customer preview (lib/customer-preview.ts) plus the two menus edited with them.
const INCLUDE = {
  'pks-redaktion-20261004-s09-de': 'Neue Seite: Auftragszeiterfassung',
  'pks-redaktion-20261004-s10-de': 'Neue Seite: Prozessoptimierung im Mittelstand',
  'pks-redaktion-20261004-s11-de': 'Neue Seite: Prozesse in Produktion und Verwaltung',
  'pks-redaktion-20261004-s12-de': 'Neue Seite: Schnittstellen und Einführung',
  'pks-redaktion-20261004-s14-de': 'Neuer Artikel: Prozesskennzahlen',
  'pks-redaktion-20261004-s15-de': 'Neuer Artikel: Planzeitermittlung mit Regressionsanalyse',
  'pks-redaktion-20261004-s16-de': 'Neuer Artikel: Auftragszeiten richtig erfassen',
  '0b7aaebd-64de-481e-a968-4c37a417b7b4': 'Startseite',
  'dc26f2be-470b-4f96-a21a-4c7a2ff9d9a5': 'Lösungen',
  '38c05b43-e306-4b57-8f8c-b5e5a1d1d0ca': 'PSystem',
  '4f4a6a1e-6fe4-4e52-a343-b7d633a4a328': 'PMobile',
  '0db04ac7-f39b-4f7f-bda9-484531e3319a': 'AVATR',
  '3b83bcbd-1c98-44fe-9b01-d144da6b85cb': 'Über uns',
  '6986bffd-cf58-4c82-a47b-42726a38e9cf': 'Kontakt',
  '6140c274-77b1-4325-b2c6-a09723974a74': 'Wissen',
  'cfde5fb9-bb6b-479e-8309-e6b686d50cf2': 'Impressum',
  '60605d40-ceea-448d-8758-b998f73589c2': 'Menü (pksWeb, de)',
  '60d343b8-59db-401f-90f5-0f5fc13d18c5': 'Menü (pksWeb, de)',
};

// Differences between the datasets that must not reach production with this sync.
const EXCLUDE = {
  'pks-redaktion-20261004-s17-de': 'Referenzvorlage, noch nicht freigegeben',
  'pks-redaktion-20261004-s18-de': 'Referenzvorlage, noch nicht freigegeben',
  'pks-redaktion-20261004-s19-de': 'Referenzvorlage, noch nicht freigegeben',
  '3bfb736b-6cf5-447c-b9e7-b4d5fa458242': 'Alter Testentwurf (TestPage)',
  '49753c59-8936-4e17-9a06-e4c325e50f22': 'Alter Testentwurf (StartseiteARC)',
  '617aef70-3522-4e7b-913c-cef76af721da': 'Alter Testentwurf (ohne Titel)',
  '878e03f3-a65a-4f0a-970a-1a9296fb6f34': 'Alter Testentwurf (Project)',
  'e4df965a-06f5-460b-9c61-4c2592512236': 'Alter Testentwurf (Projekte)',
  '138fa7de-76cd-4359-b660-13943132aaee': 'Alter Menü-Entwurf von 2025',
  '335a646a-69ad-4514-a674-49d5635d054c': 'Alter Menü-Entwurf von 2025',
  '7de32758-8419-4154-aba5-b476b93d9af3': 'Alter Entwurf von 2025 (Tech Innovators AG)',
  '4dfd5248-a443-4563-a5e5-79fef29b2dc7': 'Island-Beispielartikel aus dem PKS-Blog nehmen: vorerst zurückgestellt',
};
// translation.metadata differs only by the v6 migration, which production gets from the migration itself.
const EXCLUDE_TYPES = { 'translation.metadata': 'Nur Migrationsunterschied, kommt per sanity migration run' };

const client = dataset => createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset,
  apiVersion: '2025-01-01',
  useCdn: false,
  perspective: 'raw',
  token: APPLY && dataset === TARGET ? process.env.SANITY_API_WRITE_TOKEN : process.env.SANITY_API_READ_TOKEN,
});
const source = client(SOURCE);
const target = client(TARGET);

const sortDeep = v => Array.isArray(v) ? v.map(sortDeep)
  : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map(k => [k, sortDeep(v[k])])) : v;
const strip = doc => Object.fromEntries(Object.entries(doc).filter(([k]) => !['_rev', '_updatedAt', '_system'].includes(k)));
const content = doc => doc && JSON.stringify(sortDeep(strip({ ...doc, _id: undefined, _createdAt: undefined })));
const refs = (value, out = new Set()) => {
  if (Array.isArray(value)) value.forEach(v => refs(v, out));
  else if (value && typeof value === 'object') {
    if (typeof value._ref === 'string') out.add(value._ref);
    Object.values(value).forEach(v => refs(v, out));
  }
  return out;
};
const isAsset = id => /^(image|file)-/.test(id);
const byId = docs => new Map(docs.map(d => [d._id, d]));

const ids = Object.keys(INCLUDE);
const withDrafts = ids.flatMap(id => [id, `drafts.${id}`]);
const all = '*[!(_id in path("_.**")) && !(_type match "sanity.*")]';
const [src, dst, srcAll, dstAll] = await Promise.all([
  source.fetch('*[_id in $ids]', { ids: withDrafts }).then(byId),
  target.fetch('*[_id in $ids]', { ids: withDrafts }).then(byId),
  source.fetch(all).then(byId),
  target.fetch(all).then(byId),
]);

const problems = [];
const plan = [];
for (const id of ids) {
  const doc = src.get(id);
  if (!doc) { problems.push(`${id} (${INCLUDE[id]}) fehlt in ${SOURCE}`); continue; }
  if (src.has(`drafts.${id}`)) problems.push(`${id} (${INCLUDE[id]}) hat einen unveröffentlichten Entwurf in ${SOURCE}, der nicht mitkopiert würde`);
  const live = dst.get(id);
  const draft = dst.get(`drafts.${id}`);
  for (const d of [live, draft]) {
    if (d && d._updatedAt > doc._updatedAt) problems.push(`${d._id} wurde in ${TARGET} nach dem Stand in ${SOURCE} bearbeitet (${d._updatedAt})`);
  }
  const action = !live ? 'neu' : content(live) === content(doc) ? 'unverändert' : 'aktualisiert';
  plan.push({ id, doc, action, live, draft });
}

// Every reference must resolve in production once the sync has run.
const assetIds = new Set();
const missingRefs = [];
const cloudinaryUrls = new Set();
for (const { id, doc } of plan) {
  for (const url of JSON.stringify(doc).match(/https:\/\/res\.cloudinary\.com\/[^"\\]+/g) ?? []) cloudinaryUrls.add(url);
  for (const ref of refs(doc)) {
    if (isAsset(ref)) assetIds.add(ref);
    else if (!dstAll.has(ref) && !INCLUDE[ref]) missingRefs.push(`${id} → ${ref} (${srcAll.get(ref)?._type ?? 'unbekannt'}${EXCLUDE[ref] ? `, ausgeschlossen: ${EXCLUDE[ref]}` : ''})`);
  }
}
problems.push(...missingRefs.map(r => `Verweis fehlt in ${TARGET}: ${r}`));

const assetQuery = '*[_id in $ids]{_id, url, originalFilename, mimeType, size}';
const [srcAssets, dstAssets] = await Promise.all([
  source.fetch(assetQuery, { ids: [...assetIds] }).then(byId),
  target.fetch(assetQuery, { ids: [...assetIds] }).then(byId),
]);
const missingAssets = [...assetIds].filter(a => !dstAssets.has(a));
for (const a of missingAssets) if (!srcAssets.has(a)) problems.push(`Bild ${a} fehlt in beiden Datasets`);

// Cloudinary media travel inside the documents as URLs; they only need to load.
const brokenUrls = (await Promise.all([...cloudinaryUrls].map(async url => {
  const res = await fetch(url, { method: 'HEAD' }).catch(() => null);
  return res?.ok ? null : `${res?.status ?? 'Netzwerkfehler'} ${url}`;
}))).filter(Boolean);
problems.push(...brokenUrls.map(u => `Cloudinary-Medium lädt nicht: ${u}`));

// Anything else that differs and is neither included nor excluded on purpose.
const unlisted = [...srcAll.values()].filter(d => {
  const base = d._id.replace(/^drafts\./, '');
  if (INCLUDE[base] || EXCLUDE[base] || EXCLUDE_TYPES[d._type]) return false;
  return content(d) !== content(dstAll.get(d._id));
});

const line = (...cols) => console.log('  ' + cols.join('  '));
console.log(`${APPLY ? 'APPLY' : 'DRY RUN'}: ${SOURCE} → ${TARGET} (${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID})\n`);
console.log(`Dokumente (${plan.length}):`);
for (const p of plan) line(p.action.padEnd(12), p.doc._type.padEnd(9), INCLUDE[p.id].padEnd(58), p.draft ? `+ veralteten Entwurf ${p.draft._id} löschen` : '');
console.log(`\nCloudinary-Medien: ${cloudinaryUrls.size} in den Dokumenten, ${brokenUrls.length} laden nicht`);
console.log(`Sanity-Bilder: ${assetIds.size} referenziert, ${missingAssets.length} fehlen in ${TARGET}`);
for (const a of missingAssets) {
  const s = srcAssets.get(a);
  line(a, s ? `${s.originalFilename ?? ''} ${Math.round((s.size ?? 0) / 1024)} KB` : '');
}
console.log(`\nAusgeschlossen (${Object.keys(EXCLUDE).length} Dokumente, Typ ${Object.keys(EXCLUDE_TYPES).join(', ')}):`);
for (const [id, why] of Object.entries(EXCLUDE)) line(id.padEnd(40), why);
if (unlisted.length) {
  console.log(`\nWeder ein- noch ausgeschlossen, unterscheidet sich aber (${unlisted.length}):`);
  for (const d of unlisted) line(d._type.padEnd(9), d._id);
}
console.log(problems.length ? `\nProbleme (${problems.length}):` : '\nKeine Probleme gefunden.');
for (const p of problems) line(p);

if (!APPLY) {
  console.log(`\nNichts geschrieben. Zum Ausführen: node scripts/sync-content-dev-to-prod.mjs --apply`);
  process.exit(problems.length ? 1 : 0);
}
if (problems.length) {
  console.error('\nAbgebrochen: erst die Probleme lösen.');
  process.exit(1);
}
if (!process.env.SANITY_API_WRITE_TOKEN) {
  console.error('\nAbgebrochen: SANITY_API_WRITE_TOKEN fehlt.');
  process.exit(1);
}

// Backup every production document this run replaces or deletes.
const backup = plan.flatMap(p => [p.live, p.draft]).filter(Boolean);
await mkdir('.backups', { recursive: true });
const backupFile = `.backups/sync-${TARGET}-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
await writeFile(backupFile, JSON.stringify(backup, null, 2));
console.log(`\nBackup: ${backupFile} (${backup.length} Dokumente)`);

// Asset ids are content hashes, so uploading the same file to production yields the same id.
for (const a of missingAssets) {
  const s = srcAssets.get(a);
  const res = await fetch(s.url);
  if (!res.ok) throw new Error(`Download ${a}: HTTP ${res.status}`);
  const uploaded = await target.assets.upload(a.startsWith('image-') ? 'image' : 'file', Buffer.from(await res.arrayBuffer()), {
    filename: s.originalFilename,
    contentType: s.mimeType,
  });
  if (uploaded._id !== a) throw new Error(`Upload ${a} ergab ${uploaded._id}; Verweise würden brechen`);
  console.log(`  hochgeladen ${a}`);
}

const tx = target.transaction();
for (const p of plan) {
  if (p.action !== 'unverändert') tx.createOrReplace(strip(p.doc));
  if (p.draft) tx.delete(p.draft._id);
}
const result = await tx.commit({ visibility: 'sync' });
console.log(`\nFertig: ${result.results.length} Mutationen in ${TARGET} (Transaktion ${result.transactionId}).`);
