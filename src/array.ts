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
    )
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
  let r = A.splitAt(xs, Math.ceil(xs.length / 2))
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
  let maxN = max(array2d.map(row => row.length)) || 0
  let matrix = array2d.map(row =>
    row.length == maxN
      ? row
      : [...row, ...range(0, maxN - row.length - 1).map(() => undefined)]
  )
  let matrixTransposed = matrix[0].map((col, i) => matrix.map(row => row[i]))
  return matrixTransposed.map(row => row.filter((item): item is string => item != undefined))
}

export function splitAt<A>(xs: A[], offset: number): [A[], A[]] {
  let r = A.splitAt(xs, offset)    // original impl. returns `undefined` for out-of-bound indexes
  return r ? [r[0], r[1]] : [xs, []] // currying is lost, we're waiting for the pipe (|>) operator to make it unnecessary
}

export let append = A.append
export let concat = A.concat
export let difference = A.difference
export let drop = A.drop
export function dropWhile<X>(xs: X[], predicate: (x: X) => boolean): X[] {
  for (let [i, x] of xs.entries()) {
    if (!predicate(x)) {
      return xs.slice(i)
    }
  }
  return []
}
export let filter = A.filter
export let find = A.find
export let flat = A.flat
export let flatMap = A.flatMap
export let head = A.head
export let includes = A.includes
export let intersection = A.intersection
export let isEmpty = A.isEmpty
export let isNotEmpty = A.isNotEmpty
export let join = A.join
export let last = A.last
export let map = A.map
export let mapWithIndex = A.mapWithIndex
export let partition = A.partition
export let prepend = A.prepend
export let range = A.range
export let rangeBy = A.rangeBy
export let reduce = A.reduce
export let reject = A.reject
export let removeAt = A.removeAt
export let removeFirst = A.removeFirst
// export let removeFirstBy = A.removeFirstBy // stupid interface, don't use
export let repeat = A.repeat
export function replace<X>(xs: X[], fromX: X, toX: X): X[] {
  return xs.map(x => x === fromX ? toX : x)
}
export let reverse = A.reverse
export let shuffle = A.shuffle
export let sort = A.sort
export let sortBy = A.sortBy
export let splitEvery = A.splitEvery
export let take = A.take
export let takeWhile = A.takeWhile
export let uniq = A.uniq
export let uniqBy = A.uniqBy
export let zip = A.zip
export let zipWith = A.zipWith
export let zipWithIndex = A.zipWithIndex
