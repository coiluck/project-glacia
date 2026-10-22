import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/west_border.avif（帝都の西側の境界。白く霞む線の向こうに、凍った外周の街）※未作成
// - bg/camp_tent.avif（ソレイユの天幕の中として使う）
const scenario: ScenarioFile = {
  id: '3-6',
  lines: [
    {
      text: '最後の鳥が雪の上に落ちると、境界のきわはまた静かな白に戻った。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/west_border.avif', transition: 'fade' }
      ]
    },
    {
      text: '丘の陰の野営に戻っても、陣の人たちはほとんど口をきかなかった。いくつもの焚き火のまわりで、誰もが境界のほうを見ていた。'
    },
    {
      text: 'エーリクは、焚き火から離れた雪の上にひとりで座っていた。空の籠を、膝に抱えたままだった。'
    },
    {
      text: '日が暮れてから、ソレイユの天幕に集まった。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/camp_tent.avif', transition: 'fade' }
      ]
    },
    {
      text: 'ラピスは、みんなの前に座った。膝の上で手を一度握って、ほどいた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '指揮官。ブローチを見せてもらえますか。',
      speaker: 'ラピス'
    },
    {
      text: '差し出したブローチを、ラピスはみんなに見えるように手のひらに載せた。'
    },
    {
      text: 'これは、姉のものです。母の形見で、姉がいつも襟につけていました。',
      speaker: 'ラピス'
    },
    {
      text: 'この霜も、姉の氷です。私は氷の魔法を使うので分かります。野営地にいたときから、分かっていました。',
      speaker: 'ラピス'
    },
    {
      text: '……でも境界の氷が姉の氷だなんて、思ってませんでした。帝都ほどの広さを凍らせるなんて、姉にもできないって。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '……帝都まるごとなんて、塔の大魔女が百人並んでも無理だよ。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: 'はい。どうやったのかは、私にも分かりません。でも今日触って分かりました。あれは姉さんの氷です。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'ラピスはうなずいて、袖の中から苦無を取り出した。山道で拾ったものだった。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '柄の端に、指の先ほどの小さな紋が彫ってあった。'
    },
    {
      text: 'これは帝国の隠密が使う苦無です。この紋は皇家に仕える者にしか許されていません。',
      speaker: 'ラピス'
    },
    {
      text: '山の上でステラさんの星を止めたのも、陣に「溶かすな」と書いて置いていったのも、皇家の隠密です。たぶん、姉の氷を守るために。',
      speaker: 'ラピス'
    },
    {
      text: 'どうして私が、こんな紋を知っているのか。',
      speaker: 'ラピス'
    },
    {
      text: 'ラピスは苦無を膝の上に置いて、顔を上げた。'
    },
    {
      text: '……姉は、皇女です。',
      speaker: 'ラピス'
    },
    {
      text: '私も、皇女です。',
      speaker: 'ラピス'
    },
    {
      text: '天幕の中で、焚き火のはぜる音だけがした。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ステラが口を開けたまま固まっていた。シルヴィはラピスの顔をじっと見ていた。ソレイユは目を伏せていた。'
    },
    {
      text: 'ベルミリアは何も言わなかった。'
    },
    {
      text: '……帝都に裂け目が開いた日に、真っ先に外へ逃がされた皇女さま、ってのは。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '私です。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '南の街に誰も行かなかったことも知っています。宿場の紙も読みました。',
      speaker: 'ラピス'
    },
    {
      text: '……ずっと、言えませんでした。ごめんなさい。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ],
      choiceId: 'reveal'
    },
    {
      text: 'ベルミリアは立ち上がって、天幕の入口の布をめくった。外の冷たい風が入ってくる。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ベルミリアはしばらく境界のほうを見ていた。'
    },
    {
      text: '……焼けた街で、私が言ったな。凍ってなかったら、帝都もこうなってたって。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: '凍らせたのがあんたの姉さんなら、あんたの姉さんは、帝都をああさせなかったってことだ。',
      speaker: 'ベルミリア'
    },
    {
      text: '恨む相手がはっきりしたら、少しは楽になると思ってた。',
      speaker: 'ベルミリア'
    },
    {
      text: '……ならないもんだな。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'sad' }
      ]
    },
    {
      text: 'ベルミリアは布を下ろして、ラピスに向き直った。'
    },
    {
      text: '南に誰も来なかったのは、たぶん一生忘れない。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: 'それでも、手を貸す。',
      speaker: 'ベルミリア'
    },
    {
      text: 'ラピスの目に、涙がにじんだ。ラピスはそれを袖でぬぐって、深く頭を下げた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '……私も、今さら知らない人の顔はできないわね。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'normal' }
      ]
    },
    {
      text: '開いたままだったステラの口が、ようやく動いた。'
    },
    {
      text: '……待って。じゃあ私、山の上で皇女さまのお姉さんに星落とそうとしてたの……？',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'surprised' }
      ]
    },
    {
      text: '……はい。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: 'ステラは帽子のつばをつかんで、顔が隠れるまで引き下ろした。'
    },
    {
      text: '……うわあ。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'sad' }
      ]
    },
    {
      text: 'しばらくそうしてから、ステラはつばを跳ね上げた。'
    },
    {
      text: '手、貸す！ 貸させて！ 落とす以外で！',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious', bounce: true }
      ]
    },
    {
      text: 'ラピスは泣きそうな顔のまま、少しだけ笑った。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: 'ソレイユが、静かに顔を上げた。'
    },
    {
      text: 'ラピスさん。陣の人たちに、儀式をやめると伝えなければなりません。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: 'わけを話さずにやめれば、みんなは納得しないでしょう。私の口から話しましょうか。',
      speaker: 'ソレイユ'
    },
    {
      text: 'ラピスは、首を横に振った。'
    },
    {
      text: '私が話します。姉の氷ですから。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '野営の真ん中で、ラピスは焚き火の前に立った。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/west_border.avif', transition: 'fade' }
      ]
    },
    {
      text: 'ソレイユがみんなを呼び集めると、焚き火のまわりに人の輪ができた。いちばん後ろに、エーリクの姿もあった。'
    },
    {
      text: '……境界の氷は、私の姉がかけたものです。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '姉は、皇女です。私も、皇女です。',
      speaker: 'ラピス'
    },
    {
      text: 'ざわめきが、輪の端から端まで走った。'
    },
    {
      text: '皇女……？',
      speaker: '陣の男'
    },
    {
      text: 'やっぱり、皇家が凍らせたんじゃないか！',
      speaker: '陣の女'
    },
    {
      text: '自分だけ逃げた皇女さまが、今度は溶かすなって言いに来たのか！',
      speaker: '陣の男'
    },
    {
      text: 'ラピスは、声のするほうから目をそらさなかった。'
    },
    {
      text: '……姉が何のために凍らせたのかは、まだ分かりません。',
      speaker: 'ラピス'
    },
    {
      text: 'でも溶かせば、姉の身に何が起きるか分かりません。止まっている帝都の裂け目が、どうなるかも。',
      speaker: 'ラピス'
    },
    {
      text: 'だから、溶かさないでください。……お願いします。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: 'ラピスは、深く頭を下げた。'
    },
    {
      text: '輪の後ろから、エーリクが前に出てきた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '……あなたのお姉さんが、うちの息子を、あそこに。',
      speaker: 'エーリク'
    },
    {
      text: 'ラピスは頭を上げなかった。'
    },
    {
      text: '……はい。',
      speaker: 'ラピス'
    },
    {
      text: 'エーリクは何か言おうとして、言葉にならないまま口を閉じた。'
    },
    {
      text: 'ソレイユが、ラピスの隣に並んだ。',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: '陽の日の儀式は、取りやめます。私が決めたことです。',
      speaker: 'ソレイユ'
    },
    {
      text: '責めるなら、私を責めてください。何年もあなたがたに「溶かせば会える」と言い続けたのは、私なのですから。',
      speaker: 'ソレイユ'
    },
    {
      text: '誰も、すぐには何も言わなかった。やがて輪の端の人から、ひとり、またひとりと焚き火を離れていった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'エーリクは最後まで立っていた。それから境界のほうへ背を向けて、自分の焚き火へ戻っていった。'
    },
    {
      text: 'ラピスはようやく頭を上げた。その背中を、こちらは黙って見ていた。',
      choiceId: 'after'
    },
    {
      text: 'その夜更け、見張りの男が野営に駆け込んできた。'
    },
    {
      text: '南だ！ 境界沿いに、松明が来る！ ……騎士団の旗だ！',
      speaker: '見張りの男'
    },
    {
      text: '丘の上に出ると、境界の線に沿って小さな火がいくつも揺れながら近づいてくるのが見えた。'
    },
    {
      text: 'その火を追うように、暗がりの中で、白く丸い影と、雪の上を這う大きな影がうごめいていた。'
    },
    {
      text: '……あの旗、アルマの……！',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '風に乗って、聞き覚えのある声が届いた。'
    },
    {
      text: '止まらないでください！ 野営は、もうすぐそこです！',
      speaker: 'クラリス'
    },
    {
      text: 'ラピスはもう、丘を駆け下りはじめていた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '行きましょう、指揮官！',
      speaker: 'ラピス'
    },
  ],
  choices: {
    reveal: [
      {
        buttonText: 'ラピスはラピスだ',
        branch: [
          { text: 'ラピスは、こちらを見た。', commands: [{ type: 'char', id: 'lapis', pose: 'surprised' }] },
          { text: '……指揮官は、いつもそう言ってくれそうな顔をしてました。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
          { text: 'だから、余計に言えなかったんです。', speaker: 'ラピス' },
        ],
        points: { lapisTrust: 1 },
      },
      {
        buttonText: '話してくれてよかった',
        branch: [
          { text: '……はい。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
          { text: '野営地にいたころから、本当はずっと、誰かに聞いてほしかったのかもしれません。', speaker: 'ラピス' },
        ],
        points: { lapisTrust: 1 },
      },
    ],
    after: [
      {
        buttonText: 'よく言った',
        branch: [
          { text: 'ラピスが振り返った。目の端が赤かった。', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
          { text: '……全然言えてません。姉が何のためにこうしたのか、私、何も知らないんです。', speaker: 'ラピス' },
          { text: '知らないまま、溶かすなって言いました。', speaker: 'ラピス' },
        ],
        points: { lapisTrust: 1 },
      },
      {
        buttonText: '隣に立つ',
        branch: [
          { text: 'ラピスの隣に立った。ラピスは何も言わずに、こちらの外套のすそを少しだけつかんだ。', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
          { text: '……エーリクさんと、探しっこしようって約束したんです。', speaker: 'ラピス' },
        ],
        points: { lapisTrust: 1 },
      },
    ],
  },
};

export default scenario;
