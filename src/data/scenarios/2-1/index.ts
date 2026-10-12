import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/camp_border.avif（野営地と、地平線の凍った帝都）
const scenario: ScenarioFile = {
  id: '2-1',
  lines: [
    {
      text: '白焔の炎が、最後にひときわ白く燃え上がって、雪の上に崩れた。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/camp_border.avif', transition: 'fade' }
      ]
    },
    {
      text: 'あとには、雪が溶けて黒く濡れた地面だけが残った。'
    },
    {
      text: '……やった。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised' }
      ]
    },
    {
      text: '南の端、被害なし！ テントは一張りも燃えていません！',
      speaker: 'クラリス',
      commands: [
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
    // ここから 2-1 の本編
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
          { text: '違う……。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
          { text: 'じゃあ、どうやって出てきたのかが分かれば、入り方も分かるかもしれませんね。', speaker: 'ラピス' },
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
  },
};

export default scenario;
