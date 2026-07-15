export type Lang = 'en' | 'zh-hant' | 'ja' | 'ru';

export const languages: Record<Lang, { label: string; prefix: string; html: string }> = {
  en: { label: 'English', prefix: '', html: 'en' },
  'zh-hant': { label: '繁體中文', prefix: '/zh-hant', html: 'zh-Hant' },
  ja: { label: '日本語', prefix: '/ja', html: 'ja' },
  ru: { label: 'Русский', prefix: '/ru', html: 'ru' },
};

export const toolSlugs = [
  'first-bottle-recommender',
  'authenticity-risk-checker',
  'aroma-identifier',
  'baijiu-compare',
  'gbt-standard-lookup',
] as const;

export type ToolSlug = typeof toolSlugs[number];
export const getPrefix = (lang: Lang) => languages[lang].prefix;
export const getToolPath = (lang: Lang, slug?: string) => `${getPrefix(lang)}/tools/${slug ? `${slug}/` : ''}`;

export const toolsHome = {
  en: {
    title: 'Baijiu Tools', description: 'Practical tools for choosing, comparing, identifying, and checking Chinese baijiu.', eyebrow: 'Baijiu365 tools',
    h1: 'Tools for choosing, checking, and understanding baijiu.',
    lede: 'Five practical tools for selecting a first bottle, checking high-price risk, identifying aroma type, comparing profiles, and reading GB/T standards.',
    introTitle: 'Use tools when the decision is practical.', introText: 'Guides explain the category. Tools help narrow a bottle, risk, style, or standard quickly.', openTool: 'Open tool',
  },
  'zh-hant': {
    title: '白酒工具', description: '用於選酒、比較、判斷香型與檢查購買風險的白酒工具。', eyebrow: 'Baijiu365 工具',
    h1: '用工具選酒、避險、理解白酒。',
    lede: '五個實用工具：第一瓶推薦、高價酒風險檢查、香型判別、酒款對比，以及 GB/T 標準查詢。',
    introTitle: '問題很具體時，用工具。', introText: '文章建立知識，工具負責快速縮小選擇、風險、風格與標準。', openTool: '使用工具',
  },
  ja: {
    title: '白酒ツール', description: '中国白酒を選ぶ、比較する、香型を推測する、購入リスクを確認するための実用ツール。', eyebrow: 'Baijiu365 tools',
    h1: '白酒を選び、確認し、理解するためのツール。',
    lede: '最初の一本、購入リスク、香型判定、比較、GB/T 規格確認のための実用ツールです。',
    introTitle: '具体的な判断にはツールを使う。', introText: 'ガイドは知識を整理し、ツールは選択・リスク・スタイル・規格を素早く絞ります。', openTool: 'ツールを開く',
  },
  ru: {
    title: 'Инструменты байцзю', description: 'Инструменты для выбора, сравнения, определения стиля и проверки рисков покупки китайского байцзю.', eyebrow: 'Инструменты Baijiu365',
    h1: 'Инструменты для выбора, проверки и понимания байцзю.',
    lede: 'Пять инструментов: первая бутылка, риск дорогой покупки, определение аромата, сравнение профилей и поиск стандартов GB/T.',
    introTitle: 'Когда вопрос практический, используйте инструмент.', introText: 'Гайды объясняют категорию, инструменты быстро сужают выбор бутылки, риска, стиля или стандарта.', openTool: 'Открыть инструмент',
  },
} as const;

export const common = {
  en: { tools: 'Tools', result: 'Result', note: 'This is a rule-based guide, not a laboratory test or authentication service.' },
  'zh-hant': { tools: '工具', result: '結果', note: '這是規則型參考工具，不是實驗室檢測或真偽鑑定服務。' },
  ja: { tools: 'ツール', result: '結果', note: 'これはルールベースの参考ツールであり、鑑定・検査サービスではありません。' },
  ru: { tools: 'Инструменты', result: 'Результат', note: 'Это справочный инструмент на правилах, а не лабораторная проверка или услуга аутентификации.' },
} as const;

type ToolCopy = {
  title: string;
  shortTitle: string;
  description: string;
  eyebrow: string;
  h1: string;
  lede: string;
  bestFor: string[];
  related: { href: string; label: string }[];
};

const relatedBasics = [{ href: '/baijiu-basics/', label: 'Baijiu basics' }, { href: '/types-of-baijiu/', label: 'Aroma types' }];
const relatedBuying = [{ href: '/how-to-spot-fake-maotai/', label: 'Fake Maotai guide' }, { href: '/how-to-buy-baijiu-outside-china/', label: 'Buying overseas' }];
const relatedDb = [{ href: '/db/', label: 'Database' }, { href: '/db/compare/', label: 'Compare baijiu' }];

