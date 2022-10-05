/* eslint-disable camelcase */
import './PointsExample.css';

import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useThemeVars } from '@consta/uikit/useThemeVars';
import React, { useLayoutEffect } from 'react';

import map from '##/utils/geoJson';

type City = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

const converPixels = (pixels: string) => {
  return Number(pixels.replace(/px/g, ''));
};

const CITIES: City[] = [
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

export const PointsExample = () => {
  const vars = useThemeVars();

  useLayoutEffect(() => {
    const root = am5.Root.new('PointsExample');

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'translateX',
        panY: 'translateY',
        rotationX: -55,
        projection: am5map.geoMercator(),
        layout: root.horizontalLayout,
      }),
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: map,
        valueField: 'value',
      }),
    );

    chart.set('zoomControl', am5map.ZoomControl.new(root, {}));

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

    CITIES.forEach((item) => {
      citySeries.pushDataItem(item);
    });

    chart.appear(1000, 100);

    return () => {
      chart.dispose();
      root.dispose();
      polygonSeries.dispose();
    };
  }, [vars]);

  return <div id="PointsExample" />;
};
