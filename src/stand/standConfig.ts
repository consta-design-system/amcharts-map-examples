import { createConfig } from '@consta/stand';

import image from './ConstaImage.png';

const groups = [
  {
    title: 'amcharts',
    id: 'amcharts',
  },
] as const;

export const { createStand } = createConfig({
  title: 'Consta amcharts-map-examples',
  id: 'amcharts-map-examples',
  groups,
  group: 'Библиотеки компонентов',
  image,
  description:
    '[тут описание что это такое] Ультра топчик библиотеки с пацанскими кнопками и графиками, качай.',
});
