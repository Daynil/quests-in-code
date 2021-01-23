import { leastIndex, max, maxIndex, min } from 'd3';
import cloneDeep from 'lodash.clonedeep';
import {
  LinePointCoords,
  PlanePointCoords
} from '../components/charts/lines-chart';

export function sortLeftMostThenLongestLine<T>(
  series: T[][],
  xAccessor: (d: T) => number
): T[][] {
  const lines = cloneDeep(series);
  return lines.sort((lineA, lineB) => {
    if (xAccessor(lineA[0]) < xAccessor(lineB[0])) {
      // Leftmost point sorted first
      return -1;
    } else if (xAccessor(lineA[0]) > xAccessor(lineB[0])) {
      return 1;
    } else {
      if (lineA.length > lineB.length) {
        // If lines have equal first, longest sorted first
        return -1;
      } else if (lineA.length < lineB.length) {
        return 1;
      }
      // If lines have equal first and equal length, doesn't matter
      return 1;
    }
  });
}

/**
 * Filter for only longest line at each leftness
 * @param sortedLines sorted by left most then longest
 */
export function getLongestLineOfEachLeftness<T>(
  sortedLines: T[][],
  xAccessor: (d: T) => number
): T[][] {
  const lines: T[][] = [];

  let currLeftness = 0;
  let currLeftnessAddressed = false;
  for (let i = 0; i < sortedLines.length; i++) {
    const currLine = sortedLines[i];
    const nextLine = sortedLines[i + 1];
    currLeftness = xAccessor(currLine[0]);

    if (!nextLine) {
      if (currLeftnessAddressed) break;
      else {
        lines.push(currLine);
        break;
      }
    }

    if (!currLeftnessAddressed) {
      lines.push(currLine);
      currLeftnessAddressed = true;
    }

    // Reset for next loop
    if (xAccessor(nextLine[0]) !== currLeftness) currLeftnessAddressed = false;
  }

  return lines;
}

/**
 * Take a list of lines and get the full comparator line.
 * If there is no line that spans the entire range,
 * create one by stitching together the smaller ones.
 *
 * Assumes all lines have continuous data points.
 * Can't think of a good reason not to assume this.
 */
export function getFullContinuousLine<T>(
  series: T[][],
  xAccessor: (d: T) => number
): T[] {
  const sortedLines = sortLeftMostThenLongestLine(series, xAccessor);

  const lines = getLongestLineOfEachLeftness(sortedLines, xAccessor);

  const seriesExtent = getSeriesDomainExtent(lines, xAccessor);
  const longestLine = lines[maxIndex(lines, line => line.length)];

  let fullContinuousLine: T[] = [];

  // Longest line already spans series extent
  if (
    xAccessor(longestLine[0]) === seriesExtent.min &&
    xAccessor(longestLine[longestLine.length - 1]) === seriesExtent.max
  ) {
    return fullContinuousLine.concat(longestLine);
  }

  let fullLineCurrMax = 0;
  let currLineIdx = 0;
  do {
    if (currLineIdx === 0) {
      fullContinuousLine = fullContinuousLine.concat(lines[currLineIdx]);
    } else {
      const currLine = lines[currLineIdx];
      const currLineMax = max(currLine, xAccessor);
      // If the current line's max leftness is lower than the current full line max
      // We don't care about it
      if (currLineMax > fullLineCurrMax) {
        const newSection = currLine.filter(
          point => xAccessor(point) > fullLineCurrMax
        );
        fullContinuousLine = fullContinuousLine.concat(newSection);
      }
    }
    currLineIdx++;
    fullLineCurrMax = max(fullContinuousLine, xAccessor);
  } while (fullLineCurrMax !== seriesExtent.max);

  return fullContinuousLine;
}

/**
 * Determine the amount each line is shifted from the left
 * of the origin.
 */
export function getLeftOffsets<T>(series: T[][], xAccessor: (d: T) => number) {
  const lines = cloneDeep(series);
  const longestLine = getFullContinuousLine(lines, xAccessor);

  const leftOffsets: number[] = [];

  // Determine how far right shifted each line is
  for (let i = 0; i < lines.length; i++) {
    leftOffsets.push(
      longestLine.findIndex(
        point => xAccessor(point) === xAccessor(lines[i][0])
      )
    );
  }

  return leftOffsets;
}

/**
 * Among a list of lines, find the line coordinates closest to a
 * given plane point coordinate
 */
export function getClosestCoordinates<T>(
  planeCoords: PlanePointCoords,
  series: T[][],
  xAccessor: (d: T) => number,
  yAccessor: (d: T) => number
): LinePointCoords {
  const fullContinuousLine = getFullContinuousLine(series, xAccessor);
  const lineLeftOffsets = getLeftOffsets(series, xAccessor);

  const closestXIndex = leastIndex(
    fullContinuousLine,
    (a, b) =>
      Math.abs(xAccessor(a) - planeCoords.x) -
      Math.abs(xAccessor(b) - planeCoords.x)
  );

  let shortestDistance = Infinity;
  let closestLineIndex = 0;
  for (let i = 0; i < series.length; i++) {
    const line = series[i];
    const lineLeftOffset = lineLeftOffsets[i];
    /*
     * Skip any lines whose left offset is greater than
     * the identified closest x index
     * e.g. if left offset is 2, but closest x index is 1, skip
     */
    const rightShiftedPastX = lineLeftOffset > closestXIndex;
    /*
     * Skip any lines that don't have any more values
     * at the given x index
     * e.g. if closest x index is 5 but line length is 3
     */
    const leftShiftedBeforeX = closestXIndex - lineLeftOffset > line.length - 1;
    if (rightShiftedPastX || leftShiftedBeforeX) continue;
    const distance = Math.abs(
      yAccessor(line[closestXIndex - lineLeftOffset]) - planeCoords.y
    );
    if (distance < shortestDistance) {
      shortestDistance = distance;
      closestLineIndex = i;
    }
  }

  return {
    lineIndex: closestLineIndex,
    xIndex: closestXIndex - lineLeftOffsets[closestLineIndex]
  };
}

/**
 * For lines shorter than the longest, fill nulls.
 * Nulls are positioned based on longest line x position
 */
export function getNullFilledLines<T>(
  series: T[][],
  xAccessor: (d: T) => number
): T[][] {
  const lines = cloneDeep(series);
  const longestLine = getFullContinuousLine(lines, xAccessor);

  const nullFilledLines: T[][] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const nullFilledLine: T[] = [];

    // Determine where to start filling nulls
    // based on how far right shifted current line is
    const indexOfStart = longestLine.findIndex(
      point => xAccessor(point) === xAccessor(line[0])
    );
    let nullsCounter = 0;
    // Fill nulls on both ends where neede
    for (let x = 0; x < longestLine.length; x++) {
      if (x < indexOfStart || x > line.length + nullsCounter - 1) {
        nullsCounter++;
        nullFilledLine.push(null);
      } else nullFilledLine.push(line[x - nullsCounter]);
    }
    nullFilledLines.push(nullFilledLine);
  }
  return nullFilledLines;
}

export function getSeriesDomainExtent<T>(
  series: T[][],
  xAccessor: (d: T) => number
) {
  return {
    min: min(series, line => min(line.map(d => xAccessor(d)))),
    max: max(series, line => max(line.map(d => xAccessor(d))))
  };
}
