import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/camp_border.avif（野営地と、地平線の凍った帝都）
// - bg/camp_tent.avif（テントの中）
const scenario: ScenarioFile = {
  id: '1-5',
  lines: [
    {
      text: 'ロザリーは並べたランタンをひとつずつ確かめるように、指先でそっと撫でた。どれも倒れていなかった。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/camp_border.avif', transition: 'fade' },
        { type: 'char', id: 'rosalie', pose: 'normal' }
      ]
    },
    {
      text: 'ありがとうございます。おかげで今夜も灯りを置けました。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'smile' }
      ]
    },
    {
      text: 'もう。無茶はしないでください。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: 'ええ。明日もそうします。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'smile' }
      ]
    },
    {
      text: 'クラリスは何か言いかけて、あきらめたように肩を落とした。'
    },
    {
      text: '境界の白い霞の手前で、ランタンの火が一列に並んで揺れていた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'その夜。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/camp_tent.avif', transition: 'fade' },
        { type: 'wait', ms: 800 }
      ]
    },
    {
      text: 'あてがわれたテントで火の番をしていると、入口の布が揺れた。'
    },
    {
      text: '……指揮官。起きてますか。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: 'さっきのブローチ、もう一度見せてもらえますか。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '手のひらに載せて差し出すと、ラピスは両手で包むように受け取った。'
    },
    {
      text: '……やっぱりそうだ。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: 'これ、姉のものです。',
      speaker: 'ラピス'
    },
    {
      text: '姉がいつも、襟につけていました。母の形見なんです。裏に小さな傷があって……ほら。',
      speaker: 'ラピス'
    },
    {
      text: 'ラピスが裏返したブローチの留め金のそばに、細い引っかき傷があった。'
    },
    {
      text: '私が小さいころに、落として付けた傷です。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ],
      choiceId: 'brooch'
    },
    {
      text: 'それに、大事なのはブローチそのものじゃないんです。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'この霜です。',
      speaker: 'ラピス'
    },
    {
      text: '私も氷の魔法を使うので、分かります。魔法でつくった氷は、火にかざしてもなかなか溶けません。',
      speaker: 'ラピス'
    },
    {
      text: '姉くらいの術者の氷なら、火では少しも溶けません。溶けるのは、かけた人が解いたときか死んだときだけです。',
      speaker: 'ラピス'
    },
    {
      text: 'ラピスの指先が、霜の上で止まった。'
    },
    {
      text: 'これは、姉の氷です。',
      speaker: 'ラピス'
    },
    {
      text: '……まだ、溶けていません。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '姉は、生きてます。',
      speaker: 'ラピス'
    },
    {
      text: '言い終わる前に、ラピスの目から涙がこぼれた。'
    },
    {
      text: '……ずっと、分からなかったんです。待っても待っても、何も分からなくて。',
      speaker: 'ラピス'
    },
    {
      text: '生きてるって、信じてるつもりでした。でも本当は、もう、って思う夜もあって……',
      speaker: 'ラピス',
      choiceId: 'tears'
    },
    {
      text: 'ラピスは袖で目をこすって、ブローチをこちらの手に戻した。'
    },
    {
      text: '溶けない氷、という言葉が頭のどこかに引っかかっていた。テントの外の、境界の氷のことだった。'
    },
    {
      text: '……境界の氷のこと、考えました？',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '私も、最初に考えました。でも、違います。帝都ほどの広さを凍らせる魔法なんて、誰にも使えません。姉にも、帝国のどの魔法使いにも。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '境界の氷は裂け目が起こしたものだろうって言う人もいます。',
      speaker: 'ラピス'
    },
    {
      text: 'どうしてあなたが持っていたのかは、分かりません。でも、あなたは中で姉に会っています。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '思い出したら、いちばんに教えてくださいね。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: 'そのとき、野営地のどこかで鐘が激しく打ち鳴らされた。',
      commands: [
        { type: 'bgShake', duration: 400, intensity: 6 }
      ]
    },
    {
      text: '指揮官、ラピスさん！ 起きてください！',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised', bounce: true }
      ]
    },
    {
      text: '南から魔物です。白い炎をまとった、大きなのが……白焔です！',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: 'テントの外に出ると、夜空の南の端が白く明るんでいた。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/camp_border.avif', transition: 'crossfade' }
      ]
    },
    {
      text: '炎だった。色の抜けた白い炎が、雪原を焼きながらこちらへ近づいてくる。通ったあとの雪が音を立てて溶けていく。'
    },
    {
      text: '騎士団の人たちが、避難民をテントの北へ逃がしている。その中からアルマがこちらへ駆けてきた。'
    },
    {
      text: '野営地の南の端で食い止めます。あれを、テントに近づけるわけにはいきません。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: '……境界にも。',
      speaker: 'アルマ'
    },
    {
      text: 'アルマは一瞬だけ言葉を切って、こちらをまっすぐに見た。'
    },
    {
      text: '指揮官。指揮をお願いできますか。',
      speaker: 'アルマ'
    },
    {
      text: '隊長！？',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised' }
      ]
    },
    {
      text: '今日の見回りの報告は聞いています。この場でいちばんうまく隊を動かせるのは、この人です。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ],
      choiceId: 'command'
    },
    {
      text: 'ラピスが、ブローチを握ったこちらの手に自分の手を重ねた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '姉が生きてるなら、私はこんなところで負けられません。',
      speaker: 'ラピス'
    },
    {
      text: '行きましょう、指揮官！',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious', bounce: true }
      ]
    },
  ],
  choices: {
    brooch: [
      {
        buttonText: 'さっきは、どうして黙っていた？',
        branch: [
          { text: '……あの場で言ったら、姉が誰なのか訊かれます。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
          { text: '姉のことは、あまり人に話したくないんです。……ごめんなさい。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
        ],
      },
      {
        buttonText: '姉さんのものなら、君が持つべきだ',
        points: { lapisTrust: 1 },
        branch: [
          { text: '……いいえ。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] },
          { text: '姉は、これをあなたに持たせたんだと思います。だから、あなたが持っていてください。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
        ],
      },
    ],
    tears: [
      {
        buttonText: '黙ってそばにいる',
        points: { lapisTrust: 1 },
        branch: [
          { text: 'ラピスはしばらく、ブローチを胸に抱えたまま泣いていた。' },
          { text: '……ありがとうございます。何も言わないでいてくれて。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
        ],
      },
      {
        buttonText: 'よく、待っていたな',
        branch: [
          { text: '……はい。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
          { text: '待っててよかった。……本当に、よかった。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
        ],
      },
    ],
    command: [
      {
        buttonText: '任せてくれ',
        branch: [
          { text: '……はい。', speaker: 'アルマ', commands: [{ type: 'char', id: 'alma', pose: 'smile' }] },
          { text: 'ご命令を、指揮官。', speaker: 'アルマ' },
        ],
      },
      {
        buttonText: '自分でいいのか？',
        branch: [
          { text: 'あなたがいいんです。', speaker: 'アルマ', commands: [{ type: 'char', id: 'alma', pose: 'serious' }] },
          { text: 'ご命令を、指揮官。', speaker: 'アルマ', commands: [{ type: 'char', id: 'alma', pose: 'smile' }] },
        ],
      },
    ],
  },
};

export default scenario;
