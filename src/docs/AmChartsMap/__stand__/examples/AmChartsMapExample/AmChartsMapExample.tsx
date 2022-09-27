/* eslint-disable camelcase */
import './AmChartsMapExample.css';

import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_russiaHigh from '@amcharts/amcharts5-geodata/russiaHigh';
import { useThemeVars } from '@consta/uikit/useThemeVars';
import React, { useLayoutEffect } from 'react';

import {
  setCitiesPoint,
  setMap,
  setMiningPoint,
  setPolygons,
  setRegionsPatterns,
  setTooltipTheme,
} from './helpers';
import { CITIES, MINING_CENTER, ORIGIN_CENTER, POLYGONS } from './mock.data';

const MAP_ID = 'AmChartsMapExample';

export const AmChartsMapExample = () => {
  const vars = useThemeVars();

  useLayoutEffect(() => {
    const root = am5.Root.new(MAP_ID);

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

    const mapPolygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_russiaHigh,
        valueField: 'value',
      }),
    );

    chart.set('zoomControl', am5map.ZoomControl.new(root, {}));

    setMap(mapPolygonSeries, vars);
    setRegionsPatterns(mapPolygonSeries, root, vars);

    setCitiesPoint(CITIES, chart, root, vars);
    setMiningPoint(
      {
        origin: ORIGIN_CENTER,
        minings: MINING_CENTER,
      },
      chart,
      root,
      vars,
    );
    setPolygons(chart, root, POLYGONS, vars);

    const tooltip = setTooltipTheme(root, vars);

    mapPolygonSeries.set('tooltip', tooltip);
    chart.appear(1000, 100);

    return () => {
      chart.dispose();
      root.dispose();
      tooltip.dispose();
      mapPolygonSeries.dispose();
    };
  }, [vars]);

  return <div id={MAP_ID} />;
};
