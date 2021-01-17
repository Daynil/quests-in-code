/**
 * For lines shorter than the longest, fill nulls.
 * Nulls are positioned based on longest line x position
 */
export function getNullFilledLine<T>(
  line: T[],
  longestLine: T[],
  xAccessor: (d: T) => number
): T[] {
  const nullFilledLine: T[] = [];

  const indexOfStart = longestLine.findIndex(
    point => xAccessor(point) === xAccessor(line[0])
  );
  let nullsCounter = 0;
  for (let x = 0; x < longestLine.length; x++) {
    if (x < indexOfStart || x > line.length + nullsCounter - 1) {
      nullsCounter++;
      nullFilledLine.push(null);
    } else nullFilledLine.push(line[x - nullsCounter]);
  }
  console.log(nullFilledLine);
  return nullFilledLine;
}
