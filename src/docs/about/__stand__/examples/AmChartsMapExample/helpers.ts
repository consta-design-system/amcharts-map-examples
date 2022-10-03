import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import { ThemeVars } from '@consta/uikit/useThemeVars';

import {
  ACTIVE_REGIONS,
  City,
  DISABLED_REGIONS,
  GroupItem,
  MiningCenter,
  STRIPED_REGIONS,
} from './mock.data';

export const converPixels = (pixels: string) => {
  return Number(pixels.replace(/px/g, ''));
};

const getDisabledPolygon = (id: string) => {
  return {
    id,
    settings: {
      fill: am5.color('#004269'),
      fillOpacity: 0.07,
    },
  };
};

const getActivePolygon = (id: string) => {
  return {
    id,
    settings: {
      fill: am5.color('#0071B2'),
      fillOpacity: 0.3,
    },
  };
};

const getStripedPolygon = (id: string, root: am5.Root, vars: ThemeVars) => {
  return {
    id,
    settings: {
      fill: am5.color(vars.color.primary['--color-bg-default']),
      fillOpacity: 0.3,
      fillPattern: am5.LinePattern.new(root, {
        color: am5.color('#0071B2'),
        colorOpacity: 0.3,
        rotation: 135,
        strokeWidth: 1,
      }),
    },
  };
};

export const setTooltipTheme = (root: am5.Root, vars: ThemeVars) => {
  const tooltip = am5.Tooltip.new(root, {
    getFillFromSprite: false,
    pointerOrientation: 'vertical',
    autoTextColor: false,
  });

  tooltip?.get('background')?.setAll({
    fill: am5.color(vars.color.primary['--color-bg-default']),
    fillOpacity: 1,
    shadowBlur: 40,
    shadowOffsetX: 4,
    shadowOffsetY: 8,
    shadowColor: am5.color('rgba(0,32,51,0.04'),
    shadowOpacity: 0.1,
  });

  tooltip.label.setAll({
    fill: am5.color(vars.color.primary['--color-typo-primary']),
    textAlign: 'center',
    fontSize: vars.size['--size-text-xs'],
    fontFamily: vars.font['--font-primary'],
    lineHeight: 1.5,
  });

  tooltip.setAll({
    paddingBottom: converPixels(vars.space['--space-xs']),
    paddingLeft: converPixels(vars.space['--space-xs']),
    paddingRight: converPixels(vars.space['--space-xs']),
    paddingTop: converPixels(vars.space['--space-xs']),
  });

  return tooltip;
};

export const setMap = (
  polygonSeries: am5map.MapPolygonSeries,
  vars: ThemeVars,
) => {
  polygonSeries.mapPolygons.template.states.create('hover', {
    stroke: am5.color('#66ADE1'),
  });

  polygonSeries.mapPolygons.template.states.create('active', {
    fill: am5.color('#0071B2'),
    fillOpacity: 0.3,
    stroke: am5.color(vars.color.primary['--color-bg-default']),
  });

  polygonSeries.mapPolygons.template.states.create('disable', {
    fill: am5.color('#004269'),
    fillOpacity: 0.7,
  });

  let previousPolygon: am5map.MapPolygon | undefined;

  polygonSeries.mapPolygons.template.events.on('pointerover', function (event) {
    event.target.toFront();
  });
  polygonSeries.mapPolygons.template.events.on('pointerout', function (event) {
    if (event.target !== previousPolygon) {
      event.target.toBack();
    }
  });

  polygonSeries.mapPolygons.template.on('active', function (active, target) {
    if (previousPolygon && previousPolygon !== target) {
      previousPolygon.set('active', false);
    }
    if (target?.get('active')) {
      target?.toFront();
      target?.dataItem &&
        polygonSeries.zoomToDataItem(
          target.dataItem as am5.DataItem<am5map.IMapPolygonSeriesDataItem>,
        );
    }

    previousPolygon = target;
  });

  polygonSeries.mapPolygons.template.setAll({
    tooltipText: '{name}',
    toggleKey: 'active',
    interactive: true,
    fill: am5.color('#0071B2'),
    fillOpacity: 0.16,
    strokeWidth: 2,
    templateField: 'settings',
    stroke: am5.color(vars.color.primary['--color-bg-default']),
  });
};

export const setRegionsPatterns = (
  polygonSeries: am5map.MapPolygonSeries,
  root: am5.Root,
  vars: ThemeVars,
) => {
  polygonSeries.data.setAll([
    ...DISABLED_REGIONS.map((id) => getDisabledPolygon(id)),
    ...ACTIVE_REGIONS.map((id) => getActivePolygon(id)),
    ...STRIPED_REGIONS.map((id) => getStripedPolygon(id, root, vars)),
  ]);
};

