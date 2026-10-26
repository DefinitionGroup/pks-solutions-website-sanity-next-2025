// Read-only HTTP smoke test. Cookies remain in this process, not the user's browser.
import assert from 'node:assert/strict';

const origin = process.argv[2] || 'http://localhost:3108';
const route = process.argv[3] || '/de';
const enabled = await fetch(new URL('/api/draft-mode/enable', origin), {
  redirect: 'manual',
});
assert.equal(enabled.status, 307, 'Draft mode should redirect after enabling');
const cookie = enabled.headers.getSetCookie().map(value => value.split(';')[0]).join('; ');
assert.ok(cookie.includes('__prerender_bypass='), 'Draft cookie must be set');
const response = await fetch(new URL(route, origin), { headers: { cookie } });
const html = await response.text();
const serverError = /Application error:|NEXT_HTTP_ERROR_FALLBACK;500|Internal Server Error/.test(html);
console.log(JSON.stringify({ origin, route, status: response.status, serverError }));
assert.equal(response.status, 200, 'Draft route must return HTTP 200');
assert.equal(serverError, false, 'Draft route must not render a server exception');
assert.ok(html.includes('You are in preview mode'), 'Draft banner must render');
console.log('PASS: draft route renders with preview mode enabled');
