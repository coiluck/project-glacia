import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/mountain_path.avif（西の山道。岩場の先に、エルフの谷）※未作成
// - bg/soleil_camp.avif（山のふもとの聖女の陣。斜面に陽石が並ぶ。夜は陣の上に小さな太陽）※未作成
// - bg/west_hill.avif（西へ続くゆるい丘。北へ向かう行列の場面もこれで代用）※未作成
const scenario: ScenarioFile = {
  id: '3-4',
  lines: [
    {
      text: '最後のイワモチが崩れてただの岩に戻ったころには、東の空が白みはじめていた。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/mountain_path.avif', transition: 'fade' }
      ]
    },
    {
      text: '山を下りるあいだ、ステラはひと言もしゃべらなかった。杖の先の玉に細い傷がひとつ残っていた。'
    },
    {
      text: '陣に戻ると、陽石の置き場に人だかりができていた。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/soleil_camp.avif', transition: 'fade' }
      ]
    },
    {
      text: '並んだ陽石のまんなかに細い刃物が一本、地面に突き立てられていた。刃の根もとに白い布が結んである。'
    },
    {
      text: '布には墨で一言だけ書かれていた。'
    },
    {
      text: '「溶かすな」'
    },
    {
      text: '……苦無だ。ゆうべのうちに、誰かが。',
      speaker: '陣の男'
    },
    {
      text: '皇家の密偵だよ！ 帝都を凍らせたのは皇家だって、ずっと言われてるじゃないか！',
      speaker: '陣の女'
    },
    {
      text: 'まだ閉じ込めておく気か。……うちの息子を。',
      speaker: 'エーリク'
    },
    {
      text: 'エーリクの声は震えていた。まわりの人たちが、口々に皇家を罵りはじめる。'
    },
    {
      text: 'ラピスは人だかりの後ろで、袖の上から何かを握っていた。顔から血の気が引いていた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '昼前、ソレイユの祈りが終わるのを待って、陣のいちばん上の段へ上がった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ステラはソレイユの前に座った。帽子を膝の上に置いて、ゆうべのことを話した。'
    },
    {
      text: '帝都の星は、消えてなかったこと。止まっていること。'
    },
    {
      text: 'それから、その星に星を落としかけたこと。'
    },
    {
      text: '……止めてもらわなかったら、落としてた。帝都の真ん中に。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'sad' }
      ]
    },
    {
      text: 'ごめん、ソレイユ。塔を追い出されたときとなんにも変わってない。',
      speaker: 'ステラ'
    },
    {
      text: 'ソレイユは、しばらく黙ってステラを見ていた。',
      commands: [
        { type: 'char', id: 'soleil', pose: 'normal' }
      ]
    },
    {
      text: 'ステラ。あなたの星は、落ちたところを全部焼きます。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: '……うん。',
      speaker: 'ステラ'
    },
    {
      text: 'けれどあなたは落とす前に、ここへ帰ってきて話してくれました。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'smile' }
      ]
    },
    {
      text: 'ソレイユはステラの手を取って、それから段の下に広がる陣を見下ろした。斜面には今朝も陽石を並べる人たちの姿があった。',
      commands: [
        { type: 'char', id: 'soleil', pose: 'sad' }
      ]
    },
    {
      text: '……私の陽も、同じなのかもしれませんね。',
      speaker: 'ソレイユ'
    },
    {
      text: '止まっているのなら、溶かせば動きだすかもしれない。それは分かりました。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: 'では、止まったままなら。中の人も外の人も、いつまで待てばいいのでしょう。',
      speaker: 'ソレイユ'
    },
    {
      text: '誰もすぐには答えられなかった。'
    },
    {
      text: 'ここにいる人たちは、もう何年も待っています。境界のそばで、凍えながら待っている人もいます。',
      speaker: 'ソレイユ'
    },
    {
      text: '待つことしかできない人を、私はもう、見ていたくないのです。',
      speaker: 'ソレイユ',
      choiceId: 'wait'
    },
    {
      text: 'ソレイユは、しばらく陣を見下ろしていた。'
    },
    {
      text: '……陽の日の前に、境界へ行きます。そこで境界の端だけを少し溶かしてみます。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: '氷の向こうをこの目で見ます。裂け目が動く気配が少しでもあれば、そこでやめます。',
      speaker: 'ソレイユ'
    },
    {
      text: '溶かしたら裂け目はどうなるか。……おととい、あなたが訊いたことです。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'normal' }
      ]
    },
    {
      text: 'ソレイユは段の端で腕を組んでいたベルミリアを見た。'
    },
    {
      text: '……覚えてたのか。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: 'もし動きだしたら、どうする。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '私の陽で焼きます。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: '焼けた街の裂け目は誰にも焼けなかった。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '……ええ。ですから、少しだけです。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'sad' }
      ]
    },
    {
      text: 'ステラが膝の上の帽子をかぶり直した。'
    },
    {
      text: '溶かしてるあいだ、私が帝都の星に糸をつないでおく。揺れたらすぐ分かるから。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '……糸をつなぐだけ。今度は、ほんとに。',
      speaker: 'ステラ'
    },
    {
      text: 'その日のうちに、陣を出る支度が始まった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ソレイユは境界で確かめることを陣の人たちに話した。星のことも、隠さずに話した。それでも、ついてくると言った人は百を超えた。'
    },
    {
      text: '陽石を詰めた籠が、次々に背負われていく。その中にエーリクの姿もあった。'
    },
    {
      text: '北へ五日歩いた。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/west_hill.avif', transition: 'fade' }
      ]
    },
    {
      text: '三日目に、草の上に霜が降りるようになった。四日目には、雪になった。'
    },
    {
      text: '夜の野営で、行列についてきた子どもたちが、ステラのまわりに集まっていた。'
    },
    {
      text: 'ねえステラ、星落としてー！',
      speaker: '陣の子ども'
    },
    {
      text: 'だーめ。……そのかわり、これね。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'smile' }
      ]
    },
    {
      text: 'ステラが指を鳴らすと、子どもたちの頭の上に豆粒ほどの光がいくつも降ってきた。光は髪や手のひらに触れると、ぱちんと小さく弾けて消えた。'
    },
    {
      text: 'あったかい！',
      speaker: '陣の子ども'
    },
    {
      text: 'それくらい小さいのなら、落としても誰も焼けないから。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'normal' }
      ]
    },
    {
      text: 'ステラは笑っていた。杖の先の傷のついた玉には一度も触れなかった。'
    },
    {
      text: '行列のまんなかで、エーリクは籠を背負ったまま、ラピスの隣を歩いていた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '聖女さまは、ちゃんと確かめてからだって。それでいいんです。何年も待ったんだから、あと何日か待つくらい。',
      speaker: 'エーリク'
    },
    {
      text: '息子はね、店の時計を全部自分で巻きたがるんですよ。毎朝。手が届かないから、椅子を引きずってきて。',
      speaker: 'エーリク'
    },
    {
      text: 'ねじ巻きの鍵を、紐で首から下げてやったんです。なくさないように。いまも下げてるはずですよ。',
      speaker: 'エーリク'
    },
    {
      text: '凍ってから、あいつに巻いてもらえなかった時計が、うちにはいくつあるんだろうなって。',
      speaker: 'エーリク'
    },
    {
      text: 'エーリクは笑って、それからラピスを見た。'
    },
    {
      text: 'ラピスさんは、中に誰が？',
      speaker: 'エーリク'
    },
    {
      text: '……姉が。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: 'そうか。じゃあもし中に入れたら、お互い探しっこしましょう。うちの息子を見かけたら、教えてください。私もお姉さんを探します。',
      speaker: 'エーリク'
    },
    {
      text: '……はい。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: 'エーリクは満足そうにうなずいて、少し前を行く仲間のところへ足を速めた。'
    },
    {
      text: 'ラピスはエーリクの背中を見たまま、袖の上から何かを握っていた。苦無をしまった袖だった。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '五日目の昼、白く霞む線が雪原の先に見えた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '境界だった。野営地から見ていたのとは別の方角から、同じ線が地平線の端まで続いている。'
    },
    {
      text: 'その手前の雪がいくつも盛り上がった。'
    },
    {
      text: 'コオリモチ……！ それに、あれはシモフクロウ……',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '白くて丸い影が雪の中から這い出してくる。その上を、霜をまとった鳥が旋回しはじめた。行列のあちこちで悲鳴が上がる。'
    },
    {
      text: '籠を下ろして！ 陽石は私が守ります！',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: 'ラピスが雪の上で足を止めて、こちらを振り返った。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '……戻ってきちゃいましたね、北に。',
      speaker: 'ラピス'
    },
    {
      text: '行きましょう、指揮官。',
      speaker: 'ラピス'
    },
  ],
  choices: {
    wait: [
      {
        buttonText: 'それでも、確かめないと',
        branch: [
          { text: '……ええ。分かっています。', speaker: 'ソレイユ', commands: [{ type: 'char', id: 'soleil', pose: 'sad' }] },
          { text: '分かっているから、苦しいのです。', speaker: 'ソレイユ' },
        ],
      },
      {
        buttonText: 'ラピスも、ずっと待っていた',
        branch: [
          { text: 'ソレイユは、こちらの後ろにいたラピスに目を向けた。', commands: [{ type: 'char', id: 'soleil', pose: 'normal' }] },
          { text: 'ラピスは何も言わずに、小さくうなずいた。' },
          { text: '……そうでしたか。境界のそばで。', speaker: 'ソレイユ', commands: [{ type: 'char', id: 'soleil', pose: 'sad' }] },
        ],
        points: { lapisTrust: 1 },
      },
    ],
  },
};

export default scenario;
