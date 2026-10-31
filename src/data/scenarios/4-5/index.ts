import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/frozen_avenue.avif（西の門から中央へ続く凍った大通り。避難の列が止まっている。遠くに中央の尖塔）
// - bg/frozen_tower.avif（中央区画の手前の鐘楼の上。眼下に凍った屋根、空の真ん中に凍った裂け目と星がひとつ）
// 立ち絵:
// - automaton（ロボ娘。名前「ネーヴェ」は仮）
const scenario: ScenarioFile = {
  id: '4-5',
  lines: [
    {
      text: '屋根の上の影が散ると、ラピスはようやく霜から手を離した。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/frozen_avenue.avif', transition: 'fade' }
      ]
    },
    {
      text: '獣の殻のひびは、重ねた霜の下で止まっていた。ラピスは指先に息を吹きかけて、しばらく手を握ったり開いたりしていた。'
    },
    {
      text: '大通りの先に鐘楼が立っていた。中央区画の手前のいちばん高い建物だった。'
    },
    {
      text: 'ねえ、あそこ、のぼれる？',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'normal' }
      ]
    },
    {
      text: 'ステラは、鐘楼のてっぺんを見上げていた。'
    },
    {
      text: '中に入ってからずっと空が白いの。霞の上に出たら見えるかもしれない。',
      speaker: 'ステラ'
    },
    {
      text: '階段がせまいので、ソレイユさんから十歩離れられません。わたしは、下で待ちます。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: 'ネーヴェは、シャツのボタンを外したままだった。クラリスが、抱えていた上着と手袋をネーヴェに返した。'
    },
    {
      text: '鐘楼の階段は凍った鐘番の脇をすり抜けて、上へ続いていた。ソレイユを真ん中にして、ひとかたまりになってのぼった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'てっぺんに出ると、霞は足もとにあった。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/frozen_tower.avif', transition: 'fade' }
      ]
    },
    {
      text: '白い霞の海の中から、凍った屋根や尖塔の先が島のように突き出している。その上に、空があった。'
    },
    {
      text: '空の真ん中に、裂け目が凍っていた。'
    },
    {
      text: '大きく口を開けた裂け目のふちに厚い氷が張りついている。裂け目の奥は暗く、氷の縁だけが昼の光を返して光っていた。'
    },
    {
      text: 'その真上に、昼の空なのに星がひとつ出ていた。'
    },
    {
      text: '……見えた。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'surprised' }
      ]
    },
    {
      text: 'ステラは帽子のつばを持ち上げて、まっすぐ上を見ていた。'
    },
    {
      text: '帝都の星。中からだとこんなに近いんだ。真上にある。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'smile' }
      ]
    },
    {
      text: 'それからこちらを振り返った。'
    },
    {
      text: '前に聞いたよね。中で空は見えたか、星は出てたかって。',
      speaker: 'ステラ'
    },
    {
      text: '出てたよ。……自分で確かめちゃった。',
      speaker: 'ステラ'
    },
    {
      text: 'ステラは笑って、それからすぐに真顔に戻った。杖の先から細い光の糸を伸ばして星へ結ぶ。',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '糸の先で星がゆっくりと揺れていた。'
    },
    {
      text: '……揺れてる。隙間の前で見たときより大きい。',
      speaker: 'ステラ'
    },
    {
      text: 'シルヴィがステラの隣に立って、腕をまっすぐ空へ伸ばした。親指の先を星に重ねて目を細める。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: '隙間の前では指の幅の半分も動いてなかった。今は指一本ぶん。',
      speaker: 'シルヴィ'
    },
    {
      text: '焼けた街の裂け目も、季節が替わるたびにこうして広がっていったわ。',
      speaker: 'シルヴィ'
    },
    {
      text: '胸もとが冷たくなった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ブローチの霜に細いひびが一本増えていた。音もしなかった。'
    },
    {
      text: 'ラピスがそれを見て、唇をかんだ。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '隙間が開いてからずっとです。外の氷がゆるんだぶん、真ん中の氷にも響いてる。',
      speaker: 'ラピス'
    },
    {
      text: '……姉さんの氷、もう長くもちません。',
      speaker: 'ラピス'
    },
    {
      text: '誰も、すぐには口を開かなかった。'
    },
    {
      text: 'このまま、待つことはできぬのですか。',
      speaker: 'オボロ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: '待っても、隙間は閉じないわ。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'normal' }
      ]
    },
    {
      text: '待ってたら、いつか氷が勝手に崩れます。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'そのとき、ここの人たちは凍ったままです。外の人たちは、何も知らないまま。……焼けた街と、同じになります。',
      speaker: 'ラピス'
    },
    {
      text: 'ラピスは、霞の下の屋根を見下ろした。それからベルミリアのほうを向いた。'
    },
    {
      text: 'ベルミリア。さっきの答えです。',
      speaker: 'ラピス'
    },
    {
      text: '姉さんが氷を解いたら、出てきます。真ん中の裂け目から。',
      speaker: 'ラピス'
    },
    {
      text: 'だから、開くときは私たちで決めます。',
      speaker: 'ラピス'
    },
    {
      text: '止めるのは、もう姉さんがやってくれました。今度は、閉じに行きます。',
      speaker: 'ラピス'
    },
    {
      text: 'ベルミリアは腕を組んで、裂け目を見上げていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '……閉じに行く、か。',
      speaker: 'ベルミリア'
    },
    {
      text: 'あの夜の帝都には、閉じに行ける兵がいませんでした。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'sad' }
      ]
    },
    {
      text: '殿下と指揮官殿は、東から兵が戻るまでの時を稼ぐおつもりでした。……戻った者は、ございません。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'sad' }
      ]
    },
    {
      text: '今はいるだろ。ここに。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: 'ベルミリアは、鐘楼の上の顔ぶれを見回した。それからステラの杖の先で揺れている光の糸を見た。'
    },
    {
      text: '……うん。',
      speaker: 'ステラ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '今度は、ちゃんと狙う。誰もいないところに。',
      speaker: 'ステラ'
    },
    {
      text: 'ラピスが、こちらを見た。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '指揮官は、どう思いますか。',
      speaker: 'ラピス',
      choiceId: 'decide'
    },
    {
      text: '階段の下から硬い足音がのぼってきた。ネーヴェが、鐘楼のてっぺんに顔を出した。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: '報告します。階段の下からソレイユさんの熱を感知できなくなりました。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'ネーヴェは上着のボタンを上までとめたまま、ソレイユのすぐそばに立っていた。襟もとから細い煙がひとすじ上がっているだけだった。'
    },
    {
      text: 'ソレイユが、自分の手のひらを見下ろした。',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: '……私の陽が、減っているのですね。',
      speaker: 'ソレイユ'
    },
    {
      text: '歩くのにも、殿下のまわりを柔らかくするのにも陽が要ります。中央へ行くのなら、今しかありません。',
      speaker: 'ソレイユ'
    },
    {
      text: 'そのとき、足もとの霞の底で氷の割れる音がした。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgShake', duration: 400, intensity: 4 }
      ]
    },
    {
      text: 'ステラの糸の先で星がぐらりと揺れた。'
    },
    {
      text: 'それに合わせるように、鐘楼の下の広場で黒い殻の獣がいくつも首をもたげた。氷の中で、星が揺れるたびに少しずつ身をよじっている。'
    },
    {
      text: '星が揺れると氷もゆるむんだ……！',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'surprised' }
      ]
    },
    {
      text: '広場を抜けないと中央には行けません。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: '降りましょう、指揮官。',
      speaker: 'ラピス',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'serious', bounce: true }
      ]
    }
  ],
  choices: {
    decide: [
      {
        buttonText: '開く時は、こちらで選ぼう',
        branch: [
          { text: 'ラピスは、ゆっくりうなずいた。', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
          { text: '……はい。', speaker: 'ラピス' },
          { text: 'オボロだけが、うなずかずにこちらを見ていた。', commands: [{ type: 'char', id: 'oboro', pose: 'normal' }] },
        ],
        points: { lapisTrust: 1 },
      },
      {
        buttonText: 'ラピスが決めていい',
        branch: [
          { text: 'ラピスは、首を横に振った。', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
          { text: '……ずるいです。', speaker: 'ラピス' },
          { text: '凍らせるのは、指揮官と姉さんで決めたんでしょう。だったら解くのは、指揮官と私で決めてください。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
          { text: 'オボロだけが、うなずかずにこちらを見ていた。', commands: [{ type: 'char', id: 'oboro', pose: 'normal' }] },
        ],
        points: { lapisTrust: 1 },
      },
    ],
  },
};

export default scenario;
