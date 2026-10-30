import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/soleil_camp.avif（山のふもとの聖女の陣。斜面に陽石が並ぶ。夜は陣の上に小さな太陽）
// - bg/mountain_path.avif（西の山道。岩場の先に、エルフの谷。夜の山の上もこれで代用）
const scenario: ScenarioFile = {
  id: '3-3',
  lines: [
    {
      text: '荷車の列が陣の柵の内側に入りきったのは、夜半を過ぎてからだった。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/soleil_camp.avif', transition: 'fade' }
      ]
    },
    {
      text: '逃げてきた人たちは、焚き火のまわりに座り込んで動かなくなった。煤で黒くなった顔のまま、眠ってしまった子どももいる。'
    },
    {
      text: 'ソレイユはそのひとりひとりの前に膝をついて回った。火傷に手をかざすと、赤くただれた肌が少しずつ落ち着いていく。'
    },
    {
      text: '朝まで続けるつもりらしかった。ステラが毛布を持っていっても、肩に掛けたまま手を止めなかった。'
    },
    {
      text: '……ああいう人なんだよね。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'normal' }
      ]
    },
    {
      text: '私がここに来て、あの穴を空けたときもさ。誰も怒らないうちに、ソレイユが先に頭を下げて回ってくれたの。陣のみんなに。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'sad' }
      ]
    },
    {
      text: 'ステラはそれ以上何も言わずに、ソレイユの隣で湯を沸かしはじめた。'
    },
    {
      text: '翌朝、シルヴィと一緒に山道を登った。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/mountain_path.avif', transition: 'crossfade' }
      ]
    },
    {
      text: '岩場を抜けた先に、細長い谷があった。斜面にへばりつくように低い木の家が並んでいる。まわりに木は少なく、植えたばかりの苗木が杭に結ばれて風に揺れていた。'
    },
    {
      text: '谷の入口で、背の高いエルフの老人が待っていた。'
    },
    {
      text: '……シルヴィ。',
      speaker: 'エルフの長老'
    },
    {
      text: 'シルヴィは老人の前まで歩いていって、胸もとの布の包みを両手で差し出した。',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'normal' }
      ]
    },
    {
      text: '古木の実よ。てっぺんに生ってたのは、これで全部。',
      speaker: 'シルヴィ'
    },
    {
      text: '木立は季節替わりの火で焼けたわ。……刻みのとおりだった。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'sad' }
      ]
    },
    {
      text: '老人は包みを受け取って、しばらく手の上で重さを確かめていた。'
    },
    {
      text: 'よく持ってきた。谷のいちばん日当たりのいいところに蒔こう。',
      speaker: 'エルフの長老'
    },
    {
      text: 'それで、お前はどうする。',
      speaker: 'エルフの長老'
    },
    {
      text: '……ここに残るわ。守る木はもうないもの。',
      speaker: 'シルヴィ'
    },
    {
      text: '老人は谷の向こうの北の空を見た。'
    },
    {
      text: '聖女さまが、帝都の氷を溶かそうとしておられるのは知っているね。',
      speaker: 'エルフの長老'
    },
    {
      text: 'あの方は善い方だ。この谷にも、何度も陽石を分けてくださった。',
      speaker: 'エルフの長老'
    },
    {
      text: 'だが森の北半分を焼いた火も、善い人の手で放たれたものだった。',
      speaker: 'エルフの長老'
    },
    {
      text: 'あの火が正しかったことは分かっている。それでも、わしらは火を放つ前に長いこと話を聞いてもらった。',
      speaker: 'エルフの長老'
    },
    {
      text: '帝都の氷のことは、誰も測っておらん。',
      speaker: 'エルフの長老'
    },
    {
      text: 'シルヴィは老人の顔を見上げた。',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'surprised' }
      ]
    },
    {
      text: '測る者は、測りに行きなさい。種は、わしらが育てておく。',
      speaker: 'エルフの長老'
    },
    {
      text: 'シルヴィはしばらく黙っていた。それから腕をまっすぐ前に伸ばして、空に指を一本立てた。',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'normal' }
      ]
    },
    {
      text: '……刻む木がなくても、測ることはできるわね。',
      speaker: 'シルヴィ',
      choiceId: 'measure'
    },
    {
      text: '陣に戻ると、ステラが杖を抱えて待っていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/soleil_camp.avif', transition: 'fade' }
      ]
    },
    {
      text: '今夜、山に登ろう！ 陣の明かりが届かないとこまで。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'smile', bounce: true }
      ]
    },
    {
      text: 'シルヴィも来てね。南の星、狙い直したいの。指二本分のずれ、ちゃんと直ってるか見てほしくて。',
      speaker: 'ステラ'
    },
    {
      text: '……落とさないでしょうね。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: '落とさない落とさない。狙うだけ。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'smile' }
      ]
    },
    {
      text: 'それとね。……帝都の星も、狙ってみたい。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '日が沈んでから、山の肩まで登った。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/mountain_path.avif', transition: 'crossfade' },
        { type: 'bgMove', direction: 'bottomToTop', duration: 2500 }
      ]
    },
    {
      text: '振り返るとふもとの陣の上で、小さな太陽が光っていた。ここまで来ると、もう空は暗かった。'
    },
    {
      text: 'ステラは岩の上に立って、杖を南の空へ向けた。杖の先から髪の毛ほどの細い光の糸が、空へまっすぐ伸びていく。',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '糸の先は赤い裂け目の上の、小さな星に結ばれていた。星は糸の先でかすかに揺れている。'
    },
    {
      text: 'シルヴィが、隣で腕を伸ばして、指を星に重ねた。'
    },
    {
      text: '……指半分、西。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'normal' }
      ]
    },
    {
      text: '糸の先が、わずかに動く。'
    },
    {
      text: '……いま。合ってるわ。',
      speaker: 'シルヴィ'
    },
    {
      text: 'ステラは糸をつないだまま、長く息を吐いた。'
    },
    {
      text: '……合った。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'smile' }
      ]
    },
    {
      text: '塔にいたころからずっと、どこがずれてるのか、誰にも教えてもらえなかったんだ。',
      speaker: 'ステラ'
    },
    {
      text: 'ステラは糸を切ると、くるりと北を向いた。',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '北の地平線の上は、ほんのりと白く光っていた。帝都の氷の照り返しだと、ステラが言った。その光の中を、ステラはしばらく目でたどっていた。'
    },
    {
      text: '……いた。',
      speaker: 'ステラ'
    },
    {
      text: '杖の先から、また糸が伸びた。白い光の中の目をこらさなければ見えないほど暗い星に、糸の先が結ばれる。'
    },
    {
      text: '……あれ？',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'surprised' }
      ]
    },
    {
      text: 'ステラは糸の先の星と手もとの紙の束を何度も見比べた。'
    },
    {
      text: '狙ってる星はね、裂け目が広がるぶんだけ、ちょっとずつ揺れるの。さっきの南のもずっと揺れてたでしょ。',
      speaker: 'ステラ'
    },
    {
      text: 'これ、揺れてない。凍った日に書いた場所から、ぴったり動いてない。',
      speaker: 'ステラ'
    },
    {
      text: '……消えてないよ。止まってる。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '止まってるなら、氷を溶かしたらまた動きだすのね。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: 'たぶん。あの日、凍るまでの帝都の星は、どの星よりも揺れてたもん。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'normal' }
      ]
    },
    {
      text: 'ベルミリアが腰の袋に手をやった。焼き印の入った袋だった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '……誰かが、止めてるんですか。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'ステラは答えなかった。糸の先の星を、じっと見つめていた。',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '……止まってる的なんて、はじめて見た。',
      speaker: 'ステラ'
    },
    {
      text: '杖の先のまわりに青白い光の粒が集まりはじめた。丘の上で見たときと同じだった。粒は回るたびに数を増やし、明るくなっていく。'
    },
    {
      text: 'これなら、絶対に外さない。いま落とせば、帝都の裂け目を撃ち抜ける。氷なんか、溶かさなくても――',
      speaker: 'ステラ'
    },
    {
      text: 'ステラさん！ 帝都には、人がいます！ 姉さんも……！',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised', bounce: true }
      ]
    },
    {
      text: 'ステラには、聞こえていないようだった。光の粒が渦を巻いて、杖の先でひとつの塊になっていく。夜空の星がひとつ、糸の先でぐらりと揺れた。',
      commands: [
        { type: 'charDelete' }
      ],
      choiceId: 'stop'
    },
    {
      text: '闇の中から、何かが風を切って飛んできた。'
    },
    {
      text: '甲高い音がして、杖の先の玉に細い刃物が当たった。光の塊がはじけて、ただの火の粉になって散っていく。夜空の糸がふつりと切れた。',
      commands: [
        { type: 'bgShake', duration: 400, intensity: 6 }
      ]
    },
    {
      text: '……おやめください。',
      speaker: '？？？'
    },
    {
      text: '低い声が頭の上の岩場から聞こえた。見上げたときには、もう誰もいなかった。'
    },
    {
      text: 'ステラは杖を握ったまま、岩の上に座り込んでいた。'
    },
    {
      text: '……私、いま何しようとしてた？',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'surprised' }
      ]
    },
    {
      text: '帝都の真ん中に落としたら……真ん中にいる人、全部……',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'sad' }
      ]
    },
    {
      text: 'ステラの手が震えていた。帽子のつばを引き下ろそうとして、うまくつかめずにいた。'
    },
    {
      text: 'ラピスは岩の上に落ちていた刃物を拾い上げた。苦無だった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ラピスは苦無の柄を指でなぞって、そこで手を止めた。それから柄を握りこむようにして袖の中へしまった。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ],
      choiceId: 'kunai'
    },
    {
      text: 'そのとき、足もとの岩がぐらりと動いた。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgShake', duration: 600, intensity: 8 }
      ]
    },
    {
      text: '散った火の粉が落ちたあたりで、岩に見えていたものが次々に起き上がる。前にも後ろにも、道をふさぐように。'
    },
    {
      text: 'イワモチ……！ 火の粉で、起こしちゃったんでしょうか。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: 'ベルミリアが大剣を抜いて、座り込んだままのステラの前に立った。',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '立て。座ってると潰されるぞ。',
      speaker: 'ベルミリア'
    },
    {
      text: '……うん。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: 'ステラは杖にすがって立ち上がった。杖の先に、小さな光がひとつだけ灯った。'
    },
    {
      text: '小さいのだけにする。……ちゃんと、狙うから。',
      speaker: 'ステラ'
    },
    {
      text: 'ラピスがこちらの隣に並んだ。',
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
    measure: [
      {
        buttonText: '一緒に来るか',
        branch: [
          { text: 'あなたたちの行き先に、帝都の裂け目があるならね。', speaker: 'シルヴィ', commands: [{ type: 'char', id: 'sylvie', pose: 'normal' }] },
          { text: '……通行料は取らないであげる。', speaker: 'シルヴィ', commands: [{ type: 'char', id: 'sylvie', pose: 'smile' }] },
        ],
      },
      {
        buttonText: 'その指があれば、どこでも測れる',
        branch: [
          { text: 'そうね。登る木が、高くなくても。', speaker: 'シルヴィ', commands: [{ type: 'char', id: 'sylvie', pose: 'smile' }] },
          { text: '老人は黙ってシルヴィの肩に手を置いた。' },
        ],
      },
    ],
    stop: [
      {
        buttonText: 'ステラ、やめろ！',
        branch: [
          { text: 'ステラの肩がびくりと跳ねた。けれど、光の塊は膨らむのをやめなかった。' },
          { text: '……止まんない……！', speaker: 'ステラ', commands: [{ type: 'char', id: 'stella', pose: 'surprised' }] },
        ],
      },
      {
        buttonText: '杖をつかむ',
        branch: [
          { text: '杖に手を伸ばした。光の塊に近づいた指先が、焼けるように熱くなる。' },
          { text: '……だめ、触っちゃ……！ 止まんないの……！', speaker: 'ステラ', commands: [{ type: 'char', id: 'stella', pose: 'surprised' }] },
        ],
      },
    ],
    kunai: [
      {
        buttonText: 'それは？',
        branch: [
          { text: '……あとで、話します。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
          { text: 'いまは、まだ。……ごめんなさい。', speaker: 'ラピス' },
        ],
      },
      {
        buttonText: '何も言わずに待つ',
        branch: [
          { text: 'ラピスは顔を上げて、こちらを見た。' },
          { text: '……ありがとうございます。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] },
          { text: 'いつも、そうやって待ってくれますね。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
        ],
        points: { lapisTrust: 1 },
      },
    ],
  },
};

export default scenario;
