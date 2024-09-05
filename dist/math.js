export function clamp(min, max) {
    return function (n) {
        return Math.min(Math.max(n, min), max);
    };
}
// for FE where we cannot use faker
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
