import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/west_border.avif（帝都の西側の境界。白く霞む線の向こうに、凍った外周の街）※未作成
const scenario: ScenarioFile = {
  id: '3-5',
  lines: [
    {
      text: '雪原が静かになると、行列の人たちはおそるおそる籠を拾い集めた。割れた陽石はひとつもなかった。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/west_border.avif', transition: 'fade' }
      ]
    },
    {
      text: 'その日は境界から少し離れた丘の陰に火をおこして休んだ。'
    },
    {
      text: '翌朝、境界の前に立った。'
    },
    {
      text: '白く霞む線の向こうに、低い屋根が並んでいた。帝都の西の外町だった。屋根にも、通りにも、厚い氷がかぶさっていて、その奥はぼんやりとしか見えない。'
    },
    {
      text: '……西の門の、外側の通りです。',
      speaker: 'エーリク'
    },
    {
      text: 'エーリクが、氷の向こうの屋根のひとつを指さした。'
    },
    {
      text: 'あのとんがった屋根の隣がうちの店です。女房と息子は、あの日店にいました。',
      speaker: 'エーリク'
    },
    {
      text: 'ソレイユの指示で境界の線の手前に陽石が十二個、輪の形に並べられた。陣から運んできた石の、ほんのひと握りだった。'
    },
    {
      text: '陣の人たちは少し離れた雪の上で、息をひそめて見ていた。'
    },
    {
      text: 'ステラは輪から少し離れたところに立って、杖を北の空へ向けていた。昼の空にも、杖の先から細い光の糸が伸びている。',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '糸の先は帝都の空の、見えない星に結ばれていた。'
    },
    {
      text: '……つないだ。帝都の星、いまは止まってる。',
      speaker: 'ステラ'
    },
    {
      text: 'いいよ、ソレイユ。',
      speaker: 'ステラ'
    },
    {
      text: 'ソレイユは輪のまんなかに立って、目を閉じた。両手を境界へ向ける。',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: '十二の陽石が、いっせいに光った。'
    },
    {
      text: '熱い風が、背中から境界へ吹き抜けていく。足もとの雪が、みるみる水に変わった。耳もとで、風がごうごうと鳴った。'
    },
    {
      text: '白く霞む線がゆらいだ。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgShake', duration: 600, intensity: 6 }
      ]
    },
    {
      text: '霞が一歩ぶん、向こうへ退いた。'
    },
    {
      text: 'もう一歩。さらにもう一歩。線のあった場所の雪が溶けて、土が見えた。'
    },
    {
      text: '後ろで誰かが声を上げた。それがすぐに歓声に変わった。'
    },
    {
      text: '退いた霞の向こうで、通りを覆っていた氷が薄くなっていた。'
    },
    {
      text: '氷の中に人がいた。'
    },
    {
      text: '通りいっぱいに人が立っていた。荷物を抱えた人、子どもの手を引いた人、戸口から半分だけ体を出した人。'
    },
    {
      text: '誰もが、同じほうを見上げていた。帝都の真ん中の空を。あの日、そこに開いた裂け目を見上げたまま、止まっていた。'
    },
    {
      text: '……生きてる、みたいだ。',
      speaker: '陣の男'
    },
    {
      text: 'エーリクが、雪の上を駆けだした。'
    },
    {
      text: 'あいつだ……！ あの、鍵を下げてる……！',
      speaker: 'エーリク'
    },
    {
      text: 'とんがった屋根の隣の戸口の前に、小さな男の子が立っていた。首から紐で何かを下げて、母親の上着のすそを握って、やはり空を見上げていた。'
    },
    {
      text: 'ベルミリアが、エーリクの腕をつかんで引き止めた。',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: 'それ以上行くな。まだ凍ってる。',
      speaker: 'ベルミリア'
    },
    {
      text: 'そのとき、胸もとに刺すような冷たさが走った。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ブローチだった。霜が細かい音を立ててひび割れていく。ひびの下から、銀の地がわずかに透けて見えた。'
    },
    {
      text: '指揮官、ブローチが……霜が……！',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: 'ラピスはブローチに指先を当てた。それから何かに引かれるように、退いていく霞のほうへ手を伸ばした。'
    },
    {
      text: '霞のきわに触れた指先に、霜が走った。ラピスは手を引かなかった。'
    },
    {
      text: '……同じ。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: 'この霜と、境界の氷……同じです。姉さんの氷です。',
      speaker: 'ラピス'
    },
    {
      text: '小さいころから、ずっとそばで見てきた氷です。間違えるはずありません。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: 'ラピスの指先で、霞が震えていた。溶かされたぶんを、内側から押し戻そうとするように。'
    },
    {
      text: '押し返してる……。姉さん、いま、中で溶かされたところを張り直してる。',
      speaker: 'ラピス'
    },
    {
      text: 'ブローチの霜のひびが、また一本増えた。'
    },
    {
      text: '……こんなの、無理してる。魔法の氷が溶けるのは、かけた人が……',
      speaker: 'ラピス'
    },
    {
      text: '揺れた！',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'surprised', bounce: true }
      ]
    },
    {
      text: 'ステラが叫んだ。杖の先から伸びた光の糸が、北の空で大きくたわんでいる。'
    },
    {
      text: '帝都の星が揺れた！ ソレイユ、止めて！',
      speaker: 'ステラ'
    },
    {
      text: '輪のまんなかで、ソレイユは目を閉じたまま、両手を境界へ向けていた。陽石の鳴る音と熱い風が、声をかき消していた。',
      commands: [
        { type: 'charDelete' }
      ],
      choiceId: 'stop'
    },
    {
      text: 'ステラが杖を振り下ろした。'
    },
    {
      text: '空から小さな光がひとつ落ちてきた。'
    },
    {
      text: '光は陽石の輪のまんなか、ソレイユの足もとから三歩離れた雪の上に落ちた。雪と土が弾けて、並んでいた陽石が四方へはじき飛ばされた。',
      commands: [
        { type: 'bgShake', duration: 800, intensity: 10 }
      ]
    },
    {
      text: '石の光が、ふっと消えた。熱い風が止んだ。'
    },
    {
      text: 'ソレイユは、雪の上に尻もちをついて、目を見開いていた。けがはなかった。'
    },
    {
      text: '退いていた霞が、戻ってきた。'
    },
    {
      text: '一歩、また一歩。溶けて土の見えていた地面に、白い霜が這い戻る。通りを覆う氷が、また厚くなっていく。'
    },
    {
      text: '待って……待ってくれ、まだ……！',
      speaker: 'エーリク'
    },
    {
      text: 'エーリクの目の前で、鍵を下げた男の子の姿が、白い氷の向こうに沈んでいった。'
    },
    {
      text: '霞が元の線まで戻ったとき、ブローチの霜も、ひびのない白に戻っていた。北の空で、ステラの糸はまっすぐに張りなおしていた。'
    },
    {
      text: '何をするんだ！ 溶けてたじゃないか！',
      speaker: '陣の男'
    },
    {
      text: 'あと少しだったのに！ あの魔女が……！',
      speaker: '陣の女'
    },
    {
      text: '後ろで、声がいくつも上がった。ステラは杖を握ったまま、声のほうへ向き直った。',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '……ごめん。でも、星が動いたの。',
      speaker: 'ステラ'
    },
    {
      text: '止まってた帝都の星が、溶かしたぶんだけ揺れた。あのまま続けてたら、もっと揺れてた。',
      speaker: 'ステラ'
    },
    {
      text: '落としたのは、私。怒るなら、私に怒って。',
      speaker: 'ステラ'
    },
    {
      text: 'ソレイユが、雪の上からステラを見上げていた。何も言わずに、小さくうなずいた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ラピスはこちらの胸もとのブローチを、両手で包むように握っていた。手が震えていた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '……姉さん。',
      speaker: 'ラピス'
    },
    {
      text: '声は小さかった。けれど、すぐ隣にいたベルミリアには聞こえていた。'
    },
    {
      text: '……ラピス。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: 'あんたの姉さんってのは、誰だ。',
      speaker: 'ベルミリア'
    },
    {
      text: 'ラピスが顔を上げた。口を開きかけたとき、足もとの雪がぐらりと揺れた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' },
        { type: 'bgShake', duration: 800, intensity: 10 }
      ]
    },
    {
      text: '境界の霞のきわで、雪がいくつも盛り上がっていく。さっきまで溶けていたところだった。空には、霜をまとった鳥の影が集まりはじめていた。'
    },
    {
      text: '氷がゆるんだところに、寄ってきてる……！',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: '陣の人たちを下げて！ エーリクさんも！',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: 'ラピスは、ブローチから手を離した。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '……あとで、全部話します。',
      speaker: 'ラピス'
    },
    {
      text: '行きましょう、指揮官。',
      speaker: 'ラピス'
    },
  ],
  choices: {
    stop: [
      {
        buttonText: 'ステラ、止めろ！',
        branch: [
          { text: 'ステラがこちらを見た。ほんの一瞬だけ、迷うような顔をした。', commands: [{ type: 'char', id: 'stella', pose: 'serious' }] },
          { text: '……当てない。ソレイユには、絶対。', speaker: 'ステラ' },
        ],
      },
      {
        buttonText: 'ソレイユに駆け寄る',
        branch: [
          { text: '輪に駆け寄ろうとした。熱い風に押し返されて、三歩も進めなかった。' },
          { text: '背中でステラの声がした。' },
          { text: 'どいて！ ……当てないから！', speaker: 'ステラ', commands: [{ type: 'char', id: 'stella', pose: 'serious', bounce: true }] },
        ],
      },
    ],
  },
};

export default scenario;
