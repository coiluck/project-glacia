import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/frozen_center.avif（帝都中央、裂け目の真下。空に凍った裂け目、その下から獣があふれ出る形で止まっている）
// 立ち絵:
// - automaton（ロボ娘ネーヴェ）
// - sister（ラピスの姉。speaker は「ラピスの姉」）
const scenario: ScenarioFile = {
  id: '5-2',
  lines: [
    {
      text: '這いだしてきた獣が崩れると、削る音だけが残った。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/frozen_center.avif', transition: 'fade' }
      ]
    },
    {
      text: '胸もとで小さな音がした。'
    },
    {
      text: '見下ろすとブローチの霜が消えていた。ひびも白も残っていない。ただの銀のブローチだった。'
    },
    {
      text: '……うそ。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '霜が、ない……',
      speaker: 'ラピス'
    },
    {
      text: 'ラピスの顔から色が引いていた。裂け目のふちを押さえる手が震えていた。'
    },
    {
      text: '……指が。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'surprised' }
      ]
    },
    {
      text: 'ネーヴェの手が止まっていた。襟をつかんでいた姉の指が、かすかに動いていた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '姉を包む氷の内側で、細い音がした。息を吐くような音だった。'
    },
    {
      text: '氷にひびが走った。ネーヴェが削った跡からではなかった。姉の体のまわりから、内側から外へ。ひびは見るまに細かくなって、氷が崩れていった。'
    },
    {
      text: '粉雪の中で、姉の体が前へ傾いた。'
    },
    {
      text: 'アルマが腕を伸ばして、倒れてくる姉を抱きとめた。そのまま陽だまりの内側へ引き入れる。アルマの袖が一瞬で白く凍った。'
    },
    {
      text: '姉が咳きこんだ。'
    },
    {
      text: '長い髪から粉雪がこぼれ落ちる。姉は目を閉じたまま、アルマの腕の中で小さく身を縮めた。',
      commands: [
        { type: 'char', id: 'sister', pose: 'sad' }
      ]
    },
    {
      text: '……さむい。',
      speaker: 'ラピスの姉'
    },
    {
      text: '姉はアルマの外套に顔をうずめて、外套の端を自分のほうへ引き寄せた。'
    },
    {
      text: 'ラピス……毛布、もう一枚……足が、つめたい……',
      speaker: 'ラピスの姉'
    },
    {
      text: '誰も何も言わなかった。ラピスは口を開けたまま固まっていた。アルマは姉を抱えたまま、まばたきもしなかった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '姉がゆっくりと目を開けた。アルマの顔を見上げて、それから自分を見下ろしているいくつもの顔に気づいた。',
      commands: [
        { type: 'char', id: 'sister', pose: 'surprised' }
      ]
    },
    {
      text: '姉はアルマの外套から手を離した。背すじを伸ばして、乱れた髪を片手で押さえる。'
    },
    {
      text: '……どれだけ、経ちましたか。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'normal' }
      ]
    },
    {
      text: '声はもう、少しも震えていなかった。'
    },
    {
      text: '数年になります、殿下。',
      speaker: 'オボロ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: 'オボロは姉の前に膝をついて、顔を伏せていた。'
    },
    {
      text: '……数年。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'sad' }
      ]
    },
    {
      text: '姉はその言葉をくりかえして、目を閉じた。少しのあいだ動かなかった。それから目を開けて、まわりの顔をひとりずつ見ていった。'
    },
    {
      text: 'その目が、ラピスの前で止まった。'
    },
    {
      text: '……あら。',
      speaker: 'ラピスの姉'
    },
    {
      text: 'ラピスは両手を握りしめた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '境界のそばで何年も考えてきた言葉は、ひとつも出てこなかった。'
    },
    {
      text: '……私です。',
      speaker: 'ラピス'
    },
    {
      text: 'ラピスです。',
      speaker: 'ラピス'
    },
    {
      text: '姉はラピスの顔をじっと見ていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'surprised' }
      ]
    },
    {
      text: 'それから、まだ震えている手を伸ばした。指先がラピスの頬に触れた。'
    },
    {
      text: '……ラピス。',
      speaker: 'ラピスの姉'
    },
    {
      text: '追いつかれて、しまいましたね。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'smile' }
      ]
    },
    {
      text: 'ラピスは何か言おうとして、言えなかった。そのまま姉の肩に額を押しつけた。しばらくのあいだ、ラピスの背中だけが小さく震えていた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'アルマは姉を支えたまま片膝をついた。',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: '殿下。お預かりしたラピスさまを、お返しいたします。',
      speaker: 'アルマ'
    },
    {
      text: '……ありがとう、アルマ。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'normal' }
      ]
    },
    {
      text: 'それから姉は、自分がまだアルマの腕に支えられたままなのに気づいた。'
    },
    {
      text: '……重かったでしょう。',
      speaker: 'ラピスの姉'
    },
    {
      text: '……はい。',
      speaker: 'アルマ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: 'もう、そこは否定してくれないと。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'smile' }
      ]
    },
    {
      text: '姉の肩に額をつけたまま、ラピスが小さく笑った。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'やがて姉の目は、こちらの胸もとで止まった。',
      commands: [
        { type: 'char', id: 'sister', pose: 'surprised' }
      ]
    },
    {
      text: '……そのブローチ。',
      speaker: 'ラピスの姉'
    },
    {
      text: '持ってきてくれたのですね、指揮官。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'smile' }
      ]
    },
    {
      text: 'ラピスが顔を上げた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '姉さん。指揮官は、何も覚えてないんです。',
      speaker: 'ラピス'
    },
    {
      text: '境界から歩いて出てきて、倒れて。それより前のことは、何も。',
      speaker: 'ラピス'
    },
    {
      text: '姉はしばらくこちらの顔を見ていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'sad' }
      ]
    },
    {
      text: '……では、あの夜のことを覚えているのは、私だけなのですね。',
      speaker: 'ラピスの姉',
      choiceId: 'night'
    },
    {
      text: '姉は手を伸ばして、こちらの胸もとからブローチを外した。',
      commands: [
        { type: 'char', id: 'sister', pose: 'normal' }
      ]
    },
    {
      text: '氷を流す前に、指揮官に頼んだのです。いつか解けたらあの子に返してください、と。',
      speaker: 'ラピスの姉'
    },
    {
      text: '叶うとは思っていませんでした。指揮官も、私と一緒に凍るはずでしたから。',
      speaker: 'ラピスの姉'
    },
    {
      text: '列で、あなたに渡すつもりでした。でも渡せば、あなたは気づいたでしょう。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'sad' }
      ]
    },
    {
      text: '姉はブローチをラピスの襟につけた。留め金をとめる指は、もう震えていなかった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ラピスは襟もとのブローチに指先を当てた。裏の小さな傷のあたりだった。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '……つけてくれた。',
      speaker: 'ラピス'
    },
    {
      text: 'クラリスが抱えていた服をネーヴェに返していた。ネーヴェは手早く着こんで、ブーツのひもを結んでいた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '姉がネーヴェを見ていた。',
      commands: [
        { type: 'char', id: 'sister', pose: 'surprised' }
      ]
    },
    {
      text: '……ネーヴェ。指揮所の。',
      speaker: 'ラピスの姉'
    },
    {
      text: 'はい。殿下のまわりの氷を削ったのは、わたしです。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: '指揮官を掘り出して外へ運んだのも、わたしです。命令はありませんでしたので、わたしの判断です。',
      speaker: 'ネーヴェ'
    },
    {
      text: '……そうでしたか。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'smile' }
      ]
    },
    {
      text: 'ありがとう、ネーヴェ。あなたがいなければ、そのブローチはまだ指揮所の窓の前でした。',
      speaker: 'ラピスの姉'
    },
    {
      text: 'それから、姉の目はネーヴェが最後に羽織ろうとしている白い外套で止まった。',
      commands: [
        { type: 'char', id: 'sister', pose: 'normal' }
      ]
    },
    {
      text: '……ネーヴェ。その外套、少しのあいだ貸してもらえませんか。',
      speaker: 'ラピスの姉'
    },
    {
      text: 'これは、熱がこもります。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: 'それがいいのです。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: 'ネーヴェが外套を姉の肩にかけた。姉はすぐに襟をかき合わせて、あごまで埋まった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '……姉さん。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: '何ですか。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'normal' }
      ]
    },
    {
      text: '寒がり、治ってないんだ。',
      speaker: 'ラピス',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: '治るものではありません。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: '姉は外套の襟に埋まったまま、まっすぐ前を向いていた。耳が少し赤かった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '頭の上で、長いきしみが走った。',
      commands: [
        { type: 'bgShake', duration: 500, intensity: 4 }
      ]
    },
    {
      text: '裂け目のふちに白い筋が何本も走っていた。ラピスがはっとして、姉の頭の上の氷に手を伸ばした。重ねた霜がきしむたびに薄くなっていく。'
    },
    {
      text: '……重い。さっきより、ずっと。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '私が、自分のまわりを解いたからです。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: '姉はアルマの腕を離れて、ひとりで立った。片手をまっすぐ空の裂け目へ向ける。氷の中にいたときと同じ形だった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '姉の指先から霜が空へ伸びていった。ラピスの霜と重なって、裂け目のふちが白く厚くなる。きしみが少しだけ遠のいた。'
    },
    {
      text: 'ラピス。手を離して大丈夫です。ここは私が押さえます。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'normal' }
      ]
    },
    {
      text: 'ラピスはすぐには手を離さなかった。姉の横顔を見ていた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ソレイユがかざしていた手を下ろした。肩で息をしていた。陽だまりは、もう一行がやっと入れるほどの広さしかなかった。',
      commands: [
        { type: 'char', id: 'soleil', pose: 'sad' }
      ]
    },
    {
      text: '……長くはもちません。殿下も、私も。',
      speaker: 'ソレイユ'
    },
    {
      text: '裂け目のふちで、押さえきれなかった獣が何体か氷から身をもぎ離した。殻をきしませながら石畳へ落ちてくる。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgShake', duration: 400, intensity: 5 }
      ]
    },
    {
      text: 'ラピスは霜から手を離して、姉の前に出た。獣のほうへ向きなおる。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '今度は、私が姉さんを守ります。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious', bounce: true }
      ]
    }
  ],
  choices: {
    night: [
      {
        buttonText: 'あの夜のことを聞かせてほしい',
        branch: [
          { text: '姉は頭の上の裂け目に目をやった。', commands: [{ type: 'char', id: 'sister', pose: 'normal' }] },
          { text: 'ええ。……でも、いまではありません。', speaker: 'ラピスの姉' },
        ],
      },
      {
        buttonText: '覚えていなくて、すまない',
        branch: [
          { text: '姉は首を横に振った。', commands: [{ type: 'char', id: 'sister', pose: 'sad' }] },
          { text: '謝らないでください。……謝るのは、私のほうです。', speaker: 'ラピスの姉' },
        ],
      },
    ],
  },
};

export default scenario;
