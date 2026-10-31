import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/forest_grove.avif（焼け残った木立。泉と古木、南の空に赤い裂け目）
// - bg/burnt_forest.avif（焼けた森。黒い幹と灰の地面）
// - bg/west_hill.avif（西へ続くゆるい丘。遠くに雪をかぶった山。夜の場面もこれで代用）
const scenario: ScenarioFile = {
  id: '3-1',
  lines: [
    {
      text: '古木のてっぺんの枝が大きく揺れた。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/forest_grove.avif', transition: 'fade' }
      ]
    },
    {
      text: '葉の茂みからシルヴィが幹を伝って降りてくる。片手で枝をつかみ、もう片方の手は胸の前で握ったままだった。'
    },
    {
      text: '足が地面に着いたとき、頭の上の枝に火が移った。'
    },
    {
      text: '下がるわよ。北の線まで。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: '焼け跡の線まで戻ったところで、ようやく足を止めた。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/burnt_forest.avif', transition: 'crossfade' }
      ]
    },
    {
      text: '振り返ると、木立は炎の中にあった。古木の枝の先が赤く透けて見える。'
    },
    {
      text: '南風は止まなかった。炎は線の手前まで来てそこで燃えるものがなくなり、低くなった。'
    },
    {
      text: '線のこちら側には灰しかなかった。'
    },
    {
      text: '……止まったな。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: 'ベルミリアは足もとの切り株を見下ろしていた。帝国の兵隊が切った、断面の平らな切り株だった。'
    },
    {
      text: 'シルヴィは何も言わずに、握っていた手を開いた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '手のひらに小さな茶色の実が五つ載っていた。どれも焦げていなかった。'
    },
    {
      text: '五つ。……てっぺんに生ってたのは、これで全部。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'normal' }
      ],
      choiceId: 'seeds'
    },
    {
      text: 'シルヴィは実を布で包んで、胸もとにしまった。それから燃えている木立のほうを一度だけ見た。'
    },
    {
      text: '行くわ。一族のところへ。西の山よ。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: '西……！ 聖女さまの陣も、西ですよね。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '陣は山のふもと。一族は、その上の谷にいるわ。……行き先は同じね。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'normal' }
      ]
    },
    {
      text: '道は分かるから。ついてきたいなら、どうぞ。',
      speaker: 'シルヴィ'
    },
    {
      text: 'ラピスがこちらを見た。うなずき返すと、ラピスは少しだけ笑った。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: '私は最初から行くって言ってる。聖女の陣までだ。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: '燃え続ける木立を背にして、四人で西へ歩き出した。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '二日のあいだ、焼け跡のふちに沿って西へ歩いた。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/west_hill.avif', transition: 'fade' }
      ]
    },
    {
      text: '南の空の裂け目は、どこから見ても前より大きかった。'
    },
    {
      text: '三日目には、足もとに草が戻ってきた。ゆるい丘がいくつも続き、その向こうに雪をかぶった山の影が見えはじめた。'
    },
    {
      text: 'シルヴィとベルミリアが先を歩いている。ラピスは少し遅れて、こちらの隣を歩いていた。'
    },
    {
      text: '……指揮官。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '木立で氷の壁を張ったとき、溶けていくのを見ながら考えてたんです。',
      speaker: 'ラピス'
    },
    {
      text: '姉さんの氷なら、溶けないのにって。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '帝都の氷も溶けないんですよね。誰がやったのか分からないけど、姉さんの氷みたいに。',
      speaker: 'ラピス'
    },
    {
      text: 'それを溶かすって、どういうことなんでしょう。',
      speaker: 'ラピス'
    },
    {
      text: 'ラピスはそこで言葉を切って、首を振った。'
    },
    {
      text: '……ごめんなさい。うまく言えません。',
      speaker: 'ラピス',
      choiceId: 'doubt'
    },
    {
      text: 'ラピスはこちらの胸もとのブローチに目をやった。暖かい風の中でも、霜は白いままだった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '前を歩いていたシルヴィが振り返った。'
    },
    {
      text: '今夜はあの丘の上で休みましょう。見晴らしがいいから、魔物が来てもすぐ分かるわ。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'normal' }
      ]
    },
    {
      text: '……先客がいるみたいだけど。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: '丘を登りきるころには、日が沈んで空に星が出ていた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '丘のてっぺんに、少女がひとり立っていた。身の丈ほどもある杖を、南の空へまっすぐ突き上げている。とんがり帽子のつばが、風にあおられて揺れていた。'
    },
    {
      text: '杖の先のまわりを青白い光の粒がいくつも回っていた。回るたびに粒は数を増やし、明るくなっていく。'
    },
    {
      text: 'あの……',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: 'しーっ！ いま、いいとこだから！',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '伸びたばっかりの裂け目はね、星がいちばん明るいの。……いまなら、当たる！',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '少女が杖を振り下ろした。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '頭の上の夜空から星がひとつ、はがれ落ちた。'
    },
    {
      text: '光の尾を引いて、南へ。音もなく丘の上を越え、地平線の向こうへ消えていく。'
    },
    {
      text: '南の地平線が真昼のように白く光った。',
      commands: [
        { type: 'wait', ms: 600 }
      ]
    },
    {
      text: '少し遅れて、足もとの地面が揺れた。熱い風が丘を吹き上がってきて、草が一斉に北へなびいた。',
      commands: [
        { type: 'bgShake', duration: 1000, intensity: 12 }
      ]
    },
    {
      text: '光が引いたあとの南の空には、赤い裂け目がさっきと少しも変わらずに開いていた。'
    },
    {
      text: '……あー。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'stella', pose: 'sad' }
      ]
    },
    {
      text: '外れた。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'stella', pose: 'sad' }
      ]
    },
    {
      text: '……何をした、いま。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: 'え？ 星、落としたの。あの裂け目に。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'stella', pose: 'normal' }
      ]
    },
    {
      text: '……ちょっとだけ、東にずれたけど。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'stella', pose: 'normal' }
      ]
    },
    {
      text: 'シルヴィが腕をまっすぐ前に伸ばして、指を立てた。南の地平線で、落ちたあたりがまだ赤く光っている。その光と、空の裂け目とを、指の幅で見比べていた。',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: 'ちょっとじゃないわ。指二本分、東よ。',
      speaker: 'シルヴィ'
    },
    {
      text: '……え。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'stella', pose: 'surprised' }
      ]
    },
    {
      text: '分かるの？ ここから？',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'stella', pose: 'surprised' }
      ]
    },
    {
      text: '季節が替わるたびに、木のてっぺんから裂け目を測ってたの。指の何本分か、拳の何個分か、って。……東は、私の森があったほうよ。',
      speaker: 'シルヴィ'
    },
    {
      text: '少女の顔から、血の気が引いた。'
    },
    {
      text: '……もう、燃えるものは残ってないけど。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'sad' }
      ]
    },
    {
      text: '……ごめん。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'stella', pose: 'sad' }
      ]
    },
    {
      text: '少女は帽子のつばをつかんで、目のところまで引き下ろした。しばらくそうしていてから、つばを持ち上げた。'
    },
    {
      text: 'でも、指二本分。……指二本分なんだね。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '少女は丘の上に放り出してあった紙の束に飛びついて、何か書きつけはじめた。'
    },
    {
      text: 'ずっと、どれだけずれてるのか分かんなかったの。落ちたところまで見に行ったら、焼けちゃうし。誰も測ってくれないし。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: 'ずれが分かれば、直せる。直せば、次は当たる！',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'stella', pose: 'smile', bounce: true }
      ]
    },
    {
      text: '少女はシルヴィの両手をつかんで、ぶんぶん振った。'
    },
    {
      text: 'ちょっと……！',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'surprised' }
      ]
    },
    {
      text: 'ステラだよ。星を落とす魔女。よろしくね！',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'smile' }
      ]
    },
    {
      text: '星を……落とす……？ 野営地では、星を読む魔女って聞いてました。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '読むのは、落とすためだよ。裂け目にはね、ひとつずつ決まった星があるの。そこを狙うんだ。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'normal' }
      ]
    },
    {
      text: '焚き火を囲んでも、ステラはしゃべり続けていた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '魔女の塔ってところにいたんだけど、追い出されちゃった。塔の庭に、穴を三つ空けたから。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'smile' }
      ]
    },
    {
      text: '……三つ。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: '四つ目は、塔の先生の部屋だったの。誰もいなかったけど。',
      speaker: 'ステラ'
    },
    {
      text: 'ベルミリアは何か言いかけて、黙って薪をくべた。'
    },
    {
      text: 'どうして裂け目に星を落とそうとするんですか。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: 'ステラは焚き火の上で手のひらを開いた。小さな光の粒がひとつ、ふわりと浮かぶ。'
    },
    {
      text: '私の星はね、落ちたところを全部焼いちゃうの。小さいのでも、大きいのでも。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'normal' }
      ]
    },
    {
      text: 'でも、裂け目は空に開いた穴でしょ。そこに落とせば、焼けるのは裂け目だけ。……うまくいけば、ふさがるかもしれない。',
      speaker: 'ステラ'
    },
    {
      text: '壊すことしかできない魔法で、ひとつくらい、ふさいでみたいんだ。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'sad' }
      ]
    },
    {
      text: '光の粒が、焚き火の煙にまぎれて消えた。'
    },
    {
      text: 'ステラは、すぐにまた笑った。',
      commands: [
        { type: 'char', id: 'stella', pose: 'smile' }
      ]
    },
    {
      text: 'で、みんなはどこ行くの？ ……聖女さまの陣！？ じゃあ一緒だ。私、そこに住んでるんだよ。塔を追い出されたとき、ソレイユが拾ってくれたの。',
      speaker: 'ステラ'
    },
    {
      text: '聖女さまは、帝都を溶かそうとしてるって聞きました。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'うん。陽がいちばん高くなる日にやるんだって。もうすぐだよ。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'normal' }
      ]
    },
    {
      text: '焚き火の向こうで、ベルミリアが顔を上げた。'
    },
    {
      text: '帝都の裂け目にも、星はあるのか。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '……あるよ。あった。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'normal' }
      ]
    },
    {
      text: '帝都が凍った日から、陣からは見えなくなったの。だからソレイユは、帝都の裂け目は消えたんだって。',
      speaker: 'ステラ'
    },
    {
      text: '……ほんとに消えたのか、私も一度、ちゃんと狙ってみたいんだけどね。',
      speaker: 'ステラ'
    },
    {
      text: 'それから、ステラはこちらを見た。'
    },
    {
      text: 'ねえ。あなた、境界の中から出てきたんだよね。',
      speaker: 'ステラ'
    },
    {
      text: '中で、空は見えた？ 星は出てた？',
      speaker: 'ステラ',
      choiceId: 'sky'
    },
    {
      text: 'そのとき、シルヴィの耳がぴくりと動いた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '……来るわ。南から。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: '丘の下の暗がりに、赤い光がいくつも揺れていた。その後ろを、陽炎のような影が這い上がってくる。星が落ちたほうから、まっすぐこちらへ。'
    },
    {
      text: '……もしかして、私のせい？',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'surprised' }
      ]
    },
    {
      text: 'もしかしなくても、だ。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: 'ステラは杖をつかんで立ち上がった。',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: 'じゃあ、責任とって片付ける！ 小さいのなら、いくらでも落とせるから！',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'smile', bounce: true }
      ]
    },
    {
      text: '……丘ごと焼くなよ。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: '……もう。',
      speaker: 'ラピス',
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
    seeds: [
      {
        buttonText: '十分だ',
        branch: [
          { text: 'そうね。一族の谷に蒔けば、ひとつくらいは根づくでしょう。', speaker: 'シルヴィ', commands: [{ type: 'char', id: 'sylvie', pose: 'normal' }] },
          { text: 'ひとつ根づけば、また森になるわ。……ずっと先の話だけど。', speaker: 'シルヴィ' },
        ],
      },
      {
        buttonText: '怪我はないか',
        branch: [
          { text: 'ないわ。エルフは木から落ちないのよ。', speaker: 'シルヴィ', commands: [{ type: 'char', id: 'sylvie', pose: 'normal' }] },
          { text: '……燃えてる枝を伝って降りてきたように見えましたけど。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] },
          { text: '降りたのよ。落ちたんじゃなくて。', speaker: 'シルヴィ', commands: [{ type: 'char', id: 'sylvie', pose: 'smile' }] },
        ],
      },
    ],
    doubt: [
      {
        buttonText: '聖女に会って、確かめよう',
        branch: [
          { text: 'はい。……ベルミリアも言ってましたね。溶かす前に確かめろって。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] },
          { text: '確かめて、それで、溶かしちゃいけないって分かったら……', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
          { text: 'ラピスは、その先を言わなかった。' },
        ],
      },
      {
        buttonText: 'それでも、会いたいんだろう',
        branch: [
          { text: '……はい。会いたいです。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
          { text: 'それだけは、焼けた街を見ても変わらないんです。', speaker: 'ラピス' },
          { text: '変わらないから、怖いのかもしれません。', speaker: 'ラピス' },
        ],
      },
    ],
    sky: [
      {
        buttonText: '覚えていない',
        branch: [
          { text: 'そっか。……そうだよね、ごめん。', speaker: 'ステラ', commands: [{ type: 'char', id: 'stella', pose: 'normal' }] },
          { text: 'ステラは笑って、紙の束を胸に抱えた。' },
        ],
      },
      {
        buttonText: '中の星も、落とすつもりか',
        branch: [
          { text: 'え？ ……あ、ううん、そういうんじゃなくて。', speaker: 'ステラ', commands: [{ type: 'char', id: 'stella', pose: 'surprised' }] },
          { text: '外から見えなくなった星が、中からなら見えるのかなって思っただけ。', speaker: 'ステラ', commands: [{ type: 'char', id: 'stella', pose: 'normal' }] },
          { text: 'ステラは笑って、紙の束を胸に抱えた。' },
        ],
      },
    ],
  },
};

export default scenario;
