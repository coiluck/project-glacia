import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/frozen_avenue.avif（西の門から中央へ続く凍った大通り。避難の列が止まっている。遠くに中央の尖塔）
// 立ち絵:
// - automaton（ロボ娘。名前「ネーヴェ」は仮）
const scenario: ScenarioFile = {
  id: '4-4',
  lines: [
    {
      text: '這ってきた群れが散ると、大通りはまた静かになった。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/frozen_avenue.avif', transition: 'fade' }
      ]
    },
    {
      text: '中央へ近づくほど、通りの人は増えていった。みな門のほうを向いて、荷物を抱えて、走る形のまま止まっていた。'
    },
    {
      text: '避難の列だった。中央のほうから西の門へ向かって、ずっと続いている。'
    },
    {
      text: '列のいちばん後ろでベルミリアが足を止めた。',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '女の人が幼い子どもを胸に抱えて、背中を丸めていた。'
    },
    {
      text: 'そのすぐ後ろに、黒い殻の獣がいた。後ろ足で氷を蹴って、前足の爪を女の人の背中へ振り下ろす形のまま止まっている。爪の先と外套のあいだは、指一本ぶんもなかった。'
    },
    {
      text: '……こいつだ。',
      speaker: 'ベルミリア'
    },
    {
      text: '焼けた街に来たのと同じやつだ。',
      speaker: 'ベルミリア'
    },
    {
      text: 'ベルミリアは獣の殻を見上げていた。剣の柄にかけた手が白くなっていた。'
    },
    {
      text: '母さんのいた街にもこいつらが来た。……あそこでは、誰も止めてくれなかった。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'sad' }
      ]
    },
    {
      text: 'ベルミリアはしばらく黙っていた。それから女の人の背中のほうへ目を移した。'
    },
    {
      text: 'ここでは、止まったんだな。',
      speaker: 'ベルミリア'
    },
    {
      text: 'ネーヴェが、女の人を包む氷を見ていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: 'この人も、掘れませんでした。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'この人のまわりを削れば、すぐ後ろの獣を包む氷もゆるみます。掘り出す前に獣が動きます。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'ラピスが、顔を上げた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '……姉さんと、同じ。',
      speaker: 'ラピス'
    },
    {
      text: 'ラピスは獣の前まで行って、黒い殻を包む氷に両手を当てた。'
    },
    {
      text: 'ラピスさま、何を。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'surprised' }
      ]
    },
    {
      text: '確かめるだけ。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'ラピスの指先から霜が広がった。霜は獣を包む氷の上を這って、薄い膜のように重なっていく。'
    },
    {
      text: '重ねた氷ともとの氷のあいだに、継ぎ目は見えなかった。'
    },
    {
      text: '……つながった。やっぱり姉さんの氷と同じです。',
      speaker: 'ラピス'
    },
    {
      text: 'ネーヴェさん。この人のまわりを削ってみてください。',
      speaker: 'ラピス'
    },
    {
      text: 'ネーヴェは、ラピスと獣を見比べた。',
      commands: [
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: '獣がゆるんだら止めます。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'お待ちください。そのまわりを削るのは、殿下の氷を崩すことです。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: 'この人のまわりだけ。獣は、私が押さえてる。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'オボロはしばらくラピスの手もとを見ていた。それから獣の脇に立って、苦無を抜いた。'
    },
    {
      text: '……殻がひとつでも動いたら、その場でやめていただきます。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: 'ネーヴェの指先が、女の人の肩のあたりの氷を削りはじめた。硬い音がして、細かい氷の粉が散る。ひと削りで爪の先ほどしか減らなかった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '……これを、何年も？',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'surprised' }
      ]
    },
    {
      text: 'はい。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'ソレイユが、黙って前へ出た。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: '女の人の背中に両手をかざす。手のひらのあたりが陽炎のように揺らいだ。'
    },
    {
      text: 'ネーヴェさん。もう一度。',
      speaker: 'ソレイユ'
    },
    {
      text: 'ネーヴェの指が、氷に沈んだ。さっきの何倍もの氷が、ひと削りで落ちた。',
      commands: [
        { type: 'char', id: 'automaton', pose: 'surprised' }
      ]
    },
    {
      text: '……削れます。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'ネーヴェの襟もとから白い煙が噴き出していた。ソレイユのかざした手は、ネーヴェの手のすぐ隣にあった。'
    },
    {
      text: '……十歩、離れられません。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: '脱ぎます。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'ネーヴェは削る手を止めずに、片手で上着を脱いで足もとへ落とした。指の動きが目に見えて速くなった。'
    },
    {
      text: '手袋を口にくわえて引き抜く。続けてシャツのボタンを上から外していく。ひとつ外れるたびに削る音が細かくなっていった。'
    },
    {
      text: 'クラリスが、足もとの上着と手袋を黙って拾い上げた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'clarice', pose: 'surprised' }
      ]
    },
    {
      text: 'それ、脱ぐと速くなるんですか！？',
      speaker: 'クラリス'
    },
    {
      text: 'はい。冷えるほど、出力を上げられます。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'アルマが、すっとこちらとネーヴェのあいだに立った。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: '……念のためです。',
      speaker: 'アルマ'
    },
    {
      text: 'また、衣擦れの音がいたしますね。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'normal' }
      ]
    },
    {
      text: 'アルマの肩ごしに女の人の肩が氷から出てくるのが見えた。うなじが出た。獣の爪は、ラピスの氷の下で止まったままだった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ソレイユの熱は、獣の上に重ねた霜にも届いているはずだった。それでも霜は、少しも溶けなかった。'
    },
    {
      text: '……私の氷なのに、溶けない。姉さんの氷とつながってるから……？',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '氷のきしむ音がした。ラピスが、重ねた霜に力をこめなおす。'
    },
    {
      text: '……大丈夫。押さえてます。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '女の人の頬のあたりの氷が、薄くなっていった。氷ごしにまつげの形まで見えるようになった。'
    },
    {
      text: '……お待ちください。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'serious' }
      ]
    },
    {
      text: 'ロザリーの声に、ネーヴェの手が止まった。'
    },
    {
      text: 'この方が目を覚まされたら、どこへお連れするのですか。',
      speaker: 'ロザリー'
    },
    {
      text: '誰も、すぐには答えられなかった。'
    },
    {
      text: 'ソレイユの熱の外へ出れば、この人はまた凍る。外の境界までは来た道を戻らなければならない。腕の中の子どもも同じだった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '……私の陽にも、限りがあります。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'sad' }
      ]
    },
    {
      text: 'ソレイユは、かざしていた手を下ろした。'
    },
    {
      text: 'この方だけを起こして、連れて帰ることはできません。……ここにいる方々、みなさんが同じです。',
      speaker: 'ソレイユ'
    },
    {
      text: 'ネーヴェが削った氷の粉を集めて、女の人の肩にそっと戻した。粉はすぐに霜になって、もとの氷に混じっていった。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'sad' }
      ]
    },
    {
      text: 'ラピスは、獣の上に重ねた霜から手を離さなかった。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'でも、分かりました。',
      speaker: 'ラピス'
    },
    {
      text: '私が氷を重ねて押さえて、ソレイユさんが柔らかくして、ネーヴェさんが削る。……そうすれば、裂け目のそばでも掘れます。',
      speaker: 'ラピス'
    },
    {
      text: '姉さんを、掘り出せます。',
      speaker: 'ラピス'
    },
    {
      text: '掘り出して、どうなさるのです。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: '殿下が目を覚まされても、帝都の氷はそのままです。魔法の氷は、かけた者が死なぬかぎり――',
      speaker: 'オボロ'
    },
    {
      text: '解いたときも。',
      speaker: 'ラピス'
    },
    {
      text: 'ラピスは、オボロのほうへ振り向いた。'
    },
    {
      text: '前にも話しましたよね、指揮官。姉さんくらいの術者の氷なら、溶けるのはかけた人が解いたときか、死んだときだけです。',
      speaker: 'ラピス'
    },
    {
      text: '姉さんが目を覚ませば、姉さんが帝都の氷を解けます。',
      speaker: 'ラピス'
    },
    {
      text: 'オボロは、何も言い返さなかった。'
    },
    {
      text: '……で。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: 'ベルミリアが、獣の爪を見上げたまま言った。'
    },
    {
      text: '起こして、解いたら。こいつらが出てくるんだろ。真ん中の裂け目からも。',
      speaker: 'ベルミリア'
    },
    {
      text: 'ラピスは、答えなかった。',
      choiceId: 'answer'
    },
    {
      text: 'そのとき、ラピスの重ねた霜の下で獣の殻がきしんだ。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgShake', duration: 300, intensity: 3 }
      ]
    },
    {
      text: 'まわりの氷に細いひびが走っていく。削ったところからゆるみが広がっていた。'
    },
    {
      text: 'ラピスがすぐに霜を重ねなおすと、ひびは止まった。けれど通りの両側の屋根の上で、白くて丸い影がいくつも身を起こしていた。'
    },
    {
      text: '氷がゆるんだところに寄ってきています。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: '私は、ここを押さえてます。……指揮官、お願いします！',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious', bounce: true }
      ]
    }
  ],
  choices: {
    answer: [
      {
        buttonText: 'まだ分からない',
        branch: [
          { text: 'ベルミリアは、ふん、と鼻を鳴らした。', commands: [{ type: 'char', id: 'vermilia', pose: 'normal' }] },
          { text: '分からないなら、まだ起こすな。……分かるまでは、付き合ってやる。', speaker: 'ベルミリア' },
        ],
      },
      {
        buttonText: 'ラピスの隣に立つ',
        branch: [
          { text: 'ラピスの隣に立った。ラピスは霜に手を当てたまま、小さく息を吐いた。', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
          { text: '……分かってます。分かってるから、まだ言えないんです。', speaker: 'ラピス' },
        ],
        points: { lapisTrust: 1 },
      },
    ],
  },
};

export default scenario;
