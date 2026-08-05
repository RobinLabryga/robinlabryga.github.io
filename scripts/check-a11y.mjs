// axe-core needs a DOM to run against. A real browser (via Puppeteer/
// Playwright) would also catch layout-dependent rules (color-contrast,
// target-size, ...), but downloading a browser binary isn't reliable in every
// CI/sandbox environment. jsdom has no layout/paint engine, so this only
// catches structural/semantic issues (missing alt text, invalid ARIA,
// heading order, landmarks, labels, duplicate ids) — not visual ones.
import { readFile, readdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';

const require = createRequire(import.meta.url);
const axeSource = await readFile(
  require.resolve('axe-core/axe.min.js'),
  'utf8',
);

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

const htmlFiles = (await findHtmlFiles(distDir)).filter(
  // Meta-refresh redirect stubs to external (arxiv.org) URLs — nothing of
  // ours to check.
  (file) => !file.includes(`${path.sep}papers${path.sep}`),
);

const virtualConsole = new VirtualConsole();
// jsdom logs its own "not implemented" notices (e.g. canvas getContext, which
// axe-core probes internally) as console errors; this forwards real page
// console output while dropping that jsdom-specific noise.
virtualConsole.forwardTo(console, { jsdomErrors: 'none' });

let hadViolations = false;

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const dom = new JSDOM(html, {
    url: 'https://robinlabryga.github.io/',
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    virtualConsole,
  });

  dom.window.eval(axeSource);
  const results = await dom.window.axe.run(dom.window.document, {
    resultTypes: ['violations'],
  });

  const relPath = path.relative(distDir, file);

  if (results.violations.length === 0) {
    console.log(`✓ ${relPath}`);
    continue;
  }

  hadViolations = true;
  console.error(`✗ ${relPath}`);
  for (const violation of results.violations) {
    console.error(`  [${violation.impact}] ${violation.id}: ${violation.help}`);
    for (const node of violation.nodes) {
      console.error(`    ${node.target.join(' ')}`);
    }
  }
}

if (hadViolations) {
  console.error('\nAccessibility violations found.');
  process.exit(1);
}

console.log('\nNo accessibility violations found.');
