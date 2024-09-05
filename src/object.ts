import {A, D} from "@mobily/ts-belt"

export function isPlainObject(obj: unknown): obj is Dict<unknown> {
  function isObject(obj: unknown): obj is object {
    return Object.prototype.toString.call(obj) == "[object Object]"
  }

  if (!isObject(obj)) {
    return false
  }

  // If has modified constructor
  let ctor = (obj as any).constructor
  if (ctor === undefined) {
    return true
  }

  // If has modified prototype
  let prot = ctor.prototype
  if (!isObject(prot)) {
    return false
  }

  // If constructor does not have an Object-specific method
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false
  }

  // Most likely a plain Object
  return true
}

export function size(obj: Dict<unknown>): number {
  return D.keys(obj).length
}

export let deleteKey = D.deleteKey
export let deleteKeys = D.deleteKeys
export let isEmpty = D.isEmpty
export let isNotEmpty = D.isNotEmpty
export let filter = D.filter
export let fromPairs = D.fromPairs // Note: had a problem with this function, solved by passing explicit type in generic -- D.fromPairs<User, string>(..)
export let get = D.get
export let getUnsafe = D.getUnsafe
export let keys = D.keys
export let map = D.map
export let mapWithKey = D.mapWithKey
export let merge = D.merge
export let selectKeys = D.selectKeys
export let toPairs = D.toPairs

export let values = D.values
// export function values<T extends string | number, R>(dict: Record<T, R> | {[k in T]?: R}): Array<R> {
//   return D.values(dict as any)
// }

export function fromZip<T>(keys: string[], data: T[]): Dict<T> {
  return D.fromPairs(A.zip(keys, data))
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export function deepEqual(object1: Dict<any>, object2: Dict<any>) {
  let keys1 = Object.keys(object1)
  let keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (let key of keys1) {
    let val1 = object1[key]
    let val2 = object2[key]
    let areObjects = isObject(val1) && isObject(val2)
    if (
      areObjects && !deepEqual(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false
    }
  }

  return true
}

function isObject(object: Dict<any>) {
  return object != null && typeof object === 'object'
}

