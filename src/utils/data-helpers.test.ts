import { PlanePointCoords } from '../components/charts/lines-chart';
import {
  getClosestCoordinates,
  getFullContinuousLine,
  getLeftOffsets,
  getLongestLineOfEachLeftness,
  getNullFilledLines,
  sortLeftMostThenLongestLine
} from './data-helpers';

type TestPoint = { x: number; y: number };
const xAccessor = (point: TestPoint) => point.x;
const yAccessor = (point: TestPoint) => point.y;

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

test('gets left offsets of each line', () => {
  const longestLine = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }];
  const lineSame = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }];
  expect(getLeftOffsets([lineSame, longestLine], xAccessor)).toEqual([0, 0]);

  const lineRightShift = [{ x: 3 }, { x: 4 }, { x: 5 }];
  expect(getLeftOffsets([lineRightShift, longestLine], xAccessor)).toEqual([
    // [null, null, ...lineRightShift],
    2,
    0
  ]);

  const lineLeftShift = [{ x: 1 }, { x: 2 }, { x: 3 }];
  expect(getLeftOffsets([lineLeftShift, longestLine], xAccessor)).toEqual([
    // [...lineLeftShift, null, null],
    0,
    0
  ]);

  const lineCenterShift = [{ x: 2 }, { x: 3 }, { x: 4 }];
  expect(getLeftOffsets([lineCenterShift, longestLine], xAccessor)).toEqual([
    // [null, ...lineCenterShift, null],
    1,
    0
  ]);

  expect(getLeftOffsets([lineLeftShift, lineRightShift], xAccessor)).toEqual([
    // [...lineLeftShift, null, null],
    // [null, null, ...lineRightShift]
    0,
    2
  ]);

  expect(
    getLeftOffsets(
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
    // [...lineLeftShift, null, null, null],
    // [null, ...lineCenterShift, null, null],
    // [null, null, ...lineRightShift, null],
    // [...longestLine, null],
    // [...longestLine, { x: 6 }]
    0,
    1,
    2,
    0,
    0
  ]);
});

test('given plane coordinates, gets the closest line coordinates', () => {
  const longestLine = [
    { x: 1, y: 100 },
    { x: 2, y: 99 },
    { x: 3, y: 98 },
    { x: 4, y: 97 },
    { x: 5, y: 96 }
  ];
  const lineSame = [
    { x: 1, y: 50 },
    { x: 2, y: 49 },
    { x: 3, y: 48 },
    { x: 4, y: 47 },
    { x: 5, y: 46 }
  ];

  let planeCoords: PlanePointCoords = { x: 0.2, y: 62 };

  // should be lineSame's {x: 1, y: 50}
  expect(
    getClosestCoordinates(
      planeCoords,
      [longestLine, lineSame],
      xAccessor,
      yAccessor
    )
  ).toEqual({
    lineIndex: 1,
    xIndex: 0
  });

  planeCoords = { x: 2.2, y: 50 };
  const lineRightShift = [
    { x: 3, y: 50 },
    { x: 4, y: 49 },
    { x: 5, y: 48 }
  ];

  // should be longestLine's {x: 2, y: 99}
  expect(
    getClosestCoordinates(
      planeCoords,
      [longestLine, lineRightShift],
      xAccessor,
      yAccessor
    )
  ).toEqual({
    lineIndex: 0,
    xIndex: 1
  });

  // flipping array order should also work
  // should be longestLine's {x: 2, y: 99}
  expect(
    getClosestCoordinates(
      planeCoords,
      [lineRightShift, longestLine],
      xAccessor,
      yAccessor
    )
  ).toEqual({
    lineIndex: 1,
    xIndex: 1
  });

  planeCoords = { x: 2.9, y: 68 };
  // should be lineRightShift's {x: 3, y: 50}
  expect(
    getClosestCoordinates(
      planeCoords,
      [longestLine, lineRightShift],
      xAccessor,
      yAccessor
    )
  ).toEqual({
    lineIndex: 1,
    xIndex: 0
  });

  const lineLeftShift = [
    { x: 1, y: 20 },
    { x: 2, y: 19 },
    { x: 3, y: 18 }
  ];
  planeCoords = { x: 2.4, y: 68 };
  // should be longestLines's {x: 2, y: 99}
  expect(
    getClosestCoordinates(
      planeCoords,
      [longestLine, lineLeftShift],
      xAccessor,
      yAccessor
    )
  ).toEqual({
    lineIndex: 0,
    xIndex: 1
  });

  planeCoords = { x: 2.4, y: 26 };
  // should be lineLeftShift's {x: 2, y: 19}
  expect(
    getClosestCoordinates(
      planeCoords,
      [longestLine, lineLeftShift],
      xAccessor,
      yAccessor
    )
  ).toEqual({
    lineIndex: 1,
    xIndex: 1
  });

  const lineCenterShift = [
    { x: 2, y: 70 },
    { x: 3, y: 69 },
    { x: 4, y: 68 }
  ];
  planeCoords = { x: 0.2, y: 0 };
  // should be lineCenterShift's {x: 2, y: 70}
  expect(
    getClosestCoordinates(
      planeCoords,
      [lineCenterShift, lineRightShift],
      xAccessor,
      yAccessor
    )
  ).toEqual({
    lineIndex: 0,
    xIndex: 0
  });

  planeCoords = { x: 2.2, y: 30 };
  // should be lineLeftShift's {x: 2, y: 19}
  expect(
    getClosestCoordinates(
      planeCoords,
      [lineCenterShift, lineRightShift, lineLeftShift, longestLine],
      xAccessor,
      yAccessor
    )
  ).toEqual({
    lineIndex: 2,
    xIndex: 1
  });

  planeCoords = { x: 4.8, y: 30 };
  // should be lineRightShift's {x: 5, y: 48}
  expect(
    getClosestCoordinates(
      planeCoords,
      [lineCenterShift, lineRightShift, lineLeftShift, longestLine],
      xAccessor,
      yAccessor
    )
  ).toEqual({
    lineIndex: 1,
    xIndex: 2
  });
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
