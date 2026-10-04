import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/camp_tent.avif（テントの中）
// - bg/camp_border.avif（野営地と、地平線の凍った帝都）
const scenario: ScenarioFile = {
  id: '1-1',
  lines: [
    {
      text: '……寒い。'
    },
    {
      text: 'それが、最初に思ったことだった。'
    },
    {
      text: '目を開けると、薄い布の天井が風に揺れていた。布の向こうで、火のはぜる音がする。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/camp_tent.avif', transition: 'fade' }
      ]
    },
    {
      text: '……！ 起きた……',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised', bounce: true }
      ]
    },
    {
      text: '動かないでください。体、まだ冷えきってますから。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '少女は毛布を肩まで引き上げてから、こちらの顔をのぞき込んだ。'
    },
    {
      text: '私はラピス。あなたは？',
      speaker: '？？？'
    },
    {
      text: '答えようとして、言葉が止まった。名前が、出てこない。'
    },
    {
      text: '',
      choiceId: 'name'
    },
    {
      text: 'あなたは、帝都のほうから歩いてきたんです。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '境界の、内側から。',
      speaker: 'ラピス'
    },
    {
      text: '雪の上をまっすぐこっちへ来て、境界を出たところで倒れました。服も髪も、霜で真っ白でした。',
      speaker: 'ラピス'
    },
    {
      text: '境界を越えた人は、誰も戻ってきません。帝都が凍ってから、ずっとです。',
      speaker: 'ラピス'
    },
    {
      text: '……あなたが、初めてなんです。',
      speaker: 'ラピス'
    },
    {
      text: '中で、誰かに会いませんでしたか。',
      speaker: 'ラピス'
    },
    {
      text: '',
      choiceId: 'inside'
    },
    {
      text: 'ラピスは膝の上で手を握って、それから立ち上がった。'
    },
    {
      text: '外、出られますか。見てほしいものがあるんです。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: 'テントの外は、一面の雪原だった。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/camp_border.avif', transition: 'crossfade' },
        { type: 'bgMove', direction: 'leftToRight', duration: 4000 }
      ]
    },
    {
      text: '雪原の先で、景色が白く霞んでいる。空気がそこだけ凍りついたように、一本の線を境に色が変わっていた。'
    },
    {
      text: 'その奥、地平線のあたりに、凍りついた尖塔の群れが影のように立っている。'
    },
    {
      text: 'あれが境界です。その向こうが、帝都。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'ここも寒いですけど、火と装備があれば、人は過ごせます。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: 'でも、境界を越えたら、体はすぐに凍ります。中がどうなっているのかも、中の人が生きているのかも、外からは分かりません。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '……私、帝都に住んでたんです。あの日、外へ逃がしてもらった側でした。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '逃げる途中で、姉とはぐれました。姉は、今もあの中にいます。',
      speaker: 'ラピス'
    },
    {
      text: 'だから、ここにいるんです。境界のそばに。',
      speaker: 'ラピス'
    },
    {
      text: '',
      choiceId: 'sister'
    },
    {
      text: '中から出てこられる人がいるなら、姉だって、きっと。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'そのとき、雪原の向こうで氷の割れる音がした。',
      commands: [
        { type: 'bgShake', duration: 400, intensity: 6 }
      ]
    },
    {
      text: 'コオリモチ……！',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised', bounce: true }
      ]
    },
    {
      text: '裂け目から出てきた魔物です。帝都が凍ったのとは関係なく、このあたりをうろついていて……',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '白くて丸い影がふたつ、川の向こうから、まっすぐこちらへ向かってくる。'
    },
    {
      text: 'あなたはテントに戻っていてください。まだ立つのもやっとでしょう？',
      speaker: 'ラピス'
    },
    {
      text: '',
      choiceId: 'sortie'
    },
    {
      text: '渡れるのは、川の真ん中の浅瀬だけです。……行きます！',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious', bounce: true }
      ]
    },
  ],
  choices: {
    name: [
      {
        buttonText: '……分からない',
        branch: [
          {
            text: '分からない……？',
            speaker: 'ラピス',
            commands: [
              { type: 'char', id: 'lapis', pose: 'surprised' }
            ]
          },
          {
            text: '……そう、ですか。',
            speaker: 'ラピス',
            commands: [
              { type: 'char', id: 'lapis', pose: 'sad' }
            ]
          }
        ]
      },
      {
        buttonText: '何も、思い出せない',
        branch: [
          {
            text: '何も……自分の名前も、ですか。',
            speaker: 'ラピス',
            commands: [
              { type: 'char', id: 'lapis', pose: 'sad' }
            ]
          }
        ]
      },
    ],
    inside: [
      {
        buttonText: '……覚えていない',
        branch: [
          { text: '……そう、ですよね。目が覚めたばかりなのに、ごめんなさい。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
        ],
      },
      {
        buttonText: '誰かを探しているのか？',
        points: { lapisTrust: 1 },
        branch: [
          { text: '……はい。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
          { text: 'でも、覚えていないなら、いいんです。ごめんなさい、急に。', speaker: 'ラピス' },
        ],
      },
    ],
    sister: [
      {
        buttonText: 'ひとりで、ずっと？',
        points: { lapisTrust: 1 },
        branch: [
          { text: 'ひとりで待つのは、もう慣れました。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
          { text: '……でも、あなたが出てきた。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] },
        ],
      },
      {
        buttonText: '何か思い出したら、必ず話す',
        branch: [
          { text: '……はい。お願いします。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
        ],
      },
    ],
    sortie: [
      {
        buttonText: '戦い方なら、分かる気がする',
        branch: [
          { text: 'え……？', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'surprised' }] },
          { text: '……分かりました。指示をください。ひとりで二体は、正直きついので。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
        ],
      },
      {
        buttonText: 'ひとりで行かせられない',
        branch: [
          { text: 'それはこっちの台詞です。せっかく目が覚めたのに。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] },
          { text: '……じゃあ、後ろから指示をください。それなら、いいです。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
        ],
      },
    ],
  },
};

export default scenario;
