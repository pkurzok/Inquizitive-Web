// The app icon exists once, as src/assets/images/app-icon.png. Older press-kit links point at
// /images/press/app-icon.png, so that address answers with the same file.
import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await readFile('src/assets/images/app-icon.png')), {
    headers: { 'Content-Type': 'image/png' },
  });
