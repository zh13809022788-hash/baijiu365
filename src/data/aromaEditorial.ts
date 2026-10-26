/**
 * Editorial copy for the aroma-type landing pages.
 *
 * Every page in /db/aroma/[type]/ is a category landing page that also has to
 * answer "what is this style and should I buy it". The bottle grid and the
 * table come from data_pipeline; the prose here explains the style itself.
 *
 * Facts stated here are the standard published descriptions of each style
 * (production cycle, vessel, dominant ester, style standard). Where the
 * database has a per-bottle value we render that instead of hardcoding it.
 */

export type AromaFact = { label: string; value: string };

export type AromaEditorial = {
  cn: string;
  /** One-line definition, used under the H1. */
  lede: string;
  /** "What defines it" paragraphs. */
  definition: string[];
  /** Key/value panel beside the prose. */
  facts: AromaFact[];
  /** "How it is made" paragraphs. */
  method: string[];
  /** Sensory description, three slots. */
  nose: string;
  palate: string;
  finish: string;
  /** Serving guidance. */
  serving: AromaFact[];
  /** Corrections of common misunderstandings. */
  misconceptions: { claim: string; reality: string }[];
  /** Cross-links written for this style. */
  related: { href: string; label: string }[];
};

export const aromaEditorial: Record<string, AromaEditorial> = {
  sauce: {
    cn: '酱香',
    lede:
      'The slowest and most expensive style to make: a year of cycling fermentation, three or more years in jar, and a flavour built on roasted, fermented savoury notes rather than fruit.',
    definition: [
      'Sauce aroma is named for a family resemblance, not for soy sauce. What the name points at is the savoury, fermented, roasted register that dominates the glass: fermented soybean paste, roasted peanut, dried mushroom, a wisp of smoke. Behind that sits a deep base of cooked grain and dried fruit. No other baijiu style is this savoury, and none divides drinkers this sharply.',
      'The style is defined less by a recipe than by heat and time. The qu starter is made at 60–65°C, hot enough to kill most of the moulds that other styles rely on and to select for thermophilic bacteria instead. Fermentation happens in stone-walled pits with mud floors, and the whole cycle runs a full year before a single bottle is possible. That cost is why the style sits at the top of the price ladder.',
      'In the Chinese classification, sauce aroma is one of the twelve recognised aroma types, and the one with the strongest regional identity: the Chishui River valley in northern Guizhou and its continuation into southern Sichuan. Bottles made outside that valley exist, but the reference points are all from there.',
    ],
    facts: [
      { label: 'Chinese name', value: '酱香型 · jiàngxiāng' },
      { label: 'Style standard', value: 'GB/T 26760' },
      { label: 'Qu', value: 'High-temperature daqu, 60–65°C' },
      { label: 'Vessel', value: 'Stone-walled pit, mud floor' },
      { label: 'Cycle', value: 'One year, eight fermentations' },
      { label: 'Minimum age', value: '3 years in ceramic before blending' },
      { label: 'Typical ABV', value: '53%' },
      { label: 'Dominant character', value: 'Pyrazines, 4-ethylguaiacol' },
    ],
    method: [
      'Production follows a fixed calendar. Qu is made at the Dragon Boat Festival in early summer, when temperatures are high enough for the starter to cure hot. Grain is fed in at the Double Ninth Festival in autumn, in two rounds — the second feeding is what the trade calls 下沙, adding fresh sorghum to the already-fermenting mash. From there the mash is steamed, fermented, and distilled eight times over the following year, with spirit drawn off seven times.',
      'Those seven draws are not the same liquid. The early draws are sharp and high in alcohol; the middle draws carry the body; the late draws are softer and more acidic. Each is stored separately, then blended — a step called 盘勾 — so that the final bottle is a construction rather than a single distillation. Base spirit rests at least three years in ceramic jars, and premium bottlings blend across several vintages.',
      'The heat is what makes the flavour. Because the qu cures above 60°C, the enzymes that would produce the fruity esters of strong aroma are largely destroyed, and the fermentation instead produces pyrazines and phenolic compounds. That single choice explains why sauce aroma tastes roasted and strong aroma tastes of pineapple.',
    ],
    nose:
      'Fermented soybean, roasted peanut, dried shiitake, a little smoke and clove. Fruit is present but dried rather than fresh — apricot, dates. In young bottles the savoury note is blunt; with age it separates into layers.',
    palate:
      'Full and warming, with a savoury mid-palate that carries soy and roasted grain. There is sweetness, but it arrives late and reads as a return rather than an entry. Texture is oily and slightly viscous at 53%.',
    finish:
      'Very long, and the defining test of the style. The savoury note fades into a sweet, cooling aftertaste that can sit for a minute or more. Cheap sauce aroma collapses here; good bottles keep unfolding.',
    serving: [
      { label: 'Temperature', value: 'Room temperature, 18–22°C' },
      { label: 'Glass', value: 'Small tulip or 15 ml tasting glass' },
      { label: 'Pour', value: '15–20 ml, no ice, no water in the glass' },
      { label: 'Pace', value: 'Sip in thirds; let the glass sit 5 minutes first' },
      { label: 'Food', value: 'Braised meat, fermented bean dishes, aged cheese' },
    ],
    misconceptions: [
      {
        claim: '“It tastes like soy sauce.”',
        reality:
          'The name describes a savoury, fermented register, not literal soy sauce. Nobody who tastes it blind reaches for a condiment bottle.',
      },
      {
        claim: '“Sauce aroma means Moutai prices.”',
        reality:
          'The style has an entry level. The bottles in this database start around US$30 and the spread to the flagship is more than tenfold, so the style is not the same thing as the brand.',
      },
      {
        claim: '“Older is always better.”',
        reality:
          'Age helps, but storage decides. A bottle kept in a hot car for a summer is worse than a young one kept properly. Age statements on Chinese labels also describe the base spirit, not the whole blend.',
      },
    ],
    related: [
      { href: '/baijiu-basics/', label: 'How baijiu is made' },
      { href: '/types-of-baijiu/', label: 'All twelve aroma types compared' },
      { href: '/how-to-drink-baijiu/', label: 'How to drink it properly' },
      { href: '/db/region/guizhou/', label: 'Guizhou, the home of sauce aroma' },
    ],
  },

  strong: {
    cn: '浓香',
    lede:
      'The workhorse of the Chinese table and the style most baijiu drinkers actually meet first: fruity, honeyed, with a cellar note from decades-old mud pits.',
    definition: [
      'Strong aroma is the largest-selling style in China by a wide margin, and the one most exported bottles belong to. The name refers to aroma intensity, not alcohol — the style spans 38% to 54% ABV. What defines it is a specific ester, ethyl hexanoate, which reads as pineapple and ripe apple, sitting on top of a honeyed sweetness and a dusty cellar note.',
      'That cellar note is not a flaw. It comes from the fermentation vessel: a pit dug into the ground and lined with mud, used continuously for years or decades without being emptied. The pit mud hosts a bacterial community — Clostridium among them — that produces the fatty acids which become those fruity esters. Older pits make better spirit, which is why distilleries guard pit age the way a winery guards vine age.',
      'Within the style there are regional accents worth knowing. Sichuan strong aroma is the benchmark: broad, rich, high in ester. The Jiangsu and Anhui schools, on the Yangtze’s lower reaches, deliberately pull back — lower ABV, softer texture, less cellar. The trade calls that 绵柔, soft and continuous, and it is the reason a bottle from Suqian tastes different from one from Luzhou at the same strength.',
    ],
    facts: [
      { label: 'Chinese name', value: '浓香型 · nóngxiāng' },
      { label: 'Style standard', value: 'GB/T 10781.1' },
      { label: 'Qu', value: 'Medium-temperature daqu, 50–60°C' },
      { label: 'Vessel', value: 'Mud pit, used continuously' },
      { label: 'Cycle', value: '60–90 days per fermentation' },
      { label: 'Key practice', value: 'Continuous mash, grain and mash co-distilled' },
      { label: 'Typical ABV', value: '38–52%' },
      { label: 'Dominant character', value: 'Ethyl hexanoate' },
    ],
    method: [
      'The defining technique is 续糟配料: rather than starting from fresh grain each time, a portion of the fermented mash is carried over into the next round and topped up with new sorghum. The pit is never fully emptied, so the microbial community and the acidity stay stable. Some distilleries describe their mash as 万年糟 — ten-thousand-year mash — because in principle the lineage never breaks.',
      'Grain and fermenting mash are steamed together in the same pot, a step called 混蒸混烧, so the new sorghum absorbs aroma from the older material while it cooks. Fermentation runs 60 to 90 days depending on the season and the house style, then the cycle repeats.',
      'Pit age is the quality lever. A new pit gives a thin, sharply alcoholic spirit. After a decade the mud has developed the right bacterial balance and the spirit gains the dense fruit and the roundness that the style is prized for. The famous 1573 pits at Luzhou have been in continuous use since the Ming dynasty, and they are a protected heritage site rather than a marketing line.',
    ],
    nose:
      'Pineapple and ripe apple first, then honey and a little cooked pear. The cellar note sits underneath — damp earth, old wood — and should read as depth rather than mustiness. Cheap bottles push the fruit to the front and leave nothing behind it.',
    palate:
      'Sweet entry, round and slightly oily in the middle, with the fruit turning toward honey and baked grain. Acidity is low, which is what makes it so easy to drink alongside food. At 52% the alcohol is present but should not be sharp.',
    finish:
      'Medium to long, warm, with the fruit fading into a soft grain sweetness. The best bottles leave a cooling, faintly floral trace; the weakest turn bitter at the back of the throat.',
    serving: [
      { label: 'Temperature', value: 'Room temperature, 18–22°C' },
      { label: 'Glass', value: 'Small tulip, 15–20 ml' },
      { label: 'Pour', value: 'Neat; a splash of water is acceptable at 52%+' },
      { label: 'Pace', value: 'With food, across a whole meal' },
      { label: 'Food', value: 'Roast meat, Sichuan cold dishes, dumplings, hotpot' },
    ],
    misconceptions: [
      {
        claim: '“Strong means higher alcohol.”',
        reality:
          'It means stronger aroma. The style runs from 38% to 54%, and the low-ABV versions are made by the same houses from the same pits.',
      },
      {
        claim: '“If it tastes sweet, sugar was added.”',
        reality:
          'The sweetness comes from esters and from glycerol produced during fermentation. Adding sugar is not permitted under the style standard, and it would taste flat rather than round.',
      },
      {
        claim: '“All strong aroma is the same recipe.”',
        reality:
          'Single-grain (sorghum only) and multi-grain houses produce noticeably different spirits, and the Sichuan, Jiangsu and Anhui schools differ in body and ABV by design.',
      },
    ],
    related: [
      { href: '/baijiu-basics/', label: 'How baijiu is made' },
      { href: '/types-of-baijiu/', label: 'All twelve aroma types compared' },
      { href: '/best-baijiu-for-beginners/', label: 'Best bottles to start with' },
      { href: '/db/region/sichuan/', label: 'Sichuan, the strong-aroma heartland' },
    ],
  },

  light: {
    cn: '清香',
    lede:
      'The cleanest style in the category and the easiest place to start: pear and steamed grain, a light body, and a dry finish with nothing hiding in it.',
    definition: [
      'Light aroma is what baijiu tastes like before the category gets complicated. The profile is built on ethyl acetate — the compound that gives pear drops and green apple — with none of the cellar or roasted notes of the other major styles. The body is light, the finish is dry, and the whole thing is legible on the first sip.',
      'The style is also the oldest documented. The Fen River valley in Shanxi has been making it since at least the Northern Qi dynasty in the 6th century, and the technique spread from there across northern China. Beijing’s erguotou is a descendant of the same tradition, adapted for cheap, high-strength everyday drinking.',
      'Two families share the label and they are not interchangeable. Daqu light aroma, the Fenjiu line, ferments with a low-temperature barley-and-pea starter for nearly a month and can be aged for years. Bran-qu light aroma, which covers most Beijing erguotou, uses a faster cultured starter and is bottled young at high strength. Same aroma family, different drinks.',
    ],
    facts: [
      { label: 'Chinese name', value: '清香型 · qīngxiāng' },
      { label: 'Style standard', value: 'GB/T 10781.2' },
      { label: 'Qu', value: 'Low-temperature daqu, peak ~50°C' },
      { label: 'Vessel', value: 'Ceramic jar buried in earth' },
      { label: 'Cycle', value: '~28 days, twice-steamed twice-cleared' },
      { label: 'Key practice', value: 'Clean steaming, no contact with soil' },
      { label: 'Typical ABV', value: '42–56%' },
      { label: 'Dominant character', value: 'Ethyl acetate' },
    ],
    method: [
      'The governing idea is cleanliness. Fermentation happens in ceramic jars buried in the ground, but the mash never touches soil — the jar is the boundary. Grain is steamed before fermentation and the equipment is cleaned between rounds, in a process called 清蒸清烧, steam clean and distil clean. Nothing is carried over from the previous batch.',
      'Sorghum is cooked, inoculated, and fermented for roughly 28 days. The spirit is distilled, and the spent grain gets a second fermentation and a second distillation before being discarded — 清蒸二次清, twice steamed, twice cleared. That second draw is not filler; in good hands it carries much of the floral top note.',
      'Because the process is short and the vessels are inert, the style shows its raw material directly. Grain quality and water matter more here than in any other style, and there is nowhere for a fault to hide. That is also why it is unforgiving to make badly: a bad light aroma is simply thin.',
    ],
    nose:
      'Pear and green apple from the ethyl acetate, then steamed sorghum, a faint lilac or acacia floral note, and a clean mineral edge. No cellar, no smoke, no roasted character.',
    palate:
      'Light-bodied and slightly sweet on entry, with the fruit turning toward cooked grain. Low viscosity, noticeable but soft alcohol at higher strengths, and a texture that stays clean rather than coating.',
    finish:
      'Dry and medium-short, with a cooling trace of pear that fades quickly. The shortness is the point — it is what makes the style drinkable across a long meal and what makes it a good first bottle.',
    serving: [
      { label: 'Temperature', value: 'Room temperature, or lightly chilled to 12–15°C' },
      { label: 'Glass', value: 'Small tulip or a clean shot glass' },
      { label: 'Pour', value: 'Neat; the only style that tolerates a chill well' },
      { label: 'Pace', value: 'Aperitif pace, before or alongside lighter food' },
      { label: 'Food', value: 'Cold dishes, steamed fish, dumplings, noodles' },
    ],
    misconceptions: [
      {
        claim: '“Light aroma means low alcohol.”',
        reality:
          'Fenjiu’s standard bottling is 53%. Beijing erguotou routinely reaches 56%. Light describes the aroma, not the strength.',
      },
      {
        claim: '“Light means flavourless.”',
        reality:
          'It means clean. The style has less going on than sauce aroma, but a good bottle has clear grain, fruit and minerality. If it tastes of nothing, that is a fault, not the style.',
      },
      {
        claim: '“Erguotou and Fenjiu are the same thing.”',
        reality:
          'They share an aroma family but not a production method. Daqu light aroma is fermented slowly and often aged; bran-qu erguotou is fast, young and built for high-strength everyday drinking.',
      },
    ],
    related: [
      { href: '/baijiu-basics/', label: 'How baijiu is made' },
      { href: '/best-baijiu-for-beginners/', label: 'Best bottles to start with' },
      { href: '/types-of-baijiu/', label: 'All twelve aroma types compared' },
      { href: '/db/region/shanxi/', label: 'Shanxi, where the style began' },
    ],
  },

  phoenix: {
    cn: '凤香',
    lede:
      'One province, one defining bottle: a style that sits between light and strong aroma, aged in wicker vessels lined with beeswax and blood.',
    definition: [
      'Phoenix aroma belongs to Shaanxi alone, and almost entirely to one house. It reads as a bridge between the two biggest styles: it has the clean grain and pear of light aroma, the honeyed fruit and body of strong aroma, and a faint smoky-sour edge that belongs to neither.',
      'The distinguishing feature is not the fermentation but the storage. Instead of ceramic jars, the spirit rests in 酒海 — large vessels woven from willow or wicker and lined on the inside with a layer built up from paper, pig blood, egg white and beeswax. The lining is slightly permeable, so the spirit slowly oxidises and picks up colour and aroma from the vessel. A spirit aged this way turns faintly amber, which is unusual in baijiu and entirely expected here.',
      'Fermentation uses earth cellars rather than the permanent mud pits of strong aroma. The cellar walls are rebuilt each year — 一年一清, one clearing a year — so the microbial community is renewed instead of accumulated. The result is less of the heavy cellar note and more grain clarity.',
    ],
    facts: [
      { label: 'Chinese name', value: '凤香型 · fèngxiāng' },
      { label: 'Style standard', value: 'GB/T 14867' },
      { label: 'Qu', value: 'Medium-temperature daqu, barley-wheat-pea' },
      { label: 'Vessel', value: 'Earth cellar, walls renewed annually' },
      { label: 'Aging', value: 'Wicker 酒海 lined with beeswax and paper' },
      { label: 'Typical ABV', value: '45–55%' },
      { label: 'Dominant character', value: 'Ethyl acetate plus ethyl hexanoate' },
      { label: 'Home', value: 'Fengxiang, Shaanxi' },
    ],
    method: [
      'Grain is fermented in an earth cellar that is dug, used, and then stripped and rebuilt for the next cycle. Because the walls are renewed, the cellar contributes freshness rather than the deep bacterial funk of an old mud pit. Fermentation is a continuous-mash process, closer to strong aroma in structure than to light aroma’s clean break.',
      'The qu is a medium-temperature barley, wheat and pea starter, which sits between the low-temperature starter of light aroma and the hot wheat starter of sauce aroma. Both ethyl acetate and ethyl hexanoate end up in the glass, which is exactly why the style reads as a hybrid without being a blend.',
      'Aging in the wicker vessel is the part no other style copies. The lining is built up in layers over months before the vessel is used, and the slow exchange through it softens the spirit and adds a resinous, faintly waxy note. Bottles aged this way for years develop a colour that would be a fault in any other style.',
    ],
    nose:
      'Stewed apple and pear, cooked grain, a thread of resin and smoke, and a faint sour-milk edge that is the style’s signature. Less fruit-forward than strong aroma, less austere than light.',
    palate:
      'Medium body with a sweet-sour tension that is unusual in baijiu. The fruit arrives first, then a savoury grain middle, then a slight bitterness at the edges that keeps it from cloying.',
    finish:
      'Medium-long, drying, with a sour-savoury trace and a cooling resin note. The bitterness at the end is characteristic — if it is absent, suspect the bottle.',
    serving: [
      { label: 'Temperature', value: 'Room temperature, 18–22°C' },
      { label: 'Glass', value: 'Small tulip, 15–20 ml' },
      { label: 'Pour', value: 'Neat, no water' },
      { label: 'Pace', value: 'Slow, with strongly flavoured food' },
      { label: 'Food', value: 'Shaanxi noodles, lamb, cumin, vinegar-heavy dishes' },
    ],
    misconceptions: [
      {
        claim: '“Phoenix aroma is a blend of light and strong.”',
        reality:
          'It has its own national product standard, GB/T 14867, its own cellar practice and its own aging vessel. Similarities in the glass come from shared chemistry, not from mixing two spirits.',
      },
      {
        claim: '“The amber colour means it was flavoured.”',
        reality:
          'Colour comes from years in the wicker vessel. It is expected in aged phoenix aroma and should be faint, not dark.',
      },
      {
        claim: '“It is a niche curiosity.”',
        reality:
          'It is a recognised national aroma type with a large domestic following. It is simply rarely exported, which is why it looks obscure outside China.',
      },
    ],
    related: [
      { href: '/types-of-baijiu/', label: 'All twelve aroma types compared' },
      { href: '/baijiu-basics/', label: 'How baijiu is made' },
      { href: '/db/region/shaanxi/', label: 'Shaanxi, the only home of the style' },
      { href: '/glossary/', label: 'Glossary: 酒海 and other terms' },
    ],
  },

  herbal: {
    cn: '董香',
    lede:
      'The most polarising baijiu made: medicinal herbs in the starter, an alkaline cellar, and a profile of camphor and bitter bark that drinkers either love or refuse.',
    definition: [
      'Herbal aroma — also called 药香, medicine aroma — is effectively a style of one. It comes from a single distillery in Zunyi, Guizhou, and it is made with a starter that contains more than a hundred Chinese medicinal herbs. The result is not a flavoured spirit: the herbs are part of the fermentation, and their effect shows up as aroma compounds rather than as a herbal infusion.',
      'The glass is dominated by camphor, menthol, bitter bark and dried citrus peel, over a base that is closer to sauce aroma than to anything else. There is sweetness underneath, but it arrives after the medicinal top notes, and the finish is bitter in a way that most drinkers read as either complex or unpleasant on first contact.',
      'It is the clearest case in the category of a style that should be tasted before it is bought. Nothing in a written description prepares you for it, and no other bottle in a beginner’s collection will taste remotely similar.',
    ],
    facts: [
      { label: 'Chinese name', value: '董香型 / 药香型' },
      { label: 'Standard', value: 'Guizhou provincial DB52/T 550' },
      { label: 'Qu', value: 'Dual qu — large and small, both with herbs' },
      { label: 'Vessel', value: 'Alkaline cellar, limestone-influenced' },
      { label: 'Key practice', value: 'Two mashes co-distilled (串蒸)' },
      { label: 'Typical ABV', value: '46% and 54%' },
      { label: 'Dominant character', value: 'Terpenes, menthol, bitter acids' },
      { label: 'Home', value: 'Zunyi, Guizhou' },
    ],
    method: [
      'The house uses two starters at once. A large qu built on wheat and a small qu built on rice are both prepared with herbs added, then used at different stages — the small qu for saccharification, the large qu for the aromatic fermentation that follows. This dual-track approach is what separates the style from every other baijiu process.',
      'Fermentation happens in a cellar whose walls are treated to stay alkaline, which suppresses the acid-producing bacteria that drive strong aroma and pushes the fermentation toward different products. Two separate mashes are then distilled together in a single pass, so the aromatic streams combine at the still rather than in the bottle.',
      'The style has no national GB/T standard; it is made under a Guizhou provincial standard. That is not a quality signal either way — it reflects how few producers make it. If you see a herbal-aroma bottle from a house other than the original, treat the style name as a claim rather than a category.',
    ],
    nose:
      'Camphor and menthol first, then bitter orange peel, dried herbs, a touch of incense, and underneath it a savoury fermented base. Nothing fruity. The intensity is high enough that the first sniff often reads as medicinal rather than as food.',
    palate:
      'Bitter entry, which is rare in baijiu. Herbal and resinous through the middle with a cooling sensation, then a slow sweetness that arrives late. Body is medium and the texture is slightly astringent.',
    finish:
      'Long and bitter-sweet, with the menthol cooling off last. The aftertaste lingers in a way that is either the reason to drink it or the reason not to.',
    serving: [
      { label: 'Temperature', value: 'Room temperature, 18–22°C' },
      { label: 'Glass', value: 'Small glass, 10–15 ml only' },
      { label: 'Pour', value: 'Neat; treat it like a bitter digestif' },
      { label: 'Pace', value: 'Small pours, after food rather than during' },
      { label: 'Food', value: 'Strongly flavoured food; dark chocolate works' },
    ],
    misconceptions: [
      {
        claim: '“It is a health drink.”',
        reality:
          'It is a distilled spirit at 46–54% ABV. Herbs in the starter shape the aroma; they do not make it medicinal, and no health claim should be read into the style name.',
      },
      {
        claim: '“Herbal aroma is a herb-infused baijiu.”',
        reality:
          'Nothing is steeped after distillation. The herbs go into the qu and into the fermentation, so the aromatics are produced biologically rather than extracted.',
      },
      {
        claim: '“It is a good bottle to start with.”',
        reality:
          'Almost certainly not. Its bitterness and camphor note are unlike anything else in the category, and most drinkers need a reference point first.',
      },
    ],
    related: [
      { href: '/types-of-baijiu/', label: 'All twelve aroma types compared' },
      { href: '/db/region/guizhou/', label: 'Guizhou, where it is made' },
      { href: '/how-to-drink-baijiu/', label: 'How to taste unfamiliar styles' },
      { href: '/glossary/', label: 'Glossary: 药曲 and other terms' },
    ],
  },

  mixed: {
    cn: '兼香',
    lede:
      'The umbrella for styles that deliberately combine two traditions — light, strong and sauce in one glass, usually in a fixed sequence rather than a blend.',
    definition: [
      'Mixed aroma is not one recipe but a family of them. The Chinese term 兼香 means “holding both aromas”, and it covers spirits that carry the characters of two or more of the main styles. The most common pairing is strong and sauce: a sweet, fruity opening that turns savoury and roasted in the middle.',
      'The bottle in this database is a specific and well-documented case. Jiugui, from Xiangxi in Hunan, is registered under GB/T 10781.11 as 馥郁香 — fuyu, “rich and layered” aroma. Its process runs a small-qu saccharification first and a large-qu fermentation second, in a mud pit, so light, strong and sauce characters all appear in the same spirit. The house describes the result as 前浓、中清、后酱: strong at the front, light in the middle, sauce at the back.',
      'That sequence is the useful way to taste any mixed-aroma bottle. Instead of asking “what does this remind me of”, follow the glass from entry to finish and see where the character changes. If it does not change, the bottle is probably a blend rather than a true mixed-aroma fermentation.',
    ],
    facts: [
      { label: 'Chinese name', value: '兼香型 / 馥郁香型' },
      { label: 'Style standard', value: 'GB/T 10781.11 (fuyu)' },
      { label: 'Qu', value: 'Dual qu — small for saccharification, large for aroma' },
      { label: 'Vessel', value: 'Mud pit' },
      { label: 'Key practice', value: 'Sequential multi-qu fermentation' },
      { label: 'Typical ABV', value: '52–54%' },
      { label: 'Dominant character', value: 'Layered esters plus pyrazines' },
      { label: 'Home', value: 'Xiangxi, Hunan' },
    ],
    method: [
      'The process is best understood as two fermentations in sequence rather than one. A small qu, made on rice, starts the saccharification and gives the clean, light-aroma opening. A large qu then drives the aromatic fermentation in a mud pit, which is where the strong-aroma fruit and the sauce-aroma savoury notes come from.',
      'Because the two stages run in the same vessel, the characters are layered in the liquid rather than mixed in a tank. That is the technical difference between a mixed-aroma spirit and a blend of two finished baijius, and it is why the style can be identified by how it changes across the palate.',
      'Aging and blending then decide how obvious the layers are. Young bottles show the seams; well-blended ones move from fruit to savoury without a visible step, which is the house style at its best.',
    ],
    nose:
      'Starts fruity and honeyed, close to strong aroma, then a savoury roasted note and a little smoke come up behind it. Dried citrus and cooked grain in the background.',
    palate:
      'Sweet and round on entry, then the middle turns drier and more savoury as the sauce-aroma component takes over. The transition is the point of the style — a good bottle makes it feel like a single continuous arc.',
    finish:
      'Long, with the savoury note outlasting the fruit and a cooling sweetness at the very end. More complex than strong aroma, less blunt than sauce aroma.',
    serving: [
      { label: 'Temperature', value: 'Room temperature, 18–22°C' },
      { label: 'Glass', value: 'Small tulip, 15–20 ml' },
      { label: 'Pour', value: 'Neat; let it sit 3–5 minutes to open' },
      { label: 'Pace', value: 'Slow, paying attention to the mid-palate shift' },
      { label: 'Food', value: 'Hunan and Sichuan cooking, braised pork, smoked meat' },
    ],
    misconceptions: [
      {
        claim: '“Mixed aroma is two baijius blended together.”',
        reality:
          'In a true mixed-aroma spirit the characters come from sequential fermentations in one vessel. Blending two finished spirits is a different, cheaper operation and is not the same product.',
      },
      {
        claim: '“兼香 and 馥郁香 are the same.”',
        reality:
          '兼香 is the umbrella. Fuyu is a specific registered style with its own standard, GB/T 10781.11, and a defined three-stage profile.',
      },
      {
        claim: '“If it changes across the palate, it is inconsistent.”',
        reality:
          'The change is deliberate and is the identifying feature. Judging it by the standards of a single-aroma style will misread it.',
      },
    ],
    related: [
      { href: '/types-of-baijiu/', label: 'All twelve aroma types compared' },
      { href: '/db/region/hunan/', label: 'Hunan, home of fuyu aroma' },
      { href: '/baijiu-flavor-wheel/', label: 'The flavour wheel' },
      { href: '/how-to-drink-baijiu/', label: 'How to taste for structure' },
    ],
  },
};
