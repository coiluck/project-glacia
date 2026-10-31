import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/frozen_town.avif（凍った帝都の西の外町。氷をかぶった低い屋根と通り。空は白く曇っている）
// - bg/frozen_gate.avif（凍った帝都の西の門。開いたままの門扉と、門の内側へ続く大通り）
const scenario: ScenarioFile = {
  id: '4-2',
  lines: [
    {
      text: '最後のコオリモチが、霜の線のきわで砕けた。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/frozen_town.avif', transition: 'fade' }
      ]
    },
    {
      text: '通りの奥へ進むと、人がいた。'
    },
    {
      text: '通りいっぱいに、人が立っていた。荷物を背負った人、子どもを抱き上げた人、戸口に手をかけたままの人。誰もが同じほうを向いて、帝都の真ん中の空を見上げていた。'
    },
    {
      text: 'ひとりひとりが透きとおった厚い氷に包まれていた。氷の中で外套のすそが風にあおられた形のまま止まっていた。'
    },
    {
      text: '外から見たときより、ずっと近かった。手を伸ばせば、氷ごしに肩に触れられそうだった。'
    },
    {
      text: 'ラピスが足を止めた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '通りの先にとんがった屋根が見えていた。その隣の戸口の前に小さな男の子が立っている。首から紐で鍵を下げて、母親の上着のすそを握っていた。'
    },
    {
      text: 'ラピスは霜の線のぎりぎりまで歩いていって、ソレイユに目で頼んだ。ソレイユがうなずいて、一歩だけ前へ出た。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: 'ラピスは、男の子を包む氷に手を当てた。'
    },
    {
      text: '……見つけました。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: 'ラピスは少しのあいだ、そのまま男の子の顔を見ていた。'
    },
    {
      text: 'エーリクさんに言わなきゃ。お店の前に、ちゃんといましたって。',
      speaker: 'ラピス'
    },
    {
      text: 'どなたを見つけたのですか。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'normal' }
      ]
    },
    {
      text: '外にいたエーリクさんの息子さんです。……あ。名前、聞いてませんでした。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: 'では、帰ったら伺いましょう。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'smile' }
      ]
    },
    {
      text: '止まった人たちのあいだを抜けて、西の門へ向かった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ソレイユが一歩進むたびに、霜の線も一歩ぶん前へずれる。後ろに残った霜の線は、すぐに霞の中へ溶けて見えなくなった。'
    },
    {
      text: 'ラピスがオボロの隣に並んだ。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'オボロ。中なら、話してくれるんでしょう。',
      speaker: 'ラピス'
    },
    {
      text: 'オボロはしばらく黙って歩いていた。それから前を向いたまま口を開いた。',
      commands: [
        { type: 'char', id: 'oboro', pose: 'normal' }
      ]
    },
    {
      text: '帝都には、守りの仕掛けがございました。都のぐるりに障壁を張るためのものです。',
      speaker: 'オボロ'
    },
    {
      text: '外で境界と呼ばれている線は、その仕掛けの外周です。',
      speaker: 'オボロ'
    },
    {
      text: '障壁は、外から来るものを防ぐためのものでした。けれど裂け目は、都の真ん中に開きました。内側から開いたものは、外側の壁では止められません。',
      speaker: 'オボロ'
    },
    {
      text: 'そこで防衛軍は、仕掛けに氷の術を流すことにしました。障壁を張るかわりに、都ごと凍らせるのです。',
      speaker: 'オボロ'
    },
    {
      text: '仕掛けが術を都の端まで運びます。術者がひとりでも、帝都を覆えます。',
      speaker: 'オボロ'
    },
    {
      text: 'ラピスが、足を止めかけた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '……だから、姉さんにもできたのね。',
      speaker: 'ラピス'
    },
    {
      text: '帝都ほどの広さを凍らせるなんて、誰にもできないと思ってた。',
      speaker: 'ラピス'
    },
    {
      text: 'はい。殿下おひとりの力ではございません。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: 'ただ、仕掛けは一度きりしか動きません。流した術者も氷の中に残ります。',
      speaker: 'オボロ'
    },
    {
      text: '帝国の氷の術者は、みな東の裂け目に出ておりました。あの夜、帝都にいた氷の術者は、殿下おひとりでした。',
      speaker: 'オボロ'
    },
    {
      text: 'オボロは、そこで一度だけ言葉を切った。',
      commands: [
        { type: 'char', id: 'oboro', pose: 'sad' }
      ]
    },
    {
      text: '殿下だから、ではございません。そこにおられたのが、殿下でした。',
      speaker: 'オボロ'
    },
    {
      text: '誰も何も言わなかった。'
    },
    {
      text: '列が門を出たあとで、指揮所から伝令が走ったのです。',
      speaker: 'オボロ'
    },
    {
      text: '……伝令なら私も見ました。',
      speaker: 'アルマ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'alma', pose: 'sad' }
      ]
    },
    {
      text: '殿下が都の真ん中の空をご覧になっていたところへ、伝令が駆けてきました。何の話だったのか、私には分かりませんでした。',
      speaker: 'アルマ'
    },
    {
      text: '最後の手立てがあり、それには殿下の氷が要る。そういう伝令でした。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: '残った兵では、列が逃げきるまで都を支えられない。そのことをいちばんよく分かっておられたのは、防衛軍の指揮官でした。',
      speaker: 'オボロ'
    },
    {
      text: 'オボロが、こちらを見た。'
    },
    {
      text: '仕掛けを動かすと決めたのは、指揮官殿です。',
      speaker: 'オボロ'
    },
    {
      text: '指揮官殿は、ご自分も中に残ると決めておられました。殿下を呼び戻して、ご自分だけ外へ出るおつもりは、はじめからなかったのです。',
      speaker: 'オボロ'
    },
    {
      text: '何も、思い出せなかった。'
    },
    {
      text: 'それでも、通りに立ち並ぶ人たちの背中がさっきまでとは違って見えた。この人たちを止めると決めたのが、自分だった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ラピスは、こちらを見ていた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '……指揮官が姉さんを呼び戻したんですね。',
      speaker: 'ラピス',
      choiceId: 'decided'
    },
    {
      text: 'ラピスは、通りの人たちのほうへ目をやった。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'そうしなかったら、この人たちも、外へ逃げた人たちも、焼けた街と同じになってたんですよね。',
      speaker: 'ラピス'
    },
    {
      text: '……ああ。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: 'ベルミリアは、それだけ言った。'
    },
    {
      text: '西の門は、開いたままだった。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/frozen_gate.avif', transition: 'crossfade' }
      ]
    },
    {
      text: '門の外へ押し寄せる人の流れが、そのまま門の内側の大通りまで続いて止まっている。氷をかぶった門扉の上に帝国の旗が垂れ下がっていた。'
    },
    {
      text: 'シルヴィの耳が、ぴくりと動いた。',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: '……何か来る。大通りの奥から。速いわ。',
      speaker: 'シルヴィ'
    },
    {
      text: '氷を蹴る硬い音がだんだん近づいてくる。魔物の足音とは違った。重さのある、まっすぐな足音だった。'
    },
    {
      text: '霞の向こうに人の形をした影が見えた。影は止まった人たちのあいだを、ひとつも触れずにすり抜けてくる。',
      commands: [
        { type: 'bgShake', duration: 300, intensity: 3 }
      ]
    },
    {
      text: '熱源を検知。帝都内への侵入と判断します。',
      speaker: '？？？'
    },
    {
      text: '排除します。',
      speaker: '？？？'
    },
    {
      text: 'まっすぐソレイユのほうへ……！ 守ってください、指揮官！',
      speaker: 'ラピス',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'serious', bounce: true }
      ]
    }
  ],
  choices: {
    decided: [
      {
        buttonText: '覚えていない。でも、謝らせてほしい',
        branch: [
          { text: 'ラピスは、首を横に振った。', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
          { text: '謝らないでください。', speaker: 'ラピス' },
          { text: '謝られたら、私、怒らなきゃいけなくなります。……怒りたくないんです。', speaker: 'ラピス' },
        ],
        points: { lapisTrust: 1 },
      },
      {
        buttonText: '黙って、ラピスの言葉を待つ',
        branch: [
          { text: 'ラピスは、しばらく何も言わなかった。', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
          { text: '……ずっと、知りたかったんです。姉さんがどうしていなくなったのか。', speaker: 'ラピス' },
          { text: '知ったら、誰かを恨むんだと思ってました。でも、隣にいたのは指揮官でした。', speaker: 'ラピス' },
          { text: '恨めるわけ、ないじゃないですか。', speaker: 'ラピス' },
        ],
        points: { lapisTrust: 1 },
      },
    ],
  },
};

export default scenario;
