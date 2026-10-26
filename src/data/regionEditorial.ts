/**
 * Editorial copy for the producing-region landing pages (/db/region/[region]/).
 *
 * Each region page groups the bottles in the database by province. The prose
 * explains why the province matters — geography, water, climate, cellar
 * practice — and what a buyer should actually do with the bottles there.
 */

export type RegionFact = { label: string; value: string };

export type RegionEditorial = {
  cn: string;
  lede: string;
  /** "Why this region" paragraphs. */
  terroir: string[];
  facts: RegionFact[];
  /** "What it tastes like here" paragraphs. */
  character: string[];
  /** Buying guidance specific to the region. */
  buying: string[];
  misconceptions: { claim: string; reality: string }[];
  related: { href: string; label: string }[];
};

export const regionEditorial: Record<string, RegionEditorial> = {
  guizhou: {
    cn: '贵州',
    lede:
      'A mountain province in the subtropics, cut by one river valley that produces the most expensive baijiu in the world — and the most polarising.',
    terroir: [
      'Guizhou sits on a limestone plateau in southwest China, and almost all of its baijiu comes from the north of the province, along the Chishui River where it forms the border with Sichuan. The valley floor is around 400–500 metres, hot and humid for most of the year, with little air movement. Distillers describe the resulting microbial population as the reason the valley cannot be copied: the same recipe made a hundred kilometres away does not produce the same spirit.',
      'The river itself has a seasonal rhythm that shapes the production calendar. Summer rains turn it red with silt; after the autumn rains end it clears. That is why grain is fed into the fermenters at the Double Ninth Festival in October — the water is clean exactly when the year’s fermentation begins, and the high summer temperatures that follow are what the hot fermentation needs.',
      'The soils are purple-red and slightly acidic, and the region grows the sorghum the distilleries use — a small, tough, red-grained variety that tolerates repeated steaming without turning to paste. Local glutinous sorghum is prized specifically because it survives eight rounds of cooking.',
    ],
    facts: [
      { label: 'Province', value: 'Guizhou 贵州' },
      { label: 'Core area', value: 'Chishui River valley, Renhuai' },
      { label: 'Elevation', value: '400–500 m in the valley' },
      { label: 'Climate', value: 'Humid subtropical, mild winter' },
      { label: 'Styles made', value: 'Sauce aroma, herbal aroma' },
      { label: 'Signature grain', value: 'Red glutinous sorghum' },
      { label: 'Water', value: 'Chishui River, seasonal clarity' },
      { label: 'Bottles in database', value: '3' },
    ],
    character: [
      'The province is the reference point for sauce aroma, and the profile is consistent across its houses: savoury and roasted rather than fruity, high in pyrazines, long on the finish, usually bottled at 53%. Where the houses differ is in weight and polish rather than in direction — the flagship is denser and more layered, the second-tier bottles are cleaner and leaner but unmistakably from the same valley.',
      'Guizhou is also the only place making herbal aroma at scale. Zunyi, north of the sauce-aroma valley, produces a style built on a herb-laden starter and an alkaline cellar, which tastes of camphor and bitter bark and shares almost nothing with its famous neighbour. The two styles from one province are the widest contrast in the whole category.',
    ],
    buying: [
      'Expect to pay for the name. The most famous bottle from this province is also the most counterfeited spirit in the world, so provenance matters more here than anywhere else: buy from a licensed retailer, check the anti-counterfeit marking on the cap, and be suspicious of any price well below the market.',
      'The value in this province is not the flagship. Second-tier sauce aroma from the same valley — different houses, same water and climate — delivers most of the character at a fraction of the price, and is far less likely to be faked because the margin does not justify it.',
    ],
    misconceptions: [
      {
        claim: '“Only one town in Guizhou can make sauce aroma.”',
        reality:
          'The valley has a genuine microbial advantage, but several houses work within it and others nearby produce credible sauce aroma. Geography matters; it is not a single postal code.',
      },
      {
        claim: '“Everything from Guizhou is expensive.”',
        reality:
          'The province also makes entry-level sauce aroma in the US$30–60 band. The price gap reflects brand and age, not the region as a whole.',
      },
    ],
    related: [
      { href: '/db/aroma/sauce/', label: 'Sauce aroma explained' },
      { href: '/db/aroma/herbal/', label: 'Herbal aroma explained' },
      { href: '/how-to-spot-fake-maotai/', label: 'How to spot a fake Moutai' },
      { href: '/how-to-buy-baijiu-outside-china/', label: 'Buying outside China' },
    ],
  },

  sichuan: {
    cn: '四川',
    lede:
      'The engine room of the category: more baijiu is made here than anywhere else, and the province sets the benchmark for strong aroma.',
    terroir: [
      'Sichuan produces more baijiu than any other province, and the reason is geological as much as agricultural. The Sichuan Basin is a warm, humid bowl ringed by mountains, with mild winters and very little wind. Fermentation depends on a stable, warm, microbially rich environment, and the basin provides it for most of the year without artificial control.',
      'The province is also a water province. The Yangtze and its tributaries — the Min, the Tuo, the Jinsha — run through the producing belt, and each sub-region has its own water signature. Luzhou and Yibin sit on confluences; Mianzhu and Shede sit further north where the water is colder and the climate slightly drier. Distillers treat these differences as the reason their spirits differ at the same strength.',
      'The other regional asset is time. Several houses hold pits that have been in continuous fermentation for centuries — the 1573 pits at Luzhou are the best known and are protected heritage. A pit is not equipment here; it is an asset with an age, and its bacterial population is the house’s real inventory.',
    ],
    facts: [
      { label: 'Province', value: 'Sichuan 四川' },
      { label: 'Core areas', value: 'Luzhou, Yibin, Mianzhu, Chengdu, Shede' },
      { label: 'Climate', value: 'Humid basin, mild winters, low wind' },
      { label: 'Styles made', value: 'Strong aroma, sauce aroma (south)' },
      { label: 'Signature asset', value: 'Century-old continuous mud pits' },
      { label: 'Water', value: 'Yangtze and tributary systems' },
      { label: 'Volume', value: 'Largest producing province' },
      { label: 'Bottles in database', value: '6' },
    ],
    character: [
      'Sichuan strong aroma is the broad, dense version of the style: high in ethyl hexanoate, heavy on pineapple and honey, with a pronounced cellar note from old pits and enough body to stand up to chilli and oil. At the top end it is the most complete expression of the style, and the bottles here span single-grain and multi-grain houses, which taste noticeably different from each other.',
      'The south of the province also produces sauce aroma. Langjiu’s base at Gulin sits on the Chishui River upstream of the Guizhou cluster, and the style made there is a legitimate alternative reference point — slightly leaner than the Guizhou flagships, often more open when young.',
    ],
    buying: [
      'This is the best province in the database for value at the premium tier. Several houses here are routinely described as underpriced relative to quality, and the mid-tier bottles — the ones between US$50 and US$100 — are where the strongest quality-to-price ratio sits.',
      'Watch the ABV variant when buying. The same label often comes in 52% and 38% versions with near-identical packaging, and the low-ABV bottle is a different drink: softer, shorter, and much easier to serve to a group that is not used to baijiu. Neither is better; they are for different tables.',
    ],
    misconceptions: [
      {
        claim: '“Sichuan only makes strong aroma.”',
        reality:
          'It also makes sauce aroma in the south along the Chishui, and light-aroma houses exist in the province too. Strong aroma dominates by volume, not exclusively.',
      },
      {
        claim: '“Old pits are a marketing story.”',
        reality:
          'Pit age changes the bacterial population and therefore the ester profile. It is measurable in the glass, and the oldest pits are legally protected heritage for that reason.',
      },
    ],
    related: [
      { href: '/db/aroma/strong/', label: 'Strong aroma explained' },
      { href: '/db/compare/', label: 'Compare bottles side by side' },
      { href: '/types-of-baijiu/', label: 'All twelve aroma types' },
      { href: '/how-to-drink-baijiu/', label: 'Serving with food' },
    ],
  },

  shanxi: {
    cn: '山西',
    lede:
      'The birthplace of light aroma and the oldest documented baijiu tradition in China, still producing the cleanest style in the category.',
    terroir: [
      'Shanxi sits on the loess plateau in north China: dry, cold in winter, with a short growing season and alkaline, wind-deposited soil. That climate is the opposite of Sichuan’s, and it explains the style. Where a warm, humid basin encourages a dense bacterial fermentation, a dry, cold plateau encourages a fast, clean one — and the ceramic jar, buried in the ground, keeps the mash at a stable temperature without any contact with soil.',
      'The producing centre is Xinghua village near Fenyang, in the Fen River valley south of Taiyuan. The valley grows sorghum and has reliable groundwater, and the village has been making spirit since at least the Northern Qi dynasty in the 6th century — the earliest written reference to what is recognisably baijiu points here.',
      'Because the process is short and the vessels are inert, the region’s baijiu reflects its raw material more directly than any other. Grain and water quality are not marketing details here; they are most of the flavour.',
    ],
    facts: [
      { label: 'Province', value: 'Shanxi 山西' },
      { label: 'Core area', value: 'Xinghua village, Fenyang' },
      { label: 'Geography', value: 'Loess plateau, Fen River valley' },
      { label: 'Climate', value: 'Dry, cold winters, short season' },
      { label: 'Styles made', value: 'Light aroma (daqu)' },
      { label: 'Vessel', value: 'Ceramic jar buried in earth' },
      { label: 'Documented since', value: '6th century (Northern Qi)' },
      { label: 'Bottles in database', value: '1' },
    ],
    character: [
      'Light aroma from Shanxi is clean rather than simple: pear and green apple from ethyl acetate, steamed sorghum, a faint floral top note, and a dry finish. The body is light, the alcohol is soft even at 53%, and there is no cellar or smoke anywhere in the profile.',
      'Aging changes it more than drinkers expect. Young bottles are bright and slightly sharp; aged ones round out and pick up a honeyed grain note without ever becoming heavy. The house here sells the same spirit at several age tiers, and the step between them is easy to taste.',
    ],
    buying: [
      'This is the best entry point in the entire category, and the cheapest good bottle in this database comes from here. If you have never had baijiu and want to understand the category before spending, start with a light aroma from this province.',
      'The one trap is assuming age tiers are the only difference. The same brand sells entry bottles and premium bottles that share a name but not a process — different grain grades, different fermentation lengths. Read the tier on the label rather than the brand.',
    ],
    misconceptions: [
      {
        claim: '“Light aroma is a modern, simplified style.”',
        reality:
          'It is the oldest documented baijiu tradition in China. The cleanliness comes from process discipline, not from cutting corners.',
      },
      {
        claim: '“Shanxi baijiu is only for shots.”',
        reality:
          'That reputation belongs to Beijing erguotou. Daqu light aroma from Shanxi is sipped and paired with food like any other premium spirit.',
      },
    ],
    related: [
      { href: '/db/aroma/light/', label: 'Light aroma explained' },
      { href: '/best-baijiu-for-beginners/', label: 'Best bottles to start with' },
      { href: '/baijiu-basics/', label: 'How baijiu is made' },
      { href: '/db/region/beijing/', label: 'Beijing and erguotou' },
    ],
  },

  beijing: {
    cn: '北京',
    lede:
      'Not a premium region but an important one: the home of erguotou, the cheap, strong, everyday baijiu that most people in northern China actually drink.',
    terroir: [
      'Beijing’s contribution to the category is a production method rather than a terroir. Erguotou — literally “second pot head” — refers to a fractionation practice: the first distillate that comes off the still is discarded as too harsh, the tail is cut away, and the middle is kept. The result is cleaner and stronger than a single-pass distillate, and it was designed to be cheap.',
      'The two historic houses, both founded around 1949, industrialised the method and made it the default working-class spirit of the capital and the north. Production uses a low-temperature starter, in some lines a cultured bran qu rather than a traditional daqu, which ferments fast and yields a sharp, high-strength spirit within weeks instead of months.',
      'There is no famous water or protected valley here. The region’s advantage is scale, consistency and price, and that is genuinely useful: it makes baijiu accessible at a level that no premium region can match.',
    ],
    facts: [
      { label: 'Municipality', value: 'Beijing 北京' },
      { label: 'Style', value: 'Light aroma, erguotou method' },
      { label: 'Method', value: 'Fractional distillation, heads and tails cut' },
      { label: 'Qu', value: 'Low-temperature, partly bran qu' },
      { label: 'Typical ABV', value: '42–56%' },
      { label: 'Price band', value: 'Entry level, from a few dollars' },
      { label: 'Historic houses', value: 'Both founded 1949–1952' },
      { label: 'Bottles in database', value: '2' },
    ],
    character: [
      'Erguotou is sharp, clean and high in alcohol, with the pear note of light aroma pushed hard and very little body behind it. It is not a sipping spirit in the way the premium styles are: it is drunk in small shots alongside strongly flavoured food, at speed, in company.',
      'Judged against sauce aroma it looks crude; judged against its own purpose it is remarkably well made. The best versions are consistent, free of off-notes, and cost less than a bottle of water in some markets — which is the whole point.',
    ],
    buying: [
      'Buy it to cook with, to serve to a crowd, or to understand what everyday drinking looks like in China. Do not buy it expecting a premium experience, and do not pay a premium price for a fancy presentation of the same liquid.',
      'The age-labelled versions are the ones worth trying if you want to see what the method can do when it is not aimed at the bottom of the market. They are still inexpensive, and noticeably smoother than the standard bottle.',
    ],
    misconceptions: [
      {
        claim: '“Erguotou is low quality.”',
        reality:
          'It is cheap, which is not the same thing. It is a deliberately designed product made to a consistent standard and sold at a price that reflects its method and its market.',
      },
      {
        claim: '“Erguotou is a brand.”',
        reality:
          'It is a production method used by several houses. The two best-known labels are separate companies making the same style.',
      },
    ],
    related: [
      { href: '/db/aroma/light/', label: 'Light aroma explained' },
      { href: '/baijiu-vs-vodka/', label: 'Baijiu compared to vodka' },
      { href: '/db/region/shanxi/', label: 'Shanxi, the source of the style' },
      { href: '/glossary/', label: 'Glossary: 二锅头 and other terms' },
    ],
  },

  jiangsu: {
    cn: '江苏',
    lede:
      'The soft school of strong aroma: lower alcohol, sweeter entry, and a deliberate step back from the density of Sichuan.',
    terroir: [
      'Jiangsu is flat, wet and low-lying, sitting on the lower Yangtze with a network of lakes and canals. The producing belt runs through Suqian and Huai’an in the north of the province, where the water table is high, the air is humid for much of the year, and the soil is alluvial rather than the purple-red of the Chishui valley.',
      'That environment produces a different fermentation balance from Sichuan’s: less of the deep cellar character, more fruit and grain sweetness, and a shorter, softer finish. The province’s houses turned that into a deliberate commercial identity in the 2000s, marketing what they call 绵柔 — soft and continuous — as a reaction against the intensity of the traditional strong-aroma flagships.',
      'The practical expression of 绵柔 is alcohol. Where Sichuan benchmarks sit at 52%, this province sells a great deal at 40.8% and 42%, engineered so the drop in strength does not read as a drop in body. For a drinker who finds 52% baijiu too hot, this is the region to start in.',
    ],
    facts: [
      { label: 'Province', value: 'Jiangsu 江苏' },
      { label: 'Core area', value: 'Suqian, Huai’an' },
      { label: 'Geography', value: 'Lower Yangtze plain, lake country' },
      { label: 'Styles made', value: 'Strong aroma, soft (绵柔) school' },
      { label: 'Typical ABV', value: '40.8–52%' },
      { label: 'Profile', value: 'Softer, sweeter, shorter finish' },
      { label: 'Water', value: 'Shallow aquifer, lake systems' },
      { label: 'Bottles in database', value: '1' },
    ],
    character: [
      'The style here keeps the fruit of strong aroma but removes the weight. Pineapple and honey are present, the cellar note is faint or absent, and the entry is sweet with almost no alcohol burn. The finish is shorter than a Sichuan bottle at the same tier, and that is a design choice rather than a fault.',
      'At 40.8% the spirit is genuinely easy to drink, which is why this school dominates banquet tables in eastern China. The trade-off is complexity: a soft strong aroma does not develop in the glass the way a 52% bottle does, and it does not reward long aging the same way.',
    ],
    buying: [
      'Choose this region when the bottle is for a group that is not used to high-strength spirits, or when the meal is long and the drinking is continuous. The lower ABV is not a compromise for that purpose; it is the correct tool.',
      'Check the ABV on the label carefully. The same product line is sold at several strengths with similar packaging, and the difference between 40.8% and 52% is the difference between two different drinks.',
    ],
    misconceptions: [
      {
        claim: '“Lower ABV means lower quality.”',
        reality:
          'It means a different design target. Making a 40.8% spirit that still tastes full requires more blending skill, not less.',
      },
      {
        claim: '“Soft strong aroma is not real strong aroma.”',
        reality:
          'It is made under the same national standard, GB/T 10781.1, from the same kind of mud-pit fermentation. The difference is in fermentation balance and blending, not in category.',
      },
    ],
    related: [
      { href: '/db/aroma/strong/', label: 'Strong aroma explained' },
      { href: '/how-to-drink-baijiu/', label: 'Serving and pacing' },
      { href: '/jinlingnian-30/', label: 'Our own Suqian-belt bottling' },
      { href: '/best-baijiu-for-beginners/', label: 'Best bottles to start with' },
    ],
  },

  anhui: {
    cn: '安徽',
    lede:
      'An old strong-aroma province with protected Ming-dynasty pits and a lighter, more restrained take on the style than Sichuan’s.',
    terroir: [
      'Anhui’s producing centre is Bozhou in the north-west, on the Huai River plain — flat, agricultural, and historically wealthy enough to support large distilleries. The province sits between the Yangtze and Yellow River basins, which gives it a climate between the two: colder and drier than Jiangsu, warmer and wetter than Shanxi.',
      'The defining asset here is age. The best-known house holds fermentation pits dating to the Ming dynasty and a well whose water has been used for centuries; both are protected heritage rather than marketing claims. Continuous pit use over that span builds a bacterial population that cannot be recreated, and the spirit made in those pits is the house’s premium tier.',
      'The style made here is often described as 淡雅 — pale and elegant — relative to Sichuan. Less ethyl hexanoate, less cellar weight, more grain and a cleaner finish. It is strong aroma with the volume turned down, which makes it unusually food-friendly.',
    ],
    facts: [
      { label: 'Province', value: 'Anhui 安徽' },
      { label: 'Core area', value: 'Bozhou, Huai River plain' },
      { label: 'Climate', value: 'Transitional, between north and south' },
      { label: 'Styles made', value: 'Strong aroma, pale (淡雅) school' },
      { label: 'Signature asset', value: 'Ming-dynasty pits, ancient well' },
      { label: 'Typical ABV', value: '50–52%' },
      { label: 'Profile', value: 'Restrained fruit, clean grain finish' },
      { label: 'Bottles in database', value: '1' },
    ],
    character: [
      'Anhui strong aroma opens with less fruit than a Sichuan bottle and more cooked grain. The cellar note is present but quiet, the body is medium rather than dense, and the finish is clean and dry rather than sweet and long. Drinkers who find Sichuan flagships overpowering often prefer this.',
      'The premium tier changes the picture: the old-pit spirit is denser, with more honey and a longer finish, and it is a genuine competitor to the famous Sichuan bottles at a lower price. The gap between the house’s entry and premium bottlings is wider here than in most of the database.',
    ],
    buying: [
      'This is one of the best value regions in the database at the mid tier. The five-year bottlings in particular sit in a price band where most competitors are noticeably thinner.',
      'Be aware that the brand’s name is used across a very wide range of products, some of them far below the flagship in quality. The age statement on the label — 5年, 20年 and so on — is the useful signal, more than the brand name itself.',
    ],
    misconceptions: [
      {
        claim: '“Anhui baijiu is a lesser version of Sichuan baijiu.”',
        reality:
          'It is a different balance, not a lesser one. The restrained style is deliberate and is made under the same national standard.',
      },
      {
        claim: '“The ancient well is a legend.”',
        reality:
          'The well and the Ming pits are physical, documented and protected. Whether the water makes a measurable difference is a separate question from whether they exist.',
      },
    ],
    related: [
      { href: '/db/aroma/strong/', label: 'Strong aroma explained' },
      { href: '/db/compare/', label: 'Compare bottles side by side' },
      { href: '/how-to-buy-baijiu-outside-china/', label: 'Buying outside China' },
      { href: '/glossary/', label: 'Glossary: 淡雅 and other terms' },
    ],
  },

  shaanxi: {
    cn: '陕西',
    lede:
      'The only province making phoenix aroma, and the only place in the category that ages spirit in wicker vessels lined with beeswax.',
    terroir: [
      'Shaanxi sits on the loess plateau, dry and cold in winter, with the Wei River valley running east through the centre. The producing centre is Fengxiang, east of Baoji, where the climate is continental and the groundwater is hard — a very different environment from the humid southern valleys.',
      'The region’s distinctiveness is technical rather than climatic. Fermentation uses earth cellars whose walls are rebuilt every year, so the microbial community is renewed instead of accumulated, and aging happens in 酒海 — large vessels woven from wicker and lined inside with layers of paper, blood, egg white and beeswax. The lining is slightly permeable, which lets the spirit oxidise slowly and pick up colour and a resinous note.',
      'Both choices point the same way: less accumulation, more freshness. Where Guizhou builds depth through years of continuous fermentation, this province builds character through a vessel that breathes.',
    ],
    facts: [
      { label: 'Province', value: 'Shaanxi 陕西' },
      { label: 'Core area', value: 'Fengxiang, Liulin town' },
      { label: 'Geography', value: 'Loess plateau, Wei River valley' },
      { label: 'Style', value: 'Phoenix aroma only' },
      { label: 'Cellar', value: 'Earth cellar, walls renewed yearly' },
      { label: 'Aging vessel', value: 'Wicker 酒海, beeswax lining' },
      { label: 'Typical ABV', value: '45–55%' },
      { label: 'Bottles in database', value: '1' },
    ],
    character: [
      'Phoenix aroma is the most recognisable oddity in the category: stewed apple and pear at the front, a savoury grain middle, and a sour, faintly resinous finish with a bitterness that most first-time drinkers do not expect. It sits between light and strong aroma without belonging to either.',
      'Aged bottlings add colour and a waxy, honeyed note from the vessel. The bitterness softens but does not disappear, and it remains the dividing line: drinkers who like it cite the tension between sweet and sour, and drinkers who do not cite exactly the same thing.',
    ],
    buying: [
      'The entry bottles here are among the cheapest interesting baijiu in the database — the classic green bottle costs less than most mid-tier gins and is a genuine curiosity worth trying once.',
      'Because the style is made at essentially one house, there is no cheaper alternative region to fall back on. If you want phoenix aroma, you are buying that house, so the useful choice is between its age tiers rather than between producers.',
    ],
    misconceptions: [
      {
        claim: '“Phoenix aroma is rare because it is hard to sell.”',
        reality:
          'It sells well domestically. It is rare outside China because exports of the style are limited, not because Chinese drinkers reject it.',
      },
      {
        claim: '“The bitterness is a fault.”',
        reality:
          'A slight bitterness at the back of the throat is characteristic of the style. A bottle with none at all is more likely to be mislabelled than exemplary.',
      },
    ],
    related: [
      { href: '/db/aroma/phoenix/', label: 'Phoenix aroma explained' },
      { href: '/types-of-baijiu/', label: 'All twelve aroma types' },
      { href: '/glossary/', label: 'Glossary: 酒海 and other terms' },
      { href: '/how-to-drink-baijiu/', label: 'How to taste unusual styles' },
    ],
  },

  hunan: {
    cn: '湖南',
    lede:
      'Home of fuyu aroma, the layered style that runs strong at the front, light in the middle and sauce at the back — in one glass, from one fermentation.',
    terroir: [
      'Hunan’s producing centre is Xiangxi, the mountainous west of the province, near Jishou. It is karst country: steep limestone hills, deep valleys, high humidity and a great deal of groundwater moving through soluble rock. The water is hard and mineral-rich, and the local climate is warmer and wetter than the northern provinces.',
      'The style made here is unusual in depending on two starters rather than one. A rice-based small qu begins saccharification, then a large qu drives the aromatic fermentation in a mud pit. Running two fermentations in sequence in the same vessel is what produces the layered profile that the style is named for.',
      'Xiangxi is also a cultural borderland, and the house built its identity on that: the bottle design, the name and the marketing all lean on the region’s minority heritage. It is one of the few cases in baijiu where the brand story and the production method point in the same direction.',
    ],
    facts: [
      { label: 'Province', value: 'Hunan 湖南' },
      { label: 'Core area', value: 'Xiangxi, Jishou' },
      { label: 'Geography', value: 'Karst mountains, limestone groundwater' },
      { label: 'Style', value: 'Fuyu aroma (馥郁香), GB/T 10781.11' },
      { label: 'Method', value: 'Small qu then large qu, one mud pit' },
      { label: 'Typical ABV', value: '52–54%' },
      { label: 'Profile', value: 'Strong front, light middle, sauce back' },
      { label: 'Bottles in database', value: '1' },
    ],
    character: [
      'The style announces itself as fruit and honey, close to strong aroma, then turns drier and more savoury through the middle, and finishes with the roasted, cooling note of sauce aroma. The transition is the product: a good bottle makes it feel continuous, a mediocre one shows the seams.',
      'Because three characters are present at once, the style is more complex than any single-aroma bottle at the same price, and correspondingly harder to judge. It also pairs unusually well with the region’s food — chilli, smoke, cured meat — because the savoury back end meets the smoke rather than fighting it.',
    ],
    buying: [
      'Buy this if you already know strong aroma and sauce aroma and want something that sits between them. It is a poor first bottle: without reference points, the layered profile reads as muddled rather than complex.',
      'The house sells a wide spread from entry to premium, and the gap in quality is large. The premium tier is where the style is properly expressed; the cheapest bottles are pleasant but do not demonstrate why the style exists.',
    ],
    misconceptions: [
      {
        claim: '“Fuyu is just a marketing name for 兼香.”',
        reality:
          'It is a separately registered style with its own national standard and a defined three-stage profile. 兼香 is the broader family it belongs to.',
      },
      {
        claim: '“Layered means inconsistent.”',
        reality:
          'The change across the palate is engineered and repeatable. Judging it by single-aroma standards will misread it as a fault.',
      },
    ],
    related: [
      { href: '/db/aroma/mixed/', label: 'Mixed aroma explained' },
      { href: '/db/aroma/sauce/', label: 'Sauce aroma explained' },
      { href: '/types-of-baijiu/', label: 'All twelve aroma types' },
      { href: '/baijiu-flavor-wheel/', label: 'The flavour wheel' },
    ],
  },
};
