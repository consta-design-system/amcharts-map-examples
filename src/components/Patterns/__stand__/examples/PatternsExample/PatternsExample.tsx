/* eslint-disable camelcase */
import './PatternsExample.css';

import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_russiaHigh from '@amcharts/amcharts5-geodata/russiaHigh';
import { ThemeVars, useThemeVars } from '@consta/uikit/useThemeVars';
import React, { useLayoutEffect } from 'react';

const DISABLED_REGIONS = [
  'RU-MUR',
  'RU-NEN',
  'RU-TVE',
  'RU-YAR',
  'RU-SMO',
  'RU-BRY',
  'RU-KRS',
];
const LINE_REGIONS = ['RU-TY', 'RU-IRK'];
const RECTANGLE_REGIONS = ['RU-ORE', 'RU-TYU', 'RU-KHM', 'RU-TOM', 'RU-YAN'];

const getDisabledPolygon = (id: string) => {
  return {
    id,
    settings: {
      fill: am5.color('#004269'),
      fillOpacity: 0.07,
    },
  };
};

const getRectanglePolygon = (id: string, root: am5.Root, vars: ThemeVars) => {
  return {
    id,
    settings: {
      fill: am5.color(vars.color.primary['--color-bg-default']),
      fillOpacity: 0.3,
      fillPattern: am5.RectanglePattern.new(root, {
        color: am5.color('#0071B2'),
        colorOpacity: 0.3,
        strokeWidth: 1,
        gap: 4,
      }),
    },
  };
};

const getLinePolygon = (id: string, root: am5.Root, vars: ThemeVars) => {
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
        gap: 4,
      }),
    },
  };
};

export const PatternsExample = () => {
  const vars = useThemeVars();

  useLayoutEffect(() => {
    const root = am5.Root.new('PatternsExample');

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

    polygonSeries.mapPolygons.template.events.on(
      'pointerover',
      function (event) {
        event.target.toFront();
      },
    );
    polygonSeries.mapPolygons.template.events.on(
      'pointerout',
      function (event) {
        if (event.target !== previousPolygon) {
          event.target.toBack();
        }
      },
    );

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

    polygonSeries.data.setAll([
      ...DISABLED_REGIONS.map((id) => getDisabledPolygon(id)),
      ...RECTANGLE_REGIONS.map((id) => getRectanglePolygon(id, root, vars)),
      ...LINE_REGIONS.map((id) => getLinePolygon(id, root, vars)),
    ]);

    chart.appear(1000, 100);

    return () => {
      chart.dispose();
      root.dispose();
      polygonSeries.dispose();
    };
  }, [vars]);

  return <div id="PatternsExample" />;
};
