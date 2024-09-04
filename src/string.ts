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

export const isEmpty = S.isEmpty
export const isNotEmpty = S.isNotEmpty
export const isNotEmptyOrUndefined = <S extends string>(s: S | undefined): s is S => !!s
export const replace = S.replace
export const replaceAll = S.replaceAll
export const replaceByRe = S.replaceByRe
export const slice = S.slice
export const sliceToEnd = S.sliceToEnd
export const split = S.split
export const splitByRe = S.splitByRe
export const trim = S.trim
export const toLowerCase = S.toLowerCase
export const toUpperCase = S.toUpperCase
