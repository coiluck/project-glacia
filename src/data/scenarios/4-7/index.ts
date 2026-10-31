import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/frozen_center.avif（帝都中央、裂け目の真下。空に凍った裂け目、その下から獣があふれ出る形で止まっている）
// 立ち絵:
// - automaton（ロボ娘。名前「ネーヴェ」は仮）
const scenario: ScenarioFile = {
  id: '4-7',
  lines: [
    {
      text: '門の向こうの獣が崩れると、その先にはもう何も動くものがなかった。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/frozen_center.avif', transition: 'fade' }
      ]
    },
    {
      text: '帝都の中央だった。'
    },
    {
      text: '頭の上いっぱいに裂け目が開いていた。空がそこだけ黒く割れて、ふちに厚い氷が張りついている。'
    },
    {
      text: '裂け目の口から黒い殻の獣があふれ出ていた。何十、何百という獣が、空から雪崩れ落ちる形のままひとつの氷の中に閉じこめられている。いちばん下の獣の爪は、石畳のすぐ上で止まっていた。'
    },
    {
      text: '焼けた街の空も、きっとこうだったのだと思った。ここではそれが落ちきる前に止まっていた。'
    },
    {
      text: 'ソレイユが、足を止めた。',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: 'ここまでです。これより近づけば、私の陽が裂け目の氷に届きます。',
      speaker: 'ソレイユ'
    },
    {
      text: '霜の線は、裂け目の真下の少し手前で止まっていた。その線のすぐ外に、人がひとり立っていた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '女の人だった。片手をまっすぐ空の裂け目へ向けている。もう片方の手は、襟もとに当てられていた。'
    },
    {
      text: '長い髪が、風にあおられた形のまま氷の中で広がっていた。顔は、空を見上げていた。'
    },
    {
      text: '……姉さん。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: 'ラピスは霜の線のきわまで歩いていって、そこで止まった。手を伸ばせば姉を包む氷に届くところだった。'
    },
    {
      text: '姉のすぐ頭の上で、裂け目から落ちてくる獣の爪が止まっていた。姉の氷と裂け目の氷は、ひと続きだった。'
    },
    {
      text: 'あの爪の下を削れば、裂け目の氷もゆるみます。ですから、掘れませんでした。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'sad' }
      ]
    },
    {
      text: 'ラピスは、姉の顔を見上げていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '……姉さん、こんなに若かったっけ。',
      speaker: 'ラピス'
    },
    {
      text: '覚えてる姉さんは、もっと大人でした。背が高くて、何でも知ってて。',
      speaker: 'ラピス'
    },
    {
      text: 'ラピスは姉の顔と、氷に映る自分の顔を見比べていた。'
    },
    {
      text: '私、もう姉さんと同じくらいになっちゃった。',
      speaker: 'ラピス'
    },
    {
      text: 'ラピスは笑おうとして、うまく笑えなかった。'
    },
    {
      text: 'それから、ラピスの目が姉の襟もとで止まった。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '……ブローチ、ない。いつも襟につけてたのに。',
      speaker: 'ラピス'
    },
    {
      text: 'ラピスは、こちらの胸もとのブローチを見た。何か言いかけて、口を閉じた。'
    },
    {
      text: 'ラピスは、姉を包む氷に両手を当てた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '指先から霜が広がって、姉の氷の上に薄く重なっていく。大通りで獣の上に重ねたときと同じように、継ぎ目は見えなかった。'
    },
    {
      text: '……重ねられます。ここでも。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '姉さん。迎えに来ました。',
      speaker: 'ラピス'
    },
    {
      text: '姉は、空を見上げたまま動かなかった。'
    },
    {
      text: 'そのとき、頭の上で長いきしみが走った。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgShake', duration: 500, intensity: 4 }
      ]
    },
    {
      text: '裂け目のふちの氷に白い筋が一本走っていた。胸もとで、ブローチの霜のひびがまた一本増えた。'
    },
    {
      text: '中央の氷、今朝より薄くなっています。隙間が開いてから、ずっと薄くなりつづけています。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: 'ステラが、裂け目の真上の星へ糸を伸ばした。糸の先で星が大きく揺れていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '……鐘楼の上より、また大きくなってる。',
      speaker: 'ステラ'
    },
    {
      text: 'ラピスは、姉の氷から手を離さずに振り返った。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '指揮官。やりましょう。',
      speaker: 'ラピス'
    },
    {
      text: '……お待ちください。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: 'アルマは、裂け目からあふれる獣の群れを見上げていた。'
    },
    {
      text: '殿下が氷を解けば、帝都じゅうの人が一度に目を覚まします。西の外町にも、門にも、隙間のそばにも。',
      speaker: 'アルマ'
    },
    {
      text: 'そこへこれが降ります。隙間の番をしている騎士団に知らせてからでなければ。',
      speaker: 'アルマ'
    },
    {
      text: 'わたしが行きます。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: '隙間までなら帝都の中です。わたしなら凍りませんし、熱も要りません。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'ラピスが、ネーヴェのほうを向いた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: 'ネーヴェさん。隙間のそばに、エーリクさんっていう人がいます。',
      speaker: 'ラピス'
    },
    {
      text: '伝えてください。とんがった屋根の隣のお店の前に、息子さんがちゃんといましたって。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: 'それと、名前も聞いてきてください。ロザリーさんが札を刻むので。',
      speaker: 'ラピス'
    },
    {
      text: '了解しました。二件、承ります。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'smile' }
      ]
    },
    {
      text: '熱から離れるので、全部着ていきます。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: 'クラリスが、門の前からずっと抱えていた上着を差し出した。ネーヴェはそれを受け取って手早く着こんだ。シャツのボタンも上着のボタンも、いちばん上までとめた。'
    },
    {
      text: 'それからソレイユのすぐ隣で立ち止まった。'
    },
    {
      text: 'ネーヴェの襟もとからは、もう煙が上がっていなかった。'
    },
    {
      text: '……機体温度、正常です。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: 'ソレイユが、自分の手のひらを見下ろしていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: '……隣にいても、平気になってしまいましたね。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'sad' }
      ]
    },
    {
      text: '殿下のまわりを柔らかくするぶんの陽は、残します。ネーヴェさんが戻るまで、ここで待ちましょう。',
      speaker: 'ソレイユ'
    },
    {
      text: 'ラピスは、もう一度だけ姉を見上げた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'sad' }
      ],
      choiceId: 'wait'
    },
    {
      text: 'ネーヴェが駆けだそうとしたとき、裂け目のふちで氷の割れる音がした。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgShake', duration: 400, intensity: 5 }
      ]
    },
    {
      text: '雪崩れ落ちる獣の群れのいちばん外側にいた何体かが、氷から身をもぎ離していた。殻のあちこちから氷のかけらをこぼしながら、石畳の上に降りてくる。'
    },
    {
      text: '……殿下に近づけさせてはなりません。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: 'ラピスは姉の氷から手を離して、こちらの隣に並んだ。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '姉さんには、指一本触れさせません。',
      speaker: 'ラピス'
    },
    {
      text: '指揮官、お願いします！',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious', bounce: true }
      ]
    }
  ],
  choices: {
    wait: [
      {
        buttonText: 'もうすぐ会える',
        branch: [
          { text: '……はい。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
          { text: 'もうすぐです。何年も待ったんですから、あと少しくらい待てます。', speaker: 'ラピス' },
        ],
        points: { lapisTrust: 1 },
      },
      {
        buttonText: 'ラピスの隣に立つ',
        branch: [
          { text: 'ラピスの隣に立って、同じように姉を見上げた。', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
          { text: '……姉さん、起きたらきっと怒ります。どうして来たのって。', speaker: 'ラピス' },
          { text: 'そうしたら、私も怒ります。どうして何も言わないで行ったのって。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
        ],
        points: { lapisTrust: 1 },
      },
    ],
  },
};

export default scenario;
