# Inquizitive website

The source of <https://inquizitive.peterkurzok.de>: the homepage, the privacy policy, the press
kit and the landing page for shared quizzes of the Inquizitive app. It is an
[Astro](https://astro.build) project that builds to static files; this repository is the only
source of the site.

## Requirements

- Node 22 (`.nvmrc`)
- `npm ci` once after cloning

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Serves the site locally with live reload, by default at <http://localhost:4321/> |
| `npm run build` | Type-checks the project and builds the site into `dist/` |
| `npm run check` | Builds, then verifies `dist/`: expected files, images, links, file sizes |
| `npm run preview` | Serves the built `dist/` locally |
| `npm run check:live -- <base-url>` | Verifies a deployed site against the URL contract below |

Run `npm run check` before pushing. It prints one line per check and fails when a link dangles
or a published file is missing.

## Where content lives

| Content | File |
|---|---|
| Hero, features, Apple Intelligence band, Support, download text, navigation, footer | `src/data/site.ts` |
| Screenshot list with alt texts and captions | `src/data/site.ts` (`screenshots`) |
| Privacy policy | `src/pages/privacy.md` |
| Press kit: lead, download cards, facts, contact | `src/data/site.ts` (`press`) |
| Press kit: about, pricing, attribution, image usage, developer | `src/data/press/*.md` |
| Redirects | `public/_redirects` |
| Landing page for shared quizzes | `src/pages/s.astro` |
| Universal-link files, response headers | `public/.well-known/apple-app-site-association`, `public/apple-app-site-association`, `public/_headers` |
| 404 page | `src/pages/404.astro` |
| `robots.txt` | `public/robots.txt` |
| Markup of a section | `src/components/` |
| Page frame: `<head>`, header, footer | `src/layouts/Base.astro` |
| Styles | `src/styles/site.css` |

A Support entry, a feature text or a footer link is one edit in `src/data/site.ts`.

## Launch status

`app.status` in `src/data/site.ts` is the one value to change as the launch proceeds:

| Value | Hero and download band | When |
|---|---|---|
| `'announced'` | A button to the screenshots, and "Write to me" | Until the app is in the App Store |
| `'preorder'` | The "Pre-order on the App Store" badge | After App Review approved the pre-order |
| `'released'` | The "Download on the App Store" badge | On launch day |

The download text, the lead and the "Launch" fact of the press kit, its "App Store" fact and its
contact note follow the same value; all three wordings are already in the file.
`npm run check` verifies that the built homepage matches the status.

## Editing the privacy policy

The policy is `src/pages/privacy.md`, plain Markdown. When the wording changes, update the
"Last updated" line at the top of the text and the date that `scripts/check-dist.mjs` expects.
App Store Connect and the app link to `/privacy/`, so the path must stay.

## Shared quizzes and universal links

The app shares a quiz as `https://inquizitive.peterkurzok.de/s/#…`. On a device with the app
installed the link opens the app; everywhere else it shows `src/pages/s.astro`.

- The page has no navigation, is `noindex`, and carries an English and a German text. Its Open
  Graph tags are static on purpose: messengers build their link preview from them without
  running any script. The one inline script only hands the full address to the Smart App Banner.
- `public/.well-known/apple-app-site-association` is what makes the links open the app. It is
  load-bearing: a change to it changes which links the app receives, and Apple's CDN caches the
  file for up to 24 hours, so a mistake stays live for a day. `public/apple-app-site-association`
  is a second copy with identical content, and `public/_headers` serves both as
  `application/json`. `npm run check` fails when the copies differ or a header rule is missing.

## Images

Originals live in `src/assets/images/` and exist only there.

- They are published unchanged under `/images/…` by `src/pages/images/[...file].ts`. These URLs
  are linked from outside, so do not rename files.
- The app icon has a second address, `/images/press/app-icon.png`, which older press-kit links
  use. `src/pages/images/press/app-icon.png.ts` answers it with the same file.
- The pages show smaller variants that Astro derives from the same originals at build time.
- A new screenshot is a file in `src/assets/images/screenshots/` plus an entry in `screenshots`
  in `src/data/site.ts`. `npm run check` fails when the two do not match. The screenshots and
  the app icon come from the app repository; `make press-kit SITE=<this folder>` there copies
  them here.

## Press archives

The two screenshot archives are not in this repository. They are assets of the GitHub release
[`press-kit-en-US`](https://github.com/pkurzok/Inquizitive-Web/releases/tag/press-kit-en-US), and
`public/_redirects` sends `/press/Inquizitive-Framed-Screenshots-en-US.zip` and
`/press/Inquizitive-Raw-Screenshots-en-US.zip` there.

The archives are built and replaced from the app repository:

```sh
make press-kit            # builds both ZIPs from the en-US screenshots
make press-kit-release    # uploads both to the release; they are public at once
```

When the number of images or a size changes, update the card texts in `press.downloads` in
`src/data/site.ts`: they name what the release holds.

No file above 25 MiB may enter the build: Cloudflare Pages rejects it and the whole deployment
fails. `npm run check` fails for such a file and for any ZIP in `dist/`.

## Deployment

The Cloudflare Pages project `inquizitive-web` builds the site itself; there is nothing to upload.

- A push to `main` deploys to <https://inquizitive.peterkurzok.de>.
- Any other branch gets a preview at `https://<branch>.inquizitive-web.pages.dev`.
- Build settings in the Cloudflare dashboard (Settings, Builds & deployments): build command
  `npm run build`, build output directory `dist`, environment variable `NODE_VERSION` = `22`
  for production and preview.
- A failed build shows up as the "Cloudflare Pages" check on the commit in GitHub; the log is in
  the Cloudflare dashboard. The live site keeps its last successful deployment.

Check a preview before merging, and production after:

```sh
npm run check:live -- https://<branch>.inquizitive-web.pages.dev
npm run check:live -- https://inquizitive.peterkurzok.de
```

Cloudflare's edge may keep answering for a deleted file from its cache for up to a week.
`check:live` therefore asks for its 404 paths with a query string, which bypasses that cache.

### Rollback

In the Cloudflare dashboard open the Pages project, go to Deployments and choose "Rollback" on
an earlier deployment. That takes effect at once and needs no commit. Follow up by reverting
the offending commit on `main`, so that the next push does not bring the problem back.

## URL contract

These addresses are linked from the app, from App Store Connect or from press mails and must
keep working. `npm run check:live` tests every line.

| Address | Answer |
|---|---|
| `/`, `/privacy/`, `/press/`, `/s/` | 200 |
| `/privacy`, `/press`, `/s`, `/index.html`, `/privacy/index.html`, `/press/index.html`, `/s/index.html` | 308 to the form with a trailing slash |
| `/.well-known/apple-app-site-association`, `/apple-app-site-association` | 200 as `application/json`, identical to `public/` |
| `/press/Inquizitive-Framed-Screenshots-en-US.zip`, `/press/Inquizitive-Raw-Screenshots-en-US.zip` | 302 to the GitHub release |
| `/privacy.html`, `/press.html` | 301 to `/privacy/`, `/press/` |
| `/feed.rss`, `/sitemap.xml`, `/robots.txt` | 200 |
| every file in `src/assets/images/`, under `/images/…`, and `/images/press/app-icon.png` | 200, identical bytes |
| anything else | 404 with the 404 page |
