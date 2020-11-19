export function humanDateFromEpoch(epochSec: number): string {
  const date = new Date(epochSec * 1000);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
}

export function getTimeToRead(contentLengthChar: number): number {
  const avgWpmReadSpeed = 250;
  const avgCharWordLength = 5;
  return Math.round(contentLengthChar / avgCharWordLength / avgWpmReadSpeed);
}
