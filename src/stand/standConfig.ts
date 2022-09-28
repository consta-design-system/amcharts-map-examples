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
  title: 'Стилизация карт amChart 5',
  id: 'amcharts-map-examples',
  groups,
  group: 'Библиотеки компонентов',
  image,
  description:
    'Здесь описано, как использовать карты из библиотеки amChart 5 для дизайн-системы Consta.',
});
