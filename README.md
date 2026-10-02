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

Run `npm run check` before pushing. It prints one line per check and fails when a link dangles
or a published file is missing.

## Where content lives

| Content | File |
|---|---|
| Hero, features, Apple Intelligence band, Support, download text, navigation, footer | `src/data/site.ts` |
| Screenshot list with alt texts and captions | `src/data/site.ts` (`screenshots`) |
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

The download text follows the same value; all three wordings are already in the file.
`npm run check` verifies that the built homepage matches the status.

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
