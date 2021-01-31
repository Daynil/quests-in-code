import { csv, deviation, format as numFormat, mean } from 'd3';
import { format as dateFormat, parse } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { getQuantiles } from '../../utils/data-helpers';
import { normSinv } from '../../utils/normSinv';
import { defaultLineStyles, LinesChart } from './lines-chart';

type Props = {
  chartType:
    | 'Raw Google'
    | 'Projection Google'
    | 'Multiprojection Google'
    | 'Quantiles Google';
};

type StockValue = { DataType: string; Date: number; Close: number };
type StockStats = { meanDailyChange: number; stdDevDailyChange: number };

export function StockSim({ chartType }: Props) {
  const [stockData, setStockData] = useState<StockValue[]>([]);
  const [stockStats, setStockStats] = useState<StockStats>(null);

  // Projection Google
  const [stockProjData, setStockProjData] = useState<StockValue[]>([]);

  // Multiprojection Google
  const [stockProjections, setStockProjections] = useState<StockValue[][]>([]);

  function getStockStats(data: StockValue[]): StockStats {
    let stockDayPcntChange: number[] = [];

    const data2019 = data.filter(
      data => new Date(data.Date).getFullYear() === 2019
    );

    // Start at second day
    for (let i = 1; i < data2019.length; i++) {
      const curDayPrice = data2019[i].Close;
      const prevDayPrice = data2019[i - 1].Close;
      stockDayPcntChange.push((curDayPrice - prevDayPrice) / prevDayPrice);
    }

    return {
      meanDailyChange: mean(stockDayPcntChange),
      stdDevDailyChange: deviation(stockDayPcntChange)
    };
  }

  function projectStockPrice(
    currPrice: number,
    meanDailyChange: number,
    stdDevDailyChange: number
  ): number {
    const drift = meanDailyChange - (stdDevDailyChange * stdDevDailyChange) / 2;
    const randomShock = stdDevDailyChange * normSinv(Math.random());
    // const randomShock = stdDevDailyChange * normSinv(0.84);
    return currPrice * Math.exp(drift + randomShock);
  }

  function project2020Prices(data: StockValue[], stats: StockStats) {
    const data2019 = data.filter(
      data => new Date(data.Date).getFullYear() === 2019
    );
    const last2019Price = data2019[data2019.length - 1];

    const data2020 = data.filter(
      data => new Date(data.Date).getFullYear() === 2020
    );

    const projection2020: StockValue[] = [
      {
        DataType: 'Proj',
        Date: last2019Price.Date,
        Close: last2019Price.Close
      }
    ];

    for (let i = 1; i < data2020.length; i++) {
      const priorPrice = projection2020[i - 1].Close;

      projection2020.push({
        DataType: 'Proj',
        Date: data2020[i].Date,
        Close: projectStockPrice(
          priorPrice,
          stats.meanDailyChange,
          stats.stdDevDailyChange
        )
      });
    }

    return projection2020;
  }

  function multiProject2020Prices(
    data: StockValue[],
    stats: StockStats,
    addQuantiles?: boolean
  ): StockValue[][] {
    const projections: StockValue[][] = [];

    for (let i = 1; i < 50; i++) {
      projections.push(project2020Prices(data, stats));
    }

    if (!addQuantiles) return projections;

    const quantiles = [0.1, 0.25, 0.5, 0.75, 0.9];
    const projectionQuantiles = getQuantiles(
      projections,
      d => d.Close,
      quantiles
    );

    const quantileLineData = projectionQuantiles.map((quantileRow, rowNum) =>
      quantileRow.map((quantileCol, colNum) => ({
        DataType: quantiles[rowNum] + '',
        Date: projections[0][colNum].Date,
        Close: quantileCol
      }))
    );

    return projections.concat(quantileLineData);
  }

  useEffect(() => {
    async function loadData() {
      const csvData = await csv(
        '/data/posts/stock-market-simulation-javascript/GOOG.csv'
      );
      const data = (csvData.map(day => ({
        DataType: 'Ref',
        Date: parse(day.Date, 'M/d/yyyy', new Date()).getTime(),
        Close: parseFloat(day.Close)
      })) as unknown) as StockValue[];

      setStockData(data);

      const stockStats = getStockStats(data);
      setStockStats(stockStats);
      setStockProjData(project2020Prices(data, stockStats));
      setStockProjections(
        multiProject2020Prices(
          data,
          stockStats,
          chartType === 'Quantiles Google'
        )
      );
    }
    loadData();
  }, []);

  function stockTooltip(d: StockValue, name: string) {
    if (!d) return;
    return (
      <div className="inline-block p-6 bg-gray-50 shadow-md rounded-md">
        <div className="text-center mb-2 font-bold">{name}</div>
        <div className="flex justify-evenly">
          <div className="flex flex-col px-4">
            <label className="font-semibold my-0">Date</label>
            <span>{dateFormat(d.Date, 'MMM d, yy')}</span>
          </div>
          <div className="flex flex-col px-4">
            <label className="font-semibold my-0">Price</label>
            <span>{numFormat('$,.2f')(d.Close)}</span>
          </div>
        </div>
      </div>
    );
  }

  function getChartOfType(type: typeof chartType) {
    switch (type) {
      case 'Raw Google': {
        return (
          <LinesChart
            dataSeries={[stockData]}
            xAccessor={d => d.Date}
            yAccessor={d => d.Close}
            aspectRatio={1000 / 600}
            options={{
              yDomainNice: true,
              xFormatTick: d => dateFormat(d, 'MMM d, yy'),
              yFormatTick: d => numFormat('$.2s')(d),
              getTooltip: stockTooltip,
              hoverDot: true,
              stylizeLine: (line, hovering, hoveringThisLine) => {
                return defaultLineStyles;
              }
            }}
          />
        );
      }

      case 'Projection Google': {
        const linesData: StockValue[][] =
          stockData.length && stockProjData.length
            ? [stockData, stockProjData]
            : [[]];
        return (
          <>
            <button
              className="btn btn-green w-44 m-4"
              onClick={() =>
                setStockProjData(project2020Prices(stockData, stockStats))
              }
            >
              Rerun simulation
            </button>
            <LinesChart
              dataSeries={linesData}
              xAccessor={d => d.Date}
              yAccessor={d => d.Close}
              aspectRatio={1000 / 600}
              options={{
                yDomainNice: true,
                xFormatTick: d => dateFormat(d, 'MMM d, yy'),
                yFormatTick: d => numFormat('$.2s')(d),
                hoverDot: true,
                seriesNames: ['Actual', 'Projected'],
                getTooltip: stockTooltip,
                stylizeLine: (line, hovering, hoveringThisLine) => {
                  const lineStyle = { ...defaultLineStyles };

                  if (line[0] && line[0].DataType === 'Proj') {
                    lineStyle.stroke = '#006AFF';
                  }

                  return lineStyle;
                }
              }}
            />
          </>
        );
      }

      case 'Multiprojection Google': {
        const linesData: StockValue[][] =
          stockData.length && stockProjData.length
            ? [stockData, ...stockProjections]
            : [[]];
        return (
          <>
            <button
              className="btn btn-green w-44 m-4"
              onClick={() =>
                setStockProjections(
                  multiProject2020Prices(stockData, stockStats)
                )
              }
            >
              Rerun simulation
            </button>
            <LinesChart
              dataSeries={linesData}
              xAccessor={d => d.Date}
              yAccessor={d => d.Close}
              aspectRatio={1000 / 600}
              options={{
                yDomainNice: true,
                xFormatTick: d => dateFormat(d, 'MMM d, yy'),
                yFormatTick: d => numFormat('$.2s')(d),
                stylizeLine: (line, hovering, hoveringThisLine) => {
                  const lineStyle = { ...defaultLineStyles };

                  if (line[0] && line[0].DataType === 'Proj') {
                    lineStyle.stroke = '#006AFF';
                    lineStyle.opacity = '0.4';
                  }

                  return lineStyle;
                }
              }}
            />
          </>
        );
      }

      case 'Quantiles Google': {
        const linesData: StockValue[][] =
          stockData.length && stockProjData.length
            ? [stockData, ...stockProjections]
            : [[]];
        return (
          <div className="flex flex-col items-center w-full">
            <button
              className="btn btn-green w-44 m-4"
              onClick={() =>
                setStockProjections(
                  multiProject2020Prices(stockData, stockStats, true)
                )
              }
            >
              Rerun simulation
            </button>
            <div className="flex flex-col items-center w-full">
              <LinesChart
                dataSeries={linesData}
                xAccessor={d => d.Date}
                yAccessor={d => d.Close}
                aspectRatio={1000 / 600}
                options={{
                  yDomainNice: true,
                  xFormatTick: d => dateFormat(d, 'MMM d, yy'),
                  yFormatTick: d => numFormat('$.2s')(d),
                  stylizeLine: (line, hovering, hoveringThisLine) => {
                    const lineStyle = { ...defaultLineStyles };

                    if (line[0]) {
                      if (line[0].DataType === 'Proj') {
                        lineStyle.stroke = '#006AFF';
                        lineStyle.opacity = '0.1';
                      } else if (line[0].DataType === '0.9') {
                        lineStyle.stroke = '#E4FF00';
                      } else if (line[0].DataType === '0.75') {
                        lineStyle.stroke = '#00FFE7';
                      } else if (line[0].DataType === '0.5') {
                        lineStyle.stroke = '#1600FF';
                      } else if (line[0].DataType === '0.25') {
                        lineStyle.stroke = '#FF00A6';
                      } else if (line[0].DataType === '0.1') {
                        lineStyle.stroke = '#FF0018';
                      }
                    }

                    return lineStyle;
                  }
                }}
              />
              <div className="flex flex-row justify-center w-full">
                <div className="flex flex-row items-center ml-8">
                  <div
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: '#E4FF00'
                    }}
                  ></div>
                  <div className="ml-2 text-sm">90th Percentile</div>
                </div>
                <div className="flex flex-row items-center ml-8">
                  <div
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: '#00FFE7'
                    }}
                  ></div>
                  <div className="ml-2 text-sm">75th Percentile</div>
                </div>
                <div className="flex flex-row items-center ml-8">
                  <div
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: '#1600FF'
                    }}
                  ></div>
                  <div className="ml-2 text-sm">50th Percentile</div>
                </div>
                <div className="flex flex-row items-center ml-8">
                  <div
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: '#FF00A6'
                    }}
                  ></div>
                  <div className="ml-2 text-sm">25th Percentile</div>
                </div>
                <div className="flex flex-row items-center ml-8">
                  <div
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: '#FF0018'
                    }}
                  ></div>
                  <div className="ml-2 text-sm">10th Percentile</div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      default:
        break;
    }
  }

  return (
    <div className="flex flex-col items-center xl:-mx-64 lg:-mx-36">
      {getChartOfType(chartType)}
    </div>
  );
}
