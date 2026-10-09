import { paths } from '../router/paths';

export interface Event {
  id: string;
  title: string;
  image: string;
  link: string;
}

export const EVENTS: Event[] = [
  {
    id: 'start',
    title: 'ゲームスタート！',
    image: 'images/events/start.avif',
    link: paths.story,
  },
  {
    id: 'base',
    title: '基地機能が解放！',
    image: 'images/events/base.avif',
    link: paths.base,
  },
  {
    id: 'exchange',
    title: '交換所が解放！',
    image: 'images/events/exchange.avif',
    link: paths.exchange,
  },
];