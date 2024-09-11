export { isEmpty, isNotEmpty, replace, replaceAll, replaceByRe, slice, sliceToEnd, split, splitByRe, trim, toLowerCase, toUpperCase } from "@mobily/ts-belt/String";
export declare function trimSlashes(str: string): string;
export declare function capitalize(str: string): string;
export declare function capitalizeEachWord(str: string): string;
export declare function isCapitalized(str: string): boolean;
export declare function trimAndLower(str: string): string;
export declare function isLowercase(str: string): boolean;
export declare function isUppercase(str: string): boolean;
export declare let isNotEmptyOrUndefined: <S extends string>(s: S | undefined) => s is S;
