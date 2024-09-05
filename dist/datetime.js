// import {UTCDate} from "@date-fns/utc"
// import {parseDate} from "chrono-node"
// export {parseDate}
export let ISO_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
export function isIsoString(str) {
    return ISO_REGEX.test(str);
}
// export function parseUndefined(str: string | undefined): UTCDate | undefined {
//   if (!str) {
//     return undefined
//   }
//   return parseDate(str) || undefined
// }
// Note: does not need to be `UTCDate`, both stringify to the same value
export function getStamp(date = new Date()) {
    return date.toISOString().slice(0, -5) + "Z";
}
