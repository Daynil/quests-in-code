export function clamp(num: number, lower: number, upper: number) {
  return num < lower ? lower : num > upper ? upper : num;
}

export function round(num: number, places: number) {
  const multiplier = Math.pow(10, places);
  return Math.round(num * multiplier) / multiplier;
}
