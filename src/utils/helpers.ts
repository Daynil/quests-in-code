export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://questsincode.com'
    : 'http://localhost:3000';

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

export function getTimeToRead(content: string): number {
  const avgWpmReadSpeed = 250;
  const contentLengthWords = content.split(' ').length;
  return Math.round(contentLengthWords / avgWpmReadSpeed);
}
