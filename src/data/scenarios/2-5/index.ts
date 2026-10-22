import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/forest_grove.avif（焼け残った木立。泉と古木、南の空に赤い裂け目）※未作成
// - bg/burnt_city.avif（焼けた街。煤けた石の家々と、空に開いた裂け目）※未作成
const scenario: ScenarioFile = {
  id: '2-5',
  lines: [
    {
      text: '最後の影が泉のふちで消えたのは、空が白みはじめたころだった。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/forest_grove.avif', transition: 'fade' }
      ]
    },
    {
      text: '焚き火のそばに戻ると、ベルミリアの寝ていた場所には、踏まれた草しか残っていなかった。'
    },
    {
      text: '……行っちゃったんですね。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '戦いが終わるのを待って、南へ出たわ。止めなかったわよ。止まる人じゃないもの。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'normal' }
      ]
    },
    {
      text: 'シルヴィは弓を背負うと、泉の水で顔を洗った。'
    },
    {
      text: '私も街へ行くわ。季節が替わる前に、裂け目の北の端を真下から見ておきたかったの。',
      speaker: 'シルヴィ'
    },
    {
      text: '……ついてくるなら、止めないけど。',
      speaker: 'シルヴィ',
      choiceId: 'follow'
    },
    {
      text: '森を抜けると、焼けた街が広がっていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/burnt_city.avif', transition: 'fade' },
        { type: 'wait', ms: 800 }
      ]
    },
    {
      text: '石の家々は、どれも煤で黒く染まっていた。溶けて垂れたまま固まった壁もある。'
    },
    {
      text: '北の門をくぐると、門の内側に、槍が何本も立てかけられたままになっていた。どれも穂先が溶けて、ねじれていた。'
    },
    {
      text: '街の真ん中の空に、裂け目が開いていた。'
    },
    {
      text: '真下から見上げると、空そのものが裂けて、奥で炎が渦を巻いているように見えた。ときどき亀裂の奥から何かが落ちてきて、街のどこかで地響きが鳴る。',
      commands: [
        { type: 'bgShake', duration: 300, intensity: 4 }
      ]
    },
    {
      text: 'シルヴィは弓を目の前にかざして、亀裂の北の端を測った。それから、通りの先を指さした。'
    },
    {
      text: 'あのあたりね。次の季節替わりで、呑まれるのは。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: '指の先の二本向こうの通りの角で、ベルミリアが小さな店の前にしゃがんでいた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '煤けた看板は麦の穂の形に切り抜かれていた。崩れた店の奥に、大きな窯が見える。'
    },
    {
      text: '……来るなって、言っただろ。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: 'ベルミリアの手の中に、布にくるんだ小さな鉄の道具があった。柄の先に、麦の穂の模様が彫ってある。'
    },
    {
      text: 'パンに押す焼き印だ。うちの店の。',
      speaker: 'ベルミリア'
    },
    {
      text: '裂け目がここまで来る前に、これだけは持って出たかった。',
      speaker: 'ベルミリア'
    },
    {
      text: '店の裏手に石が小さく積んであった。花の代わりに乾いた麦の束がひとつ、立てかけてある。'
    },
    {
      text: 'ラピスがそれを見ているのに気づいて、ベルミリアは焼き印を布で包み直した。'
    },
    {
      text: '母さんだ。……さすがに、こっちは連れていけない。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'sad' }
      ]
    },
    {
      text: '宿場のあの紙な。ここにも届いてた。街の連中は、半分くらいは北へ逃げた。',
      speaker: 'ベルミリア'
    },
    {
      text: '母さんは逃げなかった。門を守ってる衛兵に持たせるパンを、最後の日まで焼いてたらしい。',
      speaker: 'ベルミリア'
    },
    {
      text: '私はそのとき、北で仕事をしてた。戻ってきたら、こうなってた。',
      speaker: 'ベルミリア'
    },
    {
      text: '……そのあとで、帝国の兵隊が来た。街じゃなくて、森にな。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '街はもう、助けようがなかった。だから燃え広がらないように森を切った。正しいよ。私が隊長でも、そうする。',
      speaker: 'ベルミリア'
    },
    {
      text: 'ベルミリアは、最後まで平らな声のまま言った。焼き印を包んだ布を握る手だけが、白くなっていた。',
      choiceId: 'grave'
    },
    {
      text: '……帝都にも、これが開いたんですよね。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '同じものだと思うわ。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'normal' }
      ]
    },
    {
      text: '帝都が凍ってなかったら……帝都も、こうなってたんですか。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '誰も、すぐには答えなかった。'
    },
    {
      text: 'こうなってた。もっとひどくな。帝都には、ここの何十倍も人がいる。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '裂け目のそばから、焼けた街が北へ、森へ、宿場へ……野営地のほうまで、たぶん。',
      speaker: 'ベルミリア'
    },
    {
      text: 'ずっと、帝都の連中は運がいいと思ってた。凍って、止まって、こんなふうにならずに済んで。',
      speaker: 'ベルミリア'
    },
    {
      text: '……運で凍ったのか、誰かがそうしたのか、知らないけどな。',
      speaker: 'ベルミリア'
    },
    {
      text: 'こちらの胸もとで、ブローチの霜が冷たかった。この街の熱い風の中でも、少しも溶けていなかった。'
    },
    {
      text: '……聖女さまは、帝都を溶かそうとしてるのよね。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: '溶かしたら、どうなるの。',
      speaker: 'シルヴィ'
    },
    {
      text: 'ラピスは口を開きかけて、閉じた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '……分かりません。',
      speaker: 'ラピス'
    },
    {
      text: 'でも、姉に、会いたいんです。',
      speaker: 'ラピス',
      choiceId: 'melt'
    },
    {
      text: 'なら、溶かす前に確かめろ。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: 'ベルミリアは焼き印を腰の袋にしまうと、大剣の柄に手をかけた。'
    },
    {
      text: '聖女の陣まで、付き合ってやる。帝都がこうなるかどうかは、私にも関係がある。……賞金は出ないけどな。',
      speaker: 'ベルミリア'
    },
    {
      text: 'そのとき、通りの先で、白い炎が立ちのぼった。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgShake', duration: 500, intensity: 8 }
      ]
    },
    {
      text: '炎の中に、人の背丈の倍ほどもある影が揺れている。野営地を襲ったものと同じ、白焔だった。'
    },
    {
      text: '……あいつだ。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: 'この街を焼いたやつだ。ずっと、裂け目の真下から離れない。墓参りに来るたびに、こいつをよけて帰ってた。',
      speaker: 'ベルミリア'
    },
    {
      text: '白焔の炎が、店の並ぶ通りをこちらへなめてくる。積んだ石の上の麦の束が、熱風にあおられて揺れた。'
    },
    {
      text: '今日は、よけなくていいです。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '……ああ。',
      speaker: 'ベルミリア'
    },
  ],
  choices: {
    follow: [
      {
        buttonText: '一緒に行く',
        branch: [
          { text: 'でしょうね。その子の顔を見れば分かるわ。', speaker: 'シルヴィ', commands: [{ type: 'char', id: 'sylvie', pose: 'normal' }] },
          { text: 'はい。……放っておけません。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
        ],
      },
      {
        buttonText: 'ベルミリアは、何を取りに行ったんだ',
        branch: [
          { text: '知らないわ。季節が替わるたびに街へ行って、何も持たずに帰ってくる人だもの。', speaker: 'シルヴィ', commands: [{ type: 'char', id: 'sylvie', pose: 'normal' }] },
          { text: '……今度は、何か持って帰るつもりなのかもしれないわね。', speaker: 'シルヴィ', commands: [{ type: 'char', id: 'sylvie', pose: 'serious' }] },
          { text: '行きましょう、指揮官。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
        ],
      },
    ],
    grave: [
      {
        buttonText: '石の前で頭を下げる',
        points: { lapisTrust: 1 },
        branch: [
          { text: '積まれた石の前に立って、頭を下げた。少し遅れて、ラピスも隣で目を閉じた。', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
          { text: '……変なやつらだな。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'smile' }] },
          { text: '母さんなら、腹は減ってないかって訊いてるところだ。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'normal' }] },
          { text: 'ラピスは、街の真ん中の空を見上げていた。', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
        ],
      },
      {
        buttonText: 'それは、帝国を恨んでいいことだ',
        branch: [
          { text: '……そうか？', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'normal' }] },
          { text: '恨む相手がはっきりしてりゃ、もう少し楽だったんだがな。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'serious' }] },
          { text: 'ラピスは、何も言わずにうつむいていた。', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
        ],
      },
    ],
    melt: [
      {
        buttonText: '会いに行こう。そのうえで考えよう',
        points: { lapisTrust: 1 },
        branch: [
          { text: '……はい。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
          { text: '考えます。ちゃんと。', speaker: 'ラピス' },
        ],
      },
      {
        buttonText: '溶かさずに会う方法も、あるかもしれない',
        branch: [
          { text: 'ラピスは、こちらの胸もとのブローチを見た。', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] },
          { text: '……あなたは、出てこられたんですもんね。', speaker: 'ラピス' },
          { text: 'だったら、まだ、何か……', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
        ],
      },
    ],
  },
};

export default scenario;
