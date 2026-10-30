import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/burnt_city.avif（焼けた街。煤けた石の家々と、空に開いた裂け目）
// - bg/burnt_forest.avif（焼けた森。黒い幹と灰の地面）
// - bg/forest_grove.avif（焼け残った木立。泉と古木、南の空に赤い裂け目）
const scenario: ScenarioFile = {
  id: '2-6',
  lines: [
    {
      text: '白焔の炎が細くなり、最後に、ひと山の白い灰になった。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/burnt_city.avif', transition: 'fade' }
      ]
    },
    {
      text: 'ベルミリアは大剣を下ろして、灰の山を見ていた。勝ったという顔ではなかった。'
    },
    {
      text: '……行くか。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ],
      choiceId: 'after'
    },
    {
      text: 'そのとき、うなじに熱い風が当たった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '南からの風だった。'
    },
    {
      text: '……季節が、替わる。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'surprised' }
      ]
    },
    {
      text: '空が鳴った。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgShake', duration: 800, intensity: 10 }
      ]
    },
    {
      text: '見上げると、裂け目の北の端がガラスにひびが走るように伸びはじめていた。さっきシルヴィが指さした通りの上を越えて、さらに北へ。'
    },
    {
      text: '亀裂の真下で、麦の穂の看板が店ごと崩れ落ちた。土煙と炎が裏手の積み石を覆い隠していく。'
    },
    {
      text: 'ベルミリアは何も言わなかった。腰の袋を、一度だけ押さえた。'
    },
    {
      text: '……刻みより、伸びるのが早い。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: '亀裂の先から、火の粉と一緒に魔物が次々に落ちてくる。南風にあおられて、炎が北へなびいた。'
    },
    {
      text: 'シルヴィの顔から色が消えた。'
    },
    {
      text: '森へ行く。',
      speaker: 'シルヴィ'
    },
    {
      text: '焦げた森を走った。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/burnt_forest.avif', transition: 'crossfade' },
        { type: 'bgMove', direction: 'bottomToTop', duration: 3000 }
      ]
    },
    {
      text: '頭の上を赤い亀裂が追い越していく。背中から吹く南風が、火の粉を前へ前へと運んでいった。'
    },
    {
      text: '木立が見えたときには、もう煙が上がっていた。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/forest_grove.avif', transition: 'fade' }
      ]
    },
    {
      text: '木立の南の端の木が何本も燃えている。落ちてきた魔物が泉のまわりを跳ね回り、そのたびに下草に火が移った。'
    },
    {
      text: 'ラピスが手をかざして、燃える木の前に氷の壁を張った。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '氷は炎に触れたそばから音を立てて溶けていく。張り直しても、張り直しても、追いつかなかった。'
    },
    {
      text: '……どうして……姉さんの氷なら、溶けないのに……',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: 'ラピスの声は炎の音にかき消された。'
    },
    {
      text: 'シルヴィは古木の前に立っていた。弓を下ろしたまま、燃えていく木立を見ていた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '……分かってたのよ。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'sad' }
      ]
    },
    {
      text: '刻みを見れば、分かってた。いつかこの日が来るって。',
      speaker: 'シルヴィ'
    },
    {
      text: 'シルヴィは一度だけ目を閉じた。それから古木を見上げた。',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: 'この木の実は、てっぺんにしか生らない。採ってくるわ。中の種があれば、どこか別の土地でもう一度育てられる。',
      speaker: 'シルヴィ'
    },
    {
      text: '登って、採って、降りてくるまで。……ここを持たせて。',
      speaker: 'シルヴィ',
      choiceId: 'seed'
    },
    {
      text: 'シルヴィは弓を背負うと、古木の幹に手をかけた。その姿が枝の茂みの中へ消えていく。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '炎の向こうでホムラモチの群れが跳ねている。その後ろから陽炎のような影がいくつも、泉のほうへ這い寄ってきた。'
    },
    {
      text: 'ベルミリアが、大剣を構え直した。'
    },
    {
      text: 'あいつが降りてくるまでだ。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: 'ラピスは溶けかけた氷の壁から手を離して、袖で額をぬぐった。'
    },
    {
      text: 'はい。……一本でも多く、残します。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
  ],
  choices: {
    after: [
      {
        buttonText: '終わったな',
        branch: [
          { text: '終わってない。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'normal' }] },
          { text: 'ベルミリアは、街の真ん中の空を顎で示した。亀裂は、さっきと何も変わらずに開いていた。' },
          { text: 'あいつを一匹斬ったって、裂け目は閉じない。……知ってたけどな。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'serious' }] },
        ],
      },
      {
        buttonText: 'お母さんに、伝えていくか',
        branch: [
          { text: 'ベルミリアは店の裏手へ回って、積み石の前にしばらく立っていた。' },
          { text: '……仇は取ったって言ったって、喜ぶ人じゃなかったけどな。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'smile' }] },
          { text: 'そんなことより、ちゃんと食べてるのかって、そっちを訊く人だった。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'normal' }] },
        ],
      },
    ],
    seed: [
      {
        buttonText: '任せろ',
        branch: [
          { text: '……ええ。', speaker: 'シルヴィ', commands: [{ type: 'char', id: 'sylvie', pose: 'normal' }] },
          { text: '頼んだわ。……通行料は、これで帳消しにしてあげる。', speaker: 'シルヴィ', commands: [{ type: 'char', id: 'sylvie', pose: 'smile' }] },
        ],
      },
      {
        buttonText: '木立は、もう残らないのか',
        branch: [
          { text: '残らないわ。この風が止むまでに、全部燃える。', speaker: 'シルヴィ', commands: [{ type: 'char', id: 'sylvie', pose: 'serious' }] },
          { text: 'だから種だけは持っていく。……一族に渡すのよ。', speaker: 'シルヴィ' },
        ],
      },
    ],
  },
};

export default scenario;
