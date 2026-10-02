// Verifies the URL contract of a deployed site.
// Usage: npm run check:live -- https://inquizitive.peterkurzok.de
// Uses Node built-ins only; run it from the repository root, it compares files with
// src/assets/images and public/.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const base = process.argv[2]?.replace(/\/$/, '');
if (!base) {
  console.log('Usage: npm run check:live -- <base-url>');
  process.exit(1);
}

const imageSource = 'src/assets/images';
const release = 'https://github.com/pkurzok/Inquizitive-Web/releases/download/press-kit-en-US';
const archives = ['Inquizitive-Raw-Screenshots-en-US.zip', 'Inquizitive-Framed-Screenshots-en-US.zip'];
const aasaFiles = ['.well-known/apple-app-site-association', 'apple-app-site-association'];

let checks = 0;
let failures = 0;
const report = (ok, label, problem) => {
  checks += 1;
  if (ok) {
    console.log(`✓ ${label}`);
  } else {
    failures += 1;
    console.log(`✗ ${label}   ${problem}`);
  }
};

const get = (pathname) => fetch(base + pathname, { redirect: 'manual' });

try {
  await get('/');
} catch (error) {
  console.log(`✗ ${base} is not reachable: ${error.cause?.message ?? error.message}`);
  process.exit(1);
}

// Answers with `status`; `contentType` and `body` are optional further expectations.
const expectStatus = async (status, pathname, { contentType, body } = {}) => {
  const response = await get(pathname);
  const type = response.headers.get('content-type') ?? '';
  let problem;
  if (response.status !== status) {
    problem = `expected ${status}, got ${response.status}`;
  } else if (contentType && !type.startsWith(contentType)) {
    problem = `expected ${contentType}, got ${type}`;
  } else if (body && !Buffer.from(await response.arrayBuffer()).equals(body)) {
    problem = 'differs from the source file';
  }
  const details = [contentType, body && 'identical to source'].filter(Boolean).join(', ');
  report(!problem, `${status} ${pathname}${details ? ` (${details})` : ''}`, problem);
  return response;
};

// Redirects with `status` to `target`, a path on the site or an absolute URL.
const expectRedirect = async (status, pathname, target) => {
  const response = await get(pathname);
  const location = response.headers.get('location');
  const resolved = location ? new URL(location, base).href : 'no location';
  const expected = new URL(target, base).href;
  let problem;
  if (response.status !== status) {
    problem = `expected ${status}, got ${response.status}`;
  } else if (resolved !== expected) {
    problem = `expected ${expected}, got ${resolved}`;
  }
  report(!problem, `${status} ${pathname} -> ${target}`, problem);
};

// Pages
for (const page of ['/', '/privacy/', '/press/', '/s/']) {
  await expectStatus(200, page, { contentType: 'text/html' });
}
const privacy = await (await get('/privacy/')).text();
const title = privacy.match(/<title>([^<]*)<\/title>/)?.[1];
report(title === 'Privacy Policy - Inquizitive', 'title of /privacy/', `got "${title}"`);
const share = await (await get('/s/')).text();
report(
  share.includes('<meta property="og:title" content="A quiz on Inquizitive"'),
  'og:title of /s/',
  'the static tag is missing',
);

// Technical files
await expectStatus(200, '/feed.rss', { contentType: 'application/rss+xml' });
await expectStatus(200, '/sitemap.xml', { contentType: 'application/xml' });
await expectStatus(200, '/robots.txt');

// Universal links: both association files, as JSON and unchanged
for (const file of aasaFiles) {
  await expectStatus(200, `/${file}`, {
    contentType: 'application/json',
    body: await readFile(path.join('public', file)),
  });
}

// Every image keeps its URL and its bytes
const images = (await readdir(imageSource, { recursive: true, withFileTypes: true }))
  .filter((entry) => entry.isFile() && /\.(png|jpg|svg)$/.test(entry.name))
  .map((entry) => path.relative(imageSource, path.join(entry.parentPath, entry.name)))
  .sort();
for (const image of images) {
  await expectStatus(200, `/images/${image}`, { body: await readFile(path.join(imageSource, image)) });
}
// The second address of the app icon, used by older press-kit links.
await expectStatus(200, '/images/press/app-icon.png', {
  body: await readFile(path.join(imageSource, 'app-icon.png')),
});

// Trailing-slash forms
for (const [from, to] of [
  ['/privacy', '/privacy/'],
  ['/press', '/press/'],
  ['/s', '/s/'],
  ['/index.html', '/'],
  ['/privacy/index.html', '/privacy/'],
  ['/press/index.html', '/press/'],
  ['/s/index.html', '/s/'],
]) {
  await expectRedirect(308, from, to);
}

// Press archives live in a GitHub release
for (const archive of archives) {
  await expectRedirect(302, `/press/${archive}`, `${release}/${archive}`);
  const asset = await fetch(`${release}/${archive}`, { method: 'HEAD' });
  report(asset.status === 200, `200 ${archive} at the release`, `got ${asset.status}`);
}

// Old addresses of the sub-pages
await expectRedirect(301, '/privacy.html', '/privacy/');
await expectRedirect(301, '/press.html', '/press/');

// Unknown paths, including files of the old generator, whose names are assembled here so that
// searching the repository for them finds nothing. Cloudflare's edge may serve a deleted file
// from its cache for up to a week; the query string asks the deployment itself.
const fresh = `?fresh=${Date.now()}`;
for (const gone of [
  '/does-not-exist',
  '/css/styles.css',
  '/js/ign' + 'ite-core.js',
  '/downloads/press-kit/documents/inquizitive-press-release.pdf',
]) {
  await expectStatus(404, gone + fresh);
}

if (failures > 0) {
  console.log(`${failures} of ${checks} checks failed.`);
  process.exit(1);
}
console.log(`All ${checks} checks passed.`);
