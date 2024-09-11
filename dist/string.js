export { isEmpty, isNotEmpty, replace, replaceAll, replaceByRe, slice, sliceToEnd, split, splitByRe, trim, toLowerCase, toUpperCase } from "@mobily/ts-belt/String";
export function trimSlashes(str) {
    return str.replace(/^\//, "").replace(/\/$/, "");
}
export function capitalize(str) {
    // `charAt` returns "" (not undefined) for missing offsets
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function capitalizeEachWord(str) {
    return str
        .split(" ")
        .map(capitalize)
        .join(" ");
}
export function isCapitalized(str) {
    return str ? (str[0] == str[0].toUpperCase()) : false;
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
export let isNotEmptyOrUndefined = (s) => !!s;
