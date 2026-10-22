import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/camp_border.avif（野営地と、地平線の凍った帝都）
// - bg/camp_chapel.avif（礼拝所のテントの中。祈り札の柱と祭壇）
const scenario: ScenarioFile = {
  id: '1-4',
  lines: [
    {
      text: '荷運びの道は、これで大丈夫です。戻りましょう。',
      speaker: 'クラリス',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/camp_border.avif', transition: 'fade' },
        { type: 'char', id: 'clarice', pose: 'normal' }
      ]
    },
    {
      text: '野営地に戻るころには、日が傾きはじめていた。',
      commands: [
        { type: 'bgMove', direction: 'rightToLeft', duration: 4000 }
      ]
    },
    {
      text: 'テントのあいだを歩いていると、クラリスがこちらの横に並んで、小声で言った。'
    },
    {
      text: '隊長が、来たばかりの人にあんなふうに任せるのは、珍しいんです。',
      speaker: 'クラリス'
    },
    {
      text: '……ブローチのことも。いつもの隊長なら、預かっていたと思います。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ],
      choiceId: 'alma'
    },
    {
      text: '焚き火のそばを通りかかったとき、話し声が耳に入った。'
    },
    {
      text: 'あれだろ、境界から出てきたっていうのは。',
      speaker: '避難民の男'
    },
    {
      text: '中のやつが、なんで今さら出てくるんだ。',
      speaker: '避難民の男'
    },
    {
      text: '帝都を凍らせたのは皇家だって話よ。あの人も、皇家の手先なんじゃないの。',
      speaker: '避難民の女'
    },
    {
      text: '皇族は、真っ先に逃げたっていうしな。自分たちだけ助かって、残りは氷漬けだ。',
      speaker: '避難民の男'
    },
    {
      text: 'ラピスの足が止まった。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: 'ラピスは焚き火のほうを見ないまま、外套の襟をぎゅっと握っていた。'
    },
    {
      text: '……聞き流してください。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: 'みんな、誰かのせいにしたいだけなんです。帝都に家族を残してきた人ばかりなので。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'sad' }
      ],
      choiceId: 'rumor'
    },
    {
      text: '野営地の端に、ほかより少し大きなテントがあった。入口に、白い布が下がっている。'
    },
    {
      text: 'ここは礼拝所です。亡くなった人や、帝都に残った人のために祈る場所です。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: 'テントの中には、人が集まっていた。こちらに気づいて、ざわめきが広がる。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/camp_chapel.avif', transition: 'crossfade' }
      ]
    },
    {
      text: 'あの、あなたが、境界から出てきた人ですか。',
      speaker: '避難民の女'
    },
    {
      text: '中に、娘がいるんです。十になる娘です。会いませんでしたか。',
      speaker: '避難民の女'
    },
    {
      text: '息子が、北の門で衛兵をしておった。何か、知らんか。',
      speaker: '避難民の老人'
    },
    {
      text: 'うちの人は、中で生きてるんですか。それだけでも……！',
      speaker: '避難民の男'
    },
    {
      text: '次々に声が重なる。誰かに袖をつかまれた。'
    },
    {
      text: 'みなさん。そのくらいに。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'serious' }
      ]
    },
    {
      text: 'テントの奥から、修道服の女性が歩いてきた。目を閉じたまま、人のあいだを迷わずに抜けてくる。'
    },
    {
      text: 'この方は、目を覚ましたばかりと聞いています。責めても、帰ってくる人はいません。',
      speaker: '？？？'
    },
    {
      text: 'ロザリーさん……',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: 'ざわめきが少しずつ引いていく。最後に、娘のことを訊いた女性だけが残った。'
    },
    {
      text: '……ごめんなさい。でも、何かひとつでも分かればと思って。',
      speaker: '避難民の女',
      choiceId: 'promise'
    },
    {
      text: 'ロザリーと申します。ここで、祈りの番をしています。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'normal' }
      ]
    },
    {
      text: 'ラピスさんの足音と、聞き慣れない足音がひとつ。あなたが、境界から出てきた方ですね。',
      speaker: 'ロザリー'
    },
    {
      text: 'テントの奥の柱に、木の札がびっしりと掛けられていた。札の一枚一枚に、名前が刻まれている。'
    },
    {
      text: '帝都に残った方々のお名前です。ご家族から聞いて、ひとつずつ刻んでいます。',
      speaker: 'ロザリー'
    },
    {
      text: '亡くなったのか、生きているのか、分かりません。ですからここでは、弔うのではなく、ただお名前を呼んで祈ることにしています。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'serious' }
      ]
    },
    {
      text: 'ラピスは札の並んだ柱を見上げて、何も言わなかった。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: 'さて。日が沈む前に、灯りを置きに行かなくては。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'normal' }
      ]
    },
    {
      text: 'ロザリーさんは毎晩、境界のそばにランタンを置きに行くんです。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'normal' }
      ]
    },
    {
      text: '中の方々が帰ってくるとき、道に迷わないように。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'smile' }
      ]
    },
    {
      text: 'ロザリーは小さく首をかしげて、こちらへ顔を向けた。'
    },
    {
      text: '……あなたも、灯りを見て帰ってこられたのかもしれませんね。',
      speaker: 'ロザリー'
    },
    {
      text: '今日はだめです。境界のあたりで魔物が増えていると、報告が上がっています。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: '昨日も置きました。今日だけ置かないわけにはいきません。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'serious' }
      ]
    },
    {
      text: 'ロザリーはランタンの入った籠を抱えると、本当にテントを出ていってしまった。',
      commands: [
        { type: 'charDelete', id: 'rosalie' }
      ]
    },
    {
      text: '……もう。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'sad' }
      ]
    },
    {
      text: 'すみません、指揮官。手を貸してください。ロザリーさんを、ひとりで行かせるわけにはいきません。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: '境界のそばには、もう夜の気配が降りていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/camp_border.avif', transition: 'crossfade' }
      ]
    },
    {
      text: '白く霞む線の手前で、ロザリーがひざをついてランタンを並べている。小さな火が、ひとつ、またひとつと灯っていく。'
    },
    {
      text: 'その向こうで、雪がぐらりと盛り上がった。',
      commands: [
        { type: 'bgShake', duration: 400, intensity: 6 }
      ]
    },
    {
      text: 'イワモチです……！ ロザリーさん、下がってください！',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised', bounce: true }
      ]
    },
    {
      text: 'ロザリーさんを守りましょう、指揮官！',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious', bounce: true }
      ]
    },
  ],
  choices: {
    alma: [
      {
        buttonText: 'アルマは自分を知っているのか？',
        branch: [
          { text: 'それは……どうでしょう。', speaker: 'クラリス', commands: [{ type: 'char', id: 'clarice', pose: 'normal' }] },
          { text: '隊長は、帝都にいたころのことをあまり話さないので。', speaker: 'クラリス' },
        ],
      },
      {
        buttonText: '信用されたのかもしれない',
        branch: [
          { text: '……そうだといいんですけど。', speaker: 'クラリス', commands: [{ type: 'char', id: 'clarice', pose: 'normal' }] },
          { text: '私はまだ、信用していませんから。', speaker: 'クラリス', commands: [{ type: 'char', id: 'clarice', pose: 'serious' }] },
        ],
      },
    ],
    rumor: [
      {
        buttonText: 'ラピス、大丈夫か',
        points: { lapisTrust: 1 },
        branch: [
          { text: '……はい。平気です。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
          { text: '慣れてますから。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
        ],
      },
      {
        buttonText: '皇家が凍らせた、というのは？',
        branch: [
          { text: 'ただの噂です。誰も、本当のことは知りません。', speaker: 'クラリス', commands: [{ type: 'char', id: 'clarice', pose: 'serious' }] },
          { text: '……行きましょう。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
        ],
      },
    ],
    promise: [
      {
        buttonText: '……すまない。何も覚えていないんだ',
        branch: [
          { text: '……いいえ。こちらこそ、ごめんなさい。', speaker: '避難民の女' },
          { text: '女性は頭を下げて、テントを出ていった。' },
        ],
      },
      {
        buttonText: '中のことが分かったら、必ず伝える',
        points: { lapisTrust: 1 },
        branch: [
          { text: '……はい。待っています。', speaker: '避難民の女' },
          { text: '女性は何度も頭を下げて、テントを出ていった。' },
          { text: 'ラピスが、少しだけこちらを見上げた。', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
        ],
      },
    ],
  },
};

export default scenario;
