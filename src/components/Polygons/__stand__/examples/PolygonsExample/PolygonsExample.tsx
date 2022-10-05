/* eslint-disable camelcase */
import './PolygonsExample.css';

import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useThemeVars } from '@consta/uikit/useThemeVars';
import React, { useLayoutEffect } from 'react';

import map from '##/utils/geoJson';

const POLYGONS: GeoJSON.FeatureCollection = {
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
  ],
};

export const PolygonsExample = () => {
  const vars = useThemeVars();

  useLayoutEffect(() => {
    const root = am5.Root.new('PolygonsExample');

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

    const newPolygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: POLYGONS,
        layer: -1,
        valueField: 'value',
      }),
    );

    newPolygonSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      toggleKey: 'active',
      interactive: true,
      fillOpacity: 0.2,
      strokeWidth: 1,
      templateField: 'settings',
    });
    newPolygonSeries.data.setAll([
      {
        id: 'polygon1',
        settings: {
          fill: am5.color('#F38B00'),
          stroke: am5.color('#F38B00'),
        },
      },
    ]);

    chart.appear(1000, 100);

    return () => {
      chart.dispose();
      root.dispose();
      polygonSeries.dispose();
    };
  }, [vars]);

  return <div id="PolygonsExample" />;
};
