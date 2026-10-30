import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/camp_border.avif（野営地と、地平線の凍った帝都）
// - bg/south_road.avif（雪が途切れた南の街道）
const scenario: ScenarioFile = {
  id: '2-1',
  lines: [
    {
      text: '南の端、被害なし！ テントは一張りも燃えていません！',
      speaker: 'クラリス',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/camp_border.avif', transition: 'fade' },
        { type: 'char', id: 'clarice', pose: 'smile', bounce: true }
      ]
    },
    {
      text: 'あちこちで、騎士たちが息をついて雪の上に座り込んだ。誰かが笑い出し、それがまわりにも移っていく。'
    },
    {
      text: 'お見事でした、指揮官。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'smile' }
      ]
    },
    {
      text: 'クラリスがこちらへ歩いてきて、手帳を開いた。'
    },
    {
      text: 'さっきの戦いのことも、記録しておきます。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'normal' }
      ]
    },
    {
      text: '……疑いの欄は、少し、書き直します。',
      speaker: 'クラリス',
      choiceId: 'record'
    },
    {
      text: 'その夜、野営地の火は遅くまで消えなかった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '翌朝。',
      commands: [
        { type: 'wait', ms: 800 }
      ]
    },
    {
      text: 'ラピスに呼ばれて、境界の前まで来ていた。昨日ロザリーが並べたランタンは、どれも燃え尽きている。'
    },
    {
      text: '指揮官。……そのブローチを持っていれば、境界を越えられたりしませんか。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'あなたは、それを持って出てきました。だったら、もしかしたら、って。',
      speaker: 'ラピス'
    },
    {
      text: 'ブローチを握って、白く霞む線に手を伸ばした。'
    },
    {
      text: '指先が線を越えた瞬間、皮膚に針を刺されたような痛みが走った。霜が爪の上に広がり、袖を這い上がってくる。'
    },
    {
      text: '指揮官！',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised', bounce: true }
      ]
    },
    {
      text: 'ラピスに腕を引かれて、手が線のこちら側に戻った。指は真っ白で、しばらく感覚がなかった。'
    },
    {
      text: 'ブローチの霜は、何も変わっていなかった。'
    },
    {
      text: '……ごめんなさい。出てこられたんだから、入れるんじゃないかって、思ったんです。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ],
      choiceId: 'border'
    },
    {
      text: '指を一本なくしてから分かっても、遅いですよ。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: '振り返ると、アルマとクラリスが雪を踏んで歩いてくるところだった。'
    },
    {
      text: 'アルマはこちらの指をひと目見てから、ラピスに向き直った。'
    },
    {
      text: '境界を越える方法を探すなら、ひとつ、気になる話があります。',
      speaker: 'アルマ'
    },
    {
      text: '南の街道を来た商人から聞きました。陽の聖女と呼ばれる方が、帝都を溶かすために人を集めているそうです。',
      speaker: 'アルマ'
    },
    {
      text: '帝都を、溶かす……？',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: 'そうしたら、中に入れる。中の人たちにも、会える……',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '……ええ。そういう話です。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: 'アルマはそれだけ言って、地平線の尖塔のほうへ目をそらした。'
    },
    {
      text: 'それと、星を読む魔女が、裂け目のことを調べて回っているという噂もあります。境界のことも、何か分かるかもしれません。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'normal' }
      ]
    },
    {
      text: 'ラピスは、しばらく境界の向こうを見ていた。それから、こちらを振り返る。'
    },
    {
      text: '行きます。聖女さまでも、魔女でも。境界を越える方法を知っている人がいるなら、会いに行きます。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '……指揮官も、来てくれますか。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ],
      choiceId: 'together'
    },
    {
      text: '騎士団は、境界を離れられません。私たちは、ここで待ちます。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'normal' }
      ]
    },
    {
      text: 'クラリス。監視役は、ここまでにしましょう。',
      speaker: 'アルマ'
    },
    {
      text: '……はい。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'normal' }
      ]
    },
    {
      text: '疑いは、晴れたことにしておきます。……ちゃんと帰ってきてください。報告書が、書き終わりませんから。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'smile' }
      ]
    },
    {
      text: 'ラピスと並んで、南の街道へ歩き出した。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgMove', direction: 'leftToRight', duration: 4000 }
      ]
    },
    {
      text: 'しばらく歩いてから振り返ると、野営地の端に、アルマがまだ立っていた。'
    },
    {
      text: 'アルマは、ふたりの背中が雪原の向こうに見えなくなるまで、そこを動かなかった。',
      commands: [
        { type: 'wait', ms: 800 }
      ]
    },
    {
      text: '……ご無事で、指揮官。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'sad' }
      ]
    },
    {
      text: 'ラピスさまを、頼みます。',
      speaker: 'アルマ'
    },
    {
      text: '南の街道を、三日歩いた。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/south_road.avif', transition: 'fade' }
      ]
    },
    {
      text: '足もとの雪は日ごとに薄くなって、四日目の朝には、ところどころ土が見えるようになった。'
    },
    {
      text: '……あったかい。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '境界を離れたの、あの日以来なんです。雪のない地面って、こんな色でしたっけ。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ],
      choiceId: 'warm'
    },
    {
      text: 'しばらく行くと、街道の土の上に、黒い筋が一本、まっすぐ南へ延びていた。',
      commands: [
        { type: 'bgMove', direction: 'leftToRight', duration: 4000 }
      ]
    },
    {
      text: '草も土も、焦げて固まっている。'
    },
    {
      text: 'これ……白焔が通ったあとじゃないですか。野営地の雪を溶かしたのと、同じ焼け方です。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '焼け跡は、街道に沿って南の地平線まで続いていた。'
    },
    {
      text: 'あんな遠くから、来たんだ……',
      speaker: 'ラピス'
    },
    {
      text: 'そこ、踏むな。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '焼け跡のそばにしゃがみこんでいた女が、顔も上げずに言った。背中に、身の丈ほどもある大剣を負っている。'
    },
    {
      text: '足跡が消える。白焔のほかにも、何か通ってるかもしれないんだ。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '女は焼け跡の土を指でつまんで、においをかいでから立ち上がった。'
    },
    {
      text: '……で、あんたたちは。こんなところで何してる。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: '北の、境界の野営地から来ました。南へ行くところです。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '境界の野営地。じゃあ、この焼け跡の行き先も見てきたのか。白焔は、どっちへ行った。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: 'どっちって……白焔なら、野営地で倒しました。この人の指揮で。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: '女の動きが止まった。'
    },
    {
      text: '……倒した？',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'surprised' }
      ]
    },
    {
      text: 'ひと月追いかけてたんだぞ、あれ。南の商人組合が、首に賞金を懸けてた。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ],
      choiceId: 'bounty'
    },
    {
      text: 'ベルミリア。傭兵だ。裂け目の魔物を狩って、食ってる。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: 'ラピスです。こっちは、指揮官。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '指揮官？ ひとりしか連れてないように見えるけど。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: '部隊は、私ひとりです。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: '……そうか。それで、南のどこへ行く。',
      speaker: 'ベルミリア'
    },
    {
      text: '陽の聖女さまのところです。帝都を溶かすために、人を集めてるって聞いて。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'ベルミリアは少しのあいだ、ラピスの顔を見ていた。'
    },
    {
      text: '帝都の人間か。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '……はい。帝都に、家族がいます。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: 'そうか。',
      speaker: 'ベルミリア'
    },
    {
      text: 'それだけ言って、ベルミリアは街道の南へ目を戻した。'
    },
    {
      text: '聖女の陣なら、焼けた森を抜けた先だ。街道はまっすぐ森に入る。',
      speaker: 'ベルミリア'
    },
    {
      text: 'やめとけ、とは言わない。ただ、あのあたりは魔物の巣だ。ふたりで抜けられるとは思えないね。',
      speaker: 'ベルミリア'
    },
    {
      text: 'それにしても、白焔がこんな北まで上がってきたのは初めてだ。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: 'あれは、南の焼けた街に巣があった。巣からめったに出てこないやつだったんだ。',
      speaker: 'ベルミリア'
    },
    {
      text: 'それが、街道をこんな北まで上がってきた。……何かに押し出されたみたいにな。',
      speaker: 'ベルミリア',
      choiceId: 'guide'
    },
    {
      text: '……白焔の首を取った腕ってのは、本当か。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: '本当なら、森を抜けるまで付き合ってやってもいい。そのかわり、道中で狩った魔物の賞金は、全部私のものだ。',
      speaker: 'ベルミリア'
    },
    {
      text: '……いいんですか？',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '腕が本当なら、だ。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: 'ベルミリアが背中の大剣に手をかけた。'
    },
    {
      text: '街道の先、焼け跡の上で、赤い光がいくつも揺れている。転がるように跳ねながら、こちらへ近づいてくる。'
    },
    {
      text: 'ホムラモチ……！ 白焔のあとを、ついてきたんでしょうか。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised', bounce: true }
      ]
    },
    {
      text: 'ちょうどいい。見せてもらおうか、指揮官。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious', bounce: true }
      ]
    },
  ],
  choices: {
    record: [
      {
        buttonText: 'ありがとう、クラリス',
        branch: [
          { text: 'お礼を言われることじゃありません。記録は、正確に書くものですから。', speaker: 'クラリス', commands: [{ type: 'char', id: 'clarice', pose: 'serious' }] },
        ],
      },
      {
        buttonText: 'まだ、少しなのか',
        branch: [
          { text: '少しです。', speaker: 'クラリス', commands: [{ type: 'char', id: 'clarice', pose: 'serious' }] },
          { text: 'でも、少しは少しです。', speaker: 'クラリス', commands: [{ type: 'char', id: 'clarice', pose: 'smile' }] },
        ],
      },
    ],
    border: [
      {
        buttonText: '試せてよかった',
        points: { lapisTrust: 1 },
        branch: [
          { text: '……指揮官は、怒らないんですね。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] },
          { text: 'でも、次に危ないことをするときは、私が先にやります。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
        ],
      },
      {
        buttonText: '出るのと入るのは、違うのかもしれない',
        branch: [
          { text: '……じゃあ、指揮官はどうして出てこられたんでしょう。', speaker: 'ラピス' },
        ],
      },
    ],
    together: [
      {
        buttonText: 'もちろん、一緒に行く',
        points: { lapisTrust: 1 },
        branch: [
          { text: 'はい！', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile', bounce: true }] },
        ],
      },
      {
        buttonText: '中で何があったのか、確かめたい',
        branch: [
          { text: 'はい。……私も、知りたいです。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
        ],
      },
    ],
    warm: [
      {
        buttonText: '寒いほうが慣れているか？',
        branch: [
          { text: 'ずっと境界のそばにいましたから。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] },
          { text: 'でも、姉はきっと、こっちのほうが好きです。氷の魔法を使うのに、寒がりなんですよ。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
        ],
      },
      {
        buttonText: '帰りも、この道を通ろう',
        points: { lapisTrust: 1 },
        branch: [
          { text: '……はい。帰りは、姉と三人で。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
        ],
      },
    ],
    bounty: [
      {
        buttonText: '横取りしたなら、すまない',
        branch: [
          { text: '謝られても、金にはならない。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'serious' }] },
          { text: '……まあいい。倒れたなら、それで。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'normal' }] },
        ],
      },
      {
        buttonText: '賞金なら、野営地の騎士団に言ってくれ',
        branch: [
          { text: '騎士団が、傭兵に払う金なんか持ってるもんか。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'serious' }] },
          { text: '……まあいい。倒れたなら、それで。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'normal' }] },
        ],
      },
    ],
    guide: [
      {
        buttonText: '森を抜ける道を、案内してくれないか',
        branch: [
          { text: '案内料は高いぞ。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'normal' }] },
          { text: 'お金は、あんまり……', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
          { text: 'だろうな。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'normal' }] },
        ],
      },
      {
        buttonText: '白焔の巣を、見に行くつもりか',
        branch: [
          { text: '……賞金首が一匹とは限らないからな。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'serious' }] },
          { text: 'どうせ、行き先は同じ方向だ。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'normal' }] },
        ],
      },
    ],
  },
};

export default scenario;
