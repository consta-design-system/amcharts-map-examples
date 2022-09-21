/* eslint-disable camelcase */
import './TooltipExample.css';

import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_russiaHigh from '@amcharts/amcharts5-geodata/russiaHigh';
import { useThemeVars } from '@consta/uikit/useThemeVars';
import React, { useLayoutEffect } from 'react';

const converPixels = (pixels: string) => {
  return Number(pixels.replace(/px/g, ''));
};

export const TooltipExample = () => {
  const vars = useThemeVars();

  useLayoutEffect(() => {
    const root = am5.Root.new('TooltipExample');

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
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
    });

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

    polygonSeries.set('tooltip', tooltip);

    chart.set('zoomControl', am5map.ZoomControl.new(root, {}));

    chart.appear(1000, 100);

    return () => {
      chart.dispose();
      root.dispose();
      polygonSeries.dispose();
      tooltip.dispose();
    };
  }, [vars]);

  return <div id="TooltipExample" />;
};