export const setCitiesPoint = (
  data: City[],
  chart: am5map.MapChart,
  root: am5.Root,
  vars: ThemeVars,
) => {
  const citySeries = chart.series.push(
    am5map.MapPointSeries.new(root, {
      calculateAggregates: true,
      polygonIdField: 'id',
    }),
  );
  citySeries.bullets.push(function () {
    const container = am5.Container.new(root, {});
    container.children.push(
      am5.Circle.new(root, {
        radius: 6,
        fill: am5.color(vars.color.primary['--color-typo-normal']),
        stroke: am5.color(vars.color.primary['--color-bg-default']),
        strokeWidth: 2,
      }),
    );
    container.children.push(
      am5.Label.new(root, {
        text: '{name}',
        marginTop: 4,
        populateText: true,
        fontWeight: '600',
        fill: am5.color(vars.color.primary['--color-typo-primary']),
        fontSize: converPixels(vars.size['--size-text-s']),
        lineHeight: 1.2,
        centerX: am5.p50,
      }),
    );
    return am5.Bullet.new(root, {
      sprite: container,
    });
  });

  data.forEach((item) => {
    citySeries.pushDataItem(item);
  });
};

export const setMiningPoint = (
  data: {
    origin: MiningCenter;
    minings: MiningCenter[];
  },
  chart: am5map.MapChart,
  root: am5.Root,
  vars: ThemeVars,
) => {
  const lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
  lineSeries.mapLines.template.setAll({
    stroke: am5.color('#56B9F2'),
    strokeOpacity: 0.6,
    strokeWidth: 2,
  });

  const originSeries = chart.series.push(
    am5map.MapPointSeries.new(root, { idField: 'id' }),
  );

  originSeries.bullets.push(function (root, series, dataItem) {
    const container = am5.Container.new(root, {});
    const { radius } = dataItem.dataContext as { radius: number };
    container.children.push(
      am5.Circle.new(root, {
        radius,
        fill: am5.color(vars.color.primary['--color-bg-default']),
        stroke: am5.color(vars.color.primary['--color-bg-success']),
        strokeWidth: 4,
      }),
    );
    container.children.push(
      am5.Label.new(root, {
        text: '{name}',
        paddingLeft: radius + converPixels(vars.space['--space-m']),
        populateText: true,
        fontWeight: 'bold',
        oversizedBehavior: 'wrap',
        fontFamily: vars.font['--font-primary'],
        fontSize: converPixels(vars.size['--size-text-s']),
        fill: am5.color(vars.color.primary['--color-typo-primary']),
        maxWidth: 200,
        lineHeight: 1.2,
        centerY: am5.p50,
      }),
    );
    container.children.push(
      am5.Label.new(root, {
        text: '{value}',
        marginLeft: converPixels(vars.space['--space-m']),
        populateText: true,
        fontWeight: '600',
        fontFamily: vars.font['--font-primary'],
        fontSize: converPixels(vars.size['--size-text-l']),
        fill: am5.color(vars.color.primary['--color-typo-primary']),
        lineHeight: 1.4,
        centerX: am5.p50,
        centerY: am5.p50,
      }),
    );

    return am5.Bullet.new(root, {
      sprite: container,
    });
  });
  const miningsSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

  miningsSeries.bullets.push(function (root, series, dataItem) {
    const container = am5.Container.new(root, {});
    const { radius } = dataItem.dataContext as { radius: number };

    container.children.push(
      am5.Circle.new(root, {
        radius,
        fill: am5.color(vars.color.primary['--color-bg-default']),
        stroke: am5.color(vars.color.primary['--color-bg-success']),
        strokeWidth: 4,
      }),
    );
    container.children.push(
      am5.Label.new(root, {
        text: '{name}',
        paddingLeft: radius + converPixels(vars.space['--space-m']),
        populateText: true,
        fontWeight: 'bold',
        fill: am5.color(vars.color.primary['--color-typo-primary']),
        oversizedBehavior: 'wrap',
        fontFamily: vars.font['--font-primary'],
        fontSize: converPixels(vars.size['--size-text-s']),
        maxWidth: 200,
        lineHeight: 1.2,
        centerY: am5.p50,
      }),
    );
    container.children.push(
      am5.Label.new(root, {
        text: '{value}',
        marginLeft: converPixels(vars.space['--space-m']),
        populateText: true,
        fontWeight: '600',
        fontFamily: vars.font['--font-primary'],
        fontSize: converPixels(vars.size['--size-text-l']),
        fill: am5.color(vars.color.primary['--color-typo-primary']),
        lineHeight: 1.4,
        centerX: am5.p50,
        centerY: am5.p50,
      }),
    );

    return am5.Bullet.new(root, {
      sprite: container,
    });
  });

  originSeries.data.setAll([data.origin]);
  miningsSeries.data.setAll(data.minings);

  const dataItem = originSeries.getDataItemById(data.origin.id);
  const lineSeriesData: unknown[] = [];

  if (dataItem) {
    const { dataContext } = dataItem;

    const { destinations } = dataContext as { destinations: string[] };
    const originLongitude = dataItem.get('longitude');
    const originLatitude = dataItem.get('latitude');

    am5.array.each(destinations, (city) => {
      let destinationDataItem = miningsSeries.getDataItemById(city);
      if (!destinationDataItem) {
        destinationDataItem = originSeries.getDataItemById(city);
      }
      if (destinationDataItem) {
        lineSeriesData.push({
          geometry: {
            type: 'LineString',
            coordinates: [
              [originLongitude, originLatitude],
              [
                destinationDataItem.get('longitude'),
                destinationDataItem.get('latitude'),
              ],
            ],
          },
        });
      }
    });
    lineSeries.data.setAll(lineSeriesData);
  }
};

