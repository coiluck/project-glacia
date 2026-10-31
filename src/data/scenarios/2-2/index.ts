import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/south_road.avif（雪が途切れた南の街道。宿場の跡もここで代用）
// - bg/camp_tent.avif（宿場の跡に張った天幕の中）
const scenario: ScenarioFile = {
  id: '2-2',
  lines: [
    {
      text: '最後のホムラモチが弾けて、焼け跡に赤い魔石が転がった。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/south_road.avif', transition: 'fade' }
      ]
    },
    {
      text: 'ベルミリアはそれを拾い上げると、腰の袋に落とした。'
    },
    {
      text: '……白焔の首を取ったってのは、嘘じゃないらしいな。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: '森の向こうまでは付き合ってやる。そこから先は知らない。',
      speaker: 'ベルミリア'
    },
    {
      text: 'ありがとうございます、ベルミリアさん！',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile', bounce: true }
      ]
    },
    {
      text: 'ベルミリアでいい。さん付けで呼ばれると、組合の帳場を思い出す。',
      speaker: 'ベルミリア'
    },
    {
      text: '昼過ぎ、街道沿いの宿場に着いた。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgMove', direction: 'rightToLeft', duration: 4000 }
      ]
    },
    {
      text: '十軒ほどの家が、街道の両側に並んでいた。戸はどれも開け放されたままで、人の気配はない。'
    },
    {
      text: 'ここも、魔物に……？',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '焼けてないだろ。逃げたんだよ、自分の足で。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: '宿場の入口の掲示板に、色の抜けた紙が一枚、釘で留められたまま残っていた。帝国の紋章が押してある。'
    },
    {
      text: 'ラピスが、背伸びをして読み上げた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '「南部の諸都市へ。帝国軍は東部の裂け目に兵を出しており、南へ送れる兵は残っていない。各都市の住民は、ただちに北へ退かれたし」……',
      speaker: 'ラピス'
    },
    {
      text: '紙の余白に、もう一行、急いだ字で書き足してあった。'
    },
    {
      text: '「力及ばず、申し訳ない」',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: 'その紙が届いた晩に、宿場の連中は荷物をまとめて北へ出た。おかげで、ここじゃ誰も死んでない。',
      speaker: 'ベルミリア'
    },
    {
      text: 'ベルミリアは、掲示板のほうを見もしなかった。'
    },
    {
      text: '……読まなくても、中身を知ってるんですね。',
      speaker: 'ラピス'
    },
    {
      text: 'この街道を、何度通ったと思ってる。',
      speaker: 'ベルミリア',
      choiceId: 'notice'
    },
    {
      text: 'その夜は、屋根の残った家の陰に天幕を張った。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/camp_tent.avif', transition: 'fade' },
        { type: 'wait', ms: 800 }
      ]
    },
    {
      text: '小さな焚き火を囲んで、干し肉をかじる。ベルミリアは大剣を膝に載せて、刃を研いでいた。'
    },
    {
      text: '聖女のとこへ行って、どうする。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: '帝都が溶けたら、中に入れます。家族に、会えます。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'そっちの指揮官も、帝都に誰か残してきたのか。',
      speaker: 'ベルミリア'
    },
    {
      text: 'この人は、帝都から出てきたんです。境界の、内側から。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: 'ラピスは、境界から人が出てきたこと、何も覚えていなかったこと、それから霜の溶けないブローチのことを話した。'
    },
    {
      text: 'ベルミリアは、こちらが差し出したブローチを焚き火にかざして、しばらく眺めていた。',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '……溶けないな。',
      speaker: 'ベルミリア'
    },
    {
      text: '帝都の氷も、こんなふうなんだろうな。誰がやったのか知らないが。',
      speaker: 'ベルミリア'
    },
    {
      text: 'ベルミリアはブローチをこちらへ返すと、また刃を研ぎはじめた。'
    },
    {
      text: '野営地のほうじゃ、皇家が凍らせたって噂だろ。',
      speaker: 'ベルミリア'
    },
    {
      text: '……噂、です。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: 'こっちまで流れてくる話もある。帝都に裂け目が開いた日、皇女さまは真っ先に外へ逃がされたってな。',
      speaker: 'ベルミリア'
    },
    {
      text: '干し肉をちぎるラピスの手が、止まった。'
    },
    {
      text: '責めてるわけじゃない。娘を逃がせるなら、私が親でもそうする。',
      speaker: 'ベルミリア'
    },
    {
      text: 'ただ、南の街には、誰かを逃がしに来るやつはいなかった。それだけだ。',
      speaker: 'ベルミリア'
    },
    {
      text: '焚き火がはぜた。ラピスは手もとを見たまま、少しして口を開いた。'
    },
    {
      text: '……逃げた人も、逃げたくて逃げたわけじゃ、ないと思います。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '知ってるような口ぶりだな。',
      speaker: 'ベルミリア'
    },
    {
      text: '……帝都から出てきた人は、みんな、そうでしたから。',
      speaker: 'ラピス'
    },
    {
      text: 'ベルミリアはラピスの顔をしばらく見ていたが、何も言わずに大剣を背に戻した。'
    },
    {
      text: '見張りに出る。先に寝てろ。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'charDelete', id: 'vermilia' }
      ]
    },
    {
      text: '天幕の入口の布が下りると、ラピスは小さく息を吐いた。'
    },
    {
      text: '夜半、天幕の外で、ベルミリアの低い声がした。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/south_road.avif', transition: 'crossfade' }
      ]
    },
    {
      text: '起きろ。客だ。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '外に出ると、南の地平線の上が、夕焼けの名残のようにぼんやりと赤かった。'
    },
    {
      text: '焼けた街の、裂け目の明かりだ。……前は、ここからは見えなかった。',
      speaker: 'ベルミリア'
    },
    {
      text: 'その赤い空を背にして、陽炎のように揺らめく影が、いくつも街道を上ってくる。'
    },
    {
      text: 'カゲロウ……焚き火の明かりに、寄ってきたんですね。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '宿場の中に入れるな。家に火が移る。',
      speaker: 'ベルミリア'
    },
    {
      text: '……誰も、住んでないのに？',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '戻ってくるかもしれないだろ。',
      speaker: 'ベルミリア'
    },
    {
      text: 'ラピスは一瞬だけベルミリアの横顔を見て、それから前を向いた。'
    },
    {
      text: 'はい。一軒も、焼かせません。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
  ],
  choices: {
    notice: [
      {
        buttonText: '書き足したのは、誰だろう',
        branch: [
          { text: 'さあな。紙を貼って回った兵隊だろ。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'normal' }] },
          { text: '……一枚貼るたびに、書いてたのかもな。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'serious' }] },
        ],
      },
      {
        buttonText: '南の街にも、これは届いたのか',
        branch: [
          { text: '……届いたよ。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'serious' }] },
          { text: 'ベルミリアはそれだけ言って、先に歩き出した。' },
        ],
      },
    ],
  },
};

export default scenario;
