import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/burnt_forest.avif（焼けた森。黒い幹と灰の地面）
// - bg/forest_grove.avif（焼け残った木立。泉と古木、南の空に赤い裂け目）
const scenario: ScenarioFile = {
  id: '2-4',
  lines: [
    {
      text: 'ホムラモチの火は、焼け残った木までは届かなかった。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/burnt_forest.avif', transition: 'fade' }
      ]
    },
    {
      text: 'シルヴィは幹の根もとをひとつずつ確かめてから、弓を背負い直した。'
    },
    {
      text: 'ついてきて。日が暮れる前に、休める場所があるわ。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'normal' }
      ]
    },
    {
      text: 'お前が人間を案内するのか。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: '通行料のお釣りよ。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'smile' }
      ]
    },
    {
      text: 'しばらく進むと、森の様子が変わった。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgMove', direction: 'rightToLeft', duration: 4000 }
      ]
    },
    {
      text: '焼け跡がそこで終わっていた。定規で線を引いたように、東西へまっすぐ。線の向こうには、葉をつけた木がまばらに残っている。'
    },
    {
      text: 'ラピスは線の手前の切り株にしゃがみこんだ。灰を払うと断面は平らで、焦げているのは表面だけだった。'
    },
    {
      text: 'これ……魔物が焼いたんじゃ、ないですよね。切ってから、焼いてある。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '人間よ。帝国の兵隊。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'normal' }
      ]
    },
    {
      text: '街が焼け落ちて魔物の火が森の端まで来た秋に兵隊が来て、森の北半分を切って焼いたの。燃えるものを先になくしておけば、魔物の火は街道まで届かないから。',
      speaker: 'シルヴィ'
    },
    {
      text: '隊長は私たちの長老の前で膝をついたわ。それから、火を放った。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: '……その火のおかげで、魔物の火は街道を越えなかった。宿場も、北の村も残った。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '知ってるわ。',
      speaker: 'シルヴィ'
    },
    {
      text: 'シルヴィはそれだけ言って、一度も足もとを見ずに線を越えていった。',
      commands: [
        { type: 'charDelete', id: 'sylvie' }
      ]
    },
    {
      text: 'ベルミリアは線の手前で立ち止まって、今まで歩いてきた焼け跡を振り返っていた。'
    },
    {
      text: '……森には、来たんだな。',
      speaker: 'ベルミリア'
    },
    {
      text: 'え？',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: 'なんでもない。',
      speaker: 'ベルミリア',
      choiceId: 'firebreak'
    },
    {
      text: '線を越えてしばらく行くと、急に緑が目に飛び込んできた。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/forest_grove.avif', transition: 'fade' },
        { type: 'wait', ms: 800 }
      ]
    },
    {
      text: '小さな泉を囲んで数十本の木が葉を茂らせていた。その真ん中に、ひときわ太い古木が一本立っている。'
    },
    {
      text: 'きれい……',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: '私の一族が守ってきた木よ。一族のみんなは西の山へ移ったけど、この木は運べないから。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'normal' }
      ]
    },
    {
      text: 'それで、ひとりで残ってるんですか。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '誰かが測っておかないと、いつ逃げればいいのか分からないでしょう。',
      speaker: 'シルヴィ'
    },
    {
      text: '泉のそばで火をおこした。久しぶりに、焦げたにおいのしない空気だった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '日が落ちると、木立の切れ目から見える南の空が赤く染まりはじめた。宿場で見たときよりずっと近く、ずっと大きい。'
    },
    {
      text: '……シルヴィさん。次の季節替わりって、いつごろなんですか。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: 'もうすぐよ。風が南から吹くようになったら。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'normal' }
      ]
    },
    {
      text: 'ベルミリアが、焚き火に薪をくべた。'
    },
    {
      text: '明日、私は焼けた街に入る。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '正気？ 裂け目の真下よ。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'surprised' }
      ]
    },
    {
      text: '季節が替わる前に、取ってこなきゃならない物がある。',
      speaker: 'ベルミリア'
    },
    {
      text: '……なら、私たちも――',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'いらない。約束は森の向こうまでだったろ。聖女の陣へは、ここから西へ回れば着く。道はシルヴィに聞け。',
      speaker: 'ベルミリア',
      choiceId: 'errand'
    },
    {
      text: 'それきり、ベルミリアは焚き火から少し離れたところで、大剣を抱えて横になった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '夜更け、泉の水面が赤く揺れた。',
      commands: [
        { type: 'bgShake', duration: 400, intensity: 5 }
      ]
    },
    {
      text: '木立の南の切れ目から、赤い光と揺らめく影が、次々に入り込んでくる。'
    },
    {
      text: 'このところ、毎晩よ。前は、ここまで来ることなんてなかったのに。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: '裂け目が伸びるぶん、押し出されてくるんだ。野営地まで上がっていった白焔と同じだな。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: 'シルヴィは弓に矢をつがえて、古木の前に立った。'
    },
    {
      text: '泉には近づけないで。あの木の根は、泉の下まで伸びてるの。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
  ],
  choices: {
    firebreak: [
      {
        buttonText: '何か、気になるのか',
        branch: [
          { text: '……切り口が、きれいだと思っただけだ。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'normal' }] },
          { text: '急いでやった仕事じゃない。ちゃんと時間をかけて、確かめながらやってる。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'serious' }] },
        ],
      },
      {
        buttonText: '黙って待つ',
        branch: [
          { text: 'ベルミリアはしばらくして前を向き、何事もなかったように線を越えた。' },
          { text: 'ラピスはベルミリアが振り返っていた焼け跡を、少しのあいだ見つめていた。', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
        ],
      },
    ],
    errand: [
      {
        buttonText: '取ってくる物って、なんだ',
        branch: [
          { text: '……大した物じゃない。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'normal' }] },
          { text: '大した物じゃないものを取りに、裂け目の真下へ行くのね。', speaker: 'シルヴィ', commands: [{ type: 'char', id: 'sylvie', pose: 'normal' }] },
          { text: 'ベルミリアは答えなかった。' },
        ],
      },
      {
        buttonText: 'ひとりで行くのか',
        branch: [
          { text: 'いつも、そうしてる。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'normal' }] },
          { text: '……季節が替わるたびに、ね。', speaker: 'シルヴィ', commands: [{ type: 'char', id: 'sylvie', pose: 'sad' }] },
        ],
      },
    ],
  },
};

export default scenario;
