import React from 'react';
import { LinesChart } from '../components/charts/lines-chart';

type Props = {};

type DataPointType = { x: number; y: number };

export default function ChartsTester({}: Props) {
  const testData: DataPointType[][] = [];
  for (let lineNum = 0; lineNum < 20; lineNum++) {
    let testLine: DataPointType[] = [];
    for (let pointNum = 0; pointNum <= 20; pointNum++) {
      testLine.push({ x: pointNum, y: pointNum + lineNum });
    }
    testData.push(testLine);
  }

  function tooltip(d: DataPointType) {
    return (
      <div className="inline-block p-6 bg-gray-50 shadow-md rounded-md">
        <div className="flex justify-evenly">
          <div className="flex flex-col px-4">
            <label className="font-semibold my-0">X Value</label>
            <span>{d.x}</span>
          </div>
          <div className="flex flex-col px-4">
            <label className="font-semibold my-0">Y Value</label>
            <span>{d.y}</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h2>Chart 1</h2>
      <LinesChart
        dataSeries={testData}
        xAccessor={d => d.x}
        yAccessor={d => d.y}
        aspectRatio={1000 / 600}
        getTooltip={tooltip}
      />
      <h2>Chart 2</h2>
      <LinesChart
        dataSeries={testData}
        xAccessor={d => d.x}
        yAccessor={d => d.y}
        aspectRatio={1000 / 600}
        getTooltip={tooltip}
      />
    </div>
  );
}
