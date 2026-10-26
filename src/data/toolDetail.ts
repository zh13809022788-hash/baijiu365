import type { Lang, ToolSlug } from './toolContent';

type Block = { h: string; p: string };

/** Shared disclosure block shown on every tool page. */
export const toolMethod: Record<Lang, { title: string; items: Block[] }> = {
  en: {
    title: 'How these tools work',
    items: [
      {
        h: 'Rule-based, not predictive',
        p: 'Each tool applies a fixed set of published rules. There is no model guessing, and the same inputs always produce the same output.',
      },
      {
        h: 'No laboratory, no authentication',
        p: 'Nothing here analyses a sample or verifies a bottle. Where a question needs a lab test or the producer’s own verification, the tool says so instead of guessing.',
      },
      {
        h: 'Not for sale',
        p: 'No tool takes payment and no result is influenced by a retailer, importer or brand. There are no affiliate links on tool pages.',
      },
    ],
  },
  'zh-hant': {
    title: '這些工具怎麼運作',
    items: [
      {
        h: '規則型，不是預測模型',
        p: '每個工具都套用一組公開的固定規則。沒有模型在猜，同樣的輸入永遠得到同樣的結果。',
      },
      {
        h: '不做檢測，也不做鑑定',
        p: '這裡不分析樣本，也不驗證酒瓶。需要實驗室檢測或原廠驗證的問題，工具會直接說明，而不是給出猜測。',
      },
      {
        h: '不賣東西',
        p: '工具不收費，結果不受零售商、進口商或品牌影響。工具頁面沒有任何聯盟行銷連結。',
      },
    ],
  },
  ja: {
    title: 'これらのツールの仕組み',
    items: [
      {
        h: 'ルールベースであり、予測ではない',
        p: '各ツールは公開された固定ルールを適用します。モデルが推測することはなく、同じ入力には常に同じ結果が出ます。',
      },
      {
        h: '検査も鑑定もしない',
        p: 'ここでサンプルを分析したり、ボトルを検証したりすることはありません。実験室検査や生産者による確認が必要な場合は、推測せずにその旨を明示します。',
      },
      {
        h: '販売目的ではない',
        p: 'ツールは有料ではなく、結果が小売店・輸入業者・ブランドに左右されることもありません。ツールページにアフィリエイトリンクはありません。',
      },
    ],
  },
  ru: {
    title: 'Как работают эти инструменты',
    items: [
      {
        h: 'Правила, а не прогноз',
        p: 'Каждый инструмент применяет фиксированный набор опубликованных правил. Модель ничего не угадывает, и одинаковые данные всегда дают одинаковый результат.',
      },
      {
        h: 'Без лаборатории и без экспертизы',
        p: 'Здесь не анализируют образцы и не проверяют подлинность бутылки. Там, где нужна лабораторная проверка или подтверждение производителя, инструмент прямо об этом говорит.',
      },
      {
        h: 'Не на продажу',
        p: 'Инструменты бесплатны, и на результат не влияют продавцы, импортеры или бренды. На страницах инструментов нет партнерских ссылок.',
      },
    ],
  },
};

