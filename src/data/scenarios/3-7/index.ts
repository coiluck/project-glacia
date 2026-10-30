import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/west_border.avif（帝都の西側の境界。白く霞む線の向こうに、凍った外周の街）
// - bg/camp_tent.avif（ソレイユの天幕の中として使う）
const scenario: ScenarioFile = {
  id: '3-7',
  lines: [
    {
      text: '境界沿いの魔物が散っていくと、騎士たちはその場に膝をついて、肩で息をした。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/west_border.avif', transition: 'fade' }
      ]
    },
    {
      text: '……間に合いました。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'normal' }
      ]
    },
    {
      text: 'クラリスは外套の雪を払って、こちらを見た。'
    },
    {
      text: '指揮官、ラピスさん。報告書、まだ書き終わってませんから。',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'smile' }
      ]
    },
    {
      text: '騎士たちのあいだからアルマが歩いてきた。外套のすそが、ところどころ裂けていた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ご無事で何よりです、指揮官。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'normal' }
      ]
    },
    {
      text: '南の街道を来た商人から、聖女の陣が帝都を溶かしに北へ向かったと聞きました。ラピスも陣と一緒だと。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: '本当に溶かせるとは、思っていませんでした。',
      speaker: 'アルマ'
    },
    {
      text: '溶ければ、帝都の真ん中から何が出てくるか分かりません。……それで隊を連れて境界沿いに来たのです。',
      speaker: 'アルマ'
    },
    {
      text: '儀式は、取りやめました。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'normal' }
      ]
    },
    {
      text: 'アルマはソレイユの顔を見て深く息を吐いた。それから頭を下げた。',
      commands: [
        { type: 'char', id: 'alma', pose: 'normal' }
      ]
    },
    {
      text: 'ラピスが、アルマの前に立った。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'アルマ。私、みんなの前で言った。皇女だって。',
      speaker: 'ラピス'
    },
    {
      text: '境界の氷が、姉さんの氷だってことも。',
      speaker: 'ラピス'
    },
    {
      text: 'アルマは少しのあいだ目を閉じていた。',
      commands: [
        { type: 'char', id: 'alma', pose: 'sad' }
      ]
    },
    {
      text: '……ラピスさまが話されたのなら、私も話さなければなりません。',
      speaker: 'アルマ'
    },
    {
      text: 'ソレイユの天幕に、火が入れなおされた。',
      commands: [
        { type: 'charDelete' },
        { type: 'bg', file: 'images/scenario/bg/camp_tent.avif', transition: 'fade' }
      ]
    },
    {
      text: 'アルマは焚き火の前に座って、しばらく炎を見ていた。'
    },
    {
      text: 'あの日、帝都の真ん中に裂け目が開きました。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: 'ほかの街で何が起きたか、帝都は知っていました。けれど帝国軍の多くは東の裂け目に出ていて、帝都に残っていたのは守りの兵だけでした。',
      speaker: 'アルマ'
    },
    {
      text: '外へ逃がせるのは、残った兵で守りながら歩ける人数だけでした。',
      speaker: 'アルマ'
    },
    {
      text: '誰を出すかは、第一皇女殿下がその日のうちに決められました。小さな子どもと、その母親を先に。名簿の名前をひとつ書くたびに、手を止めておられました。',
      speaker: 'アルマ'
    },
    {
      text: '……殿下が、ご自分のために選んだのは、ラピスさまおひとりだけです。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'sad' }
      ]
    },
    {
      text: 'ラピスの肩が、小さく揺れた。'
    },
    {
      text: '列が門を出たころ、殿下は振り返って帝都の真ん中の空をご覧になりました。裂け目が、開ききるところでした。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: 'そこへ指揮所から伝令が駆けてきました。何を伝えたのかは私には聞こえませんでした。',
      speaker: 'アルマ'
    },
    {
      text: 'このままでは列ごと追いつかれる。殿下はそうおっしゃって、ラピスさまを私に預けて帝都の真ん中へ引き返されました。',
      speaker: 'アルマ'
    },
    {
      text: 'アルマの目が、一瞬だけこちらに向いた。それからすぐにラピスへ戻った。'
    },
    {
      text: 'その夜、帝都が凍りました。列のいちばん後ろの、すぐ後ろまで。',
      speaker: 'アルマ'
    },
    {
      text: '……はぐれたんじゃ、なかったの。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: 'はい。殿下は、ラピスさまに告げずに戻られました。言えばラピスさまはついて来ようとなさる、と。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'sad' }
      ]
    },
    {
      text: 'どうして……どうして、今まで言ってくれなかったの。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '殿下に、言わないでくれと頼まれました。',
      speaker: 'アルマ'
    },
    {
      text: '……それに、知れば、ラピスさまは境界を越えようとなさったでしょう。',
      speaker: 'アルマ'
    },
    {
      text: 'ラピスは何か言い返そうとして、言葉にならずにうつむいた。膝の上の手が、白くなるほど握られていた。'
    },
    {
      text: '……姉さんは、ずるい。',
      speaker: 'ラピス',
      choiceId: 'sister'
    },
    {
      text: 'それでずっと黙ってたのか。野営地の連中にも。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '中に家族を残してきた人に、あなたのために凍らされたのだと、言えますか。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: '……私は、言えませんでした。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'sad' }
      ]
    },
    {
      text: '私の隊の半分も、中にいます。防衛軍に預けた者たちです。',
      speaker: 'アルマ'
    },
    {
      text: '隊長……',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'sad' }
      ]
    },
    {
      text: 'クラリスは手帳を握ったまま、何も書かなかった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '翌朝、ソレイユは野営の人たちを焚き火のまわりに集めた。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/west_border.avif', transition: 'fade' }
      ]
    },
    {
      text: 'アルマが、あの日のことを話した。誰を外へ出すかが一晩で決められたこと。皇女が引き返したこと。氷が、避難の列のすぐ後ろまで来て止まったこと。'
    },
    {
      text: '話が終わっても、しばらく誰も口を開かなかった。'
    },
    {
      text: '……それでも、溶かせば会えるんだろう。',
      speaker: '陣の男'
    },
    {
      text: 'ひとりがそう言うと、ベルミリアが輪の前に出た。',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '南の焼けた街を見てきた。裂け目の真下だ。門の槍が穂先から溶けてねじれてた。',
      speaker: 'ベルミリア'
    },
    {
      text: '私の母さんは、あそこで最後の日までパンを焼いてた。',
      speaker: 'ベルミリア'
    },
    {
      text: '溶かせば、帝都もああなる。中のあんたたちの家族も、ここにいるあんたたちもだ。',
      speaker: 'ベルミリア'
    },
    {
      text: 'ずっと、凍った帝都の連中は運がいいと思ってた。……運じゃなかった。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'sad' }
      ]
    },
    {
      text: '輪のどこかで誰かが泣き出した。それを止める者はいなかった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ラピスが輪の後ろを振り返った。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '……エーリクさんが、いません。',
      speaker: 'ラピス'
    },
    {
      text: 'そのときステラが空を見上げて、声を上げた。',
      commands: [
        { type: 'char', id: 'stella', pose: 'surprised' }
      ]
    },
    {
      text: 'ソレイユ、今日……陽の日だよ！ いまちょうどお昼――',
      speaker: 'ステラ'
    },
    {
      text: '境界のほうで、光が弾けた。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgShake', duration: 1000, intensity: 12 }
      ]
    },
    {
      text: '丘を越えると、境界の線に沿って陽石がずらりと並べられていた。陣から運んできた籠の、すべての石だった。'
    },
    {
      text: 'その一つ一つが、ひびから光を噴き出していた。'
    },
    {
      text: '陽石は割れば溜めた陽をいちどに吐き出します……！',
      speaker: 'ソレイユ',
      commands: [
        { type: 'char', id: 'soleil', pose: 'surprised' }
      ]
    },
    {
      text: '石の列の前にエーリクが立っていた。手に石を割るための槌を握っている。そのまわりで何人かの陣の人たちが、まだ割れていない石に槌を振り下ろしていた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '熱い風が雪原を叩いた。境界の霞が、昨日とは比べものにならない速さで退いていく。'
    },
    {
      text: '石の列のどこかで甲高い音がした。誰かの手から槌がはじき飛ばされて、雪の上を転がっていく。そのそばに細い刃物が突き立っていた。'
    },
    {
      text: '槌を拾いなおす者がいた。その隣でまた別の槌が振り下ろされた。石の列は長く、槌を握る手は多すぎた。'
    },
    {
      text: 'エーリクさん、やめてください！',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious', bounce: true }
      ]
    },
    {
      text: '確かめるだけです！ 一目、あいつの手を握るだけでいい！',
      speaker: 'エーリク'
    },
    {
      text: '昨日、目の前で白くなっていったんだ。空を見上げたまま。……あのまま、また何年も待てって言うんですか！',
      speaker: 'エーリク'
    },
    {
      text: '胸もとでブローチの霜が音を立てて割れた。昨日よりもずっと深く。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '……帝都の星が、揺れてる……！',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'surprised' }
      ]
    },
    {
      text: 'ステラは杖を振り上げた。昨日と同じように、石の列を砕くつもりだった。'
    },
    {
      text: 'けれど、杖は振り下ろされなかった。光を噴く石のあいだに、エーリクたちが立っていた。'
    },
    {
      text: '……だめ。近すぎる。人に当たる……！',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'sad' }
      ]
    },
    {
      text: 'ステラの横を、白い衣が駆け抜けた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ソレイユが石の列の前へ走り出た。両手を広げて、噴き出す光に向ける。',
      commands: [
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: '光がソレイユの手のほうへ曲がった。石から噴き出した陽が、ソレイユの体に吸いこまれていく。白い衣の裾が焦げはじめていた。'
    },
    {
      text: '……戻りなさい。私の陽なら、私の言うことを聞きなさい……！',
      speaker: 'ソレイユ'
    },
    {
      text: '石の光が、ひとつ、またひとつと消えていった。熱い風が弱まり、最後の石が暗くなったとき、ソレイユは雪の上に膝をついた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '境界は、元の線までは戻らなかった。'
    },
    {
      text: '霞の線に一か所だけ、えぐれたような隙間が開いていた。人ひとりが通れるほどの幅で、その奥に氷の薄くなった西の外町の通りが見えた。'
    },
    {
      text: '隙間の入口のすぐ内側に、黒いものが固まっていた。'
    },
    {
      text: '人ではなかった。黒い殻に覆われた、四つ足の獣のような影がいくつも、外へ向かって跳びかかる形のまま氷の中で止まっていた。'
    },
    {
      text: '……あの夜の。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'surprised' }
      ]
    },
    {
      text: '帝都の真ん中からあふれてきたものです。あの夜はどの門からも人が逃げだしました。それを追って、外へ出る寸前まで来ていた。',
      speaker: 'アルマ'
    },
    {
      text: '殿下の氷は、あれを、そこで止めたのです。',
      speaker: 'アルマ',
      commands: [
        { type: 'char', id: 'alma', pose: 'sad' }
      ]
    },
    {
      text: 'ぴし、と音がした。黒い殻を包む氷に、ひびが走っていく。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ひとつ目の影が、氷を割って首をもたげた。'
    },
    {
      text: 'エーリクは、槌を握ったまま動けずにいた。隙間の奥のとんがった屋根と、その手前で動きだした黒い影を交互に見ていた。'
    },
    {
      text: 'ベルミリアがその襟首をつかんで、後ろへ放り投げた。',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '下がってろ。あんたの息子のところに行かせるわけにいかないだろ。',
      speaker: 'ベルミリア'
    },
    {
      text: 'アルマが剣を抜いた。',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: 'あの夜は、殿下が止めてくださいました。',
      speaker: 'アルマ'
    },
    {
      text: '今度は、私たちが止めます。',
      speaker: 'アルマ'
    },
    {
      text: 'ステラがアルマの隣に並んだ。杖の先に小さな光がひとつだけ灯っている。',
      commands: [
        { type: 'char', id: 'stella', pose: 'serious' }
      ]
    },
    {
      text: '……後ろに人がいるから、大きいのは落とせない。隙間の奥にも凍った人がいる。',
      speaker: 'ステラ'
    },
    {
      text: 'だから、小さいのだけ。一匹ずつ撃ち抜く。',
      speaker: 'ステラ'
    },
    {
      text: 'シルヴィ。ずれたら言って。',
      speaker: 'ステラ'
    },
    {
      text: 'シルヴィが腕を伸ばして、指を隙間の入口に重ねた。',
      commands: [
        { type: 'char', id: 'sylvie', pose: 'serious' }
      ]
    },
    {
      text: '……指半分も、ずらさせないわ。',
      speaker: 'シルヴィ'
    },
    {
      text: 'ラピスがこちらの隣に並んだ。こちらの胸もとのブローチの霜はひび割れたまま、まだ白く残っていた。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '姉さんが、ずっと止めてくれてたんです。',
      speaker: 'ラピス'
    },
    {
      text: '行きましょう、指揮官。',
      speaker: 'ラピス'
    },
  ],
  choices: {
    sister: [
      {
        buttonText: 'ラピスを守りたかったんだ',
        branch: [
          { text: '……分かってます。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
          { text: '分かってるからずるいんです。怒る相手が、どこにもいないじゃないですか。', speaker: 'ラピス' },
          { text: 'ラピスの目から、涙がこぼれた。ラピスは、今度はそれをぬぐわなかった。' },
        ],
        points: { lapisTrust: 1 },
      },
      {
        buttonText: '黙ってそばにいる',
        branch: [
          { text: 'ラピスの隣に座った。ラピスはこちらの肩に額をつけて、声を殺して泣いた。' },
          { text: '……待ってたのに。はぐれたんだって思って、ずっと、境界のそばで。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'sad' }] },
          { text: '姉さんは最初から、私を置いていくつもりだったんですね。', speaker: 'ラピス' },
        ],
        points: { lapisTrust: 1 },
      },
    ],
  },
};

export default scenario;
