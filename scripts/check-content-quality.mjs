import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const pagesDir = join(root, 'src', 'pages');
const astroFiles = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      walk(full);
    } else if (name.endsWith('.astro')) {
      astroFiles.push(full);
    }
  }
}

walk(pagesDir);

const checks = astroFiles.map((file) => {
  const text = readFileSync(file, 'utf8');
  const rel = relative(root, file);
  const words = text.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const internalLinks = (text.match(/href="\/[^"]+"/g) ?? []).length;
  const hasDecisionBox = text.includes('decision-box') || text.includes('callout');
  const hasFaq = /<h2>FAQ<\/h2>|class="faq"/.test(text);
  const issues = [];

  if (words < 250 && !rel.includes('baijiu-101.astro')) issues.push('thin page');
  if (internalLinks < 2 && !rel.includes('baijiu-101.astro')) issues.push('few internal links');
  if (!hasDecisionBox && !rel.includes('baijiu-101.astro')) issues.push('missing callout/decision box');
  if (!hasFaq && /how-to|best-|basics|types/.test(rel)) issues.push('missing FAQ');

  return { rel, words, internalLinks, issues };
});

let failed = false;
for (const item of checks) {
  const status = item.issues.length ? 'WARN' : 'OK';
  if (item.issues.length) failed = true;
  console.log(`${status} ${item.rel} (${item.words} words, ${item.internalLinks} internal links)${item.issues.length ? ` - ${item.issues.join(', ')}` : ''}`);
}

if (failed) {
  console.log('\nContent quality warnings found. Treat these as editorial backlog, not a build failure.');
}
