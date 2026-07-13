const site = 'https://baijiu365.com';

const routes = [
  ['/baijiu-basics/', 'Start here for the definition, flavor expectations, drinking context, and beginner mistakes.'],
  ['/types-of-baijiu/', 'Compare sauce, strong, light, and rice aroma baijiu styles.'],
  ['/best-baijiu-for-beginners/', 'Choose a beginner bottle by occasion, budget, and aroma type.'],
  ['/how-to-buy-baijiu-outside-china/', 'Check overseas retail risks before buying.'],
  ['/how-to-spot-fake-maotai/', 'Understand common Maotai counterfeiting and listing risks.'],
  ['/baijiu-flavor-wheel/', 'Use practical tasting language for baijiu aroma and finish.'],
  ['/editorial-policy/', 'Editorial standards and correction policy.'],
];

export async function GET() {
  const body = `# Baijiu365

Baijiu365 is an independent English-language field guide to Chinese baijiu for global drinkers, hosts, collectors, travelers, and bartenders.

## Useful Pages

${routes.map(([path, note]) => `- [${site}${path}](${site}${path}) - ${note}`).join('\n')}

## Content Notes

The site focuses on practical judgment: aroma type, buying risk, drinking context, food use, and transparent limits. It does not currently sell alcohol, run affiliate links, or authenticate individual bottles.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