export const toolContent: Record<ToolSlug, Record<Lang, ToolCopy>> = {
  'first-bottle-recommender': {
    en: { title: 'First Bottle Baijiu Recommender', shortTitle: 'First Bottle Recommender', description: 'Choose a beginner-friendly baijiu by budget, context, and alcohol tolerance.', eyebrow: 'Selection tool', h1: 'Find a sensible first bottle of baijiu.', lede: 'A first bottle should match the drinker, meal, and budget. This tool favors approachability over prestige.', bestFor: ['New drinkers', 'Dinner hosts', 'Gift buyers'], related: relatedBasics },
    'zh-hant': { title: '第一瓶白酒推薦器', shortTitle: '第一瓶推薦器', description: '依預算、場合與酒精接受度，選出較適合新手的白酒。', eyebrow: '選酒工具', h1: '找到合理的第一瓶白酒。', lede: '第一瓶不應只看名氣，而要看飲用者、餐桌與預算。', bestFor: ['白酒新手', '餐桌主人', '送禮者'], related: relatedBasics },
    ja: { title: '最初の白酒レコメンダー', shortTitle: '最初の一本', description: '予算、場面、アルコール耐性から初心者向けの白酒を選びます。', eyebrow: '選択ツール', h1: '無理のない最初の一本を見つける。', lede: '最初の一本は名声よりも飲み手、食事、予算に合うことが重要です。', bestFor: ['初心者', '食事会', 'ギフト'], related: relatedBasics },
    ru: { title: 'Рекомендатель первой бутылки байцзю', shortTitle: 'Первая бутылка', description: 'Подберите байцзю для новичка по бюджету, ситуации и терпимости к крепости.', eyebrow: 'Инструмент выбора', h1: 'Найдите разумную первую бутылку байцзю.', lede: 'Первая бутылка должна подходить человеку, еде и бюджету, а не только звучать престижно.', bestFor: ['Новички', 'Ужин', 'Подарок'], related: relatedBasics },
  },
  'authenticity-risk-checker': {
    en: { title: 'High-Price Baijiu Risk Checker', shortTitle: 'Risk Checker', description: 'Estimate risk signals before buying Maotai or other expensive baijiu.', eyebrow: 'Buying risk tool', h1: 'Check whether a baijiu listing deserves caution.', lede: 'Flags risk patterns such as too-good pricing, weak channels, vague age claims, and suspicious packaging.', bestFor: ['Maotai shoppers', 'Overseas buyers', 'Collectors'], related: relatedBuying },
    'zh-hant': { title: '高價白酒風險檢查器', shortTitle: '風險檢查器', description: '購買茅台或高價白酒前，先估算風險訊號。', eyebrow: '購買風險工具', h1: '判斷一個白酒賣場是否值得警惕。', lede: '提示價格異常、渠道薄弱、年份說法模糊與包裝可疑等風險。', bestFor: ['茅台買家', '海外購買者', '收藏者'], related: relatedBuying },
    ja: { title: '高額白酒リスクチェッカー', shortTitle: 'リスク確認', description: '茅台など高額白酒を買う前にリスク要因を確認します。', eyebrow: '購入リスクツール', h1: 'その白酒リスティングに注意が必要か確認する。', lede: '不自然な価格、弱い販売経路、曖昧な年代表記、不審な包装を確認します。', bestFor: ['茅台購入者', '海外購入者', 'コレクター'], related: relatedBuying },
    ru: { title: 'Проверка риска дорогого байцзю', shortTitle: 'Проверка риска', description: 'Оцените сигналы риска перед покупкой Maotai или другого дорогого байцзю.', eyebrow: 'Инструмент риска', h1: 'Проверьте, требует ли объявление осторожности.', lede: 'Отмечает слишком низкую цену, слабый канал, туманный возраст и подозрительную упаковку.', bestFor: ['Покупатели Maotai', 'Покупки за рубежом', 'Коллекционеры'], related: relatedBuying },
  },
  'aroma-identifier': {
    en: { title: 'Baijiu Aroma Type Identifier', shortTitle: 'Aroma Identifier', description: 'Estimate which aroma family matches tasting notes.', eyebrow: 'Flavor tool', h1: 'Match tasting notes to a baijiu aroma family.', lede: 'Select what you smell and taste. The result is a direction, not a verdict.', bestFor: ['Tasting groups', 'New drinkers', 'Unknown pours'], related: relatedBasics },
    'zh-hant': { title: '白酒香型判別器', shortTitle: '香型判別器', description: '依品飲感受推測可能的白酒香型。', eyebrow: '風味工具', h1: '把品飲描述對應到白酒香型。', lede: '選出你聞到與喝到的特徵。結果是方向，不是定論。', bestFor: ['品飲小組', '白酒新手', '陌生酒款'], related: relatedBasics },
    ja: { title: '白酒香型判定ツール', shortTitle: '香型判定', description: 'テイスティングノートから香型を推測します。', eyebrow: '風味ツール', h1: '香りと味を白酒の香型に結びつける。', lede: '感じた特徴を選んでください。結果は方向性であり断定ではありません。', bestFor: ['テイスティング会', '初心者', '未知の白酒'], related: relatedBasics },
    ru: { title: 'Определитель ароматического стиля байцзю', shortTitle: 'Определитель аромата', description: 'Оцените, какой стиль байцзю похож на ваши дегустационные заметки.', eyebrow: 'Инструмент вкуса', h1: 'Свяжите заметки дегустации с ароматическим стилем.', lede: 'Выберите запахи и вкус. Результат дает направление, а не окончательный диагноз.', bestFor: ['Дегустации', 'Новички', 'Незнакомые образцы'], related: relatedBasics },
  },
  'baijiu-compare': {
    en: { title: 'Baijiu Comparison Tool', shortTitle: 'Comparison Tool', description: 'Compare 2 or 3 baijiu profiles side by side.', eyebrow: 'Database tool', h1: 'Compare baijiu bottles side by side.', lede: 'Use the database comparison table for standards, aroma type, region, ABV, raw materials, tasting notes, and food pairings.', bestFor: ['Choosing bottles', 'Tasting flights', 'Style explanation'], related: relatedDb },
    'zh-hant': { title: '白酒對比工具', shortTitle: '對比工具', description: '並排比較 2 到 3 款白酒資料。', eyebrow: '資料庫工具', h1: '並排比較白酒。', lede: '查看標準、香型、產區、酒精度、原料、品飲筆記與配餐。', bestFor: ['選酒', '品飲組合', '風格解釋'], related: relatedDb },
    ja: { title: '白酒比較ツール', shortTitle: '比較ツール', description: '2〜3本の白酒プロフィールを並べて比較します。', eyebrow: 'データベースツール', h1: '白酒を並べて比較する。', lede: '規格、香型、産地、度数、原料、テイスティングノート、料理ペアリングを比較できます。', bestFor: ['ボトル選び', '飲み比べ', 'スタイル説明'], related: relatedDb },
    ru: { title: 'Инструмент сравнения байцзю', shortTitle: 'Сравнение', description: 'Сравните 2 или 3 профиля байцзю рядом.', eyebrow: 'Инструмент базы', h1: 'Сравните бутылки байцзю рядом.', lede: 'Сравните стандарт, стиль, регион, крепость, сырье, вкус и сочетания с едой.', bestFor: ['Выбор бутылок', 'Дегустации', 'Объяснение стиля'], related: relatedDb },
  },
  'gbt-standard-lookup': {
    en: { title: 'GB/T Baijiu Standard Lookup', shortTitle: 'GB/T Lookup', description: 'Find common Chinese baijiu GB/T standards by style.', eyebrow: 'Standards tool', h1: 'Look up common GB/T standards for baijiu.', lede: 'GB/T codes help confirm style claims, but they do not prove quality or authenticity by themselves.', bestFor: ['Reading labels', 'Checking listings', 'Database profiles'], related: relatedDb },
    'zh-hant': { title: '白酒 GB/T 標準查詢器', shortTitle: 'GB/T 查詢', description: '按風格查詢常見中國白酒 GB/T 標準。', eyebrow: '標準工具', h1: '查詢常見白酒 GB/T 標準。', lede: 'GB/T 代碼有助於確認風格標示，但不能單獨證明品質或真偽。', bestFor: ['看酒標', '檢查賣場', '資料庫理解'], related: relatedDb },
    ja: { title: '白酒 GB/T 規格検索', shortTitle: 'GB/T 検索', description: '白酒の代表的な GB/T 規格をスタイル別に確認します。', eyebrow: '規格ツール', h1: '白酒の一般的な GB/T 規格を調べる。', lede: 'GB/T コードはスタイル表示の確認に役立ちますが、品質や真贋を単独で証明するものではありません。', bestFor: ['ラベル確認', '出品確認', 'データベース理解'], related: relatedDb },
    ru: { title: 'Поиск стандартов GB/T для байцзю', shortTitle: 'Поиск GB/T', description: 'Найдите распространенные стандарты GB/T по стилю байцзю.', eyebrow: 'Инструмент стандартов', h1: 'Посмотрите распространенные стандарты GB/T для байцзю.', lede: 'Коды GB/T помогают проверить заявленный стиль, но сами по себе не доказывают качество или подлинность.', bestFor: ['Чтение этикеток', 'Проверка объявлений', 'Профили базы'], related: relatedDb },
  },
};