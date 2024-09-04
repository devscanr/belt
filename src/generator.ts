export function* zip2<T1, T2>(xs: T1[], ys: T2[]): Generator<[T1, T2]> {
  let xIterator = xs[Symbol.iterator]()
  let yIterator = ys[Symbol.iterator]()

  while (true) {
    // Advance all of the iterators
    let xResult = xIterator.next()
    let yResult = yIterator.next()

    // If any of the iterators are done, we should stop
    if ([xResult, yResult].some(({done}) => done)) {
      break
    }

    yield [xResult.value, yResult.value]
  }
}

// T is a tuple
type Iterableify<T> = {
  [K in keyof T]: Iterable<T[K]>
}

export function* zipAll<T extends Array<any>>(...toZip: Iterableify<T>): Generator<T> {
  // Get iterators for all of the iterables
  let iterators = toZip.map(it => it[Symbol.iterator]())

  while (true) {
    // Advance all of the iterators
    let results = iterators.map(i => i.next())

    // If any of the iterators are done, we should stop
    if (results.some(({done}) => done)) {
      break
    }

    // We can assert the yield type, since we know none of the iterators are done
    yield results.map(({value}) => value) as T
  }
}

// Example:
// for (let tuple of zipAll([1, 2, 3], ["a", "b", "c"], [1, 2, 3])) {
//   console.log(tuple)
// }

// TODO recheck this topic when "iterable methods" become available in Bun!
