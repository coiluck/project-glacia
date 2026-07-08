import type { ScenarioFile } from '../../../features/scenario/types';

// ステージ 1-1 のシナリオ。lines に本編、choices に分岐を書く。
const scenario: ScenarioFile = {
  id: '1-1',
  lines: [
    {
      text: '黒板の前に立たされて、私はクラス中の視線を一身に浴びていた。',
    },
    {
      text: 'えー、今日から転入してきた――',
      speaker: '担任',
    },
    {
      text: '担任の声が、やけに遠くで響いて聞こえる。',
    },
    {
      text: '（落ち着いて。こういうの、何度もやってきた）',
    },
    {
      text: '息を吸って、口角を上げる。',
    },
    {
      text: '藤波瑞穂です。よろしくお願いします',
      speaker: '瑞穂',
    },
    {
      text: 'ぱらぱらと拍手が起きた。',
    },
    {
      text: '悪くない反応。たぶん、第一印象は合格点。',
    },
    {
      text: '席はあそこに用意してあるから',
      speaker: '担任',
    },
    {
      text: 'そう言って担任は窓側の後ろの席を指した。',
    },
    {
      text: '春の光が、机の木目を白く照らしている。',
    },
    {
      text: '──大丈夫。ここでも、うまくやれる。',
    },
  ],
};

export default scenario;
