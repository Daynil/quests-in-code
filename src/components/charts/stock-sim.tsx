import { csv, deviation, format as numFormat, mean } from 'd3';
import { format as dateFormat, parse } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { LinesChart } from './lines-chart';

type Props = {
  type: string;
};

type StockValue = { Date: number; Close: number };
type StockStats = { meanDailyChange: number; stdDevDailyChange: number };

export function StockSim({ type }: Props) {
  const [stockData, setStockData] = useState<StockValue[]>([]);
  const [stockStats, setStockStats] = useState<StockStats>();

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

  useEffect(() => {
    async function loadData() {
      const csvData = await csv(
        '/data/posts/stock-market-simulation-javascript/GOOG.csv'
      );
      const data = (csvData.map(day => ({
        Date: parse(day.Date, 'M/d/yyyy', new Date()).getTime(),
        Close: parseFloat(day.Close)
      })) as unknown) as StockValue[];
      setStockData(data);
      setStockStats(getStockStats(data));
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

  return (
    <div className="flex flex-col items-center">
      <LinesChart
        dataSeries={[stockData]}
        xAccessor={d => d.Date}
        yAccessor={d => d.Close}
        aspectRatio={1000 / 600}
        options={{
          yDomainNice: true,
          xFormatTick: d => dateFormat(d, 'MMM d, yy'),
          yFormatTick: d => numFormat('$.2s')(d),
          getTooltip: stockTooltip
        }}
      />
    </div>
  );
}
