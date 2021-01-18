import {
  getFullContinuousLine,
  getLongestLineOfEachLeftness,
  getNullFilledLines,
  sortLeftMostThenLongestLine
} from './data-helpers';

type TestPoint = { x: number; y: number };
const xAccessor = (point: TestPoint) => point.x;

test('sorts lines by leftmost then length', () => {
  const longestLine = [{ x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }, { x: 6 }];
  const lineRight = [{ x: 3 }, { x: 4 }, { x: 5 }];
  const lineLeft = [{ x: 1 }, { x: 2 }, { x: 3 }];
  const lineLeftLonger = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }];
  const lineRightLonger = [{ x: 3 }, { x: 4 }, { x: 5 }, { x: 6 }];
  const unsorted = [
    longestLine,
    lineRight,
    lineLeft,
    lineLeftLonger,
    lineRightLonger
  ];
  const sorted = sortLeftMostThenLongestLine(unsorted, xAccessor);
  expect(sorted).toEqual([
    lineLeftLonger,
    lineLeft,
    longestLine,
    lineRightLonger,
    lineRight
  ]);
});

test('gets longest line of each leftness', () => {
  const lineLeftLonger = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }];
  const lineLeft = [{ x: 1 }, { x: 2 }, { x: 3 }];
  const longestLine = [{ x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }, { x: 6 }];
  const lineRightLonger = [{ x: 3 }, { x: 4 }, { x: 5 }, { x: 6 }];
  const lineRight = [{ x: 3 }, { x: 4 }, { x: 5 }];
  const sorted = [
    lineLeftLonger,
    lineLeft,
    longestLine,
    lineRightLonger,
    lineRight
  ];
  expect(getLongestLineOfEachLeftness(sorted, xAccessor)).toEqual([
    lineLeftLonger,
    longestLine,
    lineRightLonger
  ]);
});

test('gets or creates full continous line from list of lines', () => {
  const longestLine = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }];
  const lineSame = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }];
  expect(getFullContinuousLine([longestLine, lineSame], xAccessor)).toEqual(
    longestLine.map(point => ({ x: point.x }))
  );

  const lineRight = [{ x: 3 }, { x: 4 }, { x: 5 }];
  const lineLeft = [{ x: 1 }, { x: 2 }, { x: 3 }];
  expect(getFullContinuousLine([lineRight, lineLeft], xAccessor)).toEqual([
    { x: 1 },
    { x: 2 },
    { x: 3 },
    { x: 4 },
    { x: 5 }
  ]);

  const lineLeftLonger = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }];
  const lineRightLonger = [{ x: 3 }, { x: 4 }, { x: 5 }, { x: 6 }];
  expect(
    getFullContinuousLine(
      [longestLine, lineRight, lineLeft, lineLeftLonger, lineRightLonger],
      xAccessor
    )
  ).toEqual([{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }, { x: 6 }]);

  const skippingLine = [{ x: 9 }, { x: 10 }, { x: 11 }];
  expect(
    getFullContinuousLine(
      [
        longestLine,
        lineRight,
        lineLeft,
        lineLeftLonger,
        lineRightLonger,
        skippingLine
      ],
      xAccessor
    )
  ).toEqual([
    { x: 1 },
    { x: 2 },
    { x: 3 },
    { x: 4 },
    { x: 5 },
    { x: 6 },
    { x: 9 },
    { x: 10 },
    { x: 11 }
  ]);
});

test('fills nulls when a line is shorter than the longest line', () => {
  const longestLine = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }];
  const lineSame = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }];
  expect(getNullFilledLines([lineSame, longestLine], xAccessor)).toEqual([
    longestLine,
    lineSame
  ]);

  const lineRightShift = [{ x: 3 }, { x: 4 }, { x: 5 }];
  expect(getNullFilledLines([lineRightShift, longestLine], xAccessor)).toEqual([
    [null, null, ...lineRightShift],
    longestLine
  ]);

  const lineLeftShift = [{ x: 1 }, { x: 2 }, { x: 3 }];
  expect(getNullFilledLines([lineLeftShift, longestLine], xAccessor)).toEqual([
    [...lineLeftShift, null, null],
    longestLine
  ]);

  const lineCenterShift = [{ x: 2 }, { x: 3 }, { x: 4 }];
  expect(
    getNullFilledLines([lineCenterShift, longestLine], xAccessor)
  ).toEqual([[null, ...lineCenterShift, null], longestLine]);

  expect(
    getNullFilledLines([lineLeftShift, lineRightShift], xAccessor)
  ).toEqual([
    [...lineLeftShift, null, null],
    [null, null, ...lineRightShift]
  ]);

  expect(
    getNullFilledLines(
      [
        lineLeftShift,
        lineCenterShift,
        lineRightShift,
        longestLine,
        [...longestLine, { x: 6 }]
      ],
      xAccessor
    )
  ).toEqual([
    [...lineLeftShift, null, null, null],
    [null, ...lineCenterShift, null, null],
    [null, null, ...lineRightShift, null],
    [...longestLine, null],
    [...longestLine, { x: 6 }]
  ]);
});
