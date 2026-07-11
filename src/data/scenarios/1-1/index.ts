import type { ScenarioFile } from '../../../features/scenario/types';

// ステージ 1-1 のシナリオ。lines に本編、choices に分岐を書く。
// エンジン機能テスト用のサンプル。char / charDelete は画像未作成のため未使用。
const scenario: ScenarioFile = {
  id: '1-1',
  lines: [
    {
      text: 'テキスト1です。背景を fade で表示しています。',
      commands: [
        { type: 'bg', file: 'images/start/background.png', transition: 'fade' },
      ],
    },
    {
      text: 'テキスト2です。',
    },
    {
      text: 'テキスト3です。speaker 付きのセリフです。',
      speaker: 'キャラA',
    },
    {
      text: 'テキスト4です。背景を crossfade で切り替えました。',
      commands: [
        { type: 'bg', file: 'images/top/ice_port.jpg', transition: 'crossfade' },
      ],
    },
    {
      text: 'テキスト5です。bgMove で背景が左から右へ動きます。',
      commands: [
        { type: 'bgMove', direction: 'leftToRight', duration: 3000 },
      ],
    },
    {
      text: 'テキスト6です。この行の前に wait で1秒待ちました。',
      commands: [
        { type: 'wait', ms: 1000 },
      ],
    },
    {
      text: 'テキスト7です。次は選択肢が出ます。',
      speaker: 'キャラB',
    },
    {
      // choiceId 行の text は表示されない
      text: '',
      choiceId: 'first',
    },
    {
      text: 'テキスト8です。分岐から合流しました。',
    },
    {
      // 選択肢Aを選んでいた場合のみ「選択肢C」が表示される (showIf のテスト)
      text: '',
      choiceId: 'second',
    },
    {
      text: 'テキスト9です。2つ目の分岐から合流しました。',
    },
    {
      text: 'テキスト10です。これで最後です。ここで advance すると end になります。',
      speaker: 'キャラA',
    },
  ],
  choices: {
    first: [
      {
        buttonText: '選択肢Aです (sampleA +1)',
        points: { sampleA: 1 },
        branch: [
          { text: '選択肢Aのテキスト1です。' },
          { text: '選択肢Aのテキスト2です。points に sampleA が加算されました。', speaker: 'キャラA' },
        ],
      },
      {
        buttonText: '選択肢Bです (points なし)',
        branch: [
          { text: '選択肢Bのテキスト1です。' },
          { text: '選択肢Bのテキスト2です。', speaker: 'キャラB' },
        ],
      },
    ],
    second: [
      {
        buttonText: '選択肢Cです (Aを選んだときだけ表示)',
        showIf: [{ key: 'sampleA', op: '>=', value: 1 }],
        branch: [
          { text: '選択肢Cのテキスト1です。showIf の条件を満たしています。' },
        ],
      },
      {
        buttonText: '選択肢Dです (常に表示)',
        branch: [
          { text: '選択肢Dのテキスト1です。' },
        ],
      },
    ],
  },
};

export default scenario;