/** Per-tool notes: what the result means and where it stops being useful. */
export const toolNotes: Record<ToolSlug, Record<Lang, Block[]>> = {
  'first-bottle-recommender': {
    en: [
      {
        h: 'Budget comes first',
        p: 'Most first-bottle mistakes are spending mistakes. Three bottles at US$30 across three aroma families teach you more than one flagship at US$200, because you need a reference point before you can judge quality.',
      },
      {
        h: 'When to ignore the result',
        p: 'If the bottle is a gift for someone who already drinks baijiu, buy the recognised benchmark for the style they like. The tool is built for the drinker who has no reference point yet, and it will steer you away from the bottles that person would want.',
      },
    ],
    'zh-hant': [
      {
        h: '預算先於名氣',
        p: '第一瓶最常見的錯誤是花錯錢。三瓶各 30 美元、分別來自三個香型，比一瓶 200 美元的旗艦更能建立判斷力，因為你需要參照點才能判斷品質。',
      },
      {
        h: '什麼時候不要看結果',
        p: '如果這瓶酒是送給已經常喝白酒的人，直接買他喜歡那個香型的公認標竿。這個工具是為還沒有參照點的人設計的，會把你帶離那個人真正想要的酒。',
      },
    ],
    ja: [
      {
        h: '予算が最優先',
        p: '最初の一本で最も多い失敗は、使い方の失敗ではなく金額の失敗です。30 ドルの三本を三つの香型から選ぶほうが、200 ドルの旗艦一本より多くのことを教えてくれます。品質を判断するには基準点が要るからです。',
      },
      {
        h: '結果を無視すべき場面',
        p: '白酒を普段から飲む人への贈り物なら、その人が好む香型の定番を選んでください。このツールは基準点をまだ持たない人のためのもので、その人が欲しがる銘柄からは遠ざかる方向に出ます。',
      },
    ],
    ru: [
      {
        h: 'Сначала бюджет',
        p: 'Главная ошибка с первой бутылкой — потратить лишнее. Три бутылки по 30 долларов из трех стилей научат большему, чем один флагман за 200: чтобы судить о качестве, нужна точка отсчета.',
      },
      {
        h: 'Когда результату не стоит следовать',
        p: 'Если бутылка — подарок человеку, который уже пьет байцзю, берите признанный эталон любимого им стиля. Инструмент создан для тех, у кого ориентиров пока нет, и он уведет вас от того, что такой человек хотел бы получить.',
      },
    ],
  },

  'authenticity-risk-checker': {
    en: [
      {
        h: 'What the score actually means',
        p: 'The tool adds up visible risk signals: the channel, the price against market, the packaging story, and the age claim. It is a checklist, not a probability. A low score means nothing looked wrong, not that the bottle is genuine.',
      },
      {
        h: 'The single strongest warning',
        p: 'A price far below market from a private seller. Genuine secondary-market bottles rarely trade at a discount to retail, because the seller could simply return them. When that signal appears with a vague age claim, walk away.',
      },
    ],
    'zh-hant': [
      {
        h: '分數代表什麼',
        p: '工具加總的是看得見的風險訊號：渠道、相對市場的價格、包裝說法與年份主張。這是一份檢查表，不是機率。低分只代表沒看到問題，不代表這瓶酒是真的。',
      },
      {
        h: '最強烈的單一警訊',
        p: '私人賣家開出遠低於市場的價格。真正的二手酒很少低於零售價成交，因為賣家本可直接退貨。這個訊號若伴隨模糊的年份說法，就該放棄。',
      },
    ],
    ja: [
      {
        h: 'スコアの意味',
        p: 'ツールが合計するのは目に見えるリスク要因です。販売経路、市場価格との差、包装の説明、年代表記。これはチェックリストであり確率ではありません。低スコアは「問題が見当たらなかった」だけで、真正品の証明ではありません。',
      },
      {
        h: '最も強い警告',
        p: '個人売り手による、市場から大きく外れた低価格です。本物の二次流通品が小売価格を大きく下回ることはまれで、売り手は返品すればよいからです。曖昧な年代表記が重なるなら手を引いてください。',
      },
    ],
    ru: [
      {
        h: 'Что означает оценка',
        p: 'Инструмент складывает видимые сигналы риска: канал продажи, цену относительно рынка, историю упаковки и заявление о возрасте. Это чек-лист, а не вероятность. Низкая оценка значит лишь то, что проблем не видно.',
      },
      {
        h: 'Самый сильный сигнал',
        p: 'Цена намного ниже рынка у частного продавца. Настоящие бутылки на вторичном рынке почти никогда не уходят с дисконтом к рознице: продавец мог бы просто вернуть товар. Если это сочетается с туманным заявлением о возрасте, от покупки стоит отказаться.',
      },
    ],
  },

  'aroma-identifier': {
    en: [
      {
        h: 'How the matching works',
        p: 'Each set of descriptors maps to the aroma family whose published profile contains those notes. Where several families share a descriptor — cooked grain appears in almost all of them — the tool returns the closest single match and names the alternative.',
      },
      {
        h: 'Why it is a direction, not a verdict',
        p: 'Blind identification is unreliable even for experienced tasters, and mixed-aroma styles deliberately combine families in one bottle. Use the result to decide which bottle to buy next, not to settle an argument about what is in the glass.',
      },
    ],
    'zh-hant': [
      {
        h: '比對方式',
        p: '每一組描述都對應到公開風味檔案中含有這些特徵的香型。若多個香型共用同一個描述——熟糧香幾乎出現在所有香型裡——工具會給出最接近的單一答案，並列出其他可能。',
      },
      {
        h: '為什麼是方向而不是定論',
        p: '即使對有經驗的品飲者，盲測判斷也不可靠，而兼香型本來就刻意把不同香型放在同一瓶裡。結果用來決定下一瓶買什麼，而不是用來終結一場關於杯裡是什麼的爭論。',
      },
    ],
    ja: [
      {
        h: '照合の仕組み',
        p: 'それぞれの記述セットは、公開されている風味プロファイルにその特徴を含む香型に対応します。複数の香型が同じ記述を共有する場合（炊いた穀物の香りはほぼ全てに現れます）、最も近い一つを返し、他の候補も示します。',
      },
      {
        h: '断定ではなく方向性である理由',
        p: '経験者でもブラインドでの判定は不安定で、兼香型は意図的に複数の香型を一瓶に収めています。結果は次に買う一本を決めるために使い、グラスの中身をめぐる議論を決着させるためには使わないでください。',
      },
    ],
    ru: [
      {
        h: 'Как работает сопоставление',
        p: 'Каждый набор дескрипторов сопоставляется со стилем, в опубликованном профиле которого эти ноты присутствуют. Если признак общий для нескольких стилей — вареное зерно есть почти везде — инструмент вернет ближайшее совпадение и назовет альтернативу.',
      },
      {
        h: 'Почему это направление, а не приговор',
        p: 'Слепое определение ненадежно даже для опытных дегустаторов, а смешанные стили намеренно соединяют несколько семейств в одной бутылке. Результат нужен, чтобы выбрать следующую бутылку, а не чтобы закрыть спор.',
      },
    ],
  },

  'baijiu-compare': {
    en: [
      {
        h: 'Compare within a style first',
        p: 'A sauce aroma and a light aroma differ so much that the numbers stop being comparable — a lower ABV does not mean a lighter spirit, and a higher price does not mean a better one. The useful comparisons are between houses in the same aroma family.',
      },
      {
        h: 'Where the values come from',
        p: 'Standards, ABV and raw materials come from producer labels; tasting notes and price bands come from published retail data and are marked as ranges, not quotes. Where a value is not published, the field is left empty rather than estimated.',
      },
    ],
    'zh-hant': [
      {
        h: '先在同一香型內比較',
        p: '醬香與清香差異太大，數字一跨香型就失去可比性——酒精度較低不代表酒體較輕，價格較高也不代表品質較好。真正有用的比較，發生在同一香型的不同酒廠之間。',
      },
      {
        h: '數據從哪裡來',
        p: '標準號、酒精度與原料取自產品標示；品飲筆記與價格帶取自公開零售資料，並以區間呈現而非報價。未公開的數值一律留空，不做推估。',
      },
    ],
    ja: [
      {
        h: 'まず同じ香型の中で比較する',
        p: '醬香と清香は差が大きく、香型をまたぐと数字は比較できなくなります。度数が低いから軽いとは限らず、価格が高いから良いとも限りません。有用な比較は同じ香型の異なる蔵元の間で起こります。',
      },
      {
        h: '数値の出所',
        p: '規格・度数・原料は製品ラベルから、テイスティングノートと価格帯は公開されている小売データから取得し、見積もりではなく範囲として示します。公開されていない値は推測せず空欄にします。',
      },
    ],
    ru: [
      {
        h: 'Сравнивайте внутри стиля',
        p: 'Соевый и легкий ароматы различаются настолько, что цифры перестают быть сопоставимыми: меньшая крепость не значит более легкое тело, а высокая цена — лучшее качество. Полезные сравнения — между домами одного стиля.',
      },
      {
        h: 'Откуда берутся значения',
        p: 'Стандарты, крепость и сырье — с этикеток производителя; дегустационные заметки и ценовые диапазоны — из открытых розничных данных, и приводятся как диапазоны, а не как котировки. Если значение не публикуется, поле остается пустым.',
      },
    ],
  },

  'gbt-standard-lookup': {
    en: [
      {
        h: 'What a GB/T code proves',
        p: 'It identifies the product standard the bottle claims to be made under: the style, the minimum quality grade, and the testing regime. It is a claim printed on a label, not a result. A counterfeit carries exactly the same code as the real bottle.',
      },
      {
        h: 'Style code versus geographical code',
        p: 'A style code such as GB/T 10781.1 tells you what the liquid is supposed to be. A geographical-indication code such as GB/T 18356 is narrower: it fixes the place of production as well as the method, and only producers inside that area may use it.',
      },
    ],
    'zh-hant': [
      {
        h: 'GB/T 代碼能證明什麼',
        p: '它標示這瓶酒宣稱依循的產品標準：香型、最低品質等級與檢驗規範。那是印在標籤上的主張，不是檢驗結果。仿冒品印的代碼和真品完全一樣。',
      },
      {
        h: '香型標準與地理標誌標準',
        p: 'GB/T 10781.1 這類香型標準說明杯中液體應該是什麼。GB/T 18356 這類地理標誌標準更窄：同時限定產地與工藝，只有產區內的生產者能使用。',
      },
    ],
    ja: [
      {
        h: 'GB/T コードが証明すること',
        p: 'そのボトルが準拠を主張する製品規格を示します。香型、最低品質等級、試験方法です。これはラベルに印刷された主張であり、検査結果ではありません。模造品にも本物とまったく同じコードが印刷されています。',
      },
      {
        h: '香型規格と地理的表示規格',
        p: 'GB/T 10781.1 のような香型規格は、中身が何であるべきかを示します。GB/T 18356 のような地理的表示規格はより狭く、製法だけでなく産地も定め、その区域内の生産者だけが使えます。',
      },
    ],
    ru: [
      {
        h: 'Что доказывает код GB/T',
        p: 'Он указывает стандарт, по которому бутылка заявлена: стиль, минимальный сорт качества и схему испытаний. Это заявление на этикетке, а не результат. У подделки напечатан точно такой же код.',
      },
      {
        h: 'Стилевой код и географический код',
        p: 'Стилевой код вроде GB/T 10781.1 говорит, чем должна быть жидкость. Географический код вроде GB/T 18356 строже: он фиксирует и место производства, и метод, и использовать его могут только производители внутри этой зоны.',
      },
    ],
  },
};
