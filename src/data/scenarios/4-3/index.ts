import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/frozen_gate.avif（凍った帝都の西の門。開いたままの門扉と、門の内側へ続く大通り）
// 立ち絵:
// - automaton（ロボ娘。名前「ネーヴェ」は仮）
const scenario: ScenarioFile = {
  id: '4-3',
  lines: [
    {
      text: '人の形をした影が、氷の上に片膝をついた。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/frozen_gate.avif', transition: 'fade' }
      ]
    },
    {
      text: '少女の形をしていた。白い外套の下に、防衛軍の軍服を着ている。袖口から継ぎ目のある金属の手がのぞいていた。襟もとや袖口から細く白い煙が上がっていた。',
      commands: [
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: '警告。機体温度が上限を超えています。',
      speaker: '？？？'
    },
    {
      text: '……人形？',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'surprised' }
      ]
    },
    {
      text: 'ソレイユさんに近づきすぎたんです。熱で動けなくなってる。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: '冷却が追いつきません。脱ぎます。',
      speaker: '？？？',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: '人形は、白い外套の留め具を外した。外套が氷の上に落ちる。続けて軍服の上着を脱ぎ、手袋を外し、ためらいなくシャツのボタンに指をかけた。'
    },
    {
      text: 'ちょ、ちょっと待ってください！？',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised', bounce: true }
      ]
    },
    {
      text: '服は、熱がこもります。冷却効率を優先します。',
      speaker: '？？？'
    },
    {
      text: 'シャツのボタンが三つ目まで外れたところで、アルマが黙ってこちらの前に立った。目の前がアルマの外套の背中でいっぱいになった。',
      commands: [
        { type: 'char', id: 'alma', pose: 'serious' }
      ]
    },
    {
      text: '……アルマ？',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '念のためです。',
      speaker: 'アルマ'
    },
    {
      text: '何か衣擦れの音がいたしますね。たくさん。',
      speaker: 'ロザリー',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'normal' }
      ]
    },
    {
      text: 'ロザリーさんはそのままでいいです……！',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised' }
      ]
    },
    {
      text: 'ソレイユが、そっと三歩うしろへ下がった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '機体温度、下がりはじめました。視覚を戻します。',
      speaker: '？？？'
    },
    {
      text: 'アルマが、こちらの前から脇へよけた。',
      commands: [
        { type: 'char', id: 'alma', pose: 'normal' }
      ]
    },
    {
      text: '人形は、脱いだ服を胸の前に抱えて座っていた。はだけたシャツの胸もとにも、金属の継ぎ目が走っていた。青い目が何度かまたたいて、ソレイユからひとりずつ顔を確かめるように動いていく。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: 'その目が、こちらで止まった。'
    },
    {
      text: '……指揮官？',
      speaker: '？？？',
      commands: [
        { type: 'char', id: 'automaton', pose: 'surprised' }
      ]
    },
    {
      text: '外に出したはずですが。',
      speaker: '？？？'
    },
    {
      text: '……出した？',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: '人形は、服を抱えたまま背すじを伸ばした。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: '帝都防衛軍、指揮所付きの自律人形です。兵のみなさんからは、ネーヴェと呼ばれていました。',
      speaker: 'ネーヴェ'
    },
    {
      text: '熱源を魔物と判断して、攻撃しました。視覚より熱の感知を優先する造りです。申し訳ありません。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'sad' }
      ]
    },
    {
      text: '……防衛軍の人形が、まだ動いていたとは。',
      speaker: 'オボロ',
      commands: [
        { type: 'char', id: 'oboro', pose: 'surprised' }
      ]
    },
    {
      text: '機械なので、凍りません。この寒さはむしろ調子がいいです。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'smile' }
      ]
    },
    {
      text: 'ネーヴェは、脱いだ服を一枚ずつ着なおしながら話した。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: '凍結のあと、指揮所に命令は来なくなりました。指揮所の兵のみなさんも指揮官も、凍っていました。',
      speaker: 'ネーヴェ'
    },
    {
      text: '命令がないときは、持ち場で待つ決まりです。ですから、待ちました。',
      speaker: 'ネーヴェ'
    },
    {
      text: '……どのくらい？',
      speaker: 'ステラ',
      commands: [
        { type: 'char', id: 'stella', pose: 'normal' }
      ]
    },
    {
      text: 'しばらくです。それから、命令をくれる人を掘り出すことにしました。',
      speaker: 'ネーヴェ'
    },
    {
      text: '魔法の氷は、溶けません。ですから、手で削りました。指揮官は指揮所の窓の前にいたので、掘り出せる場所でした。',
      speaker: 'ネーヴェ'
    },
    {
      text: '削り終えるまでの日数は、記録してあります。お聞きになりますか。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'ラピスは、少しのあいだネーヴェを見ていた。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '……いいえ。',
      speaker: 'ラピス'
    },
    {
      text: '掘り出した指揮官は、すぐにまた白くなりはじめました。中では、人は生きられません。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: '命令をもらう前に、外へ出すしかありませんでした。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'わたしの持ち場は帝都です。帝都の外へは出られません。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'それで、境界の手前で下ろしました。境界の向こうに灯りが見えたので、灯りのほうへまっすぐ歩くように言いました。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'ロザリーが、籠を抱えなおした。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'rosalie', pose: 'surprised' }
      ]
    },
    {
      text: '……灯り、と申されましたか。',
      speaker: 'ロザリー'
    },
    {
      text: '小さな灯りがいくつか並んでいました。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'ロザリーさんのランタンです……！ 毎晩、境界のそばに置いてる……！',
      speaker: 'クラリス',
      commands: [
        { type: 'char', id: 'clarice', pose: 'surprised' }
      ]
    },
    {
      text: '……だから指揮官は、雪の上をまっすぐこっちへ来たんですね。境界を出たところで倒れるまで。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: 'ロザリーは、籠の中のランタンにそっと触れた。',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'smile' }
      ]
    },
    {
      text: '灯りを見て帰ってこられたのですね。',
      speaker: 'ロザリー'
    },
    {
      text: '中の方々が道に迷わないようにと、置いてまいりました。……ひとりは、ちゃんと届いていたのですね。',
      speaker: 'ロザリー'
    },
    {
      text: 'ラピスが、ネーヴェの前にしゃがんだ。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    },
    {
      text: 'ネーヴェさん。姉さんは……第一皇女は、どこにいますか。',
      speaker: 'ラピス'
    },
    {
      text: '殿下は、帝都の中央です。裂け目のすぐそばにおられます。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'normal' }
      ]
    },
    {
      text: '殿下は、掘れません。殿下のまわりを削れば、裂け目を押さえている氷もゆるみます。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'ラピスは、膝の上で手を握った。',
      commands: [
        { type: 'char', id: 'lapis', pose: 'sad' }
      ]
    },
    {
      text: '……会えますか。掘れなくても。',
      speaker: 'ラピス'
    },
    {
      text: '会えます。殿下はずっとあそこにおられます。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'ネーヴェは上着の最後のボタンをとめると、立ち上がった。それからこちらに向き直って、まっすぐに立った。',
      commands: [
        { type: 'charDelete' },
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: '指揮官。',
      speaker: 'ネーヴェ'
    },
    {
      text: 'ご命令を。',
      speaker: 'ネーヴェ',
      choiceId: 'order'
    },
    {
      text: 'クラリスは、大通りの脇に目をやっていた。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: '門の内側に、兵が並んで凍っていた。槍を外へ向けて、門へ押し寄せる人の流れを背にかばう形のまま止まっている。'
    },
    {
      text: 'クラリスは、いちばん手前の兵の胸もとを見た。氷ごしに名前を刻んだ札が見えた。',
      commands: [
        { type: 'char', id: 'clarice', pose: 'serious' }
      ]
    },
    {
      text: 'クラリスは手帳を開いて、名前を書きとめた。それから隣の兵の札を見て、また書いた。'
    },
    {
      text: '……隊長の隊の人たちです。',
      speaker: 'クラリス'
    },
    {
      text: 'アルマは、兵たちの顔をひとりずつ見ていった。',
      commands: [
        { type: 'char', id: 'alma', pose: 'sad' }
      ]
    },
    {
      text: 'あの夜、私は殿下のご命令で列の守りについて外へ出ました。この者たちには門の守りを命じて。',
      speaker: 'アルマ'
    },
    {
      text: '……残る者と出る者を分けたのは、私です。',
      speaker: 'アルマ'
    },
    {
      text: 'ロザリーが、クラリスの隣に立った。',
      commands: [
        { type: 'char', id: 'rosalie', pose: 'normal' }
      ]
    },
    {
      text: 'クラリスさん。お名前を読んでいただけますか。',
      speaker: 'ロザリー'
    },
    {
      text: 'クラリスが名前を読み上げると、ロザリーは札の束をめくって、同じ名前の札を探した。見つかると、その名前をもう一度声に出して呼んだ。'
    },
    {
      text: '札が見つからない名前もあった。ロザリーはその名前も、同じように呼んだ。'
    },
    {
      text: 'ネーヴェの案内で、大通りを中央へ向かった。',
      commands: [
        { type: 'charDelete' }
      ]
    },
    {
      text: 'ネーヴェはソレイユから十歩ぶん離れて、霜の線のすぐ外を歩いた。ときどき襟もとから白い煙が上がった。'
    },
    {
      text: '大通りの先で、氷の上を何かが這う音がした。',
      commands: [
        { type: 'bgShake', duration: 300, intensity: 3 }
      ]
    },
    {
      text: '前方に熱源。……いえ、熱を求める群れです。この先の道をふさいでいます。',
      speaker: 'ネーヴェ',
      commands: [
        { type: 'char', id: 'automaton', pose: 'serious' }
      ]
    },
    {
      text: '行きましょう、指揮官。中央への道です。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'serious' }
      ]
    }
  ],
  choices: {
    order: [
      {
        buttonText: '中央まで案内してくれ',
        branch: [
          { text: '了解しました。', speaker: 'ネーヴェ', commands: [{ type: 'char', id: 'automaton', pose: 'smile' }] },
          { text: 'ネーヴェは、ほんの少しだけ口もとをゆるめた。' },
          { text: '……命令を受けるのは、ひさしぶりです。', speaker: 'ネーヴェ' },
        ],
      },
      {
        buttonText: '掘り出してくれて、ありがとう',
        branch: [
          { text: 'ネーヴェは、まばたきをした。', commands: [{ type: 'char', id: 'automaton', pose: 'surprised' }] },
          { text: '……それは、命令ではありません。', speaker: 'ネーヴェ' },
          { text: 'では、中央まで案内します。これは、わたしの判断です。', speaker: 'ネーヴェ', commands: [{ type: 'char', id: 'automaton', pose: 'smile' }] },
        ],
      },
    ],
  },
};

export default scenario;
