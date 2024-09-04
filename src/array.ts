import {A, D, F, pipe} from "@mobily/ts-belt"

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
    const [topXs] = [...occurences.entries()].reduce(([zks, zv], [k, v]) => {
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

export function append_<T>(xs: T[], x: T): T[] {
  xs.push(x)
  return xs
}

// Until `UseMutableDict` (see `UseMutableArrays`) is supported by TS-Belt
export function groupBy<A>(xs: Array<A>, groupFn: (item: A) => PropertyKey): Record<PropertyKey, [A, ...A[]]>
export function groupBy<A>(groupFn: (item: A) => PropertyKey): (xs: Array<A>) => Record<PropertyKey, [A, ...A[]]>
export function groupBy(arg1: any, arg2?: any) {
  if (arguments.length == 2) {
    return pipe(
      A.groupBy(arg1, arg2),
      D.map(F.toMutable),
    ) as any
  } else if (arguments.length == 1) {
    return flippedGroupBy.bind(null, arg1)
  } else {
    return groupBy
  }
}

function flippedGroupBy<A>(groupFn: (item: A) => PropertyKey, xs: Array<A>) {
  return pipe(
    A.groupBy(xs, groupFn),
    D.map(F.toMutable),
  )
}

export function splitBy<T, K extends PropertyKey>(xs: T[], fn: (x: T) => K): T[][] {
  return D.values(groupBy(xs, fn))
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
  const r = A.splitAt(xs, Math.ceil(xs.length / 2))
  return r ? F.toMutable(r) : undefined
}

export function uniqByLatest<X>(xs: X[], uniqFn: (x: X) => string): X[] {
  return pipe(
    xs,
    A.reverse,
    A.uniqBy(uniqFn),
    A.reverse
  )
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
  const maxN = max(array2d.map(row => row.length)) || 0
  const matrix = array2d.map(row =>
    row.length == maxN
      ? row
      : [...row, ...range(0, maxN - row.length - 1).map(() => undefined)]
  )
  const matrixTransposed = matrix[0].map((col, i) => matrix.map(row => row[i]))
  return matrixTransposed.map(row => row.filter((item): item is string => item != undefined))
}

export function splitAt<A>(xs: A[], offset: number): [A[], A[]] {
  const r = A.splitAt(xs, offset)    // original impl. returns `undefined` for out-of-bound indexes
  return r ? [r[0], r[1]] : [xs, []] // currying is lost, we're waiting for the pipe (|>) operator to make it unnecessary
}

export const append = A.append
export const concat = A.concat
export const difference = A.difference
export const drop = A.drop
export function dropWhile<X>(xs: X[], predicate: (x: X) => boolean): X[] {
  for (const [i, x] of xs.entries()) {
    if (!predicate(x)) {
      return xs.slice(i)
    }
  }
  return []
}
export const filter = A.filter
export const find = A.find
export const flat = A.flat
export const flatMap = A.flatMap
export const head = A.head
export const includes = A.includes
export const intersection = A.intersection
export const isEmpty = A.isEmpty
export const isNotEmpty = A.isNotEmpty
export const join = A.join
export const last = A.last
export const map = A.map
export const mapWithIndex = A.mapWithIndex
export const partition = A.partition
export const prepend = A.prepend
export const range = A.range
export const rangeBy = A.rangeBy
export const reduce = A.reduce
export const reject = A.reject
export const removeAt = A.removeAt
export const removeFirst = A.removeFirst
// export const removeFirstBy = A.removeFirstBy // stupid interface, don't use
export const repeat = A.repeat
export function replace<X>(xs: X[], fromX: X, toX: X): X[] {
  return xs.map(x => x === fromX ? toX : x)
}
export const reverse = A.reverse
export const shuffle = A.shuffle
export const sort = A.sort
export const sortBy = A.sortBy
export const splitEvery = A.splitEvery
export const take = A.take
export const takeWhile = A.takeWhile
export const uniq = A.uniq
export const uniqBy = A.uniqBy
export const zip = A.zip
export const zipWith = A.zipWith
export const zipWithIndex = A.zipWithIndex
