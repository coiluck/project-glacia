import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/frozen_center.avif（帝都中央、裂け目の真下。空に凍った裂け目、その下から獣があふれ出る形で止まっている）
// 立ち絵:
// - automaton（ロボ娘ネーヴェ）
// - sister（ラピスの姉。speaker は「ラピスの姉」）
const scenario: ScenarioFile = {
  id: '5-3',
  lines: [
    {
      text: '落ちてきた最後の獣が、石畳の上で砕けた。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/frozen_center.avif', transition: 'fade' }
      ]
    },
    {
      text: '姉はネーヴェの外套を肩にかけたまま、空へ向けた手を下ろさずに息を吐いた。裂け目のふちでは、姉の霜とラピスの霜が重なって白く厚くなっていた。',
      commands: [
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: 'クラリスが陽だまりのきわに新しい小石を置いていた。さっき置いた石は、もう陽だまりのずっと外にあった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ソレイユは石畳に膝をついて、肩で息をしていた。',
      commands: [
        { type: 'char', id: 'soleil', pose: 'sad' }
      ]
    },
    {
      text: '……殿下。お話しできるのは、少しのあいだです。',
      speaker: 'ソレイユ'
    },
    {
      text: 'ええ。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: '姉は一行の顔をひとりずつ見ていった。知っている顔より、知らない顔のほうが多かった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '……どうして、来たのですか。ここへ。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: 'この氷は誰にも溶かさせないはずでした。オボロにも、そう命じました。',
      speaker: 'ラピスの姉'
    },
    {
      text: 'オボロは顔を伏せたまま、答えなかった。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'oboro', pose: 'sad' }
      ]
    },
    {
      text: 'ソレイユがゆっくりと立ち上がった。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'soleil', pose: 'serious' }
      ]
    },
    {
      text: '陽の聖女と呼ばれております。ソレイユと申します。',
      speaker: 'ソレイユ'
    },
    {
      text: '境界を溶かしたのは、私の陣です。',
      speaker: 'ソレイユ'
    },
    {
      text: '帝都の裂け目はもう消えたと信じて、陽石を集めて、帝都を溶かそうとしました。いまこの陽だまりを保っている熱は、そのとき集めた陽です。',
      speaker: 'ソレイユ'
    },
    {
      text: '……陽の。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'surprised' }
      ]
    },
    {
      text: '溶かそうとした都の中を、溶かさないように歩いてまいりました。申し開きはいたしません。',
      speaker: 'ソレイユ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'soleil', pose: 'sad' }
      ]
    },
    {
      text: '姉はソレイユの焦げた裾を見ていた。何も言わなかった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '隙間が開いてから、姉さんの氷はずっと薄くなってるの。ブローチの霜にもひびが入ってた。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '待ってたらいつか勝手に崩れる。そのときは、誰も閉じに行けない。',
      speaker: 'ラピス'
    },
    {
      text: 'だから開く時を私たちで選びに来たの。開いたら、閉じる。',
      speaker: 'ラピス'
    },
    {
      text: '姉はすぐには答えなかった。オボロのほうへ目を向けた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: '……オボロ。東からは、誰か戻りましたか。',
      speaker: 'ラピスの姉'
    },
    {
      text: '……いいえ。どなたも。',
      speaker: 'オボロ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: '空へ向けた姉の手が、小さく震えた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'sad' }
      ]
    },
    {
      text: '東の兵が戻るまで。……そう決めて、凍らせたのです。',
      speaker: 'ラピスの姉'
    },
    {
      text: '東の氷の術者たちが何人もそろえば、私の氷に自分たちの氷をつないで、ここまで道を通せます。そうして起こしに来てくれるはずでした。',
      speaker: 'ラピスの姉'
    },
    {
      text: '何日か。長くても、何月か。それだけ止めておけば、誰かが閉じに来てくれると思っていました。',
      speaker: 'ラピスの姉'
    },
    {
      text: 'それが、数年。',
      speaker: 'ラピスの姉'
    },
    {
      text: '……ここの人たちはそのあいだずっと、来ないものを待っていたのですね。',
      speaker: 'ラピスの姉'
    },
    {
      text: '誰も答えなかった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '外は。……外へ出した人たちは、どうなりましたか。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'sad' }
      ]
    },
    {
      text: 'ベルミリアが前へ出た。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '出てった連中のことは知らない。私が知ってるのは、南の街だ。',
      speaker: 'ベルミリア'
    },
    {
      text: '南にも裂け目が開いた。帝国の兵隊が来たのは街が焼けたあとで、それも街じゃなくて森を切りに来た。',
      speaker: 'ベルミリア'
    },
    {
      text: '母さんは、最後の日まで門の衛兵に持たせるパンを焼いてた。',
      speaker: 'ベルミリア'
    },
    {
      text: 'ベルミリアの手が、腰の袋の焼き印を握っていた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '外じゃ、帝都は自分たちだけ凍って守られたって言われてる。皇族は先に逃げたってな。私も、そう思ってた。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '……そう見えたでしょう。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'sad' }
      ]
    },
    {
      text: 'あんたの妹は、そのせいで名前も言えないで、境界のそばにひとりでいたんだ。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '姉がラピスを見た。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'surprised' }
      ]
    },
    {
      text: 'ラピスは目をそらさなかった。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '……でも、大通りで見たよ。子どもを抱えた女の背中に、あいつらの爪が届きかけて止まってた。',
      speaker: 'ベルミリア',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'vermilia', pose: 'normal' }
      ]
    },
    {
      text: '南では誰も止めてくれなかった。ここでは、あんたが止めた。',
      speaker: 'ベルミリア'
    },
    {
      text: '謝ってほしくて来たんじゃない。閉じに来たんだ。',
      speaker: 'ベルミリア'
    },
    {
      text: '姉は長いあいだ目を閉じていた。それから目を開けて、空の裂け目を見上げた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: '……分かりました。',
      speaker: 'ラピスの姉'
    },
    {
      text: '氷を解けば、ここの人たちは目を覚まします。もう凍えることもありません。西の門まで、自分の足で逃げられます。',
      speaker: 'ラピスの姉'
    },
    {
      text: 'そのあいだ、裂け目は私が押さえています。皆さんは列と一緒に西の門へ。ラピス、あなたも。',
      speaker: 'ラピスの姉'
    },
    {
      text: 'ここの人たちを止めたのは、私です。来ない兵を何年も待たせたのも、私です。',
      speaker: 'ラピスの姉'
    },
    {
      text: '最後まで押さえるのは、私でなければなりません。',
      speaker: 'ラピスの姉'
    },
    {
      text: '……え？',
      speaker: 'ラピス',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '誰もすぐには動かなかった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '……また？',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'また、ひとりで残るの？',
      speaker: 'ラピス'
    },
    {
      text: 'ラピス。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'sad' }
      ]
    },
    {
      text: 'あの夜も、何も言わないで行ったよね！',
      speaker: 'ラピス',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'serious', bounce: true }
      ]
    },
    {
      text: '私は列でずっと姉さんを探してた。はぐれたんだと思って、境界のそばで何年も待ってた。',
      speaker: 'ラピス'
    },
    {
      text: '今度はちゃんと言ってくれた。……でも、言えばいいってことじゃない！',
      speaker: 'ラピス'
    },
    {
      text: '姉はラピスを見ていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'sad' }
      ]
    },
    {
      text: 'これは私が決めて、私が始めたことです。',
      speaker: 'ラピスの姉'
    },
    {
      text: '終わらせるのも、私ひとりで――',
      speaker: 'ラピスの姉'
    },
    {
      text: '殿下。',
      speaker: 'オボロ',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: 'オボロが顔を上げていた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ご命令に背きました。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'serious' }
      ]
    },
    {
      text: '山の上では星を読む魔女の星を止め、聖女の陣には溶かすなと書き残しました。そこまではご命令のとおりです。',
      speaker: 'オボロ'
    },
    {
      text: 'けれど帝都に入るとき、ラピスさまを中へお通ししてここまでお供いたしました。',
      speaker: 'オボロ'
    },
    {
      text: '殿下はご自分が決めたと仰います。けれど私は仕掛けの前で見ておりました。凍らせるとお決めになったのは、殿下と指揮官殿でした。',
      speaker: 'オボロ'
    },
    {
      text: 'その指揮官殿が解くと決められました。ですから、背きました。',
      speaker: 'オボロ'
    },
    {
      text: '姉はしばらくオボロを見ていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'surprised' }
      ]
    },
    {
      text: '……背いてくれたのですね。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'sad' }
      ]
    },
    {
      text: '私の言ったとおりにしていたら、ここには誰も来られませんでした。',
      speaker: 'ラピスの姉'
    },
    {
      text: 'オボロはもう一度顔を伏せた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '最後に、姉の目がこちらで止まった。',
      commands: [
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: '……指揮官。',
      speaker: 'ラピスの姉'
    },
    {
      text: 'あなたはどう考えますか。',
      speaker: 'ラピスの姉',
      choiceId: 'alone'
    },
    {
      text: 'あの夜、私はひとりで流すつもりでした。指揮官には、列と一緒に外へ出るよう言ったのです。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'sad' }
      ]
    },
    {
      text: 'でも指揮官は、聞いてくれませんでした。決めたのは二人だ、ひとりでは流させない、と言って、仕掛けの前から動きませんでした。',
      speaker: 'ラピスの姉'
    },
    {
      text: '覚えていなくても、あなたはあなたなのですね。',
      speaker: 'ラピスの姉',
      commands: [
        { type: 'char', id: 'sister', pose: 'normal' }
      ]
    },
    {
      text: 'ラピスが空へ向けた姉の手の袖をつかんでいた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '……私も、行かない。',
      speaker: 'ラピス'
    },
    {
      text: '姉はラピスとこちらを見比べた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'smile' }
      ]
    },
    {
      text: '……ずるいですね。二人とも。',
      speaker: 'ラピスの姉'
    },
    {
      text: '姉さんに言われたくない。',
      speaker: 'ラピス',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '姉は小さく息を吐いて、一行の顔をもう一度見ていった。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'sister', pose: 'normal' }
      ]
    },
    {
      text: 'ステラが帽子のつばを持ち上げた。シルヴィは弓を背負いなおした。ロザリーは籠を抱えたまま、小さく頭を下げた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '姉は空の裂け目を見上げなおした。',
      commands: [
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: '……皆さんと閉じます。',
      speaker: 'ラピスの姉'
    },
    {
      text: 'そのとき、頭の上で何かが裂ける音がした。',
      commands: [
        { type: 'charDelete' },
        { type: 'bgShake', duration: 400, intensity: 4 }
      ]
    },
    {
      text: '話しているあいだに裂け目のふちの霜が薄くなっていた。押さえきれなかったところから、獣が何体も氷を割って身を乗りだしてくる。'
    },
    {
      text: '姉が空へ向けた手に力をこめなおした。',
      commands: [
        { type: 'char', id: 'sister', pose: 'serious' }
      ]
    },
    {
      text: 'ベルミリアが剣を抜いた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'vermilia', pose: 'serious' }
      ]
    },
    {
      text: '話は済んだな。……片づけるぞ。',
      speaker: 'ベルミリア'
    }
  ],
  choices: {
    alone: [
      {
        buttonText: '凍らせると決めたのは、二人だ',
        branch: [
          { text: '姉は目を見開いた。', commands: [{ type: 'char', id: 'sister', pose: 'surprised' }] },
          { text: '……同じことを、言うのですね。', speaker: 'ラピスの姉' },
        ],
        points: { lapisTrust: 1 },
      },
      {
        buttonText: 'ひとりでは残らせない',
        branch: [
          { text: '姉は目を見開いた。', commands: [{ type: 'char', id: 'sister', pose: 'surprised' }] },
          { text: '……同じことを、言うのですね。', speaker: 'ラピスの姉' },
        ],
        points: { lapisTrust: 1 },
      },
    ],
  },
};

export default scenario;
