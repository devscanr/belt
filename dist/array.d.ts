export { append, concat, difference, drop, find, head, includes, intersection, isEmpty, isNotEmpty, join, last, mapWithIndex, partition, prepend, range, rangeBy, reject, removeAt, removeFirst, repeat, shuffle, sort, sortBy, splitEvery, take, takeWhile, uniq, uniqBy, zip, zipWith, zipWithIndex } from "@mobily/ts-belt/Array";
export declare let Tuple: <T extends [any, ...any]>(v: T) => T;
export declare function modes<X>(xs: X[]): X[];
export declare function recombine<X, Y>(xs: X[], ys: Y[]): [X, Y][];
export declare function groupBy<A>(xs: Array<A>, groupFn: (item: A) => PropertyKey): Record<PropertyKey, [A, ...A[]]>;
export declare function groupBy<A>(groupFn: (item: A) => PropertyKey): (xs: Array<A>) => Record<PropertyKey, [A, ...A[]]>;
export declare function splitBy<T, K extends PropertyKey>(xs: T[], fn: (x: T) => K): T[][];
export declare function reduce1<X>(xs: X[], fn: (z: X, x: X) => X): X;
export declare function concatCappedLeft<T>(n: number, xs1: T[], xs2: T[]): T[];
export declare function concatCappedRight<T>(n: number, xs1: T[], xs2: T[]): T[];
export declare function splitInTwo<T>(xs: T[]): [T[], T[]] | undefined;
export declare function uniqByLatest<X>(xs: X[], uniqFn: (x: X) => string): X[];
export declare function min<T extends string | number>(xs: T[]): T | undefined;
export declare function max<T extends string | number>(xs: T[]): T | undefined;
export declare function transpose2d(array2d: string[][]): string[][];
export declare function splitAt<A>(xs: A[], offset: number): [A[], A[]];
export declare function dropWhile<X>(xs: X[], predicate: (x: X) => boolean): X[];
export declare function replace<X>(xs: X[], fromX: X, toX: X): X[];
