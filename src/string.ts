import {A, pipe, S} from "@mobily/ts-belt"

export function trimSlashes(str: string): string {
  return str.replace(/^\//, "").replace(/\/$/, "")
}

export function capitalize(str: string): string {
  // `charAt` returns "" (not undefined) for missing offsets
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function capitalizeEachWord(str: string): string {
  return pipe(str,
    S.split(" "),
    A.map(capitalize),
    A.join(" "),
  )
}

export function isCapitalized (str: string) {
  return str && (str[0] == str[0].toUpperCase())
}

export function trimAndLower(str: string): string {
  return str.trim().toLowerCase()
}

export function isLowercase(str: string): boolean {
  return str.toLowerCase() == str
}

export function isUppercase(str: string): boolean {
  return str.toUpperCase() == str
}

// DEPRECATED, done in Zod (z_optionalString)
// export function trimUndefined(str: string | undefined): string | undefined {
//   return (str || "").trim() || undefined
// }

// DEPRECATED, done in Zod (z_optionalString)
// export function orUndefined(str: string | undefined) {
//   return str || undefined
// }

export let isEmpty = S.isEmpty
export let isNotEmpty = S.isNotEmpty
export let isNotEmptyOrUndefined = <S extends string>(s: S | undefined): s is S => !!s
export let replace = S.replace
export let replaceAll = S.replaceAll
export let replaceByRe = S.replaceByRe
export let slice = S.slice
export let sliceToEnd = S.sliceToEnd
export let split = S.split
export let splitByRe = S.splitByRe
export let trim = S.trim
export let toLowerCase = S.toLowerCase
export let toUpperCase = S.toUpperCase
