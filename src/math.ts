export function clamp(min: number, max: number) {
  return function (n: number): number {
    return Math.min(Math.max(n, min), max)
  }
}

// for FE where we cannot use faker
export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
