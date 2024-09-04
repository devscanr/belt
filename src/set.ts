import * as A2 from "./array"

export function add<T>(set: Set<T>, x: T): Set<T> {
  return set.union(new Set([x])) as Set<T>
}

export function remove<T>(set: Set<T>, x: T): Set<T> {
  return set.difference(new Set([x]))
}

export function union<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return setA.union(setB) as Set<T>
}

export function intersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return setA.intersection(setB)
}

export function difference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return setA.difference(setB)
}

export function intersections<T>(sets: (Set<T>)[]): Set<T> {
  return sets.length ? A2.reduce1(sets, intersection) : new Set()
}

// Maybe later:
// - symmetricDifference() returns a new set with elements in either set, but not in both.
// - isSubsetOf() returns a boolean indicating if all elements of a set are in a specific set.
// - isSupersetOf() returns a boolean indicating if all elements of a set are in a specific set.
// - isDisjointFrom() returns a boolean indicating if this set has no elements in common with a specific set.
