import { csv, deviation, format as numFormat, mean } from 'd3';
import { format as dateFormat, parse } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { normSinv } from '../../utils/normSinv';
import { defaultLineStyles, LinesChart } from './lines-chart';

type Props = {
  chartType: 'Raw Google' | 'Projection Google';
};

type StockValue = { DataType: 'Ref' | 'Proj'; Date: number; Close: number };
type StockStats = { meanDailyChange: number; stdDevDailyChange: number };

export function StockSim({ chartType }: Props) {
  const [stockData, setStockData] = useState<StockValue[]>([]);
  const [stockStats, setStockStats] = useState<StockStats>(null);

  // Projection Google
  const [stockRefData, setStockRefData] = useState<StockValue[]>([]);
  const [stockProjData, setStockProjData] = useState<StockValue[]>([]);

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

  function project2020Prices(refData: StockValue[]) {
    const last2019Price = refData[refData.length - 1];

    const data2020 = stockData.filter(
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
          stockStats.meanDailyChange,
          stockStats.stdDevDailyChange
        )
      });
    }

    return setStockProjData(projection2020);
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
      const data2019 = data.filter(
        data => new Date(data.Date).getFullYear() === 2019
      );
      setStockData(data);
      setStockRefData(data2019);
      setStockStats(getStockStats(data));
      project2020Prices(data2019);
    }
    loadData();
  }, []);

  function stockTooltip(d: StockValue) {
    if (!d) return;
    return (
      <div className="inline-block p-6 bg-gray-50 shadow-md rounded-md">
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
      case 'Raw Google':
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

      case 'Projection Google':
        return (
          <>
            <button
              className="btn btn-green w-44 m-4"
              onClick={() => project2020Prices(stockRefData)}
            >
              Rerun simulation
            </button>
            <LinesChart
              dataSeries={[stockData, stockProjData]}
              xAccessor={d => d.Date}
              yAccessor={d => d.Close}
              aspectRatio={1000 / 600}
              options={{
                yDomainNice: true,
                xFormatTick: d => dateFormat(d, 'MMM d, yy'),
                yFormatTick: d => numFormat('$.2s')(d),
                hoverDot: true,
                stylizeLine: (line, hovering, hoveringThisLine) => {
                  const lineStyle = { ...defaultLineStyles };

                  if (line[0].DataType === 'Proj') {
                    lineStyle.stroke = '#006AFF';
                  }

                  return lineStyle;
                }
              }}
            />
          </>
        );

      default:
        break;
    }
  }

  return (
    <div className="flex flex-col items-center">
      {getChartOfType(chartType)}
    </div>
  );
}
