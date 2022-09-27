/* eslint-disable camelcase */
import './LineExample.css';

import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_russiaHigh from '@amcharts/amcharts5-geodata/russiaHigh';
import { useThemeVars } from '@consta/uikit/useThemeVars';
import React, { useLayoutEffect } from 'react';

type MiningCenter = {
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

const ORIGIN_CENTER: MiningCenter = {
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

const MINING_CENTER: MiningCenter[] = [
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

const converPixels = (pixels: string) => {
  return Number(pixels.replace(/px/g, ''));
};

export const LineExample = () => {
  const vars = useThemeVars();

  useLayoutEffect(() => {
    const root = am5.Root.new('LineExample');

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        panY: 'rotateY',
        rotationX: -55,
        projection: am5map.geoMercator(),
        layout: root.horizontalLayout,
      }),
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_russiaHigh,
        valueField: 'value',
      }),
    );

    chart.set('zoomControl', am5map.ZoomControl.new(root, {}));

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
    const miningsSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {}),
    );

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

    originSeries.data.setAll([ORIGIN_CENTER]);
    miningsSeries.data.setAll(MINING_CENTER);

    MINING_CENTER.forEach((city) => {
      const destinationSeries = chart.series.push(
        am5map.MapPointSeries.new(root, {}),
      );

      const cities = [ORIGIN_CENTER, city].map((item) => {
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
        fill: am5.color(vars.color.primary['--color-bg-warning']),
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

    const dataItem = originSeries.getDataItemById(ORIGIN_CENTER.id);
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

    chart.appear(1000, 100);

    return () => {
      chart.dispose();
      root.dispose();
      polygonSeries.dispose();
    };
  }, [vars]);

  return <div id="LineExample" />;
};
