import assert from 'node:assert/strict';
import { isCustomerPreview, customerPreviewGroups } from '../lib/customer-preview.ts';

for (const environment of ['production', 'development', 'preview', '']) {
  for (const flag of ['', '0', '1']) {
    process.env.VERCEL_ENV = environment;
    process.env.PKS_CUSTOMER_PREVIEW = flag;
    assert.equal(isCustomerPreview(), environment === 'preview' && flag === '1');
  }
}
const paths = customerPreviewGroups.flatMap(group => group.pages.map(page => page[1]));
assert.equal(paths.length, 16);
assert.equal(new Set(paths).size, 16);
assert.ok(paths.every(path => path.startsWith('/de') && !path.includes('referenz')));
console.log('PASS: production cannot enable automatic drafts; 16 unique review routes');
