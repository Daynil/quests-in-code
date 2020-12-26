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

/**
 * Debounces a function
 */
export function debounced(delay: number, fn: any) {
  let timerId: NodeJS.Timeout;
  return function(...args: any) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}
