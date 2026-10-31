import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/south_road.avif（雪が途切れた南の街道。宿場の跡もここで代用）
// - bg/burnt_forest.avif（焼けた森。黒い幹と灰の地面）
const scenario: ScenarioFile = {
  id: '2-3',
  lines: [
    {
      text: '夜が明けても、宿場の家は一軒も焼けていなかった。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/south_road.avif', transition: 'fade' }
      ]
    },
    {
      text: 'ベルミリアは開けっ放しだった戸をひとつずつ閉めて回ってから、何も言わずに街道へ出た。'
    },
    {
      text: '昼前、街道は森に入った。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/burnt_forest.avif', transition: 'fade' },
        { type: 'wait', ms: 800 }
      ]
    },
    {
      text: '黒く焦げた幹が、葉を一枚もつけずに立ち並んでいる。地面は灰で白く、歩くたびに足もとから舞い上がった。'
    },
    {
      text: '雪みたい……でも、あったかい。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: 'ここらはエルフの森だった。街道の商人は、エルフに通行料を払って森を抜けてたんだ。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: 'ひゅっ、と風を切る音がして、ラピスのつま先の前に矢が突き立った。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgShake', duration: 200, intensity: 3 }
      ]
    },
    {
      text: '止まって。',
      speaker: '？？？'
    },
    {
      text: '焦げた幹の上に、弓を構えた少女が立っていた。耳の先が、細く尖っている。'
    },
    {
      text: 'ここから先は森よ。通るなら、通行料を払ってもらうわ。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: 'まだ取ってるのか、シルヴィ。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: '森がある限りはね。……あなたが人を連れてるなんて、珍しい。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'normal' }
      ]
    },
    {
      text: '客だ。森の向こうまで送る。',
      speaker: 'ベルミリア'
    },
    {
      text: 'あの、通行料って、いくらですか。私たち、お金はあんまり……',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: 'お金は要らないわ。使う店が、もうないもの。',
      speaker: 'シルヴィ'
    },
    {
      text: 'シルヴィは幹から飛び降りると、灰の地面のあちこちを指さした。細い煙が、何本も立ちのぼっている。'
    },
    {
      text: 'ゆうべ、ホムラモチの群れが通ったの。火は消えたけど、根がまだ地面の下でくすぶってる。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: '根まで燃えたら、その木はもう戻らない。消すのを手伝って。それが通行料よ。',
      speaker: 'シルヴィ'
    },
    {
      text: 'ラピスは煙の上にしゃがんで、手をかざした。灰の上に薄い氷が張って、煙がふっと途切れる。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '……氷の魔法。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'surprised' }
      ]
    },
    {
      text: 'シルヴィは氷のふちに指先で触れて、首をかしげた。'
    },
    {
      text: 'この氷、溶けるのが遅いわね。灰の上なのに。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'normal' }
      ]
    },
    {
      text: '姉に、教わったんです。姉のほうが、ずっと上手でしたけど。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: 'それから半刻ほど、四人で煙を探して歩いた。ラピスが氷を張り、シルヴィがまだ生きている根を見分け、ベルミリアは大剣の鞘で灰をかき分けた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '最後の煙を消したところで、ラピスが一本の大きな幹の前で足を止めた。'
    },
    {
      text: '焦げた樹皮の上に、横向きの傷がいくつも刻まれている。上のほうの傷は短く、下へいくほど長かった。'
    },
    {
      text: 'シルヴィさん、これは……？',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '裂け目の大きさよ。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'normal' }
      ]
    },
    {
      text: '季節が替わるたびに、この木のてっぺんに登って、南の空の裂け目を測るの。弓を目の前にかざして、何本分の長さかって。',
      speaker: 'シルヴィ'
    },
    {
      text: 'いちばん上の傷が、裂け目が開いた最初の春。あのころは、街の真ん中に井戸くらいの穴があいてるだけだったそうよ。',
      speaker: 'シルヴィ'
    },
    {
      text: 'シルヴィの指が、傷をひとつずつ下へたどっていく。いちばん下の傷は、幹の幅をほとんど横切っていた。'
    },
    {
      text: '……伸び方が、だんだん大きくなってる。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'ええ。この伸び方なら、次の季節替わりで、焼けた街の北の端まで呑むわ。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: '鞘で灰をかいていたベルミリアの手が、止まった。'
    },
    {
      text: '北の端、か。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: 'その次は、この森よ。',
      speaker: 'シルヴィ',
      choiceId: 'marks'
    },
    {
      text: 'そのとき、シルヴィの耳が、ぴくりと動いた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '森の奥で、赤い光がちらついた。焦げた幹のあいだを、火の玉のようなものが跳ねながら北へ進んでくる。'
    },
    {
      text: 'ホムラモチ……！ ゆうべの群れの、残りでしょうか。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: 'あっちは、まだ焼けてないほうなのに。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: 'シルヴィは弓をつかむと、もう走り出していた。ラピスがすぐあとを追う。'
    },
    {
      text: '待ってください！ 通行料、まだ払い終わってませんから！',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious', bounce: true }
      ]
    },
    {
      text: '……ああいうのに付き合うと、ろくなことがないんだがな。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: 'ベルミリアはそう言いながら、大剣を抜いていた。'
    },
    {
      text: '根を踏ませないで。それだけでいいわ。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
  ],
  choices: {
    marks: [
      {
        buttonText: '止める方法は、ないのか',
        branch: [
          { text: '知ってる人がいるなら、私が会いたいわ。', speaker: 'シルヴィ', commands: [{ type: 'char', id: 'sylvie', pose: 'normal' }] },
          { text: '一族のみんなは、西の山へ移った。私は、ここで測ることしかできてない。', speaker: 'シルヴィ', commands: [{ type: 'char', id: 'sylvie', pose: 'sad' }] },
        ],
      },
      {
        buttonText: '帝都の裂け目も、こうなのか',
        branch: [
          { text: '帝都？ 凍ってからは、魔物が一匹も出てこないって聞いたけど。', speaker: 'シルヴィ', commands: [{ type: 'char', id: 'sylvie', pose: 'normal' }] },
          { text: '大きくなってるかどうかは、分からないわ。氷の中は、測りようがないもの。', speaker: 'シルヴィ' },
          { text: 'ラピスは、北の空を振り返った。焦げた幹の向こうに、帝都は見えなかった。', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
        ],
      },
    ],
  },
};

export default scenario;
