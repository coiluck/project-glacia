import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/west_border.avif（帝都の西側の境界。白く霞む線の向こうに、凍った外周の街）
// - bg/frozen_town.avif（凍った帝都の西の外町。氷をかぶった低い屋根と通り。空は白く曇っている）
const scenario: ScenarioFile = {
  id: '4-1',
  lines: [
    {
      text: '隙間は閉じなかった。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/west_border.avif', transition: 'fade' }
      ]
    },
    {
      text: '白く霞む線に、人ひとりぶんの幅の切れ目が開いたままになっている。そのまわりに氷を割って出てきた黒い殻の破片が散らばっていた。'
    },
    {
      text: '胸もとのブローチを見た。霜には深いひびが走ったままで、ひびの奥に銀の地がのぞいていた。'
    },
    {
      text: '……昨日は、戻ったのに。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: 'ラピスはブローチと隙間を見比べていた。'
    },
    {
      text: 'シルヴィが腕を伸ばして、指を隙間のきわに重ねた。しばらくそのまま動かなかった。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: '閉じないわね。さっきから指一本ぶんも動いてない。',
      speaker: 'シルヴィ'
    },
    {
      text: '星もそう。止まりきってない。ずっと、ちょっとだけ揺れてる。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '石の列のそばでエーリクが雪の上に座りこんでいた。槌はまだ手の中にあった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '騎士たちは、誰もエーリクに近寄ろうとしなかった。腕に布を巻いた騎士がひとり、離れたところからエーリクをにらんでいた。'
    },
    {
      text: 'クラリスが、エーリクの前に立った。',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: 'あなたが石を割ったから、獣が出てきました。騎士がふたり、まだ起き上がれません。',
      speaker: 'クラリス'
    },
    {
      text: 'ベルミリアさんが放り投げなかったら、あなたもあそこで死んでました。',
      speaker: 'クラリス'
    },
    {
      text: '……俺が、開けたんですね。',
      speaker: 'エーリク'
    },
    {
      text: 'そうです。',
      speaker: 'クラリス'
    },
    {
      text: 'クラリスはそれだけ言って、背を向けた。手帳を握った手が白くなっていた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ベルミリアが、エーリクの手から槌を取り上げた。',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '謝るなら、あとで全員にしろ。今はあんたの番だ。開いたところから何か出てこないか、ここで見てろ。',
      speaker: 'ベルミリア'
    },
    {
      text: 'エーリクは空になった手を見つめてから、小さくうなずいた。'
    },
    {
      text: 'そのとき、騎士団の荷車のほうで籠のこすれる音がした。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '荷台の幌がめくれて、黒い修道服の裾がのぞいた。手が荷台の縁を探り、それから雪の上にそろりと足が下りてくる。'
    },
    {
      text: '……ロザリーさん！？',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised', bounce: true }
      ]
    },
    {
      text: 'ロザリーは、ランタンの詰まった籠を両腕に抱えていた。',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'normal' }
      ]
    },
    {
      text: '野営地に置いてきたはずです！',
      speaker: 'クラリス'
    },
    {
      text: '荷の陰でずっと揺られておりました。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'smile' }
      ]
    },
    {
      text: '街道で、聖女さまが帝都を溶かされると聞きました。帰ってこられる方がいらっしゃるなら、灯りが要ると思いまして。',
      speaker: 'ロザリー'
    },
    {
      text: 'ロザリーは、境界のほうへ顔を向けた。',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'normal' }
      ]
    },
    {
      text: '……風の音がいつもと違いますね。向こう側から音が返ってきます。',
      speaker: 'ロザリー'
    },
    {
      text: '溶けたのですか。',
      speaker: 'ロザリー'
    },
    {
      text: 'クラリスは答えに詰まって、こちらを見た。',
      commands: [
        { type: 'char', id: 'clarice', pose: 'sad' }
      ]
    },
    {
      text: '……少しだけ、開きました。でも、誰も帰ってきてはいません。',
      speaker: 'ラピス',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: 'ロザリーは籠を抱えなおして、そうですか、とだけ言った。',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'sad' }
      ]
    },
    {
      text: 'ラピスは隙間の前まで歩いていった。袖の中に手を入れて、何かを握っている。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '……ラピスさま。それ以上は、お近づきになりませぬよう。',
      speaker: '？？？'
    },
    {
      text: '声は、隙間のきわの岩の陰からした。',
      commands: [
        { type: 'bgShake', duration: 200, intensity: 2 }
      ]
    },
    {
      text: 'クラリスが銃を構えた。アルマが剣の柄に手をかける。'
    },
    {
      text: '岩の陰から黒い装束の人影が出てきた。足音がしなかった。雪の上には足跡もほとんど残っていなかった。',
      commands: [
        { type: 'char', id: 'oboro', pose: 'normal' }
      ]
    },
    {
      text: 'ラピスが袖から手を出した。山道で拾った苦無だった。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'これの持ち主？',
      speaker: 'ラピス'
    },
    {
      text: 'はい。お返しいただくには及びません。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'oboro', pose: 'normal' }
      ]
    },
    {
      text: 'あ。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'surprised' }
      ]
    },
    {
      text: '山の上で私の星を止めたの……あなたでしょ。「おやめください」って。',
      speaker: 'ステラ'
    },
    {
      text: '帝都の真ん中には、殿下がおられます。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'oboro', pose: 'normal' }
      ]
    },
    {
      text: 'ステラは帽子のつばを握って、それ以上は何も言わなかった。',
      commands: [
        { type: 'char', id: 'stella', pose: 'sad' }
      ]
    },
    {
      text: '人影は、こちらに顔を向けた。それきり、しばらく動かなかった。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'oboro', pose: 'surprised' }
      ]
    },
    {
      text: '……指揮官殿。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'oboro', pose: 'surprised' }
      ]
    },
    {
      text: 'なぜ外におられるのです。殿下と共に帝都の中央に残られたはずでは。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'oboro', pose: 'surprised' }
      ]
    },
    {
      text: '誰も、すぐには口を開かなかった。'
    },
    {
      text: '……え？',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '指揮官は、中から歩いて出てきたの。境界を出たところで倒れてて……何も覚えてなくて。',
      speaker: 'ラピス'
    },
    {
      text: '歩いて。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: '境界を越えた者は、戻らぬはずです。',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: '人影はそう言って、膝をついた。',
      commands: [
        { type: 'char', id: 'oboro', pose: 'normal' }
      ]
    },
    {
      text: '名乗りが遅れました。オボロと申します。第一皇女殿下にお仕えする者です。',
      speaker: 'オボロ'
    },
    {
      text: '殿下のご命令で、ラピスさまを影からお守りしておりました。境界から出てこられた日から、指揮官殿のことも見ておりました。',
      speaker: 'オボロ'
    },
    {
      text: 'ラピスはオボロから目をそらして、後ろを振り返った。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'アルマ。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'アルマは剣の柄から手を離していた。',
      commands: [
        { type: 'char', id: 'alma', pose: 'sad' }
      ]
    },
    {
      text: '……存じておりました。',
      speaker: 'アルマ'
    },
    {
      text: '帝都防衛軍の指揮官です。あの夜、殿下と共に帝都の真ん中に残られた方です。',
      speaker: 'アルマ'
    },
    {
      text: '野営地で初めてお顔を見たとき、足が止まりました。',
      speaker: 'アルマ'
    },
    {
      text: '隊長……だから、あのとき。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised' }
      ]
    },
    {
      text: 'あの夜、私の隊の半分を指揮官にお預けしました。中に残ったのは、指揮官の下で帝都を守るためです。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: 'そのお方が何も覚えずに、ひとりで出てこられた。中で何があったのか、私には分かりませんでした。',
      speaker: 'アルマ'
    },
    {
      text: '分からないまま、あなたは帝都に残った人だと申し上げることはできませんでした。',
      speaker: 'アルマ'
    },
    {
      text: 'アルマは、こちらに頭を下げた。',
      commands: [
        { type: 'char', id: 'alma', pose: 'sad' }
      ]
    },
    {
      text: 'ラピスは、アルマとこちらを交互に見ていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '……アルマ、また黙ってたのね。',
      speaker: 'ラピス'
    },
    {
      text: 'はい。',
      speaker: 'アルマ'
    },
    {
      text: 'ラピスは、少しだけ笑った。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: '指揮官って、私が勝手につけた呼び名だったのに。',
      speaker: 'ラピス',
      choiceId: 'title'
    },
    {
      text: 'ソレイユが、雪の上に座りこんだまま息をついた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'そのまわりだけ、雪がなかった。溶けた水が地面ににじんで、薄く湯気が立っている。白い衣の焦げた裾から、まだ熱が立ちのぼっていた。'
    },
    {
      text: 'ソレイユ、湯気出てる。……まだ熱いの？',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'normal' }
      ]
    },
    {
      text: '陽石の陽がまだ体の中にあります。出ていこうとしないのです。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'normal' }
      ]
    },
    {
      text: 'ソレイユのすぐ脇で、隙間のきわの霞がほんの少し退いていた。'
    },
    {
      text: 'ラピスがそれに気づいた。ソレイユの隣に立って、隙間の中へ手を差し入れる。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '指先に、霜は走らなかった。'
    },
    {
      text: 'ラピスはソレイユから数歩離れて、もう一度手を伸ばしかけた。'
    },
    {
      text: 'その手首を、黒い手袋がつかんだ。',
      commands: [
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: 'おやめください。',
      speaker: 'オボロ'
    },
    {
      text: '殿下の氷は、ラピスさまでも容赦いたしません。',
      speaker: 'オボロ'
    },
    {
      text: 'オボロはラピスの手首を離さないまま、ソレイユのそばまで引き戻した。ラピスは、少しのあいだオボロの手を見ていた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '……ごめん。',
      speaker: 'ラピス'
    },
    {
      text: 'でも、分かった。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '……ソレイユさんのそばなら、凍らない。',
      speaker: 'ラピス'
    },
    {
      text: '中に入れる。',
      speaker: 'ラピス'
    },
    {
      text: 'ソレイユは、自分の手のひらを見下ろした。',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: 'どれほどもつかは分かりません。歩けば歩くだけ、陽は出ていきます。石は、もうひとつも残っていません。',
      speaker: 'ソレイユ'
    },
    {
      text: '溶かすために集めた陽です。……溶かさないように歩けるのなら、それでかまいません。',
      speaker: 'ソレイユ'
    },
    {
      text: 'お待ちください。',
      speaker: 'オボロ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: 'オボロが、隙間とラピスのあいだに立った。'
    },
    {
      text: '殿下のご命令です。ラピスさまに境界を越えさせるなと。',
      speaker: 'オボロ'
    },
    {
      text: '姉さんは、何をしたの。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'オボロは答えなかった。'
    },
    {
      text: 'アルマから聞いた。姉さんが私をアルマに預けて、帝都の真ん中に戻ったこと。その夜に、帝都が凍ったこと。',
      speaker: 'ラピス'
    },
    {
      text: 'でも、帝都ほどの広さを凍らせるなんて、姉さんにもできない。……オボロは、知ってるんでしょう。',
      speaker: 'ラピス'
    },
    {
      text: '……外でお話しできることではございません。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'sad' }
      ]
    },
    {
      text: 'オボロの目が、一瞬だけ石の列のそばのエーリクに向いた。'
    },
    {
      text: 'じゃあ、中で聞く。',
      speaker: 'ラピス'
    },
    {
      text: 'ラピスはオボロの横を通りすぎた。オボロは、止めなかった。'
    },
    {
      text: '姉さんは、何も言わないで行った。私はそれからずっと外で待ってた。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '今度は、私が会いに行く番。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'オボロは、長く息を吐いた。それから静かに頭を下げた。',
      commands: [
        { type: 'char', id: 'oboro', pose: 'normal' }
      ]
    },
    {
      text: 'お止めできぬのなら、お守りするのが私の務めです。……お供いたします。',
      speaker: 'オボロ'
    },
    {
      text: 'ただし、殿下の氷を溶かすことだけはお許しできません。中で何を見ても、です。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: 'ベルミリアが、取り上げた槌をエーリクの足もとに置いた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: '溶かす前に確かめろって言ったのは、私だ。付き合う。',
      speaker: 'ベルミリア'
    },
    {
      text: 'アルマは騎士たちのほうへ向き直った。',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: '騎士団は隙間の番を。何か出てきたら、外へは一匹も通すな。',
      speaker: 'アルマ'
    },
    {
      text: '騎士たちが、隙間のまわりに散っていった。エーリクは槌を拾わずに、雪の上に立ち上がった。'
    },
    {
      text: 'ラピスが、エーリクの前で足を止めた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: 'エーリクさん。探しっこの約束、覚えてますか。',
      speaker: 'ラピス'
    },
    {
      text: '……ええ。',
      speaker: 'エーリク'
    },
    {
      text: 'とんがった屋根の隣のお店、ですよね。',
      speaker: 'ラピス'
    },
    {
      text: 'エーリクは何か言おうとして、口を閉じた。それから、深く頭を下げた。'
    },
    {
      text: '……頼みます。',
      speaker: 'エーリク'
    },
    {
      text: 'ロザリーが、籠を抱えたまま隙間のほうへ歩きだしていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'rosalie', pose: 'normal' }
      ]
    },
    {
      text: 'ロザリーさん、まさか中まで……！',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised' }
      ]
    },
    {
      text: '籠の底に礼拝所の札を入れてまいりました。帝都に残った方々のお名前です。',
      speaker: 'ロザリー'
    },
    {
      text: '野営地では、毎晩遠くからお呼びしておりました。今日は、すぐ近くでお呼びできます。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'smile' }
      ]
    },
    {
      text: 'クラリスは口を開きかけて、閉じた。野営地で何度も同じやりとりをしてきた顔だった。',
      commands: [
        { type: 'char', id: 'clarice', pose: 'sad' }
      ]
    },
    {
      text: '……私の後ろから、離れないでください。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: 'ソレイユを真ん中にして、隙間をくぐった。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/frozen_town.avif', transition: 'fade' }
      ]
    },
    {
      text: '音が消えた。'
    },
    {
      text: '風も雪を踏む音も、境界の外に置いてきたようだった。自分の息の音だけがやけに大きく聞こえた。'
    },
    {
      text: 'ソレイユのまわり十歩ほどのところで、霜が地面を這って止まっている。その線から先には白い霞が立ちこめていて、通りも屋根も厚い氷をかぶっていた。'
    },
    {
      text: 'この線から、出ないでください。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: 'ロザリーが、空いている手を前へ伸ばした。指先が、霜の線の手前で止まった。',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'normal' }
      ]
    },
    {
      text: '……静かですね。野営地より、ずっと。',
      speaker: 'ロザリー'
    },
    {
      text: '通りの奥で氷のこすれる音がした。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgShake', duration: 300, intensity: 3 }
      ]
    },
    {
      text: '白くて丸いものが、屋根の上から転がり落ちてくる。ひとつ、ふたつ。そのあとから霜をまとった鳥が音もなく降りてきた。'
    },
    {
      text: 'コオリモチ……！ 野営地のよりずっと大きい……！',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: '熱に寄ってきています。この街にずっと棲みついていたのでしょう。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: 'ラピスが、こちらの隣に並んだ。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'ソレイユさんを線の真ん中に。……指揮官、お願いします。',
      speaker: 'ラピス'
    }
  ],
  choices: {
    title: [
      {
        buttonText: 'ラピスがつけた呼び名のままでいい',
        branch: [
          { text: '……はい。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
          { text: 'じゃあ、指揮官は指揮官です。本当の肩書きだったとしても、私が呼んでるのは私の指揮官ですから。', speaker: 'ラピス' },
        ],
        points: { lapisTrust: 1 },
      },
      {
        buttonText: '何も思い出せない',
        branch: [
          { text: 'いいんです。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] },
          { text: '思い出せなくても、指揮官が中から出てきてくれたことは変わりません。', speaker: 'ラピス' },
        ],
        points: { lapisTrust: 1 },
      },
    ],
  },
};

export default scenario;
