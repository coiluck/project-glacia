import type { ScenarioFile } from '../../../features/scenario/types';

// 背景:
// - bg/camp_border.avif（野営地と、地平線の凍った帝都）
const scenario: ScenarioFile = {
  id: '1-2',
  lines: [
    {
      text: '最後のコオリモチが、浅瀬の手前で崩れて雪に溶けた。',
      commands: [
        { type: 'bg', file: 'images/scenario/bg/camp_border.avif', transition: 'fade' }
      ]
    },
    {
      text: '……倒せた。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'surprised' }
      ]
    },
    {
      text: 'ラピスは肩で息をしながら、しばらく川の向こうを見ていた。それから、こちらを振り返る。'
    },
    {
      text: 'どうして、あんなに的確に指示が出せたんですか。記憶、ないんですよね？',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ],
      choiceId: 'why'
    },
    {
      text: 'ラピスは少し考えるように、口元に手を当てた。'
    },
    {
      text: 'そういえば、困ってたんです。名前が分からないと、呼び方がなくて。',
      speaker: 'ラピス'
    },
    {
      text: '……指揮官、でいいですか。さっきの指示、的確でしたし。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ],
      choiceId: 'title'
    },
    {
      text: 'では、指揮官。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'normal' }
      ]
    },
    {
      text: '……改めて、よろしくお願いします。',
      speaker: 'ラピス',
      commands: [
        { type: 'char', id: 'lapis', pose: 'smile' }
      ]
    },
    // ここから 1-2 の本編
  ],
  choices: {
    why: [
      {
        buttonText: '体が覚えていた',
        branch: [
          { text: '体が……。じゃあ、記憶をなくす前のあなたは、戦うことに慣れていた人なのかもしれませんね。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'serious' }] },
        ],
      },
      {
        buttonText: '君が合わせてくれたからだ',
        points: { lapisTrust: 1 },
        branch: [
          { text: '……私は、言われた通りに動いただけです。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] },
          { text: 'でも、言われた通りに動いて勝てたのは、初めてかもしれません。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
        ],
      },
    ],
    title: [
      {
        buttonText: 'それでいい',
        branch: [
          { text: 'よかった。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
        ],
      },
      {
        buttonText: '大げさじゃないか？',
        branch: [
          { text: '部隊がひとりでも、指揮官は指揮官です。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'smile' }] },
          { text: '本当の名前を思い出したら、そっちで呼びますから。', speaker: 'ラピス', commands: [{ type: 'char', id: 'lapis', pose: 'normal' }] },
        ],
      },
    ],
  },
};

export default scenario;
