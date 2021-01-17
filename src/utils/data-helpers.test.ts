import { getNullFilledLine } from './data-helpers';

test('fills nulls when a line is shorter than the longest line', () => {
  const longestLine = [
    { x: 1, y: 99 },
    { x: 2, y: 98 },
    { x: 3, y: 97 },
    { x: 4, y: 96 },
    { x: 5, y: 95 }
  ];
  const lineSame = [
    { x: 1, y: 49 },
    { x: 2, y: 48 },
    { x: 3, y: 47 },
    { x: 4, y: 46 },
    { x: 5, y: 45 }
  ];
  expect(getNullFilledLine(lineSame, longestLine, line => line.x)).toEqual(
    lineSame
  );

  const lineRightShift = [
    { x: 3, y: 47 },
    { x: 4, y: 46 },
    { x: 5, y: 45 }
  ];
  expect(
    getNullFilledLine(lineRightShift, longestLine, line => line.x)
  ).toEqual([null, null, ...lineRightShift]);

  const lineLeftShift = [
    { x: 1, y: 49 },
    { x: 2, y: 48 },
    { x: 3, y: 47 }
  ];
  expect(
    getNullFilledLine(lineLeftShift, longestLine, line => line.x)
  ).toEqual([...lineLeftShift, null, null]);

  const lineCenterShift = [
    { x: 2, y: 48 },
    { x: 3, y: 47 },
    { x: 4, y: 46 }
  ];
  expect(
    getNullFilledLine(lineCenterShift, longestLine, line => line.x)
  ).toEqual([null, ...lineCenterShift, null]);
});
