import fs from 'fs';
import path from 'path';

const site = 'https://baijiu365.com';

const guides = [
  ['/', 'Baijiu365 - Practical Baijiu Guide for Global Drinkers', 'A practical English guide to Chinese baijiu.'],
  ['/baijiu-basics/', 'What Is Baijiu? A Practical Beginner Guide', 'Learn what baijiu is, what it tastes like, how it is made, and how to drink it.'],
  ['/types-of-baijiu/', 'Types of Baijiu', 'Compare major baijiu aroma types and their use cases.'],
  ['/best-baijiu-for-beginners/', 'Best Baijiu for Beginners', 'Choose a first baijiu bottle by use case, not status alone.'],
  ['/how-to-buy-baijiu-outside-china/', 'How to Buy Baijiu Outside China', 'Overseas buying checks for baijiu shoppers.'],
  ['/how-to-spot-fake-maotai/', 'How to Spot Fake Maotai', 'A risk-first guide to suspicious Maotai bottles and listings.'],
  ['/brands/maotai/', 'Maotai Brand Guide', 'Understand Maotai context before buying or gifting.'],
  ['/baijiu-flavor-wheel/', 'Baijiu Flavor Wheel', 'A simple vocabulary for tasting baijiu.'],
  ['/db/', 'Baijiu Database — 16 Varieties Across 6 Aroma Types', 'Complete parameter database with GB/T standards, ABV, tasting notes, and buying guides for every variety.'],
];

const aromaLabels = {
  sauce: 'Sauce Aroma', strong: 'Strong Aroma', light: 'Light Aroma',
  phoenix: 'Phoenix Aroma', herbal: 'Herbal Aroma', mixed: 'Mixed Aroma',
};

function loadDbEntries() {
  const varietiesDir = path.resolve(process.cwd(), 'data_pipeline/varieties');
  if (!fs.existsSync(varietiesDir)) return [];
  const files = fs.readdirSync(varietiesDir).filter(f => f.endsWith('.json'));
  return files.map(f => JSON.parse(fs.readFileSync(path.join(varietiesDir, f), 'utf-8')));
}

const escapeXml = (value) =>
  String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export async function GET() {
  const pubDate = new Date().toUTCString();
  const varieties = loadDbEntries();

  // Content guide items
  const guideItems = guides.map(([path_, title, description]) => `
    <item>
      <title>${escapeXml(title)}</title>
      <link>${site}${path_}</link>
      <guid>${site}${path_}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`);

  // Variety database items
  const varietyItems = varieties.map(v => {
    const title = `${v.name} (${v.name_cn}) — ${aromaLabels[v.aroma_type] || v.aroma_type} Baijiu | Baijiu365`;
    const desc = `${v.name}: ${v.aroma_type} aroma, ${v.abv_range} ABV, ${v.gbt_standard}, from ${v.region}. Complete parameter card with tasting notes and buying guide.`;
    return `
    <item>
      <title>${escapeXml(title)}</title>
      <link>${site}/db/variety/${v.id}/</link>
      <guid>${site}/db/variety/${v.id}/</guid>
      <description>${escapeXml(desc)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
  });

  // Aroma type items
  const aromaTypes = [...new Set(varieties.map(v => v.aroma_type))];
  const aromaItems = aromaTypes.map(a => {
    const count = varieties.filter(v => v.aroma_type === a).length;
    const label = aromaLabels[a] || a;
    return `
    <item>
      <title>${escapeXml(label)} Baijiu — ${count} Varieties | Baijiu365</title>
      <link>${site}/db/aroma/${a}/</link>
      <guid>${site}/db/aroma/${a}/</guid>
      <description>${escapeXml(`Browse all ${count} ${label.toLowerCase()} baijiu varieties with verified GB/T standards, ABV, and tasting notes.`)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
  });

  // Region items
  const regions = [...new Set(varieties.map(v => v.region))];
  const regionItems = regions.map(r => {
    const count = varieties.filter(v => v.region === r).length;
    return `
    <item>
      <title>${escapeXml(r)} Baijiu Region — ${count} Varieties | Baijiu365</title>
      <link>${site}/db/region/${r.toLowerCase()}/</link>
      <guid>${site}/db/region/${r.toLowerCase()}/</guid>
      <description>${escapeXml(`Browse ${count} baijiu varieties from ${r} with verified parameters, GB/T standards, and tasting notes.`)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
  });

  const allItems = [...guideItems, ...varietyItems, ...aromaItems, ...regionItems].join('');

  return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Baijiu365</title>
    <link>${site}/</link>
    <description>Practical baijiu guides for global readers — with a database of 16 varieties across 6 aroma types and 8 producing regions.</description>
    <language>en</language>${allItems}
  </channel>
</rss>`, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
