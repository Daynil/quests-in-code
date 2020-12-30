import { leastIndex, line, max, min, scaleLinear } from 'd3';
import React, { useMemo, useRef, useState } from 'react';
import { useChartDimensions } from '../../utils/hooks';
import { Axis } from './axis';
import { Chart } from './chart';

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
export type PointCoords = {
  lineIndex: number;
  xIndex: number;
};

type Props<T> = {
  /** An array of points is a line, 2d array for multiple lines */
  dataSeries: T[][];
  xAccessor: (d: T) => number;
  yAccessor: (d: T) => number;
  /** Chart's aspect ratio */
  aspectRatio: number;
  options: {
    xDomain?: [number, number];
    yDomain?: [number, number];
    /** Stylize lines conditionally */
    stylizeLine?: (
      line: T[],
      hovering: boolean,
      hoveringThisLine: boolean
    ) => React.CSSProperties;
    /** If selected point coordinates are needed */
    handleSetSelectedPoint?: (point: PointCoords) => void;
    xFormatTick?: (d: number) => string;
    yFormatTick?: (d: number) => string;
    getTooltip?: (d: T) => React.ReactNode;
  };
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
  options
}: Props<T>) {
  const stylizeLine = options.stylizeLine
    ? options.stylizeLine
    : defaultStylizeLine;

  const [ref, dimensions] = useChartDimensions({}, aspectRatio);

  const noData = !dataSeries || !dataSeries[0]?.length;

  const refGdot = useRef<SVGGElement>(null);
  const refTooltip = useRef<HTMLSpanElement>(null);
  const [tooltipLeftAdjust, setTooltipLeftAdjust] = useState(0);
  const [selectedPoint, setSelectedPoint] = useState<PointCoords>(null);

  const xScale = scaleLinear();
  if (options.xDomain) xScale.domain(options.xDomain);
  else
    xScale.domain([
      min(dataSeries, line => min(line.map(d => xAccessor(d)))),
      max(dataSeries, line => max(line.map(d => xAccessor(d))))
    ]);
  xScale.nice().range([0, dimensions.boundedWidth]);

  const yScale = scaleLinear();
  if (options.yDomain) yScale.domain(options.yDomain);
  else
    yScale.domain([
      min(dataSeries, line => min(line.map(d => yAccessor(d)))),
      max(dataSeries, line => max(line.map(d => yAccessor(d))))
    ]);
  yScale.nice().range([dimensions.boundedHeight, 0]);

  const chartLine = line<T>()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)));

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
      />
    );
  });

  function getCircleColor() {
    if (!selectedPoint) return;
    return stylizeLine(dataSeries[selectedPoint.lineIndex], true, true).stroke;
  }

  // https://observablehq.com/@d3/multi-line-chart
  function mouseMoved(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.preventDefault();

    if (noData) return;

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
      e.clientY - containerRect.top - dimensions.marginTop //+ window.pageYOffset
    );
    const xm = xScale.invert(
      e.clientX -
        containerRect.left -
        dimensions.marginLeft -
        window.pageXOffset
    );

    const closestXIndex = leastIndex(
      dataSeries[0],
      (a, b) => Math.abs(xAccessor(a) - xm) - Math.abs(xAccessor(b) - xm)
    );

    const closestLineIndex = leastIndex(
      dataSeries,
      (a, b) =>
        Math.abs(yAccessor(a[closestXIndex]) - ym) -
        Math.abs(yAccessor(b[closestXIndex]) - ym)
    );

    setSelectedPoint({ lineIndex: closestLineIndex, xIndex: closestXIndex });

    // Move selection dot indicator to that nearest point of cursor
    refGdot.current.setAttribute(
      'transform',
      `translate(${xScale(
        xAccessor(dataSeries[closestLineIndex][closestXIndex])
      )},${yScale(yAccessor(dataSeries[closestLineIndex][closestXIndex]))})`
    );
  }

  function mouseOut() {
    setSelectedPoint(null);
  }

  function getChart() {
    return (
      <>
        <Chart dimensions={dimensions}>
          <Axis
            orientation="left"
            scale={yScale}
            formatTick={options.yFormatTick}
          />
          <Axis
            orientation="bottom"
            scale={xScale}
            formatTick={options.xFormatTick}
          />
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
      </>
    );
  }

  return (
    <div
      className="w-full relative bg-white rounded-md"
      style={{ maxWidth: `calc(60vh * ${aspectRatio})` }}
      onMouseMove={mouseMoved}
      onMouseOut={mouseOut}
      ref={ref}
    >
      {options.getTooltip && (
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
            ? options.getTooltip(
                dataSeries[selectedPoint.lineIndex][selectedPoint.xIndex]
              )
            : null}
        </span>
      )}
      {noData ? (
        <div
          className="bg-gray-100 text-gray-400 rounded-md flex justify-center align-middle"
          style={{ width: dimensions.width, height: dimensions.height }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="10%"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ) : (
        getChart()
      )}
    </div>
  );
}
