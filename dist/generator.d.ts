export declare function zip2<T1, T2>(xs: T1[], ys: T2[]): Generator<[T1, T2]>;
type Iterableify<T> = {
    [K in keyof T]: Iterable<T[K]>;
};
export declare function zipAll<T extends Array<any>>(...toZip: Iterableify<T>): Generator<T>;
export {};
