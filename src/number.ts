export function sum(ns: number[]): number {
  return ns.reduce((z, x) => z + x, 0)
}

export function sumBy<T>(xs: T[], byFn: (x: T) => number): number {
  return xs.reduce((z, x) => z + byFn(x), 0)
}

export function asPercent(ratio: number): string {
  return Math.round(ratio * 100) + "%"
}

export function clamp(min: number, max: number) {
  return function (n: number): number {
    return Math.min(Math.max(n, min), max)
  }
}

// for FE where we cannot use Faker
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


// Not sure if necessary to have both parseIntUndefined and parseFloatUndefined:
// given that JS knows only `number`. If we need an int – just remove the decimal part.
// Not clear how `parseInt` should translate decimal strings anyway: drop, round, error, etc...

// export function parseIntUndefined(str: string | undefined): number | undefined {
//   if (!str) {
//     return undefined
//   }
//   let n = parseInt(str)
//   return isNaN(n) ? undefined : n
// }

// DEPRECATED, done in Zod (z_optionalNumber)
// export function parseUndefined(str: string | undefined): number | undefined {
//   if (!str) {
//     return undefined
//   }
//   let n = parseFloat(str)
//   return isNaN(n) ? undefined : n
// }

// DEPRECATED, done in Zod (z_optionalNumber)
// export function orUndefined(n: number | undefined) {
//   return isNaN(n) || undefined
// }
