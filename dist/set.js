import * as A2 from "./array";
export function add(set, x) {
    return set.union(new Set([x]));
}
export function remove(set, x) {
    return set.difference(new Set([x]));
}
export function union(setA, setB) {
    return setA.union(setB);
}
export function intersection(setA, setB) {
    return setA.intersection(setB);
}
export function difference(setA, setB) {
    return setA.difference(setB);
}
export function intersections(sets) {
    return sets.length ? A2.reduce1(sets, intersection) : new Set();
}
// Maybe later:
// - symmetricDifference() returns a new set with elements in either set, but not in both.
// - isSubsetOf() returns a boolean indicating if all elements of a set are in a specific set.
// - isSupersetOf() returns a boolean indicating if all elements of a set are in a specific set.
// - isDisjointFrom() returns a boolean indicating if this set has no elements in common with a specific set.
