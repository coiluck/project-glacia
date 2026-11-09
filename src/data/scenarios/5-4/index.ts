import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/frozen_center.avif（帝都中央、裂け目の真下。空に凍った裂け目、その下から獣があふれ出る形で止まっている）
// - bg/frozen_town.avif（西の外町。氷が解ける瞬間の切り替えに使う）
// - bg/frozen_gate.avif（西の門。同上）
// - bg/frozen_avenue.avif（西の門から中央へ続く大通り。同上）
// - bg/thawed_center.avif（氷が解けたあとの帝都中央。石の壁が見え、裂け目のふちから氷のかけらが落ち、雪が降っている。「帝都中央の空で、氷が割れた」から後半に使う）
// 立ち絵:
// - automaton（ロボ娘ネーヴェ）
// - sister（ラピスの姉。speaker は「ラピスの姉」）
const scenario: ScenarioFile = {
  id: '5-4',
  lines: [
    {
      text: '落ちてきた獣が砕けると、姉は空へ向けた手を下ろさないまま、こちらを振り返った。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/frozen_center.avif', transition: 'fade' },
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: '指揮官。ラピス。',
      speaker: 'ラピスの姉'
    },
    {
      text: '凍らせたときは指揮官が決めて、私が流しました。',
      speaker: 'ラピスの姉'
    },
    {
      text: '解くときは指揮官とラピスで決めてください。私が解きます。',
      speaker: 'ラピスの姉'
    },
    {
      text: 'ラピスがこちらを見た。',
      choiceId: 'unfreeze',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '……はい。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: 'では、持ち場を決めてください、指揮官。',
      speaker: 'ラピスの姉',
      choiceId: 'post'
    },
    {
      text: 'ソレイユが姉の後ろに立った。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: '私は殿下のおそばに。照らすぶんくらいは、残してあります。',
      speaker: 'ソレイユ'
    },
    {
      text: 'ベルミリアがネーヴェの前に立った。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '大通りの列の、いちばん後ろだ。子どもを抱えたまま、背中に爪が届きかけてた女がいたろ。',
      speaker: 'ベルミリア'
    },
    {
      text: '……頼む。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'sad' }
      ]
    },
    {
      text: 'ネーヴェはベルミリアからこちらへ目を移した。',
      choiceId: 'order',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: 'ネーヴェはベルミリアに向きなおった。',
      commands: [
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: '大通りで一緒に見ました。お任せください。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'ネーヴェは駆けだそうとして、一度だけこちらを振り返った。'
    },
    {
      text: '指揮官。解けたあとのご命令は、どうなりますか。帝都が解けたら、わたしの持ち場はなくなるので。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: '終わってから伝える、と答えた。'
    },
    {
      text: '……了解しました。では、終わってから伺います。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'smile' }
      ]
    },
    {
      text: '外套は殿下にお預けしておきます。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: '……助かります。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: '姉は真顔のままそう言った。ラピスが横を向いて、小さく吹きだした。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ネーヴェは陽だまりを出て、凍った通りの向こうへ駆けていった。足音はすぐに聞こえなくなった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '姉はネーヴェの消えたほうを見て、唇だけで十まで数えた。それから、空いているほうの手を胸もとに当てた。',
      commands: [
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: '……解きます。',
      speaker: 'ラピスの姉'
    },
    {
      text: '音がした。帝都じゅうの氷がいっせいに小さく鳴ったような音だった。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgShake', duration: 800, intensity: 3 }
      ]
    },
    {
      text: '陽だまりが消えた。'
    },
    {
      text: 'ソレイユが胸の前で組んでいた手をほどいた。',
      commands: [
        { type: 'char', id: 'soleil', pose: 'sad' }
      ]
    },
    {
      text: '……もう、要りませんね。',
      speaker: 'ソレイユ'
    },
    {
      text: '大通りの列のいちばん後ろで、女の人が子どもを抱えたまま一歩よろめいた。その背中へ、黒い殻の獣の爪が振り下ろされた。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/frozen_avenue.avif', transition: 'crossfade' }
      ]
    },
    {
      text: '金属の手が爪を受け止めた。',
      commands: [
        { type: 'bgShake', duration: 300, intensity: 5 }
      ]
    },
    {
      text: '間に合いました。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: 'ネーヴェは獣の爪をつかんだまま、女の人のほうへ顔だけ向けた。'
    },
    {
      text: '帝都防衛軍です。そのまま西の門へ走ってください。',
      speaker: 'ネーヴェ'
    },
    {
      text: '西の門の内側で、槍を外へ向けて並んでいた兵たちが身じろぎした。ひとりが空の裂け目に気づくと、声を上げるより先に槍を握りなおした。隣の兵も、その隣の兵も同じように構えなおした。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/frozen_gate.avif', transition: 'crossfade' }
      ]
    },
    {
      text: '西の外町の通りで、人が息をした。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/frozen_town.avif', transition: 'crossfade' }
      ]
    },
    {
      text: '帝都の真ん中の空を見上げていた人たちが、そのままの顔でひとり、またひとりと瞬きをした。誰かが膝をついた。誰かが隣の人の腕をつかんだ。'
    },
    {
      text: 'とんがった屋根の隣の店の前で、鍵を首から下げた男の子が目をこすった。あたりを見回して店の戸を振り返った。'
    },
    {
      text: '……父ちゃん？',
      speaker: 'ヨナス'
    },
    {
      text: '帝都中央の空で、氷が割れた。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/thawed_center.avif', transition: 'crossfade' },
        { type: 'bgShake', duration: 800, intensity: 6 }
      ]
    },
    {
      text: '空をおおっていた白い霞にひびが走り、細かく砕けて雪になって降ってきた。何年も凍っていた空から降る雪だった。'
    },
    {
      text: 'その向こうで、裂け目が動いていた。止まっていた獣の群れが氷のかけらをまき散らしながら、ひとつ、またひとつと石畳へ落ちてくる。'
    },
    {
      text: '……ふちは、まだ押さえています。広がりきる前に。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: 'けれど、石畳に降りた獣はこちらへ来なかった。殻をきしませながら、西の大通りのほうへ這っていく。人の気配のするほうへ。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '通りへ行かせるな！',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: 'アルマが駆けだし、ベルミリアがそのあとに続いた。大通りの入り口で先頭の獣を斬り伏せる。けれど裂け目からは次の獣が落ちてきて、斬られた獣の横をすり抜けていった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '頭の上で、何かが裂ける音がした。',
      commands: [
        { type: 'bgShake', duration: 600, intensity: 5 }
      ]
    },
    {
      text: '裂け目の口が、ひと息ぶん広がっていた。姉の膝が折れかけた。目を覚ましてから、まだいくらも経っていない体だった。',
      commands: [
        { type: 'char', id: 'sister', pose: 'sad' }
      ]
    },
    {
      text: '姉は空へ向けた手を下ろさなかった。それから、ラピスのほうを見た。'
    },
    {
      text: '……ラピス。手を貸してください。',
      speaker: 'ラピスの姉'
    },
    {
      text: 'ラピスは一瞬だけ目を見開いた。それから姉のそばへ駆け寄って、空へ向けた手に自分の手を重ねた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '……うん。',
      speaker: 'ラピス'
    },
    {
      text: '二人の手から氷が伸びて、裂け目のふちが白く厚くなった。広がりかけた裂け目がそこで止まる。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'それでも落ちてくる獣は止まらなかった。'
    },
    {
      text: '隊長、数が多すぎます！ 通りまで手が回りません！',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised' }
      ]
    },
    {
      text: 'アルマは答えずにまた一体を斬った。その横を抜けた獣の背中が大通りの奥へ、列のほうへ小さくなっていく。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '降っていた雪が、ふいに薄くなった。霞の晴れた大通りが西の門まで見通せた。'
    },
    {
      text: '門の上で旗がひるがえっていた。'
    },
    {
      text: '……旗。隊長、騎士団の旗です！',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised' }
      ]
    },
    {
      text: '隙間で待っていた騎士たちが、門をくぐって大通りへなだれこんでくる。その前には、門を守っていた兵たちが槍を並べていた。目を覚ましてすぐに構えなおした、あの槍だった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '騎士と兵が肩を並べて、大通りを這い進む獣を押し返していく。列の最後尾のあたりでは、防衛軍の軍服の背中が獣の上を跳んでいた。'
    },
    {
      text: 'アルマは剣を下げないまま、その槍の列を見ていた。遠すぎてひとりひとりの顔までは見えなかった。',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: '……通りはあの者たちに任せます。',
      speaker: 'アルマ'
    },
    {
      text: 'ステラが杖の先から糸を伸ばした。糸は裂け目の真上の星に結ばれて、大きく揺れていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '杖の先に青白い光の粒が集まりはじめた。けれど粒はいくつか回っただけで、それ以上は増えなかった。'
    },
    {
      text: '……真下に二人がいる。',
      speaker: 'ステラ'
    },
    {
      text: 'ステラ、裂け目とその下で空へ手を向けている二人を見比べていた。杖を握る手が震えていた。'
    },
    {
      text: '大きいのじゃないと、あれはふさがらない。でも大きいのを落としたら……',
      speaker: 'ステラ'
    },
    {
      text: '姉が空へ手を向けたままステラのほうを見た。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'normal' }
      ]
    },
    {
      text: 'あなたが山の上の魔女ですね。',
      speaker: 'ラピスの姉'
    },
    {
      text: '……うん。お姉さんのいるところに、落としかけた。',
      speaker: 'ステラ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'stella', pose: 'sad' }
      ]
    },
    {
      text: 'では裂け目に落としてください。落ちてくるものは私とラピスで凍らせて受けます。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: 'ステラはオボロを見た。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '……お止めいたしません。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'normal' }
      ]
    },
    {
      text: '……うん。',
      speaker: 'ステラ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '壊すことしかできない魔法で、ひとつくらい、ふさいでみたかったんだ。',
      speaker: 'ステラ'
    },
    {
      text: '杖の先で、光の粒がまた回りはじめた。回るたびに数を増やして、明るくなっていく。'
    },
    {
      text: '……ふさぐよ。',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'smile' }
      ]
    },
    {
      text: 'シルヴィが弓を引きしぼって、目を細めた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: '森を焼いた裂け目は、季節が替わるたびに広がっていくのを見てるしかなかった。',
      speaker: 'シルヴィ'
    },
    {
      text: '広がる前に射るのはこれがはじめてね。',
      speaker: 'シルヴィ'
    },
    {
      text: 'ベルミリアが大通りの入り口から戻ってきて、剣についた殻のかけらを振り払った。何も言わずに、姉とラピスの前に立った。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'クラリスが銃を構えて、アルマの隣に並んだ。',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: '隊長。報告書は、帰ってから書きます。',
      speaker: 'クラリス'
    },
    {
      text: '……ええ。帰ってから。',
      speaker: 'アルマ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'alma', pose: 'smile' }
      ]
    },
    {
      text: '姉が空へ手を向けたままこちらを振り返った。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'normal' }
      ]
    },
    {
      text: 'あの夜も、こう言いました。',
      speaker: 'ラピスの姉'
    },
    {
      text: '……指揮官。お願いします。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: '姉の隣で、ラピスも空へ手を向けていた。襟もとで、霜のない銀のブローチが光っていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '指揮官、お願いします！',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious', bounce: true }
      ]
    }
  ],
  choices: {
    unfreeze: [
      {
        buttonText: '解いてくれ',
        branch: [
          { text: 'ラピスはうなずいて、姉に向きなおった。', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
          { text: '解いて、姉さん。', speaker: 'ラピス' },
        ],
      },
      {
        buttonText: 'ラピス、一緒に言おう',
        branch: [
          { text: '……はい。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
          { text: 'ラピスはこちらと並んで、姉に向きなおった。', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
          { text: '解いて、姉さん。', speaker: 'ラピス' },
        ],
        points: { lapisTrust: 1 },
      },
    ],
    post: [
      {
        buttonText: '殿下は裂け目を。全員で、その下を守れ',
        branch: [
          { text: 'はっ。', speaker: 'アルマ', commands: [{ type: 'char', id: 'alma', pose: 'serious' }] },
          { text: '……殿下の足もとには、何も寄せつけませぬ。', speaker: 'オボロ', commands: [{ type: 'charDelete' }, { type: 'char', id: 'oboro', pose: 'serious' }] },
        ],
      },
      {
        buttonText: 'ラピス、姉さんを頼む',
        branch: [
          { text: '……はい。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
          { text: 'もう、離れません。', speaker: 'ラピス' },
        ],
        points: { lapisTrust: 1 },
      },
    ],
    order: [
      {
        buttonText: '列の最後尾を守れ',
        branch: [
          { text: 'ネーヴェは、まっすぐに立った。', commands: [{ type: 'char', id: 'automaton', pose: 'serious' }] },
          { text: '了解しました。列の最後尾を守ります。熱がなくても動けるのは、わたしだけですので。', speaker: 'ネーヴェ' },
        ],
      },
      {
        buttonText: 'あの母子を頼む',
        branch: [
          { text: '……それは、命令ですか。', speaker: 'ネーヴェ', commands: [{ type: 'char', id: 'automaton', pose: 'normal' }] },
          { text: 'うなずくと、ネーヴェはまっすぐに立った。', commands: [{ type: 'char', id: 'automaton', pose: 'serious' }] },
          { text: '了解しました。列の最後尾を守ります。', speaker: 'ネーヴェ' },
        ],
      },
    ],
  },
};

export default scenario;
