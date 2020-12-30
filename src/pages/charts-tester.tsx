import { mean } from 'd3';
import React, { useRef, useState } from 'react';
import { LinesChart } from '../components/charts/lines-chart';
import { PiEstimatorChart } from '../components/charts/pi-estimator-chart';
import TextInput from '../components/text-input';

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

  const [scatterData, setScatterData] = useState([]);

  function generateRandomPoints(numPoints: number) {
    const generatedData = [];
    const maxNum = 100;
    for (let i = 0; i < numPoints; i++) {
      generatedData.push({
        x: Math.floor(Math.random() * maxNum + 1),

        y: Math.floor(Math.random() * maxNum + 1)
      });
    }
    setScatterData(scatterData.concat(generatedData));
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

  type DiceStats = { meanRoll: number; numRolls: number };

  function getIterativeStats(rolls: number[]) {
    const stats: DiceStats[] = [];
    for (let i = 1; i <= rolls.length; i++) {
      const currentSlice = rolls.slice(0, i);
      stats.push({
        meanRoll: mean(currentSlice),
        numRolls: currentSlice.length
      });
    }
    return stats;
  }

  function rollDie(priorStat: DiceStats) {
    if (!priorStat) priorStat = { meanRoll: 0, numRolls: 0 };
    const priorSum = priorStat.meanRoll * priorStat.numRolls;

    const minRoll = 1;
    const maxRoll = 6;
    const newRoll = Math.floor(
      Math.random() * (maxRoll - minRoll + 1) + minRoll
    );

    return {
      meanRoll: (priorSum + newRoll) / (priorStat.numRolls + 1),
      numRolls: priorStat.numRolls + 1
    };
  }

  const refNumRolls = useRef<HTMLInputElement>(null);
  const initialDiceRolls = [6, 4, 6, 1, 1, 2, 1];
  const [diceRolls, setDiceRolls] = useState<DiceStats[]>(
    getIterativeStats(initialDiceRolls)
  );

  function generateDiceRolls(numRolls: number) {
    const generatedRolls: DiceStats[] = [];
    for (let i = 0; i < numRolls; i++) {
      let priorRoll: DiceStats;
      if (i === 0) priorRoll = diceRolls[diceRolls.length - 1];
      else priorRoll = generatedRolls[generatedRolls.length - 1];
      generatedRolls.push(rollDie(priorRoll));
    }
    const newRolls = diceRolls.concat(generatedRolls);
    setDiceRolls(newRolls);
  }

  function diceTooltip(d: DiceStats) {
    if (!d) return;
    return (
      <div className="inline-block p-6 bg-gray-50 shadow-md rounded-md">
        <div className="flex justify-evenly">
          <div className="flex flex-col px-4">
            <label className="font-semibold my-0">Total Rolls</label>
            <span>{d.numRolls}</span>
          </div>
          <div className="flex flex-col px-4">
            <label className="font-semibold my-0">Mean Roll Value</label>
            <span>{d.meanRoll}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="flex items-center">
          <button
            className="btn btn-green w-36 m-4"
            onClick={() =>
              generateDiceRolls(
                (refNumRolls.current.value as unknown) as number
              )
            }
          >
            Roll Dice
          </button>
          <TextInput
            className="m-4 pl-4 py-2"
            type="number"
            defaultValue={2}
            min={2}
            max={1000}
            ref={refNumRolls}
          />
          <span className="my-4">times</span>
          <button
            className="btn btn-green-2 w-24 m-4 ml-16"
            onClick={() => setDiceRolls([])}
          >
            Reset
          </button>
        </div>
        <LinesChart
          dataSeries={[diceRolls]}
          xAccessor={d => d.numRolls}
          yAccessor={d => d.meanRoll}
          aspectRatio={1000 / 600}
          options={{
            getTooltip: diceTooltip,
            yDomain: [1, 6]
          }}
        />
      </div>

      <h2>Pi scatter</h2>
      <div className="flex flex-col items-center">
        <button
          className="btn btn-green w-36"
          onClick={() => generateRandomPoints(1000)}
        >
          Throw Dart
        </button>
        <PiEstimatorChart pointArray={scatterData} />
      </div>
      <h2>Chart 1</h2>
      <LinesChart
        dataSeries={testData}
        xAccessor={d => d.x}
        yAccessor={d => d.y}
        aspectRatio={1000 / 600}
        options={{
          getTooltip: tooltip
        }}
      />
      <h2>Chart 2</h2>
      <LinesChart
        dataSeries={testData}
        xAccessor={d => d.x}
        yAccessor={d => d.y}
        aspectRatio={1000 / 600}
        options={{
          getTooltip: tooltip
        }}
      />
    </div>
  );
}
