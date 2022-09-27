export const DISABLED_REGIONS = [
  'RU-MUR',
  'RU-NEN',
  'RU-TVE',
  'RU-YAR',
  'RU-SMO',
  'RU-BRY',
  'RU-KRS',
];

export type City = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

export type MiningCenter = {
  id: string;
  name: string;
  value: number;
  radius?: number;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  destinations?: string[];
};

export const STRIPED_REGIONS = ['RU-TY', 'RU-IRK'];
export const ACTIVE_REGIONS = [
  'RU-ORE',
  'RU-TYU',
  'RU-KHM',
  'RU-TOM',
  'RU-YAN',
];

export const CITIES: City[] = [
  {
    latitude: 59.9342802,
    longitude: 30.3350986,
    id: 'SPB',
    name: 'Санкт-Петербург',
  },
  {
    latitude: 55.755826,
    longitude: 37.6173,
    id: 'MSC',
    name: 'Москва',
  },
];

export const ORIGIN_CENTER: MiningCenter = {
  value: 2,
  id: 'YML',
  radius: 20,
  geometry: {
    type: 'Point',
    coordinates: [74.932932, 65.047657],
  },
  destinations: ['YKT', 'KRS', 'TMS'],
  name: 'ЯМАЛО-НЕНЕНСКИЙ АВТОНОМНЫЙ ОКРУГ',
};

export const MINING_CENTER: MiningCenter[] = [
  {
    id: 'YKT',
    value: 54,
    radius: 28,
    geometry: {
      type: 'Point',
      coordinates: [124.123753, 66.761345],
    },
    name: 'ЯКУТИЯ',
  },
  {
    radius: 20,
    geometry: {
      type: 'Point',
      coordinates: [95.147776, 61.911637],
    },
    value: 5,
    id: 'KRS',
    name: 'КРАСНООЯРСКИЙ КРАЙ',
  },
  {
    radius: 20,
    value: 2,
    geometry: {
      type: 'Point',
      coordinates: [82.139964, 58.371289],
    },
    id: 'TMS',
    name: 'ТОМСКАЯ ОБЛАСТЬ',
  },
];

export const POLYGONS: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [136.066786, 67.155569],
            [136.066786, 66.155569],
            [134.066786, 66.155569],
            [134.066786, 64.155569],
            [132.066786, 64.155569],
            [132.066786, 65.155569],
            [130.066786, 65.155569],
            [130.066786, 66.155569],
            [128.066786, 66.155569],
            [128.066786, 67.155569],
            [130.066786, 67.155569],
            [130.066786, 68.155569],
            [132.066786, 68.155569],
            [132.066786, 67.155569],
            [136.066786, 67.155569],
          ],
        ],
      },
      properties: {
        name: 'Вынгаяхинский лицензионный участок',
        id: 'polygon1',
      },
      id: 'polygon1',
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [134.066786, 64.155569],
            [134.066786, 63.155569],
            [132.066786, 63.155569],
            [132.066786, 61.155569],
            [130.066786, 61.155569],
            [130.066786, 62.155569],
            [126.066786, 62.155569],
            [126.066786, 63.155569],
            [128.066786, 63.155569],
            [128.066786, 64.155569],
            [130.066786, 64.155569],
            [130.066786, 65.155569],
            [132.066786, 65.155569],
            [132.066786, 64.155569],
            [134.066786, 64.155569],
          ],
        ],
      },
      properties: {
        name: 'Вынгаяхинский лицензионный участок',
        id: 'polygon2',
      },
      id: 'polygon2',
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [90.840919, 70.847764],
            [94.840919, 70.847764],
            [94.840919, 69.847764],
            [96.840919, 69.847764],
            [96.840919, 67.847764],
            [94.840919, 67.847764],
            [94.840919, 66.847764],
            [92.840919, 66.847764],
            [92.840919, 67.847764],
            [88.840919, 67.847764],
            [88.840919, 69.847764],
            [90.840919, 69.847764],
            [90.840919, 70.847764],
          ],
        ],
      },
      properties: {
        name: 'Вынгаяхинский лицензионный участок',
        id: 'polygon3',
      },
      id: 'polygon3',
    },
  ],
};
