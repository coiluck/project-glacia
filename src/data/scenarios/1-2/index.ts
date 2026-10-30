import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/camp_border.avif（野営地と、地平線の凍った帝都）
const scenario: ScenarioFile = {
  id: '1-2',
  lines: [
    {
      text: '……倒せた。',
      speaker: 'ラピス',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/camp_border.avif', transition: 'fade' },
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: 'ラピスは肩で息をしながら、しばらく川の向こうを見ていた。それからこちらを振り返る。'
    },
    {
      text: 'どうしてあんなに的確に指示が出せたんですか。記憶、ないんですよね？',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ],
      choiceId: 'why'
    },
    {
      text: 'ラピスは少し考えるように、口元に手を当てた。'
    },
    {
      text: 'そういえば、困ってたんです。名前が分からないと、呼び方がなくて。',
      speaker: 'ラピス'
    },
    {
      text: '……指揮官、でいいですか。さっきの指示、的確でしたし。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ],
      choiceId: 'title'
    },
    {
      text: 'では、指揮官。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '……改めてよろしくお願いします。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: 'ラピスが頭を下げたとき、雪を踏む足音が近づいてきた。'
    },
    {
      text: 'そこのふたり、動かないでください！',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious', bounce: true }
      ]
    },
    {
      text: '雪原の向こうから外套を着た少女が駆けてくる。外套の胸に、騎士団の紋が縫いつけてあった。'
    },
    {
      text: '帝国騎士団、アルマ隊のクラリスです。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'normal' }
      ]
    },
    {
      text: '昨日、見張り台から境界を出てくる人影が見えたと報告がありました。……あなたですね。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: 'ラピスさん。あなたがこの人を運んでいくところも、見張りが見ています。どうして報告してくれなかったんですか。',
      speaker: 'クラリス'
    },
    {
      text: '……目が覚めるまでは、と思って。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: 'クラリスは小さく息をついてから、こちらに向き直った。'
    },
    {
      text: '境界から出てきた人を、そのままにはしておけません。野営地まで来てもらいます。取り調べがありますので。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: '待ってください。この人、さっきまで起き上がるのもやっとだったんです。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'さっき川で魔物と戦っていましたよね。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'normal' }
      ]
    },
    {
      text: '……それは。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: 'お名前と所属を教えてください。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'normal' }
      ],
      choiceId: 'identity'
    },
    {
      text: 'クラリスは手帳に何か書きつけて、ぱたんと閉じた。'
    },
    {
      text: '詳しい話は、隊長の前で聞きます。ついてきてください。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: '……私も行きます。この人を見つけたのは、私ですから。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'クラリスは少し迷うように眉を寄せてから、うなずいた。'
    },
    {
      text: 'ラピスさんなら、隊長も嫌とは言わないと思います。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'normal' }
      ]
    },
    {
      text: '野営地は、川沿いに雪原を下った先にあるという。三人で歩き出してしばらくしたころ、クラリスが足を止めた。',
      commands: [
        { type: 'bgMove', direction: 'rightToLeft', duration: 4000 }
      ]
    },
    {
      text: '……止まってください。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: '雪の丘の陰から白くて丸い影がいくつも這い出してくる。その上を、霜をまとった鳥が低く旋回していた。'
    },
    {
      text: 'コオリモチとシモフクロウです。あの鳥は、離れたところから撃ってきます。',
      speaker: 'クラリス'
    },
    {
      text: 'クラリスは得物を構えかけて、それから横目でこちらを見た。'
    },
    {
      text: '……さっきの戦い、見張り台から見ていました。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'normal' }
      ]
    },
    {
      text: '指揮はお任せします。どれだけ戦えるのか、取り調べの前に見せてもらいます。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious', bounce: true }
      ]
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
    why: [
      {
        buttonText: '体が覚えていた',
        branch: [
          { text: '体が……。じゃあ、記憶をなくす前のあなたは、戦うことに慣れていた人なのかもしれませんね。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
        ],
      },
      {
        buttonText: '君が合わせてくれたからだ',
        points: { lapisTrust: 1 },
        branch: [
          { text: '……私は、言われた通りに動いただけです。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] },
          { text: 'でも、言われた通りに動いて勝てたのは初めてかもしれません。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
        ],
      },
    ],
    title: [
      {
        buttonText: 'それでいい',
        branch: [
          { text: 'よかった。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
        ],
      },
      {
        buttonText: '大げさじゃないか？',
        branch: [
          { text: '部隊がひとりでも、指揮官は指揮官です。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
          { text: '本当の名前を思い出したら、そっちで呼びますから。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] },
        ],
      },
    ],
    identity: [
      {
        buttonText: 'それが、分からない',
        branch: [
          { text: '分からない……？', speaker: 'クラリス', commands: [{ type: 'char', id: 'clarice', pose: 'surprised' }] },
          { text: '本当なんです。名前も、中で何があったのかも、覚えていないって。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
          { text: '……そういうことも、記録しておきます。', speaker: 'クラリス', commands: [{ type: 'char', id: 'clarice', pose: 'serious' }] },
        ],
      },
      {
        buttonText: 'ラピスには、指揮官と呼ばれている',
        points: { lapisTrust: 1 },
        branch: [
          { text: 'しきかん……？ どこの部隊のですか。', speaker: 'クラリス', commands: [{ type: 'char', id: 'clarice', pose: 'surprised' }] },
          { text: '名前を覚えていないので、私がそう呼んでるんです。部隊は、私ひとりです。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
          { text: '……そういうことも、記録しておきます。', speaker: 'クラリス', commands: [{ type: 'char', id: 'clarice', pose: 'serious' }] },
        ],
      },
    ],
  },
};

export default scenario;
