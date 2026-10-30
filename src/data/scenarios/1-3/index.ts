import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/camp_border.avif（野営地と、地平線の凍った帝都）
const scenario: ScenarioFile = {
  id: '1-3',
  lines: [
    {
      text: 'クラリスは得物を下ろして、しばらく黙っていた。それから手帳を開く。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/camp_border.avif', transition: 'fade' },
        { type: 'char', id: 'clarice', pose: 'normal' }
      ]
    },
    {
      text: '腕は、認めます。',
      speaker: 'クラリス'
    },
    {
      text: 'でも、疑いが晴れたわけではありません。境界から人が出てきたことなんて、今まで一度もなかったんですから。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ],
      choiceId: 'doubt'
    },
    {
      text: '川沿いを下ると、雪原のくぼみにテントの群れが見えてきた。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgMove', direction: 'leftToRight', duration: 4000 }
      ]
    },
    {
      text: '煙がいくつも立ちのぼっている。焚き火のまわりで毛布をかぶった人たちが身を寄せ合っていた。'
    },
    {
      text: '帝都から逃げてきた人たちと、騎士団の野営地です。騎士団は、境界を見張るためにここに残っています。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '……記憶がないなら、今がどういうときなのかも分からないんですよね。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'normal' }
      ]
    },
    {
      text: '何年か前から、世界のあちこちで空に裂け目が開くようになりました。裂け目からは魔物があふれてきて、裂け目の開いた街はほとんどが滅びています。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: 'このあたりにいる魔物も、よその裂け目から流れてきたものです。',
      speaker: 'クラリス'
    },
    {
      text: '帝都に裂け目が開いたのは、そのあとでした。ほかの街がどうなったかを知っていたので、帝都は魔物があふれる前に、一部の人を外へ逃がしたんです。',
      speaker: 'クラリス'
    },
    {
      text: '帝都が凍った理由は、誰にも分かりません。',
      speaker: 'クラリス'
    },
    {
      text: 'ただ、凍ってから帝都の裂け目の魔物は一匹も出てきていません。',
      speaker: 'クラリス'
    },
    {
      text: 'ラピスは何も言わずに、地平線の尖塔のほうを見ていた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: 'テントのあいだを歩くと、あちこちから視線が刺さった。誰も声はかけてこない。'
    },
    {
      text: '野営地のいちばん奥、旗の立った大きなテントの前でクラリスが背筋を伸ばした。'
    },
    {
      text: '隊長。境界から出てきた者を連れてきました。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: 'ご苦労さま、クラリス。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'alma', pose: 'normal' }
      ]
    },
    {
      text: 'テントから鎧の上に外套を羽織った女性が出てきた。'
    },
    {
      text: 'その人はこちらを見て、ふいに足を止めた。'
    },
    {
      text: '…………',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'alma', pose: 'surprised' }
      ]
    },
    {
      text: '……隊長？',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'normal' }
      ]
    },
    {
      text: '……いえ。境界から人が出てくるなんて、と思っただけです。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'alma', pose: 'normal' }
      ]
    },
    {
      text: 'アルマです。この野営地の守りを預かっています。',
      speaker: 'アルマ'
    },
    {
      text: 'お名前は？',
      speaker: 'アルマ'
    },
    {
      text: 'それが、覚えていないそうなんです。名前も、中で何があったのかも。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: 'だから私、指揮官って呼んでます。さっきの戦いも、指示が的確だったので。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: '……指揮官、ですか。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: 'アルマは一度だけ目を伏せて、それから小さく笑った。'
    },
    {
      text: 'いい呼び名ですね。私もそう呼ばせてもらいましょう。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'smile' }
      ],
      choiceId: 'almaName'
    },
    {
      text: 'では、持ち物を確かめさせてもらいます。クラリス。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'normal' }
      ]
    },
    {
      text: 'はい。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: 'クラリスが、焚き火のそばの台にこちらの持ち物を並べていった。'
    },
    {
      text: 'まず、霜で固まった外套。その下に着ていた服も、霜で白く固まっていた。'
    },
    {
      text: 'アルマは何も言わずに、その外套を見ていた。'
    },
    {
      text: 'それから、外套の内ポケットから小さなものがひとつ出てきた。'
    },
    {
      text: '銀のブローチだった。表面が薄い霜で覆われている。'
    },
    {
      text: 'クラリスがブローチを焚き火にかざした。炎の先が霜をなめる。'
    },
    {
      text: '……溶けない。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised' }
      ]
    },
    {
      text: 'しばらくかざしていても、霜は一粒も溶けなかった。冷たい光を返すだけだった。'
    },
    {
      text: 'ふと隣を見ると、ラピスの顔から血の気が引いていた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '……ラピスさん？',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'normal' }
      ]
    },
    {
      text: '……なんでも、ないです。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: 'ラピスはそれ以上何も言わなかった。アルマがちらりとラピスを見る。'
    },
    {
      text: '魔法で凍らせたものでしょう。中では、珍しくもないのかもしれません。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'normal' }
      ]
    },
    {
      text: 'アルマはクラリスの手からブローチを取ると、こちらの手のひらに載せた。'
    },
    {
      text: 'これは、あなたが持っていてください。',
      speaker: 'アルマ'
    },
    {
      text: '隊長、それは証拠品では……',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised' }
      ]
    },
    {
      text: '持ち主から取り上げる理由はありません。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: 'そのかわり、疑いが晴れるまであなたにはクラリスの監視のもとで働いてもらいます。この野営地は、手が足りていないので。',
      speaker: 'アルマ'
    },
    {
      text: '……了解しました。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ],
      choiceId: 'work'
    },
    {
      text: 'さっそくですが、仕事があります。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: '東の凍った湖のあたりで、カゲロウが出たと見張りから報告がありました。補給の荷を運ぶ道に近いので、放ってはおけません。',
      speaker: 'アルマ'
    },
    {
      text: 'カゲロウは足が速くて、力も強い魔物です。放っておくと、荷運びの人がやられます。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: 'ラピスはこちらの手の中のブローチを一度だけ見て、それから顔を上げた。'
    },
    {
      text: '行きましょう、指揮官。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious', bounce: true }
      ]
    },
  ],
  choices: {
    doubt: [
      {
        buttonText: '疑うのは当然だ',
        branch: [
          { text: '……そう言ってもらえると、助かります。', speaker: 'クラリス', commands: [{ type: 'char', id: 'clarice', pose: 'normal' }] },
          { text: 'みんながみんな、そう思ってくれるとは限りませんけど。', speaker: 'クラリス', commands: [{ type: 'char', id: 'clarice', pose: 'serious' }] },
        ],
      },
      {
        buttonText: '何を疑っている？',
        branch: [
          { text: '分かりません。だから疑うんです。', speaker: 'クラリス', commands: [{ type: 'char', id: 'clarice', pose: 'serious' }] },
          { text: '中から来た人が、私たちの味方なのかどうか。誰にも分からないので。', speaker: 'クラリス' },
        ],
      },
    ],
    almaName: [
      {
        buttonText: 'よろしく、アルマ',
        branch: [
          { text: 'ええ。よろしくお願いします、指揮官。', speaker: 'アルマ', commands: [{ type: 'char', id: 'alma', pose: 'smile' }] },
        ],
      },
      {
        buttonText: '本当にそれでいいのか？',
        branch: [
          { text: '名前が分からないなら、呼び名は要ります。', speaker: 'アルマ', commands: [{ type: 'char', id: 'alma', pose: 'normal' }] },
          { text: '……それに、似合っていますよ。', speaker: 'アルマ', commands: [{ type: 'char', id: 'alma', pose: 'smile' }] },
        ],
      },
    ],
    work: [
      {
        buttonText: '分かった、手伝う',
        branch: [
          { text: '助かります。', speaker: 'アルマ', commands: [{ type: 'char', id: 'alma', pose: 'smile' }] },
        ],
      },
      {
        buttonText: 'ラピスも一緒に？',
        points: { lapisTrust: 1 },
        branch: [
          { text: 'ラピスがそうしたいなら。', speaker: 'アルマ', commands: [{ type: 'char', id: 'alma', pose: 'normal' }] },
          { text: '……行きます。指揮官をひとりにはしません。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
        ],
      },
    ],
  },
};

export default scenario;
