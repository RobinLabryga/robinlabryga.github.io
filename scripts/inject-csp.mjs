import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { JSDOM } from 'jsdom';

const distDir = path.join(process.cwd(), 'dist');

async function findHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return findHtmlFiles(fullPath);
      return entry.name.endsWith('.html') ? [fullPath] : [];
    }),
  );
  return files.flat();
}

function hashOf(text) {
  return `'sha256-${createHash('sha256').update(text, 'utf8').digest('base64')}'`;
}

const BASE_DIRECTIVES = [
  "default-src 'self'",
  "img-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'self'",
];

const htmlFiles = await findHtmlFiles(distDir);
let injected = 0;

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');

  const headOpenMatch = html.match(/<head[^>]*>/i);
  if (!headOpenMatch) {
    // Meta-refresh redirect stubs (papers/*) have no <head> and no scripts —
    // nothing here to protect.
    continue;
  }

  // Parsed only to find inline script/style content, never re-serialized —
  // splicing the meta tag into the original string below avoids jsdom
  // reformatting the rest of the (already-correct) build output.
  const { document } = new JSDOM(html).window;
  const scriptHashes = new Set(
    [...document.querySelectorAll('script:not([src])')].map((el) =>
      hashOf(el.textContent ?? ''),
    ),
  );
  const styleHashes = new Set(
    [...document.querySelectorAll('style')].map((el) =>
      hashOf(el.textContent ?? ''),
    ),
  );

  const directives = [
    ...BASE_DIRECTIVES,
    `script-src 'self' ${[...scriptHashes].join(' ')}`.trim(),
    `style-src 'self' ${[...styleHashes].join(' ')}`.trim(),
  ];
  const csp = directives.join('; ');

  // charset must stay the very first head element (so the parser knows the
  // encoding before it hits any non-ASCII byte); CSP must come immediately
  // after so it governs everything else that follows.
  const headStart = headOpenMatch.index + headOpenMatch[0].length;
  const charsetMatch = html
    .slice(headStart, headStart + 200)
    .match(/^\s*<meta charset="[^"]*"\s*\/?>/i);
  const insertAt = charsetMatch
    ? headStart + charsetMatch[0].length
    : headStart;

  const updated =
    html.slice(0, insertAt) +
    `\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />` +
    html.slice(insertAt);

  await writeFile(file, updated);
  injected++;
}

console.log(`CSP injected into ${injected} page(s).`);
