import { leastIndex, line, max, maxIndex, min, scaleLinear } from 'd3';
import React, { useMemo, useRef, useState } from 'react';
import { useChartDimensions } from '../../utils/hooks';
import { clamp } from '../../utils/math';
import { Axis } from './axis';
import { Chart } from './chart';

export type D3Selection<T extends d3.BaseType> = d3.Selection<
  T,
  unknown,
  null,
  undefined
>;

const colors = {
  green: {
    normal: '#48BB78',
    dark: '#38A169'
  },
  yellow: {
    normal: '#FFD600',
    dark: '#FFD600'
  },
  red: {
    normal: '#F56565',
    dark: '#E53E3E'
  }
};

/**
 * Uniquely identifies a point on a multi-line chart
 * E.g. line[lineIndex][xIndex]
 */
export type Point = {
  lineIndex: number;
  xIndex: number;
};

type Props<T> = {
  /** An array of points is a line, 2d array for multiple lines */
  dataSeries: T[][];
  xAccessor: (d: T) => number;
  yAccessor: (d: T) => number;
  /** Stylize lines conditionally (just return 1 item if all same) */
  /** Chart's aspect ratio */
  aspectRatio: number;
  stylizeLine?: (
    line: T[],
    hovering: boolean,
    hoveringThisLine: boolean
  ) => React.CSSProperties;
  handleSetSelectedPoint?: (point: Point) => void;
  xFormatTick?: (d: number) => string;
  yFormatTick?: (d: number) => string;
  getTooltip?: (d: T) => React.ReactNode;
};

const defaultLineStyles: React.CSSProperties = {
  stroke: '#48BB78',
  opacity: '1',
  strokeWidth: '1.5',
  mixBlendMode: 'multiply',
  transition: `
    stroke 0.1s ease-out,
    opacity 0.1s ease-out
  `
};

const defaultStylizeLine: <T>(
  line: T[],
  hovering: boolean,
  hoveringThisLine: boolean
) => React.CSSProperties = function(_line, hovering, hoveringThisLine) {
  const lineStyle = { ...defaultLineStyles };

  if (hovering) {
    if (hoveringThisLine) {
      lineStyle.opacity = '1';
      lineStyle.strokeWidth = '3';
    } else {
      lineStyle.opacity = '0.1';
    }
  }

  return lineStyle;
};

export function LinesChart<T>({
  dataSeries,
  xAccessor,
  yAccessor,
  aspectRatio,
  stylizeLine = defaultStylizeLine,
  handleSetSelectedPoint,
  xFormatTick,
  yFormatTick,
  getTooltip
}: Props<T>) {
  const [ref, dimensions] = useChartDimensions({}, aspectRatio);
  const refGdot = useRef<SVGGElement>(null);
  const refTooltip = useRef<HTMLSpanElement>(null);
  const [tooltipLeftAdjust, setTooltipLeftAdjust] = useState(0);
  const [selectedPoint, setSelectedPoint] = useState<Point>(null);

  const xScale = scaleLinear()
    .domain([
      min(dataSeries, line => min(line.map(d => xAccessor(d)))),
      max(dataSeries, line => max(line.map(d => xAccessor(d))))
    ])
    .nice()
    .range([0, dimensions.boundedWidth]);

  const yScale = scaleLinear()
    .domain([
      min(dataSeries, line => min(line.map(d => yAccessor(d)))),
      max(dataSeries, line => max(line.map(d => yAccessor(d))))
    ])
    .nice()
    .range([dimensions.boundedHeight, 0]);

  const chartLine = line<T>()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)));

  const longestLine = dataSeries[maxIndex(dataSeries, line => line.length)];

  // Bottleneck, should only run when data or dimensions change
  const linePathStringArray = useMemo(
    () => dataSeries.map(line => chartLine(line)),
    [dataSeries, dimensions.width, dimensions.height]
  );

  const linePaths = dataSeries.map((line, i) => {
    const hoveringLine = selectedPoint && i === selectedPoint.lineIndex;

    return (
      <path
        key={i}
        d={linePathStringArray[i]}
        style={stylizeLine(line, !!selectedPoint, hoveringLine)}
      ></path>
    );
  });

  function getCircleColor() {
    if (!selectedPoint) return;
    return stylizeLine
      ? stylizeLine(dataSeries[selectedPoint.lineIndex], true, true).stroke
      : defaultLineStyles.stroke;
  }

  // https://observablehq.com/@d3/multi-line-chart
  function mouseMoved(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.preventDefault();

    const containerRect = ref.current.getBoundingClientRect();

    // Move tooltip (favor left side when available)
    const mouseOffset = 30; // So the tooltip doesn't block the data point
    let leftAdjust =
      e.clientX - containerRect.left - window.pageXOffset + mouseOffset;
    if (leftAdjust > refTooltip.current.clientWidth) {
      leftAdjust =
        leftAdjust - refTooltip.current.clientWidth - mouseOffset * 2;
    }
    // Alternate method which favors right side when available
    // if (leftAdjust > 690) {
    //   leftAdjust =
    //     leftAdjust - refTooltip.current.getBoundingClientRect().width;
    // }
    setTooltipLeftAdjust(leftAdjust);

    // Transform current mouse coords to domain values, adjusting for svg position and scroll
    const ym = yScale.invert(
      e.clientY - containerRect.top - dimensions.marginTop + window.pageYOffset
    );
    const xm = xScale.invert(
      e.clientX -
        containerRect.left -
        dimensions.marginLeft -
        window.pageXOffset
    );

    // Get the array index of the closest x value to current hover
    const i = clamp(Math.round(xm), 0, longestLine.length - 1);

    const closestLineIndex = leastIndex(
      dataSeries,
      (a, b) => Math.abs(yAccessor(a[i]) - ym) - Math.abs(yAccessor(b[i]) - ym)
    );

    setSelectedPoint({ lineIndex: closestLineIndex, xIndex: i });

    // Move selection dot indicator to that nearest point of cursor
    refGdot.current.setAttribute(
      'transform',
      `translate(${xScale(xAccessor(dataSeries[closestLineIndex][i]))},${yScale(
        yAccessor(dataSeries[closestLineIndex][i])
      )})`
    );
  }

  function mouseOut() {
    setSelectedPoint(null);
  }

  return (
    dataSeries && (
      <div
        className="w-full relative"
        style={{ maxWidth: `calc(60vh * ${aspectRatio})` }}
        onMouseMove={mouseMoved}
        onMouseOut={mouseOut}
        ref={ref}
      >
        {getTooltip && (
          <span
            ref={refTooltip}
            style={{
              left: `${tooltipLeftAdjust}px`,
              width: 'fit-content',
              height: 'fit-content',
              opacity: selectedPoint ? '1' : '0'
            }}
            className="absolute inset-0 pointer-events-none"
          >
            {selectedPoint
              ? getTooltip(
                  dataSeries[selectedPoint.lineIndex][selectedPoint.xIndex]
                )
              : getTooltip(dataSeries[0][0])}
          </span>
        )}
        <Chart dimensions={dimensions}>
          <Axis orientation="left" scale={yScale} formatTick={yFormatTick} />
          <Axis orientation="bottom" scale={xScale} formatTick={xFormatTick} />
          <g fill="none" strokeLinejoin="round" strokeLinecap="round">
            {linePaths}
          </g>
          <g ref={refGdot} style={{ transition: defaultLineStyles.transition }}>
            <circle
              r="4"
              fill="white"
              stroke={getCircleColor()}
              strokeWidth="3"
              opacity={selectedPoint ? '1' : '0'}
            />
          </g>
        </Chart>
      </div>
    )
  );
}
