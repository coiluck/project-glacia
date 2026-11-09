import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/frozen_center.avif（帝都中央、裂け目の真下。空に凍った裂け目、その下から獣があふれ出る形で止まっている）
// 立ち絵:
// - automaton（ロボ娘ネーヴェ）
const scenario: ScenarioFile = {
  id: '5-1',
  lines: [
    {
      text: '石畳に落ちた最後の獣が、黒い殻のかけらになって散らばった。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/frozen_center.avif', transition: 'fade' }
      ]
    },
    {
      text: 'ネーヴェがこちらに向き直った。'
    },
    {
      text: '行ってまいります。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: 'そう言うなり、ネーヴェは陽だまりを出て駆けだした。白い外套の背中は、凍った通りの先ですぐに小さくなった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ソレイユが陽だまりの真ん中に腰を下ろした。',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: '少し座らせてください。動かずにいれば、陽の減りも遅くなります。',
      speaker: 'ソレイユ'
    },
    {
      text: 'ソレイユは膝の上で手を重ねて、目を閉じた。'
    },
    {
      text: '中央は静かだった。頭の上では、裂け目からあふれた獣の群れが落ちる形のまま止まっていた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'クラリスが陽だまりのきわにしゃがんで、小石をひとつ置いた。'
    },
    {
      text: 'しばらくして見ると、陽だまりは小石のほんの少し内側まで縮んでいた。クラリスは何も言わずに、小石を新しいきわへ置きなおした。'
    },
    {
      text: 'それから手帳を開いて、門の前で書きとめた名前を見返していた。'
    },
    {
      text: '……隊長。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'normal' }
      ]
    },
    {
      text: '何ですか。',
      speaker: 'アルマ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'alma', pose: 'normal' }
      ]
    },
    {
      text: '門の人たちが目を覚ましたら、隊長は何て言うんですか。',
      speaker: 'クラリス',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'clarice', pose: 'normal' }
      ]
    },
    {
      text: 'アルマは、すぐには答えなかった。西の門のほうを見ていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: '……遅くなった、と。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'sad' }
      ]
    },
    {
      text: 'それだけですか。',
      speaker: 'クラリス',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'clarice', pose: 'surprised' }
      ]
    },
    {
      text: 'ほかに言えることがあれば、何年も前に言っています。',
      speaker: 'アルマ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'alma', pose: 'normal' }
      ]
    },
    {
      text: 'クラリスは手帳を閉じて、胸もとに戻した。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ラピスは、姉の前に座っていた。陽だまりのきわで膝を抱えて、氷の中の姉の顔を見上げていた。'
    },
    {
      text: '隣に座ると、ラピスはこちらを見ないまま口を開いた。'
    },
    {
      text: '……最初に何て言うか、ずっと考えてたんです。境界のそばで。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '会えたら、まず怒ろうとか。泣かないでおこうとか。名前を呼ばれるまで黙っていようとか。',
      speaker: 'ラピス'
    },
    {
      text: '毎晩ちがうことを考えてたのに、まだ決まってません。',
      speaker: 'ラピス',
      choiceId: 'words',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '凍った通りの先から、氷を蹴る軽い音が近づいてきた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ただいま戻りました。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: 'ネーヴェは息ひとつ乱さずに、こちらの前で足を止めた。'
    },
    {
      text: '報告します。騎士団のみなさんは隙間の外で待機しています。熱がないので中へは入れません。氷が解けたら、すぐに入るそうです。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: '……分かりました。',
      speaker: 'アルマ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: 'ラピスが立ち上がっていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'ネーヴェさん。エーリクさんは。',
      speaker: 'ラピス'
    },
    {
      text: 'お伝えしました。とんがった屋根の隣のお店の前に、息子さんがちゃんといました、と。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: 'エーリクさんは、何もおっしゃいませんでした。雪の上に座りこんで、しばらく動きませんでした。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'それから、名前を教えてくださいました。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'ヨナス、だそうです。八つです。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'ラピスは、ヨナス、と小さく繰り返した。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: 'エーリクさんは、騎士団のみなさんと一緒に待っています。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: 'ロザリーが、籠の底から白木の札を一枚取りだした。まだ何も刻まれていない札だった。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'rosalie', pose: 'normal' }
      ]
    },
    {
      text: 'クラリスさん。ヨナス、はどう綴りますか。',
      speaker: 'ロザリー'
    },
    {
      text: 'クラリスがロザリーの指を取って、札の上に一文字ずつなぞった。ロザリーは小刀でその跡をたどった。刻み終えると、ロザリーは札の溝を指先で何度も撫でた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '……ヨナスさん。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'smile' }
      ]
    },
    {
      text: 'ロザリーは、札を籠のいちばん上に置いた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ネーヴェが、ソレイユのすぐ隣まで歩いていった。ネーヴェの襟もとからは、もう煙は上がらなかった。'
    },
    {
      text: 'ソレイユは薄く目を開けてそれを見ると、膝に手をついて立ち上がった。'
    },
    {
      text: '……始めましょう。待っていても、陽は戻りません。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: 'ラピスが姉の前に立った。姉の頭のすぐ上で、裂け目から落ちてくる獣の爪が止まっている。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '大通りと同じです。私が裂け目のほうを押さえて、ソレイユさんが柔らかくして、ネーヴェさんが削る。',
      speaker: 'ラピス'
    },
    {
      text: '大通りでは、獣一体ぶんでしたね。',
      speaker: 'オボロ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: 'オボロは、裂け目のふちから石畳の上まで続く獣の群れを見上げていた。'
    },
    {
      text: 'ここで押さえるのは、裂け目のふちまで、ぜんぶです。',
      speaker: 'オボロ'
    },
    {
      text: '分かってる。',
      speaker: 'ラピス',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'ラピスは姉の頭の上の、獣の爪を包む氷に両手を当てた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '指先から霜が広がっていく。霜は爪から獣の脚へ、脚から殻へと這いあがり、裂け目のふちへ向かって伸びていった。'
    },
    {
      text: '大通りのときよりずっと長くかかった。霜が裂け目のふちに届いたとき、ラピスの肩は大きく上下していた。'
    },
    {
      text: '……つながりました。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'ソレイユが姉の背に両手をかざした。手のひらのあたりが陽炎のように揺らいだ。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: 'ネーヴェさん。どうぞ。',
      speaker: 'ソレイユ'
    },
    {
      text: 'ネーヴェが姉の前に膝をついて、上着のボタンに手をかけた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: '……ネーヴェさん？',
      speaker: 'クラリス',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'clarice', pose: 'surprised' }
      ]
    },
    {
      text: '全力で削ります。冷えているほど、速く削れます。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: '脱ぎます。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'アルマはもう、こちらの前に立っていた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'アルマの肩ごしに、白い外套が宙を舞うのが見えた。続けて上着が飛んだ。クラリスが外套をつかみ、上着をつかんだ。'
    },
    {
      text: '手袋がふたつ、ばらばらに飛んできた。クラリスはひとつを受け止めて、もうひとつを足で止めた。'
    },
    {
      text: 'ちょ、ちょっと、ネーヴェさん、今日多くないですか！？',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised' }
      ]
    },
    {
      text: '今日は全力です。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: 'シャツが飛んできた。クラリスの両腕は、もう服でいっぱいだった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'それからブーツがひとつ。もうひとつ。'
    },
    {
      text: 'ブーツもですか！？',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised' }
      ]
    },
    {
      text: '足の裏から熱が逃げます。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: '衣擦れの音が、ひときわ多うございますね。',
      speaker: 'ロザリー',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'rosalie', pose: 'normal' }
      ]
    },
    {
      text: 'アルマの背中の向こうで、ネーヴェの手が止まる気配がした。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '……もう一枚、いけます。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: 'それはだめです。',
      speaker: 'アルマ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: 'アルマはこちらに背を向けたまま動かなかった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '……了解しました。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: '削る音が始まった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '大通りのときとは音が違った。硬い音が途切れずに続いて、氷の粉が霧のように舞いあがる。'
    },
    {
      text: '姉の肩のあたりの氷が、目に見えて薄くなっていった。'
    },
    {
      text: '……速い。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'surprised' }
      ]
    },
    {
      text: 'ひと削りごとに、頭の上で氷がきしんだ。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgShake', duration: 300, intensity: 3 }
      ]
    },
    {
      text: 'そのたびにラピスが手に力をこめなおした。霜が裂け目のふちで白く厚くなって、きしみが止まる。止まったと思うとまた次のきしみが来た。'
    },
    {
      text: '……星が揺れてる。削るたびに。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: 'ステラは裂け目の真上の星へ糸を伸ばしていた。糸の先が細かく震えていた。'
    },
    {
      text: 'ラピス、手を離しちゃだめだよ。いま離したら、また落ちてくる。',
      speaker: 'ステラ'
    },
    {
      text: '……離しません。',
      speaker: 'ラピス',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'ラピスの額に汗が浮いていた。凍った帝都の中で汗をかいているのは、ラピスとソレイユだけだった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'クラリスの置いた小石が、いつのまにか陽だまりの外に出ていた。陽だまりのきわは、こちらの靴の先のすぐ前まで来ていた。'
    },
    {
      text: 'ソレイユの手のひらの揺らぎが、少しずつ弱くなっていた。'
    },
    {
      text: '……ソレイユさん。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '止めません。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: 'ソレイユは、目を閉じたまま答えた。'
    },
    {
      text: '陽だまりが殿下から離れきる前に、終わらせてください。',
      speaker: 'ソレイユ'
    },
    {
      text: 'ソレイユさん、もう少し前に出られないんですか。',
      speaker: 'クラリス',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'clarice', pose: 'surprised' }
      ]
    },
    {
      text: '出られません。ここから先は、裂け目の真下です。陽は裂け目の氷まで溶かします。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: 'ネーヴェは何も言わずに、削る手を速めた。',
      choiceId: 'hurry',
      commands: [
        { type: 'char', id: 'automaton', pose: 'serious' }
        { type: 'charDelete' }
      ]
    },
    {
      text: '姉の胸もとの氷が割れて落ちた。'
    },
    {
      text: '襟もとに当てられていた姉の手が、氷の中から出てきた。指先はブローチのない襟をつかんだ形のまま、白くなっていた。'
    },
    {
      text: 'ラピスは霜を押さえたままその指先を見ていた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '……姉さん。',
      speaker: 'ラピス'
    },
    {
      text: 'そのとき、うしろで氷を引っかく音がした。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgShake', duration: 400, intensity: 4 }
      ]
    },
    {
      text: '振り向くと、石畳の上の獣たちが身をよじっていた。熱と削る音に引かれて、氷から少しずつ這いだしてくる。'
    },
    {
      text: '手を止めると、氷が元に戻ろうとします。ここまで削ったぶんが埋まります。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: 'ネーヴェは振り向かずに削りつづけていた。ラピスもソレイユも、手を離さなかった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '三人ともここから動けません。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'アルマが剣を抜いた。こちらの前に立ったまま、獣のほうへ向きなおった。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: '指揮官。三人の背中は、私たちで守ります。',
      speaker: 'アルマ'
    }
  ],
  choices: {
    words: [
      {
        buttonText: '決めなくていい',
        branch: [
          { text: '……そうですね。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
          { text: '考えてたことなんて、会ったらきっと全部どこかへ行っちゃいます。', speaker: 'ラピス' },
        ],
        points: { lapisTrust: 1 },
      },
      {
        buttonText: 'いちばん言いたいことは？',
        branch: [
          { text: 'ラピスは、少しのあいだ黙っていた。', commands: [{ type: 'char', id: 'lapis', pose: 'surprised' }] },
          { text: '……内緒です。先に指揮官に言ったら、姉さんがすねます。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
        ],
        points: { lapisTrust: 1 },
      },
    ],
    hurry: [
      {
        buttonText: 'ラピスの肩を支える',
        branch: [
          { text: 'ラピスのうしろに回って、両肩を支えた。ラピスの体は思っていたよりずっと冷えていた。', commands: [{ type: 'char', id: 'lapis', pose: 'surprised' }] },
          { text: '……ありがとうございます。少し楽になりました。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
        ],
        points: { lapisTrust: 1 },
      },
      {
        buttonText: '陽だまりの広さを伝える',
        branch: [
          { text: '陽だまりのきわが、もう姉の足もとから靴みっつぶん離れたことを伝えた。' },
          { text: '……聞こえました。', speaker: 'ソレイユ', commands: [{ type: 'char', id: 'soleil', pose: 'serious' }] },
          { text: 'ソレイユはかざした手を、ほんの少しだけ姉に近づけた。' },
        ],
      },
    ],
  },
};

export default scenario;
