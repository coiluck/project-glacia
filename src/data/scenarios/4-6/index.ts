import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/frozen_inner_gate.avif（中央区画の門。凍った門扉の向こうに、裂け目の下の中央が見える）
// 立ち絵:
// - automaton（ロボ娘。名前「ネーヴェ」は仮）
const scenario: ScenarioFile = {
  id: '4-6',
  lines: [
    {
      text: '広場を抜けると、中央区画の門が見えた。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/frozen_inner_gate.avif', transition: 'fade' }
      ]
    },
    {
      text: '門扉は、内側から押し開けられた形のまま凍っていた。その向こうの空に裂け目が大きく口を開けている。鐘楼の上から見たときより、ずっと近かった。'
    },
    {
      text: '門の前に、オボロが立っていた。',
      commands: [
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: 'いつのまに前へ出たのか、誰も見ていなかった。オボロは門を背にしてこちらに向き直った。'
    },
    {
      text: 'ここから先へは、お通しできません。',
      speaker: 'オボロ'
    },
    {
      text: '……オボロ。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '殿下のご命令は、ラピスさまを影からお守りすること。それから氷を誰にも溶かさせぬことです。',
      speaker: 'オボロ'
    },
    {
      text: '山の上でも聖女の陣でも、私はそのとおりにしてまいりました。',
      speaker: 'オボロ'
    },
    {
      text: '姉さんは、何も知らないで命令したの。隙間が開くことも、氷がもたなくなることも。',
      speaker: 'ラピス'
    },
    {
      text: '存じております。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'normal' }
      ]
    },
    {
      text: 'オボロは、門の向こうの空を見上げた。'
    },
    {
      text: 'あの夜、外へ出られたのは、残った兵で守りながら歩ける人数だけでした。',
      speaker: 'オボロ'
    },
    {
      text: '外へ出た者のぶんだけ、中に残った者がおります。ここにいる者たちは外の者のために止まったのです。',
      speaker: 'オボロ'
    },
    {
      text: '殿下が氷を解き、裂け目を閉じられなければ。……中の者も、外へ出た者も、殿下ご自身も。あの夜止めたものがすべて無駄になります。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: 'それを、私に見届けろと仰いますか。',
      speaker: 'オボロ'
    },
    {
      text: 'ベルミリアが何か言いかけて、やめた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '焼けた街を見てきた者なら、オボロの言うことが間違っていないのは分かった。'
    },
    {
      text: 'ラピスが、一歩前へ出た。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '隙間が開いてから、氷はもう元どおりじゃない。オボロも見てたでしょう。ブローチのひびも、星の揺れも。',
      speaker: 'ラピス'
    },
    {
      text: 'このまま守っても、守れるのは今日だけ。明日かもしれないし、もっと先かもしれない。でも、いつか氷はひとりでに崩れる。',
      speaker: 'ラピス'
    },
    {
      text: 'そのときは、誰も閉じに行けない。',
      speaker: 'ラピス'
    },
    {
      text: 'それでも今日ではないかもしれぬ、と申し上げたら。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'sad' }
      ]
    },
    {
      text: '今日なら、ここにみんながいる。',
      speaker: 'ラピス'
    },
    {
      text: 'オボロは、答えなかった。'
    },
    {
      text: 'しばらくしてオボロの目がラピスから離れた。こちらを見ていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'oboro', pose: 'normal' }
      ]
    },
    {
      text: '……指揮官殿。',
      speaker: 'オボロ'
    },
    {
      text: '帝都を凍らせると決めたのは、指揮官殿と殿下でした。私は、それを見ておりました。',
      speaker: 'オボロ'
    },
    {
      text: '指揮官殿は、何も覚えておられない。それでも、あの夜に決めたのはあなたです。',
      speaker: 'オボロ'
    },
    {
      text: 'お聞かせください。解くと、お決めになりますか。',
      speaker: 'オボロ',
      choiceId: 'resolve'
    },
    {
      text: 'オボロは長いあいだこちらを見ていた。',
      commands: [
        { type: 'char', id: 'oboro', pose: 'normal' }
      ]
    },
    {
      text: 'それからネーヴェのほうへ目を移した。'
    },
    {
      text: '……あなたは、命令がなくても指揮官殿を掘り出したのですね。',
      speaker: 'オボロ'
    },
    {
      text: 'はい。命令をくれる人がいなかったので。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: '私は命令をいただいてから何年も、そのとおりにしか動けませんでした。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'sad' }
      ]
    },
    {
      text: '殿下は、氷を溶かさせるなと仰いました。けれど、氷がもたなくなったときにどうせよとは仰いませんでした。',
      speaker: 'オボロ'
    },
    {
      text: '殿下にも、そこまでは見えておられなかったのでしょう。',
      speaker: 'オボロ'
    },
    {
      text: 'オボロは、門の前から脇へよけた。それからこちらの前に膝をついた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: '凍らせると決めた方が、解くと決められた。……それに従うのは、私が自分で決めたことです。',
      speaker: 'オボロ'
    },
    {
      text: '影に控えております。',
      speaker: 'オボロ'
    },
    {
      text: '……ご命令を、指揮官。',
      speaker: 'オボロ'
    },
    {
      text: 'ネーヴェが、オボロの隣で首をかしげた。',
      commands: [
        { type: 'char', id: 'automaton', pose: 'surprised' }
      ]
    },
    {
      text: '命令をいただくのは、わたしの役目では。',
      speaker: 'ネーヴェ'
    },
    {
      text: '……私も、野営地で一度そう申し上げたのですが。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'smile' }
      ]
    },
    {
      text: '……みなさんでいただけばよろしいかと存じます。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'smile' }
      ]
    },
    {
      text: 'ステラが吹き出した。クラリスが咳払いでごまかそうとして、うまくいかなかった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ラピスはオボロの前にしゃがんで、膝の上の手を取った。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: '何年も見ててくれたのね。境界のそばで。',
      speaker: 'ラピス'
    },
    {
      text: '……ありがとう、オボロ。',
      speaker: 'ラピス'
    },
    {
      text: 'オボロは、少しだけ目を伏せた。',
      commands: [
        { type: 'char', id: 'oboro', pose: 'normal' }
      ]
    },
    {
      text: '門の向こうで氷の割れる音がした。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgShake', duration: 400, intensity: 4 }
      ]
    },
    {
      text: '中央の広場で黒い殻の獣が身をよじっていた。ひとつが氷を割って首をもたげ、こちらを向いた。そのあとにふたつ、みっつと続いていく。'
    },
    {
      text: '星の揺れでゆるんだのです。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: 'オボロは、もう苦無を両手に構えていた。'
    },
    {
      text: '道を開けます。殿下のもとへ。',
      speaker: 'オボロ'
    },
    {
      text: '数が多いです。全力で動きます。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: 'ネーヴェは、上着のボタンを外しはじめた。'
    },
    {
      text: '今ですか！？',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised', bounce: true }
      ]
    },
    {
      text: '今です。冷えているほうが、全力が長くもちます。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'ネーヴェは上着を脱ぎ捨てて、シャツのボタンにも指をかけた。宙を舞った上着をクラリスがつかんだ。アルマは、もうこちらの前に立っていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'alma', pose: 'normal' }
      ]
    },
    {
      text: 'ロザリーさんは、そのままで……！',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised' }
      ]
    },
    {
      text: 'まだ、何も申しておりません。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'smile' }
      ]
    },
    {
      text: '行きましょう、指揮官！',
      speaker: 'ラピス',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'serious', bounce: true }
      ]
    }
  ],
  choices: {
    resolve: [
      {
        buttonText: '解く。今度は閉じるために',
        branch: [
          { text: 'オボロは、目を閉じた。', commands: [{ type: 'char', id: 'oboro', pose: 'sad' }] },
          { text: '……止めるためではなく、閉じるために。', speaker: 'オボロ' },
        ],
      },
      {
        buttonText: 'あの夜の決め事は、終わらせる',
        branch: [
          { text: 'オボロは、目を閉じた。', commands: [{ type: 'char', id: 'oboro', pose: 'sad' }] },
          { text: '……あの夜を、終わらせる。', speaker: 'オボロ' },
        ],
      },
    ],
  },
};

export default scenario;
