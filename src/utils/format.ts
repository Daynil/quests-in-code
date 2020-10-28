export function humanDateFromEpoch(epochSec: number): string {
  const date = new Date(epochSec * 1000);
  return date.toLocaleDateString(undefined, {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute:'numeric', second:'numeric'});
}