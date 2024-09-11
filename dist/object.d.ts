export { deleteKey, deleteKeys, isEmpty, isNotEmpty, filter, fromPairs, // Note: had a problem with this function, solved by passing explicit type in generic -- D.fromPairs<User, string>(..)
get, getUnsafe, keys, map, mapWithKey, merge, selectKeys, toPairs, values } from "@mobily/ts-belt/Dict";
export declare function isPlainObject(obj: unknown): obj is Dict<unknown>;
export declare function size(obj: Dict<unknown>): number;
export declare function fromZip<T>(keys: string[], data: T[]): Dict<T>;
export declare function deepEqual(object1: Dict<unknown>, object2: Dict<unknown>): boolean;
