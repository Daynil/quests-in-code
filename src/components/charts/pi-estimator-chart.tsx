import { scaleLinear } from 'd3';
import React from 'react';
import { useChartDimensions } from '../../utils/hooks';
import { Chart } from './chart';

type Props = {
  pointArray: { x: number; y: number }[];
};

export function PiEstimatorChart({ pointArray }: Props) {
  const [ref, dimensions] = useChartDimensions(
    { marginTop: 20, marginRight: 20, marginBottom: 20, marginLeft: 20 },
    1
  );

  const xScale = scaleLinear()
    // .domain([extent(pointArray, d => d.x)])
    .domain([0, 100])
    .nice()
    .range([0, dimensions.boundedWidth]);

  const yScale = scaleLinear()
    // .domain(extent(pointArray, d => d.y))
    .domain([0, 100])
    .nice()
    .range([dimensions.boundedHeight, 0]);

  const centerPoint = {
    x: xScale.invert(dimensions.boundedWidth / 2),
    y: yScale.invert(dimensions.boundedHeight / 2)
  };

  const points = pointArray.map((point, i) => {
    const xDistance = Math.abs(point.x - centerPoint.x);
    const yDistance = Math.abs(point.y - centerPoint.y);
    const totalDistance = Math.sqrt(
      xDistance * xDistance + yDistance * yDistance
    );

    return (
      <circle
        key={i}
        r="3"
        fill={totalDistance > centerPoint.x ? '#E53E3E' : '#38A169'}
        cx={xScale(point.x)}
        cy={yScale(point.y)}
      />
    );
  });

  return (
    <div
      className="w-full relative bg-white rounded-md"
      style={{ maxWidth: `calc(40vh)` }}
      // onMouseMove={mouseMoved}
      // onMouseOut={mouseOut}
      ref={ref}
    >
      <Chart dimensions={dimensions}>
        <rect
          fill="transparent"
          strokeWidth="3"
          stroke="#6B7280"
          opacity="0.6"
          width={dimensions.boundedWidth}
          height={dimensions.boundedHeight}
        />
        <circle
          fill="transparent"
          strokeWidth="3"
          stroke="#006AFF"
          opacity="0.6"
          cx={dimensions.boundedWidth / 2}
          cy={dimensions.boundedHeight / 2}
          r={dimensions.boundedWidth / 2}
        />
        <g>{points}</g>
      </Chart>
    </div>
  );
}
