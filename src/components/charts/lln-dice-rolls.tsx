import { mean } from 'd3';
import React, { useRef, useState } from 'react';
import TextInput from '../text-input';
import { defaultLineStyles, LinesChart } from './lines-chart';

type Props = {};

export function LlnDiceRolls({}: Props) {
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

  function rollDie(priorRoll: DiceStats) {
    if (!priorRoll) priorRoll = { meanRoll: 0, numRolls: 0 };
    const priorSum = priorRoll.meanRoll * priorRoll.numRolls;

    const minRoll = 1;
    const maxRoll = 6;
    const newRoll = Math.floor(
      Math.random() * (maxRoll - minRoll + 1) + minRoll
    );

    return {
      meanRoll: (priorSum + newRoll) / (priorRoll.numRolls + 1),
      numRolls: priorRoll.numRolls + 1
    };
  }

  function getMeanLine(length: number) {
    const line: DiceStats[] = [];
    for (let i = 0; i < length; i++) {
      line.push({ meanRoll: 3.5, numRolls: i + 1 });
    }
    return line;
  }

  const refNumRolls = useRef<HTMLInputElement>(null);
  const initialDiceRolls = [6, 5, 1, 1, 2, 1];
  const [diceRolls, setDiceRolls] = useState<DiceStats[]>(
    getIterativeStats(initialDiceRolls)
  );
  const [meanLine, setMeanLine] = useState<DiceStats[]>(
    getMeanLine(initialDiceRolls.length)
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
    setMeanLine(getMeanLine(newRolls.length));
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
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <button
          className="btn btn-green w-36 m-4"
          onClick={() => generateDiceRolls(+refNumRolls.current.value)}
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
          onChange={e => {
            if (+e.target.value > 10000) e.target.value = '10000';
          }}
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
        dataSeries={[diceRolls, meanLine]}
        xAccessor={d => d.numRolls}
        yAccessor={d => d.meanRoll}
        aspectRatio={1000 / 600}
        options={{
          getTooltip: diceTooltip,
          yDomain: [1, 6],
          yLabel: 'Mean Dice Roll',
          xLabel: 'Total Rolls',
          margins: { marginLeft: 50, marginBottom: 60 },
          hoverDot: true,
          stylizeLine: (line, hovering, hoveringThisLine) => {
            let isMeanLine = true;
            for (let i = 0; i < line.length; i++) {
              if (line[i].meanRoll !== 3.5) {
                isMeanLine = false;
                break;
              }
            }

            let lineStyle = { ...defaultLineStyles };
            if (isMeanLine) {
              lineStyle = {
                ...defaultLineStyles,
                stroke: 'blue',
                strokeWidth: '1'
              };
            }

            return lineStyle;
          }
        }}
      />
    </div>
  );
}
