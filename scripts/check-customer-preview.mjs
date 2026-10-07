import assert from 'node:assert/strict';
import { customerPreviewGroups } from '../lib/customer-preview.ts';

const origin = process.argv[2];
assert.ok(origin, 'Provide the customer-preview origin');
const overview = await fetch(new URL('/de/vorschau', origin));
assert.equal(overview.status, 200, 'Customer overview must be available');
const overviewHtml = await overview.text();
assert.ok(overviewHtml.includes('Alle 16 Seiten ansehen'), 'Must be a customer preview before testing anything else');
assert.match(overview.headers.get('x-robots-tag') || '', /noindex/);
assert.ok(!overviewHtml.includes('consent.cookiebot.com/uc.js'), 'No production cookie tracking in preview');

const pages = customerPreviewGroups.flatMap(group => group.pages);
assert.equal(pages.length, 16);
for (let i = 0; i < pages.length; i += 4) {
  await Promise.all(pages.slice(i, i + 4).map(async ([title, path]) => {
    // No draft cookie: every page must show drafts automatically.
    const response = await fetch(new URL(path, origin));
    const html = await response.text();
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get('x-robots-tag') || '', /noindex/, path);
    assert.ok(html.includes('Kundenvorschau'), path);
    assert.ok(!html.includes('Application error:'), path);
    if (path === '/de') assert.ok(html.includes('Prozesse mit Kennzahlen steuern'), 'Homepage must show its editorial draft');
    console.log(`PASS ${path} (${title})`);
  }));
}
const robots = await (await fetch(new URL('/robots.txt', origin))).text();
assert.match(robots, /Disallow: \/\s/);
for (const path of ['/de/referenzen', '/de/referenz-auftragszeiterfassung', '/de/referenz-planzeitermittlung']) {
  assert.equal((await fetch(new URL(path, origin))).status, 404, 'Reference templates must stay protected');
}
const contact = await fetch(new URL('/api/contact', origin), {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}',
});
assert.equal(contact.status, 403, 'Preview must never send contact emails');
console.log('PASS: 16 draft pages, noindex, protected templates and disabled form');
