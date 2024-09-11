import { zip as A_zip } from "@mobily/ts-belt/Array";
import { fromPairs as D_fromPairs } from "@mobily/ts-belt/Dict";
export { deleteKey, deleteKeys, isEmpty, isNotEmpty, filter, fromPairs, // Note: had a problem with this function, solved by passing explicit type in generic -- D.fromPairs<User, string>(..)
get, getUnsafe, keys, map, mapWithKey, merge, selectKeys, toPairs, values } from "@mobily/ts-belt/Dict";
export function isPlainObject(obj) {
    function isObject(obj) {
        return Object.prototype.toString.call(obj) == "[object Object]";
    }
    if (!isObject(obj)) {
        return false;
    }
    // If has modified constructor
    let ctor = obj.constructor;
    if (ctor === undefined) {
        return true;
    }
    // If has modified prototype
    let prot = ctor.prototype;
    if (!isObject(prot)) {
        return false;
    }
    // If constructor does not have an Object-specific method
    if (!prot.hasOwnProperty("isPrototypeOf")) {
        return false;
    }
    // Most likely a plain Object
    return true;
}
export function size(obj) {
    return Object.keys(obj).length;
}
// export function values<T extends string | number, R>(dict: Record<T, R> | {[k in T]?: R}): Array<R> {
//   return D.values(dict as any)
// }
export function fromZip(keys, data) {
    return D_fromPairs(A_zip(keys, data));
}
////////////////////////////////////////////////////////////////////////////////////////////////////
export function deepEqual(object1, object2) {
    let keys1 = Object.keys(object1);
    let keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        let val1 = object1[key];
        let val2 = object2[key];
        let areObjects = isObject(val1) && isObject(val2);
        if (areObjects && !deepEqual(val1, val2) ||
            !areObjects && val1 !== val2) {
            return false;
        }
    }
    return true;
}
function isObject(object) {
    return object != null && typeof object === 'object';
}
