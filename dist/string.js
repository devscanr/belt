import { A, pipe, S } from "@mobily/ts-belt";
export function trimSlashes(str) {
    return str.replace(/^\//, "").replace(/\/$/, "");
}
export function capitalize(str) {
    // `charAt` returns "" (not undefined) for missing offsets
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function capitalizeEachWord(str) {
    return pipe(str, S.split(" "), A.map(capitalize), A.join(" "));
}
export function isCapitalized(str) {
    return str && (str[0] == str[0].toUpperCase());
}
export function trimAndLower(str) {
    return str.trim().toLowerCase();
}
export function isLowercase(str) {
    return str.toLowerCase() == str;
}
export function isUppercase(str) {
    return str.toUpperCase() == str;
}
// DEPRECATED, done in Zod (z_optionalString)
// export function trimUndefined(str: string | undefined): string | undefined {
//   return (str || "").trim() || undefined
// }
// DEPRECATED, done in Zod (z_optionalString)
// export function orUndefined(str: string | undefined) {
//   return str || undefined
// }
export let isEmpty = S.isEmpty;
export let isNotEmpty = S.isNotEmpty;
export let isNotEmptyOrUndefined = (s) => !!s;
export let replace = S.replace;
export let replaceAll = S.replaceAll;
export let replaceByRe = S.replaceByRe;
export let slice = S.slice;
export let sliceToEnd = S.sliceToEnd;
export let split = S.split;
export let splitByRe = S.splitByRe;
export let trim = S.trim;
export let toLowerCase = S.toLowerCase;
export let toUpperCase = S.toUpperCase;