export const setPolygons = (
  chart: am5map.MapChart,
  root: am5.Root,
  data: GeoJSON.FeatureCollection,
  vars: ThemeVars,
) => {
  const tooltip = setTooltipTheme(root, vars);
  const polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: data,
      layer: -1,
      valueField: 'value',
    }),
  );
  polygonSeries.set('tooltip', tooltip);
  polygonSeries.mapPolygons.template.setAll({
    tooltipText: '{name}',
    toggleKey: 'active',
    interactive: true,
    fillOpacity: 0.2,
    strokeWidth: 1,
    templateField: 'settings',
  });
  polygonSeries.data.setAll([
    {
      id: 'polygon1',
      settings: {
        fill: am5.color('#F38B00'),
        stroke: am5.color('#F38B00'),
      },
    },
    {
      id: 'polygon2',
      settings: {
        fill: am5.color('#22C38E'),
        stroke: am5.color('#22C38E'),
      },
    },
    {
      id: 'polygon3',
      settings: {
        fill: am5.color('#9CA3FF'),
        stroke: am5.color('#9CA3FF'),
      },
    },
  ]);
};

type GroupPoint = {
  target?: string;
  type?: string;
  name?: string;
  count?: number;
  stores?: number;
  state?: string;
  markerData: GroupPoint[];
  series?: am5map.MapPointSeries;
  geometry?: {
    type: string;
    coordinates: [number, number];
  };
};

type GroupRegionSeries = Record<string, GroupPoint>;

const getGroupPolygon = (
  id: string,
  mapPolygonSeries: am5map.MapPolygonSeries,
): am5map.MapPolygon | undefined => {
  let found;
  mapPolygonSeries.mapPolygons.each(function (polygon) {
    const item = polygon?.dataItem;
    // @ts-ignore
    if (item?.get('id') === id) {
      found = polygon;
    }
  });
  return found;
};

const setWheelAction = (chart: am5map.MapChart, zoomable?: boolean) => {
  chart.events.on('wheel', (e) => {
    chart.setAll({
      wheelX: zoomable ? 'zoom' : 'none',
      wheelY: zoomable ? 'zoom' : 'none',
      wheelable: !!zoomable,
    });
  });
};

