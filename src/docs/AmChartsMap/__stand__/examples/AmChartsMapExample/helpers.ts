import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import { ThemeVars } from '@consta/uikit/useThemeVars';

import {
  ACTIVE_REGIONS,
  City,
  DISABLED_REGIONS,
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

  data.minings.forEach((city) => {
    const destinationSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {}),
    );

    const cities = [data.origin, city].map((item) => {
      const { geometry } = item;
      return destinationSeries.pushDataItem({
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
      });
    });

    const planeSeries = chart.series.push(
      am5map.MapPointSeries.new(root, { layer: 5 }),
    );
    const plane = am5.Graphics.new(root, {
      svgPath:
        'm2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47',
      scale: 0.06,
      centerY: am5.p50,
      centerX: am5.p50,
      fill: am5.color(vars.color.primary['--color-bg-brand']),
    });
    planeSeries.bullets.push(function () {
      const container = am5.Container.new(root, {});
      container.children.push(plane);
      return am5.Bullet.new(root, { sprite: container });
    });

    const lineDataItem = lineSeries.pushDataItem({
      pointsToConnect: cities,
    });

    const planeDataItem = planeSeries.pushDataItem({
      lineDataItem,
      positionOnLine: 0,
      autoRotate: true,
    });

    planeDataItem.animate({
      key: 'positionOnLine',
      to: 1,
      duration: 10000,
      loops: Infinity,
      easing: am5.ease.yoyo(am5.ease.linear),
    });

    planeDataItem.on('positionOnLine', function (value) {
      if ((value ?? 0) >= 0.99) {
        plane.set('rotation', 180);
      } else if ((value ?? 0) <= 0.01) {
        plane.set('rotation', 0);
      }
    });
  });

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
