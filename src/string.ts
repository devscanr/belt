export {
  isEmpty,
  isNotEmpty,
  replace,
  replaceAll,
  replaceByRe,
  slice,
  sliceToEnd,
  split,
  splitByRe,
  trim,
  toLowerCase,
  toUpperCase
} from "@mobily/ts-belt/String"

export function trimSlashes(str: string): string {
  return str.replace(/^\//, "").replace(/\/$/, "")
}

export function capitalize(str: string): string {
  // `charAt` returns "" (not undefined) for missing offsets
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function capitalizeEachWord(str: string): string {
  return str
    .split(" ")
    .map(capitalize)
    .join(" ")
}

export function isCapitalized(str: string): boolean {
  return str ? (str[0] == str[0].toUpperCase()) : false
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

export let isNotEmptyOrUndefined = <S extends string>(s: S | undefined): s is S => !!s
