import { format } from 'd3';
import React, { useRef, useState } from 'react';
import TextInput from '../text-input';
import { PiEstimatorChart } from './pi-estimator-chart';

type Props = {};

export function PiEstimator({}: Props) {
  const [scatterData, setScatterData] = useState([]);
  const [dartHits, setDartHits] = useState(0);
  const refNumThrows = useRef<HTMLInputElement>(null);

  function checkIsHit(throwCoords: { x: number; y: number }) {
    const xDistance = Math.abs(throwCoords.x - 50);
    const yDistance = Math.abs(throwCoords.y - 50);
    const totalDistance = Math.sqrt(
      xDistance * xDistance + yDistance * yDistance
    );
    return totalDistance < 50;
  }

  function generateRandomPoints(numPoints: number) {
    const generatedData = [];
    const maxNum = 100;
    let newDartHits = 0;
    for (let i = 0; i < numPoints; i++) {
      const throwCoords = {
        x: Math.random() * maxNum,

        y: Math.random() * maxNum
      };
      if (checkIsHit(throwCoords)) newDartHits++;
      generatedData.push(throwCoords);
    }
    setDartHits(dartHits + newDartHits);
    setScatterData(scatterData.concat(generatedData));
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <button
          className="btn btn-green w-36 m-4"
          onClick={() => generateRandomPoints(+refNumThrows.current.value)}
        >
          Throw Dart
        </button>
        <TextInput
          className="m-4 pl-4 py-2"
          type="number"
          defaultValue={10}
          min={1}
          max={1000}
          ref={refNumThrows}
          onChange={e => {
            if (+e.target.value > 1000) e.target.value = '1000';
          }}
        />
        <span className="my-4">times</span>
        <button
          className="btn btn-green-2 w-24 m-4 ml-16"
          onClick={() => {
            setScatterData([]);
            setDartHits(0);
          }}
        >
          Reset
        </button>
      </div>
      <PiEstimatorChart pointArray={scatterData} />
      <div>
        <div>
          <b>Dart throws: </b>
          {format(',')(scatterData.length)}
        </div>
        <div>
          <b>Pi Estimate: </b>
          {scatterData.length
            ? ((4 * dartHits) / scatterData.length).toFixed(4)
            : 0}
        </div>
      </div>
    </div>
  );
}
