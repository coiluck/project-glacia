import type { ScenarioFile } from '../../../features/scenario/types';

// エピローグ。5-4 を初めてクリアした戦闘のあとに流す（戦闘なし）
// 背景:
// - bg/clear_center.avif（帝都中央。裂け目が閉じ、雲の切れ目から陽が差す）
// - bg/thawed_gate.avif（西の門。氷が解けたあと）
// - bg/thawed_town.avif（西の外町。氷が解けたあと。奥のとんがった屋根が時計の店）
// - bg/camp_border_dusk.avif（野営地と境界の夕方。霞が消えて帝都が見え、雪の上に灯りが一列に並ぶ）
// - bg/camp_border_morning.avif（同じ場所の翌朝。テントは半分たたまれ、灯りは消えている）
// 立ち絵:
// - automaton（ロボ娘ネーヴェ）
// - sister（ラピスの姉。speaker は「ラピスの姉」）
const scenario: ScenarioFile = {
  id: 'epilogue',
  lines: [
    {
      text: '空の裂け目が、ふちから閉じていった。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/clear_center.avif', transition: 'fade' }
      ]
    },
    {
      text: '黒い靄は細い筋になって、最後にはその筋も消えた。あとにはただの空が残った。'
    },
    {
      text: '姉が空へ向けていた手をゆっくり下ろした。隣でラピスも手を下ろした。二人とも、しばらく空を見上げたまま動かなかった。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '雲の切れ目から光が落ちてきた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '光は尖塔の先を照らして屋根をつたい、濡れた石畳まで降りてきた。帝都に陽が差すのは数年ぶりのことだった。'
    },
    {
      text: 'ソレイユが光の中へ手のひらを差しだした。'
    },
    {
      text: '……あたたかい。',
      speaker: 'ソレイユ'
    },
    {
      text: 'ソレイユはそのまま石畳に腰を下ろした。目を閉じて、顔だけを空へ向けた。'
    },
    {
      text: 'ステラは杖を両手で握ったまま、裂け目のあったあたりを見上げていた。',
      commands: [
        { type: 'char', id: 'stella', pose: 'surprised' }
      ]
    },
    {
      text: '……ふさがった。',
      speaker: 'ステラ'
    },
    {
      text: 'ステラは杖の先の玉を指でなぞった。山の上でついた細い傷が、指の腹にひっかかった。'
    },
    {
      text: 'それから帽子のつばを跳ね上げて、ソレイユのほうへ勢いよく振り向いた。'
    },
    {
      text: 'ソレイユ！ 見てた！？',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'smile', bounce: true }
      ]
    },
    {
      text: '見ていましたよ。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'smile' }
      ]
    },
    {
      text: 'ソレイユは目を閉じたまま微笑んでいた。'
    },
    {
      text: 'シルヴィが腕をまっすぐ空へ伸ばして、指を立てた。しばらくそうしていてから腕を下ろした。',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'normal' }
      ]
    },
    {
      text: '……測るものがなくなったわ。',
      speaker: 'シルヴィ',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'smile' }
      ]
    },
    {
      text: 'ラピスの姉は陽の当たった屋根をひとつずつ見ていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'normal' }
      ]
    },
    {
      text: '……この街はこんな色でしたね。',
      speaker: 'ラピスの姉'
    },
    {
      text: 'うん。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: 'アルマはもう西のほうへ歩きだしていた。',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: '指揮官。門へ参ります。',
      speaker: 'アルマ'
    },
    {
      text: '隊長、待ってください！ 歩くの速いです！',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised' }
      ]
    },
    {
      text: '西の門の内側には兵たちが集まっていた。槍を手にしたまま、何人かは自分の手のひらをじっと見ていた。何人かは、門の外の雪を見ていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/thawed_gate.avif', transition: 'crossfade' },
        { type: 'wait', ms: 800 }
      ]
    },
    {
      text: 'アルマが近づくと、兵のひとりが気づいて背すじを伸ばした。'
    },
    {
      text: '隊長！',
      speaker: '門の兵'
    },
    {
      text: '列は無事に外へ出られたのですか。',
      speaker: '門の兵'
    },
    {
      text: 'アルマはすぐには答えなかった。',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: '……出られた。皆が、門を守ってくれたからだ。',
      speaker: 'アルマ'
    },
    {
      text: 'よかった……。じゃあ隊長はもう戻ってこられたんですね。さっき出ていかれたばかりなのに。',
      speaker: '門の兵'
    },
    {
      text: '兵たちにとって、門を守った夜はついさっきのことだった。'
    },
    {
      text: '兵のひとりが、こちらに気づいて敬礼した。'
    },
    {
      text: '指揮官殿も、ご無事で。',
      speaker: '門の兵'
    },
    {
      text: 'こちらはその顔を覚えていなかった。黙って敬礼を返した。'
    },
    {
      text: 'クラリスはそんなアルマの横顔をじっと見ていた。',
      commands: [
        { type: 'char', id: 'clarice', pose: 'normal' }
      ]
    },
    {
      text: '……隊長。遅くなった、って言うんじゃなかったんですか。',
      speaker: 'クラリス'
    },
    {
      text: 'この者たちにはまだ遅くないのです。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'sad' }
      ]
    },
    {
      text: '話さなければならないことは、あとでひとりずつ私が話します。……クラリス。点呼を。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: '……クラリス？',
      speaker: '門の兵'
    },
    {
      text: '兵たちが知らない顔を見るようにクラリスを見た。'
    },
    {
      text: 'アルマ隊のクラリスです。隊に入ってもう何年かになります。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: '兵たちは顔を見合わせた。誰も何も言わなかった。'
    },
    {
      text: 'クラリスは手帳を開いた。門の前で、兵たちの胸の札から書きとめた名前だった。'
    },
    {
      text: 'ハンス。',
      speaker: 'クラリス'
    },
    {
      text: 'はい。',
      speaker: '門の兵'
    },
    {
      text: 'マルタ。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: 'はい！',
      speaker: '門の兵'
    },
    {
      text: 'ヨアヒム。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: '……はい。',
      speaker: '門の兵'
    },
    {
      text: '名前はまだ続いた。呼ぶたびに返事が返ってきた。'
    },
    {
      text: 'ロザリーはクラリスの隣に立っていた。返事が返るたびに小さくうなずいていた。',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'normal' }
      ]
    },
    {
      text: '氷の中にいたこの人たちの名前を、ロザリーはこの門の前で一度呼んでいた。そのときは返事はひとつもなかった。'
    },
    {
      text: '……お返事が返ってまいりますね。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'smile' }
      ]
    },
    {
      text: '大通りのほうからネーヴェが歩いてきた。隣には子どもを抱えた女の人がいた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: '指揮官。列の最後尾、全員門に着きました。この方が最後です。',
      speaker: 'ネーヴェ'
    },
    {
      text: '女の人は子どもを抱えなおして、ネーヴェに何度も頭を下げた。子どもは母親の肩ごしに、ネーヴェの金属の手をじっと見ていた。'
    },
    {
      text: 'ベルミリアは少し離れたところでそれを見ていた。腰の袋の焼き印をそっと指でなぞっていた。',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: '……今度は間に合ったな。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'smile' }
      ]
    },
    {
      text: 'はい。間に合いました。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: '門を出ると、西の外町の通りに人があふれていた。戸口から出てきた人たちが陽の当たる通りで、空を見上げていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/thawed_town.avif', transition: 'crossfade' },
        { type: 'wait', ms: 800 }
      ]
    },
    {
      text: 'とんがった屋根の隣の店の前に男の子が立っていた。首から紐で鍵を下げて、母親の上着のすそを握っていた。氷の中にいたときと同じ形だった。'
    },
    {
      text: '通りの向こうから、男がひとり駆けてきた。エーリクだった。'
    },
    {
      text: 'エーリクは店の前で足を止めた。肩で息をしていた。'
    },
    {
      text: '……ヨナス。',
      speaker: 'エーリク'
    },
    {
      text: '男の子はエーリクを見上げた。それから母親の上着のうしろに半分隠れた。'
    },
    {
      text: '……だれ？',
      speaker: 'ヨナス'
    },
    {
      text: 'エーリクの髪には白いものがまじっていた。顔のしわも、男の子の覚えている父親よりずっと深かった。'
    },
    {
      text: '母親は口もとを押さえてエーリクの顔を見ていた。'
    },
    {
      text: 'エーリクは何か言おうとして、言えなかった。それから男の子の前にしゃがんで、首から下がった鍵を指さした。'
    },
    {
      text: '……その鍵。毎朝、店の時計を巻くやつだろ。',
      speaker: 'エーリク'
    },
    {
      text: '手が届かないのに椅子を引きずってきて、全部自分で巻くってきかなくて。',
      speaker: 'エーリク'
    },
    {
      text: '男の子は鍵を握った。エーリクの顔をもう一度じっと見た。'
    },
    {
      text: '……父ちゃん？',
      speaker: 'ヨナス'
    },
    {
      text: 'ああ。',
      speaker: 'エーリク'
    },
    {
      text: 'エーリクは男の子を抱きよせた。それから母親ごと、両腕で抱えこんだ。'
    },
    {
      text: '父ちゃん。店の時計、みんな止まってる。',
      speaker: 'ヨナス'
    },
    {
      text: '……ああ。止まってるな。',
      speaker: 'エーリク'
    },
    {
      text: '全部、巻いてくれるか。',
      speaker: 'エーリク'
    },
    {
      text: 'うん！',
      speaker: 'ヨナス'
    },
    {
      text: '帝都から雪原へ抜ける道は、ネーヴェが知っていた。指揮官を外へ運んだ道だった。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/camp_border_dusk.avif', transition: 'fade' },
        { type: 'wait', ms: 800 }
      ]
    },
    {
      text: '次の日の夕方、雪原の先に灯りが一列に並んでいるのが見えた。境界のあった場所だった。白い霞はもうなかった。'
    },
    {
      text: '灯りの列の向こうに、野営地のテントが見えていた。'
    },
    {
      text: 'ロザリーはひざをついて、いちばん手前のランタンに触れた。まだ温かかった。',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'surprised' }
      ]
    },
    {
      text: 'ランタンの横の雪に、いくつもの足あとがあった。野営地のほうから来て、野営地のほうへ戻っていく足あとだった。'
    },
    {
      text: '……ひとりで置いていたつもりで、おりました。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'sad' }
      ]
    },
    {
      text: 'ネーヴェが、灯りの列の手前で止まった。',
      commands: [
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: 'ここが、持ち場の端です。指揮官を下ろしたのも、ここでした。',
      speaker: 'ネーヴェ'
    },
    {
      text: '姉が、肩にかけていた外套の襟に手をやった。',
      commands: [
        { type: 'char', id: 'sister', pose: 'normal' }
      ]
    },
    {
      text: '……ネーヴェ。外套を返します。',
      speaker: 'ラピスの姉'
    },
    {
      text: '姉は外套を肩から下ろして、ネーヴェに差しだした。雪原を渡ってきた風が、姉の髪をあおった。'
    },
    {
      text: '差しだした手は、外套をつかんだまま離れなかった。'
    },
    {
      text: '殿下。手が。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: '……分かっています。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: 'ラピスが横を向いて、肩を震わせていた。姉はようやく指を開いた。それから、両腕で自分の肩を抱いた。'
    },
    {
      text: 'オボロが音もなく姉の後ろに立った。毛布を一枚、姉の肩にかけた。',
      commands: [
        { type: 'char', id: 'oboro', pose: 'normal' }
      ]
    },
    {
      text: '……オボロ。それは、どこから。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'surprised' }
      ]
    },
    {
      text: '控えておりました。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'normal' }
      ]
    },
    {
      text: '姉は毛布の端を引き寄せて、あごまで埋まった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ネーヴェは外套に袖を通して、留め具をとめた。それからこちらに向き直って、まっすぐに立った。',
      commands: [
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: '報告します。外は、寒いです。',
      speaker: 'ネーヴェ'
    },
    {
      text: '調子がいいです。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'smile' }
      ]
    },
    {
      text: '毛布の中から姉の声がした。'
    },
    {
      text: '……うらやましい。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'sad' }
      ]
    },
    {
      text: 'ネーヴェは灯りの列をまたいだ。雪の上に、ネーヴェの足あとがひとつついた。'
    },
    {
      text: 'ネーヴェは振り返った。夕方の光の中に、帝都の尖塔が並んでいた。'
    },
    {
      text: '……帝都は外から見ると、こういう形なのですね。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'smile' }
      ]
    },
    {
      text: 'ラピスはもう、灯りの列の向こう側にいた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '姉は灯りの列の手前で足を止めていた。毛布の端を握ったまま、雪の上の灯りを見下ろしていた。',
      commands: [
        { type: 'char', id: 'sister', pose: 'sad' }
      ]
    },
    {
      text: '……ここまでが、私の氷だったのですね。',
      speaker: 'ラピスの姉'
    },
    {
      text: '姉さん。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '私、ずっとここにいたの。この灯りの、こっち側に。',
      speaker: 'ラピス'
    },
    {
      text: '……おかえりなさい、姉さん。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: '姉は少しのあいだ、ラピスを見ていた。それから灯りの列をまたいだ。',
      commands: [
        { type: 'char', id: 'sister', pose: 'normal' }
      ]
    },
    {
      text: '……ただいま、ラピス。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'smile' }
      ]
    },
    {
      text: 'ラピスがこちらを振り向いた。目のふちが少し赤かった。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: '最初に何て言うかは、最後まで決まらなかったんです。でもこれだけは、ここで言うって決めてました。',
      speaker: 'ラピス'
    },
    {
      text: '野営地のほうから、人が何人も駆けてきた。先頭は野営地に残っていた騎士だった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ラピスさん！ 戻ったんですか！ ……そちらは？',
      speaker: '野営地の騎士'
    },
    {
      text: '姉です。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '騎士はラピスと姉の顔を何度か見比べた。'
    },
    {
      text: '……ええと。どちらが、お姉さんで？',
      speaker: '野営地の騎士'
    },
    {
      text: '私です。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: '姉は毛布にあごまで埋まったまま真顔で答えた。ラピスが吹きだした。'
    },
    {
      text: '同じくらいに見えるでしょ。私が追いついちゃったから。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: 'これからは、姉さんと同じだけ年を取ります。',
      speaker: 'ラピス'
    },
    {
      text: '……それは困りますね。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'normal' }
      ]
    },
    {
      text: '何が？',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '姉らしくするのが難しくなります。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'smile' }
      ]
    },
    {
      text: '姉は野営地のテントと、その向こうの雪原を見回した。風が毛布の端をはためかせた。'
    },
    {
      text: '……ラピス。ここで待っていたのですか。',
      speaker: 'ラピスの姉'
    },
    {
      text: 'うん。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '何年も。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'sad' }
      ]
    },
    {
      text: 'うん。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '姉は毛布の前を開いた。ラピスの肩を引き寄せて、毛布の中に入れた。'
    },
    {
      text: '……寒かったでしょう。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'sad' }
      ]
    },
    {
      text: 'ラピスはすぐには答えなかった。そしてそのまま姉の肩に頭をあずけた。'
    },
    {
      text: '……寒かった。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '翌朝、野営地のテントは半分ほどたたまれていた。帝都へ帰る荷物が、雪の上に積まれていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/camp_border_morning.avif', transition: 'fade' },
        { type: 'wait', ms: 800 }
      ]
    },
    {
      text: 'ロザリーが灯りの列の前にひざをついて、ひとつずつ火を消していた。',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'normal' }
      ]
    },
    {
      text: 'もう、灯りはいりませんね。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'smile' }
      ]
    },
    {
      text: '最後の火が消えた。'
    },
    {
      text: 'クラリスは手帳の最初のページを開いていた。境界から出てきたばかりのこちらに、名前と所属を訊いたページだった。',
      commands: [
        { type: 'char', id: 'clarice', pose: 'normal' }
      ]
    },
    {
      text: '指揮官。所属の欄、やっと書けます。',
      speaker: 'クラリス'
    },
    {
      text: 'クラリスは、帝都防衛軍 と書きこんだ。',
      commands: [
        { type: 'char', id: 'clarice', pose: 'smile' }
      ]
    },
    {
      text: '名前の欄は空けておきます。それと、疑いの欄は消しておきますね。',
      speaker: 'クラリス'
    },
    {
      text: 'ラピスは灯りのあった場所の前に立っていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '何年もここから先へは行けなかった。境界の霞に手を入れれば、指が凍った。'
    },
    {
      text: '昨日は帝都の側からまたいできただけだった。こちら側から踏みだすのは、初めてだった。'
    },
    {
      text: 'ラピスは一歩踏みだした。'
    },
    {
      text: '何も起きなかった。雪を踏む音がしただけだった。'
    },
    {
      text: 'ラピスはもう一歩進んで、こちらを振り向いた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    {
      text: '指揮官はあっちからここまで、ひとりで歩いてきたんですよね。灯りを見て。',
      speaker: 'ラピス'
    },
    {
      text: '帰りは一緒です。',
      speaker: 'ラピス',
      choiceId: 'home'
    },
    {
      text: '帰りましょう指揮官。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    }
  ],
  choices: {
    home: [
      {
        buttonText: 'ああ、帰ろう',
        branch: [
          { text: 'ラピスはうれしそうにうなずいた。', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
        ],
      },
      {
        buttonText: 'ラピス。おかえり',
        branch: [
          { text: 'ラピスは目を丸くした。', commands: [{ type: 'char', id: 'lapis', pose: 'surprised' }] },
          { text: '……まだ、着いてません。', speaker: 'ラピス' },
          { text: 'そう言いながらラピスは笑っていた。', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
        ],
        points: { lapisTrust: 1 },
      },
    ],
  },
};

export default scenario;
