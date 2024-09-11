import {
  groupBy as A_groupBy,
  range as A_range,
  splitAt as A_splitAt,
  uniqBy as A_uniqBy
} from "@mobily/ts-belt/Array"

export {
  append,
  concat,
  difference,
  drop,
  filter,
  find,
  flat,
  flatMap,
  head,
  includes,
  intersection,
  isEmpty,
  isNotEmpty,
  join,
  last,
  map,
  mapWithIndex,
  partition,
  prepend,
  range,
  rangeBy,
  reduce,
  reject,
  removeAt,
  removeFirst,
  repeat,
  shuffle,
  sort,
  sortBy,
  splitEvery,
  take,
  takeWhile,
  uniq,
  uniqBy,
  zip,
  zipWith,
  zipWithIndex
} from "@mobily/ts-belt/Array"

export let Tuple = <T extends [any, ...any]>(v: T): T => v

// Return the most often repeated value(s)
export function modes<X>(xs: X[]): X[] {
  let occurences = new Map()
  for (let x of xs) {
    if (occurences.has(x)) {
      occurences.set(x, occurences.get(x) + 1)
    } else {
      occurences.set(x, 1)
    }
  }
  if (occurences.size >= 2) {
    let [topXs] = [...occurences.entries()].reduce(([zks, zv], [k, v]) => {
      if (v > zv) {
        return [[k], v]
      }
      if (v == zv) {
        zks.push(k)
      }
      return [zks, zv]
    }, [[], -Infinity])
    return topXs
  } else if (occurences.size == 1) {
    return [occurences.entries().next().value[0]]
  } else {
    return []
  }
}

// [a1, a2], [b1, b2] => [[a1, b1], [a1, b2], [a2, b1], [a2, b2]]
export function recombine<X, Y>(xs: X[], ys: Y[]): [X, Y][] {
  return xs.flatMap(x => {
    return ys.map(y => {
      return [x, y] as [X, Y]
    })
  })
}

// Until `UseMutableDict` (see `UseMutableArrays`) is supported by TS-Belt
export function groupBy<A>(xs: Array<A>, groupFn: (item: A) => PropertyKey): Record<PropertyKey, [A, ...A[]]>
export function groupBy<A>(groupFn: (item: A) => PropertyKey): (xs: Array<A>) => Record<PropertyKey, [A, ...A[]]>
export function groupBy(arg1: any, arg2?: any) {
  if (arguments.length == 2) {
    return A_groupBy(arg1, arg2)
  } else if (arguments.length == 1) {
    return flippedGroupBy.bind(null, arg1)
  } else {
    return groupBy
  }
}

function flippedGroupBy<A>(groupFn: (item: A) => PropertyKey, xs: Array<A>) {
  return A_groupBy(xs, groupFn)
}

export function splitBy<T, K extends PropertyKey>(xs: T[], fn: (x: T) => K): T[][] {
  return Object.values(groupBy(xs, fn))
}

export function reduce1<X>(xs: X[], fn: (z: X, x: X) => X): X {
  if (!xs.length) {
    throw new Error("array 'xs' must not be empty")
  }
  let [x, ...xs1] = xs
  return xs1.reduce(fn, x)
}

export function concatCappedLeft<T>(n: number, xs1: T[], xs2: T[]): T[] {
  return xs1.concat(xs2).slice(-n)
}

export function concatCappedRight<T>(n: number, xs1: T[], xs2: T[]): T[] {
  return xs1.concat(xs2).slice(0, n)
}

export function splitInTwo<T>(xs: T[]): [T[], T[]] | undefined {
  let r = A_splitAt(xs, Math.ceil(xs.length / 2))
  return r ? r as [T[], T[]] : undefined
}

export function uniqByLatest<X>(xs: X[], uniqFn: (x: X) => string): X[] {
  return A_uniqBy(xs.toReversed(), uniqFn).toReversed()
}

export function min<T extends string | number>(xs: T[]): T | undefined {
  if (!xs.length) {
    return undefined
  }
  let [x, ..._xs] = xs
  return _xs.reduce((z, x) => {
    return x < z ? x : z
  }, x)
}

export function max<T extends string | number>(xs: T[]): T | undefined {
  if (!xs.length) {
    return undefined
  }
  let [x, ..._xs] = xs
  return _xs.reduce((z, x) => {
    return x > z ? x : z
  }, x)
}

export function transpose2d(array2d: string[][]): string[][] {
  /*
  [
    [foo1, foo2],       // first results (e.g. skills)
    [bar1, bar2, bar3], // second results
  ]
  =>
  [
    [foo1, foo2, null],
    [bar1, bar2, bar3],
  ]
  =>
  [
    [foo1, bar1],
    [foo2, bar2],
    [bar3, null],
  ]
  =>
  [
    [foo1, bar1], // first order results
    [foo2, bar2], // second order results
    [bar3],       // third order results
  ]
  */
  let maxN = max(array2d.map(row => row.length)) || 0
  let matrix = array2d.map(row =>
    row.length == maxN
      ? row
      : [...row, ...A_range(0, maxN - row.length - 1).map(() => undefined)]
  )
  let matrixTransposed = matrix[0].map((col, i) => matrix.map(row => row[i]))
  return matrixTransposed.map(row => row.filter((item): item is string => item != undefined))
}

export function splitAt<A>(xs: A[], offset: number): [A[], A[]] {
  let r = A_splitAt(xs, offset)    // original impl. returns `undefined` for out-of-bound indexes
  return r ? [r[0], r[1]] : [xs, []] // currying is lost, we're waiting for the pipe (|>) operator to make it unnecessary
}

export function dropWhile<X>(xs: X[], predicate: (x: X) => boolean): X[] {
  for (let [i, x] of xs.entries()) {
    if (!predicate(x)) {
      return xs.slice(i)
    }
  }
  return []
}

export function replace<X>(xs: X[], fromX: X, toX: X): X[] {
  return xs.map(x => x === fromX ? toX : x)
}

