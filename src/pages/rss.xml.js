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
];

const escapeXml = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export async function GET() {
  const pubDate = new Date().toUTCString();
  const items = guides.map(([path, title, description]) => `
    <item>
      <title>${escapeXml(title)}</title>
      <link>${site}${path}</link>
      <guid>${site}${path}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`).join('');

  return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Baijiu365</title>
    <link>${site}/</link>
    <description>Practical baijiu guides for global readers.</description>
    <language>en</language>${items}
  </channel>
</rss>`, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
