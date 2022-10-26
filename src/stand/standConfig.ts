import { createConfig } from '@consta/stand';

import image from './ConstaImage.png';

const groups = [
  {
    title: 'О библиотеке amCharts',
    id: 'docs',
    initialOpen: true,
  },
  {
    title: 'Примеры',
    id: 'examples',
    initialOpen: true,
  },
] as const;

export const { createStand } = createConfig({
  title: 'Стилизация карт amCharts',
  id: 'amcharts-map-examples',
  groups,
  group: 'Библиотеки компонентов',
  image,
  description:
    'Примеры использования карт из библиотеки amCharts для дизайн-системы Consta.',
});
