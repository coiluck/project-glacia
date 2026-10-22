import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/west_hill.avif（西へ続くゆるい丘。遠くに雪をかぶった山）※未作成
// - bg/soleil_camp.avif（山のふもとの聖女の陣。斜面に陽石が並ぶ。夜は陣の上に小さな太陽）※未作成
const scenario: ScenarioFile = {
  id: '3-2',
  lines: [
    {
      text: '最後の影が丘のふもとで消えたとき、東の空が白みはじめていた。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/west_hill.avif', transition: 'fade' }
      ]
    },
    {
      text: '丘の斜面のあちこちに、小さな焦げ跡が残っていた。ステラが落とした星の跡だった。'
    },
    {
      text: '丘ごとは、焼かなかったでしょ。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'smile', bounce: true }
      ]
    },
    {
      text: '草はだいぶ焼いたけどな。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: 'ステラは聞こえないふりをして、紙の束に「指二本分、東」と大きく書き込んだ。'
    },
    {
      text: 'ステラの案内で丘をいくつか越えると、昼過ぎに、山のふもとが見えてきた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '斜面には無数の光る点が並んでいた。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/soleil_camp.avif', transition: 'crossfade' }
      ]
    },
    {
      text: '近づくと、それは手のひらほどの石だった。段々に切られた斜面の一段一段に、石が日の光を浴びるように並べてある。どれも内側から淡く光っていた。'
    },
    {
      text: 'その下に、テントと小屋が広がっていた。煙が何本も立ち、槌の音と子どもの声が聞こえる。'
    },
    {
      text: '……人が、こんなに。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '帝都から逃げてきた人と、南の街から来た人と。谷のエルフも、ときどき下りてくるよ。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'smile' }
      ]
    },
    {
      text: 'あの石は陽石。ソレイユが陽の光を溜めてるの。儀式の日に、あれを全部使うんだ。',
      speaker: 'ステラ'
    },
    {
      text: '陣の手前の野原に、家が一軒まるごと入りそうな、大きなくぼみがあった。底の土が黒く焼けて固まっている。'
    },
    {
      text: '……あれは？',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '……昔のやつ。来たばっかりのころの。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'sad' }
      ]
    },
    {
      text: 'くぼみのふちで遊んでいた子どもたちが、ステラに気づいて手を振った。'
    },
    {
      text: 'ステラの穴だー！ ステラ、また落としたのー？',
      speaker: '陣の子ども'
    },
    {
      text: '落としてない！ ……ここには！',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'surprised', bounce: true }
      ]
    },
    {
      text: '陣の入口で、籠を背負った男が足をすべらせた。籠から陽石がこぼれて、坂を転がっていく。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ラピスが駆け寄って、石をいくつか拾い上げた。'
    },
    {
      text: 'あっ、すみません、すみません！ 割れてませんか、それ。',
      speaker: '陣の男'
    },
    {
      text: '大丈夫です。……あったかい。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: 'でしょう。冬でもこれを抱いて寝れば凍えません。',
      speaker: '陣の男'
    },
    {
      text: '男は石を籠に戻しながら、ラピスの顔をのぞきこんだ。'
    },
    {
      text: 'その話し方……帝都の人ですか。',
      speaker: '陣の男'
    },
    {
      text: '……はい。',
      speaker: 'ラピス'
    },
    {
      text: 'やっぱり。私もです。西の門の近くで、時計屋をやってました。エーリクといいます。',
      speaker: 'エーリク'
    },
    {
      text: '女房と息子が、中にいるんです。息子は八つで、時計の音が好きな子で……',
      speaker: 'エーリク'
    },
    {
      text: 'エーリクは籠を背負いなおして、北の空を見た。そちらに帝都は見えなかった。'
    },
    {
      text: 'もうすぐ、会えます。聖女さまが溶かしてくださるので。',
      speaker: 'エーリク'
    },
    {
      text: 'エーリクは何度も頭を下げて、斜面のほうへ上がっていった。'
    },
    {
      text: 'ラピスは、その背中をしばらく見送っていた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: 'ソレイユは、陣のいちばん上の段にいた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '白い衣の女性が並んだ陽石の前に膝をついて、一つずつ両手をかざしている。手が離れるたびに、石の光が少し強くなった。'
    },
    {
      text: 'ソレイユ、ただいま！ お客さん連れてきたよ。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'smile' }
      ]
    },
    {
      text: 'お帰りなさい、ステラ。……ゆうべ、南の空が光りましたね。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'smile' }
      ]
    },
    {
      text: '……外れた。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'sad' }
      ]
    },
    {
      text: 'けが人は。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: 'いない。落ちたとこ、焼けた森のほうだったから。……燃えるもの、もう残ってなかった。',
      speaker: 'ステラ'
    },
    {
      text: 'そうですか。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'sad' }
      ]
    },
    {
      text: '南の裂け目は、伸びたのですね。では、南から逃げてくる人が増えます。寝床を空けておかなくては。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'normal' }
      ]
    },
    {
      text: 'ソレイユは立ち上がって、こちらに向き直った。'
    },
    {
      text: 'ソレイユと申します。この陣で、陽の番をしています。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'smile' }
      ]
    },
    {
      text: 'ステラがこれまでのことを手短に話した。境界から人が出てきたというところで、ソレイユの手が止まった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '……境界の、内側から。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'surprised' }
      ]
    },
    {
      text: 'ソレイユはこちらの手を取った。陽石と同じくらい、温かい手だった。'
    },
    {
      text: '中の人たちは、生きていますか。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ],
      choiceId: 'alive'
    },
    {
      text: 'ソレイユはこちらの手を離して、北の空を見上げた。',
      commands: [
        { type: 'char', id: 'soleil', pose: 'normal' }
      ]
    },
    {
      text: '帝都が凍ってから、帝都の裂け目からは一匹の魔物も出てきていません。ほかの裂け目は、どれも季節ごとに広がっているのに。',
      speaker: 'ソレイユ'
    },
    {
      text: 'あの氷が、裂け目を消したのだと私は考えています。いまの氷は、もう中の人を閉じ込めているだけです。',
      speaker: 'ソレイユ'
    },
    {
      text: 'それなら溶かせばいい。陽がいちばん高くなる日に、溜めた陽をすべて使って。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: '溶かしたら、帝都の裂け目はどうなる。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: 'もうありません。帝都の裂け目の星は、凍った日から見えなくなったと、ステラが。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'normal' }
      ]
    },
    {
      text: 'ベルミリアがステラを見た。ステラは、陣の上の空を見上げていた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '……見えなくなったのは、本当だよ。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'normal' }
      ]
    },
    {
      text: 'でも陣からだと夜も明るすぎて、暗い星は狙いがつけられないんだ。だから――',
      speaker: 'ステラ'
    },
    {
      text: 'ステラが言いかけたとき、下の段から大きな声が上がった。'
    },
    {
      text: '聞いたか！ 境界の中から、人が出てきたんだと！',
      speaker: 'エーリク'
    },
    {
      text: 'さっきの男だった。籠を背負ったまま、下の段に向かって叫んでいる。話が聞こえる場所で、陽石を並べていたらしい。'
    },
    {
      text: '声はあっという間に陣じゅうに広がった。斜面のあちこちから、人が上がってくる。'
    },
    {
      text: '本当か。中の人は生きてるのか。',
      speaker: '陣の男'
    },
    {
      text: 'うちの母さんを見なかったかい。西の通りの、宿屋の。',
      speaker: '陣の女'
    },
    {
      text: '出てこられたってことは、中で生きてたってことだろ！ な、そうだろ！',
      speaker: 'エーリク'
    },
    {
      text: '囲まれていた。誰かに肩をつかまれる。ひとつ答えるより先に、次の問いが重なった。'
    },
    {
      text: 'みなさん。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: 'ソレイユの声は大きくなかった。それでも、まわりがすっと静かになった。'
    },
    {
      text: 'この方は、中のことを覚えていないそうです。問い詰めても、答えは出てきません。',
      speaker: 'ソレイユ'
    },
    {
      text: 'けれど、この方は生きて出てこられました。それだけは確かです。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'smile' }
      ]
    },
    {
      text: 'わっと声が上がった。誰かが泣き出し、誰かが手を叩いた。エーリクが、隣の男と肩を抱き合っていた。'
    },
    {
      text: 'ラピスは、その輪のいちばん外で、何も言わずに立っていた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ],
      choiceId: 'crowd'
    },
    {
      text: '日が沈むと、陣のいちばん上で、ソレイユが陽石をひとつ空へ放った。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '石は落ちてこなかった。陣の上の高いところで止まって、小さな太陽のように光りはじめた。夜なのに、陣の中は夕方のように明るかった。'
    },
    {
      text: 'あてがわれた小屋の前で、その光を見上げていると、陣の南の端で鐘が鳴った。'
    },
    {
      text: '南の道に人が来てる！ 魔物に追われてるぞ！',
      speaker: '見張りの男'
    },
    {
      text: '小屋から飛び出してきたステラが、南の暗がりに目をこらした。',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '……焼けた街のほうから来た人たちだ。裂け目が伸びたから、逃げてきたんだよ。',
      speaker: 'ステラ'
    },
    {
      text: '南の道を、荷車を引いた人たちが坂を上ってくる。そのすぐ後ろで、陽炎のような影がいくつも揺れていた。'
    },
    {
      text: 'ソレイユが、白い衣のすそを持ち上げて段を駆け下りてきた。',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: 'あの人たちを、陣の中へ。ひとりも置いていかないでください。',
      speaker: 'ソレイユ'
    },
    {
      text: 'ラピスが、こちらの隣に並んだ。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '行きましょう、指揮官。',
      speaker: 'ラピス'
    },
  ],
  choices: {
    alive: [
      {
        buttonText: '覚えていない',
        branch: [
          { text: '……そうですか。', speaker: 'ソレイユ', commands: [{ type: 'char', id: 'soleil', pose: 'sad' }] },
          { text: 'それでもあなたは生きて出てこられました。中の人も、きっと。', speaker: 'ソレイユ', commands: [{ type: 'char', id: 'soleil', pose: 'smile' }] },
        ],
      },
      {
        buttonText: '分からない。だから確かめに来た',
        branch: [
          { text: '確かめに。', speaker: 'ソレイユ', commands: [{ type: 'char', id: 'soleil', pose: 'normal' }] },
          { text: '……ええ。私も、それを確かめたいのです。氷を溶かして、この目で。', speaker: 'ソレイユ', commands: [{ type: 'char', id: 'soleil', pose: 'smile' }] },
        ],
      },
    ],
    crowd: [
      {
        buttonText: 'ラピスのそばへ行く',
        branch: [
          { text: '人の輪を抜けて、ラピスの隣に立った。' },
          { text: '……みんな、喜んでますね。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] },
          { text: '私も、喜べたらいいのに。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
        ],
      },
      {
        buttonText: 'ベルミリアを見る',
        branch: [
          { text: 'ベルミリアも、輪に入らずに腕を組んでいた。' },
          { text: '……出てきたやつがいるってことは、溶かせば全員出てこられる。そう聞こえたんだろうな。', speaker: 'ベルミリア', commands: [{ type: 'char', id: 'vermilia', pose: 'serious' }] },
          { text: '誰も、そうは言ってないのにな。', speaker: 'ベルミリア' },
        ],
      },
    ],
  },
};

export default scenario;
