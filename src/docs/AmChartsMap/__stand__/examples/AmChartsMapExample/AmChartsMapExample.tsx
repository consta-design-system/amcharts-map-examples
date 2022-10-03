/* eslint-disable camelcase */
import './AmChartsMapExample.css';

import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useThemeVars } from '@consta/uikit/useThemeVars';
import React, { useLayoutEffect } from 'react';

import map from '##/utils/geoJson';

import {
  setCitiesPoint,
  setGroups,
  setMap,
  setPolygons,
  setRegionsPatterns,
  setTooltipTheme,
} from './helpers';
import { CITIES, GROUPS, POLYGONS } from './mock.data';

const MAP_ID = 'AmChartsMapExample';

export const AmChartsMapExample = () => {
  const vars = useThemeVars();

  useLayoutEffect(() => {
    const root = am5.Root.new(MAP_ID);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'translateX',
        panY: 'translateY',
        wheelable: false,
        wheelX: 'none',
        wheelY: 'none',
        rotationX: -55,
        projection: am5map.geoMercator(),
        layout: root.horizontalLayout,
      }),
    );

    const mapPolygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: map,
        valueField: 'value',
        wheelable: false,
      }),
    );

    chart.set('zoomControl', am5map.ZoomControl.new(root, {}));

    setMap(mapPolygonSeries, vars);
    setRegionsPatterns(mapPolygonSeries, root, vars);

    setCitiesPoint(CITIES, chart, root, vars);
    setPolygons(chart, root, POLYGONS, vars);

    setTimeout(() => {
      setGroups({
        data: GROUPS,
        chart,
        root,
        mapPolygonSeries,
        vars,
      });
    }, 500);
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
