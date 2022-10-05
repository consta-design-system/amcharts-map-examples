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

export type GroupItem = {
  co_loc_n: string;
  MAIL_ST_PROV_C: string;
  LNGTD_I: number;
  LATTD_I: number;
  mail_city_n: string;
  isCenter?: boolean;
  isGroup?: boolean;
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
    latitude: 62.0339,
    longitude: 129.733,
    id: 'YKT',
    name: 'Якутск',
  },
  {
    latitude: 56.4977,
    longitude: 84.9744,
    id: 'TMS',
    name: 'Томск',
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

export const GROUPS: GroupItem[] = [
  {
    co_loc_n: 'ХМАО 1',
    MAIL_ST_PROV_C: 'KHM',
    LNGTD_I: 66.44187529687491,
    LATTD_I: 63.41758375586903,
    mail_city_n: 'ХМАО 1',
    isGroup: true,
  },
  {
    co_loc_n: 'ХМАО 1-1',
    MAIL_ST_PROV_C: 'KHM',
    LNGTD_I: 66.44187529687491,
    LATTD_I: 63.41758375586903,
    mail_city_n: 'ХМАО 1',
  },
  {
    co_loc_n: 'ХМАО 1-2',
    MAIL_ST_PROV_C: 'KHM',
    LNGTD_I: 66.34574492578116,
    LATTD_I: 63.232380035046184,
    mail_city_n: 'ХМАО 1',
  },
  {
    co_loc_n: 'ХМАО 2',
    MAIL_ST_PROV_C: 'KHM',
    LNGTD_I: 64.79927684374516,
    LATTD_I: 62.00555794596251,
    mail_city_n: 'ХМАО 2',
    isGroup: true,
  },
  {
    co_loc_n: 'ХМАО 2-1',
    MAIL_ST_PROV_C: 'KHM',
    LNGTD_I: 64.79927684374516,
    LATTD_I: 62.00555794596251,
    mail_city_n: 'ХМАО 2',
  },
  {
    co_loc_n: 'ХМАО 2-2',
    MAIL_ST_PROV_C: 'KHM',
    LNGTD_I: 64.32686473437016,
    LATTD_I: 61.916339814585704,
    mail_city_n: 'ХМАО 2',
  },
  {
    co_loc_n: 'ХМАО 2-3',
    MAIL_ST_PROV_C: 'KHM',
    LNGTD_I: 64.56032420702644,
    LATTD_I: 61.7878735794065,
    mail_city_n: 'ХМАО 2',
  },
  {
    co_loc_n: 'ХМАО 3',
    MAIL_ST_PROV_C: 'KHM',
    LNGTD_I: 70.61241771288572,
    LATTD_I: 60.41552451034487,
    mail_city_n: 'ХМАО 3',
    isGroup: true,
  },
  {
    co_loc_n: 'ХМАО 3-1',
    MAIL_ST_PROV_C: 'KHM',
    LNGTD_I: 70.61241771288572,
    LATTD_I: 60.41552451034487,
    mail_city_n: 'ХМАО 3',
  },
  {
    co_loc_n: 'Скважина 2',
    MAIL_ST_PROV_C: 'YAN',
    LNGTD_I: 75.69332908278163,
    LATTD_I: 68.43918282446568,
    mail_city_n: 'Скважина 2',
    isGroup: true,
  },
  {
    co_loc_n: 'Скважина 2-1',
    MAIL_ST_PROV_C: 'YAN',
    LNGTD_I: 75.69332908278163,
    LATTD_I: 68.43918282446568,
    mail_city_n: 'Скважина 2',
  },
  {
    co_loc_n: 'Скважина 1',
    MAIL_ST_PROV_C: 'YAN',
    LNGTD_I: 76.5173036921566,
    LATTD_I: 66.20208683443572,
    mail_city_n: 'Скважина 1',
    isGroup: true,
  },
  {
    co_loc_n: 'Скважина 1-1',
    MAIL_ST_PROV_C: 'YAN',
    LNGTD_I: 76.5173036921566,
    LATTD_I: 66.20208683443572,
    mail_city_n: 'Скважина 1',
  },
  {
    co_loc_n: 'Скважина 3',
    MAIL_ST_PROV_C: 'YAN',
    LNGTD_I: 69.04660056715633,
    LATTD_I: 66.1220765426193,
    mail_city_n: 'Скважина 3',
    isGroup: true,
  },
  {
    co_loc_n: 'Скважина 3-1',
    MAIL_ST_PROV_C: 'YAN',
    LNGTD_I: 69.04660056715633,
    LATTD_I: 66.1220765426193,
    mail_city_n: 'Скважина 3',
  },
  {
    co_loc_n: 'Скважина 3-2',
    MAIL_ST_PROV_C: 'YAN',
    LNGTD_I: 70.99118064528167,
    LATTD_I: 65.96577397780811,
    mail_city_n: 'Скважина 3',
  },
  {
    co_loc_n: 'Тюмень',
    MAIL_ST_PROV_C: 'TYU',
    LNGTD_I: 65.534328,
    LATTD_I: 57.153033,
    isGroup: true,
    mail_city_n: 'Тюмень',
  },
  {
    co_loc_n: 'ЦУБ Тюмень',
    MAIL_ST_PROV_C: 'TYU',
    LNGTD_I: 65.534328,
    LATTD_I: 57.153033,
    isCenter: true,
    mail_city_n: 'Тюмень',
  },
  {
    co_loc_n: 'Томск 1',
    MAIL_ST_PROV_C: 'TOM',
    LNGTD_I: 77.44536018164045,
    LATTD_I: 58.916393162239494,
    mail_city_n: 'Томск 1',
    isGroup: true,
  },
  {
    co_loc_n: 'Томск 1-1',
    MAIL_ST_PROV_C: 'TOM',
    LNGTD_I: 77.44536018164045,
    LATTD_I: 58.916393162239494,
    mail_city_n: 'Томск 1',
  },
  {
    co_loc_n: 'Томск 1-2',
    MAIL_ST_PROV_C: 'TOM',
    LNGTD_I: 77.82988166601544,
    LATTD_I: 58.74550146928487,
    mail_city_n: 'Томск 1',
  },
  {
    co_loc_n: 'Томск 2',
    MAIL_ST_PROV_C: 'TOM',
    LNGTD_I: 78.5110340097654,
    LATTD_I: 57.501744320679336,
    mail_city_n: 'Томск 2',
    isGroup: true,
  },
  {
    co_loc_n: 'Томск 2-1',
    MAIL_ST_PROV_C: 'TOM',
    LNGTD_I: 78.5110340097654,
    LATTD_I: 57.501744320679336,
    mail_city_n: 'Томск 2',
  },
  {
    co_loc_n: 'Томск 2-3',
    MAIL_ST_PROV_C: 'TOM',
    LNGTD_I: 78.96696662695291,
    LATTD_I: 57.432186610532526,
    mail_city_n: 'Томск 2',
  },
  {
    co_loc_n: 'Томск 2-2',
    MAIL_ST_PROV_C: 'TOM',
    LNGTD_I: 78.63737678320288,
    LATTD_I: 57.368432229382066,
    mail_city_n: 'Томск 2',
  },
  {
    co_loc_n: 'Иркутск 2',
    MAIL_ST_PROV_C: 'IRK',
    LNGTD_I: 98.21110071093689,
    LATTD_I: 54.359396770898584,
    mail_city_n: 'Иркутск 2',
    isGroup: true,
  },
  {
    co_loc_n: 'Иркутск 2-1',
    MAIL_ST_PROV_C: 'IRK',
    LNGTD_I: 98.21110071093689,
    LATTD_I: 54.359396770898584,
    mail_city_n: 'Иркутск 2',
  },
  {
    co_loc_n: 'Иркутск 1',
    MAIL_ST_PROV_C: 'IRK',
    LNGTD_I: 107.45609582812448,
    LATTD_I: 55.56509814056677,
    mail_city_n: 'Иркутск 1',
    isGroup: true,
  },
  {
    co_loc_n: 'Иркутск 1-1',
    MAIL_ST_PROV_C: 'IRK',
    LNGTD_I: 107.45609582812448,
    LATTD_I: 55.56509814056677,
    mail_city_n: 'Иркутск 1',
  },
  {
    co_loc_n: 'Иркутск 1-2',
    MAIL_ST_PROV_C: 'IRK',
    LNGTD_I: 107.86533655078071,
    LATTD_I: 55.431013801430794,
    mail_city_n: 'Иркутск 1',
  },
];