export const setGroups = (params: {
  data: GroupItem[];
  chart: am5map.MapChart;
  root: am5.Root;
  mapPolygonSeries: am5map.MapPolygonSeries;
  vars: ThemeVars;
}) => {
  const { data, chart, root, mapPolygonSeries, vars } = params;

  const regionalSeries: GroupRegionSeries = {};
  let currentSeries: am5map.MapPointSeries | undefined;
  const zoomOut = chart.get('zoomControl')?.minusButton;

  const setupGroupStores = () => {
    regionalSeries.RU = {
      markerData: [],
      series: createGroupSeries('stores'),
    };

    currentSeries = regionalSeries.RU.series;

    zoomOut?.events.on('click', () => {
      if (currentSeries) {
        currentSeries.hide();
      }
      chart.goHome();
      setWheelAction(chart, true);
      currentSeries = regionalSeries.RU.series;
      currentSeries?.show();
    });

    am5.array.each(data, (info) => {
      const store = {
        state: info.MAIL_ST_PROV_C,
        long: info.LNGTD_I,
        lat: info.LATTD_I,
        location: info.co_loc_n,
        city: info.mail_city_n,
        isGroup: info.isGroup,
        isCenter: info.isCenter,
      };

      const { city, state, isGroup } = store;

      if (!regionalSeries[state]) {
        const statePolygon = getGroupPolygon(`RU-${state}`, mapPolygonSeries);
        if (statePolygon) {
          const centroid = statePolygon.visualCentroid();

          const context = statePolygon?.dataItem?.dataContext as {
            name: string;
          };

          const data: GroupPoint = {
            target: state,
            type: 'state',
            name: context.name,
            stores: 0,
            state,
            markerData: [],
            geometry: {
              type: 'Point',
              coordinates: [centroid.longitude, centroid.latitude],
            },
          };

          regionalSeries[state] = data;
          regionalSeries.RU.markerData?.push(regionalSeries[state]);
        } else {
          return;
        }
      } else if (!isGroup) {
        regionalSeries[state].stores = (regionalSeries[state].stores ?? 0) + 1;
      }
      if (!regionalSeries[city]) {
        regionalSeries[city] = {
          target: city,
          type: 'city',
          name: city,
          stores: 0,
          state: store.state,
          markerData: [],
          geometry: {
            type: 'Point',
            coordinates: [store.long, store.lat],
          },
        };

        regionalSeries[store.state].markerData?.push(regionalSeries[city]);
      } else if (city && !isGroup) {
        regionalSeries[city].stores = (regionalSeries[city].stores ?? 0) + 1;
      }

      if (!isGroup) {
        regionalSeries[city].markerData?.push({
          name: store.location,
          stores: 1,
          state: store.state,
          markerData: [],
          geometry: {
            type: 'Point',
            coordinates: [store.long, store.lat],
          },
        });
      }
    });

    regionalSeries.RU.series?.data.setAll(
      regionalSeries.RU.markerData as unknown[],
    );
  };

  const createGroupSeries = (heatfield: string) => {
    const pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        valueField: heatfield,
        calculateAggregates: true,
      }),
    );

    pointSeries.bullets.push((root, series, dataItem) => {
      const container = am5.Container.new(root, {});
      const { stores } = dataItem.dataContext as { stores: number };
      const radius = 12 + stores * 2;

      const circle = container.children.push(
        am5.Circle.new(root, {
          radius,
          fill: am5.color(vars.color.primary['--color-bg-default']),
          stroke: am5.color(vars.color.primary['--color-bg-success']),
          strokeWidth: 4,
          cursorOverStyle: 'pointer',
          tooltipText: '{name}:\n[bold]Количество мест: {stores}[/]',
          layer: 0,
        }),
      );
      container.children.push(
        am5.Label.new(root, {
          text: '{name}',
          paddingLeft: radius + converPixels(vars.space['--space-m']),
          populateText: true,
          fontWeight: 'bold',
          fill: am5.color(vars.color.primary['--color-typo-primary']),
          oversizedBehavior: 'wrap',
          fontFamily: vars.font['--font-primary'],
          fontSize: converPixels(vars.size['--size-text-s']),
          maxWidth: 200,
          lineHeight: 1.2,
          centerY: am5.p50,
        }),
      );
      container.children.push(
        am5.Label.new(root, {
          text: stores > 1 ? `${stores}` : '',
          marginLeft: converPixels(vars.space['--space-m']),
          populateText: true,
          fontWeight: '600',
          fontFamily: vars.font['--font-primary'],
          fontSize: converPixels(vars.size['--size-text-l']),
          fill: am5.color(vars.color.primary['--color-typo-primary']),
          lineHeight: 1.4,
          centerX: am5.p50,
          centerY: am5.p50,
        }),
      );

      circle.events.on('click', function (ev) {
        const data = ev.target.dataItem?.dataContext as GroupPoint;

        if (!data?.target) {
          return;
        }

        if (!regionalSeries[data.target].series) {
          regionalSeries[data.target].series = createGroupSeries('count');
          regionalSeries[data.target].series?.data.setAll(data.markerData);
        }

        if (currentSeries) {
          currentSeries.hide();
        }

        if (data.type === 'state') {
          const statePolygon = getGroupPolygon(
            `RU-${data.state}`,
            mapPolygonSeries,
          );
          mapPolygonSeries.zoomToDataItem(
            statePolygon?.dataItem as am5.DataItem<am5map.IMapPolygonSeriesDataItem>,
          );
        } else if (data.type === 'city') {
          if (data.geometry) {
            chart.zoomToGeoPoint(
              {
                latitude: data.geometry.coordinates[1],
                longitude: data.geometry.coordinates[0],
              },
              10,
              true,
            );
          }
        }
        setWheelAction(chart, false);
        currentSeries = regionalSeries[data.target].series;
        currentSeries?.show();
      });

      return am5.Bullet.new(root, {
        sprite: container,
      });
    });
    return pointSeries;
  };

  setupGroupStores();
};
