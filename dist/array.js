import { groupBy as A_groupBy, range as A_range, reverse as A_reverse, splitAt as A_splitAt, uniqBy as A_uniqBy } from "@mobily/ts-belt/Array";
export { append, concat, difference, drop, filter, find, flat, flatMap, head, includes, intersection, isEmpty, isNotEmpty, join, last, map, mapWithIndex, partition, prepend, range, rangeBy, reduce, reject, removeAt, removeFirst, repeat, reverse, shuffle, sort, sortBy, splitEvery, take, takeWhile, uniq, uniqBy, zip, zipWith, zipWithIndex } from "@mobily/ts-belt/Array";
export let Tuple = (v) => v;
// Return the most often repeated value(s)
export function modes(xs) {
    let occurences = new Map();
    for (let x of xs) {
        if (occurences.has(x)) {
            occurences.set(x, occurences.get(x) + 1);
        }
        else {
            occurences.set(x, 1);
        }
    }
    if (occurences.size >= 2) {
        let [topXs] = [...occurences.entries()].reduce(([zks, zv], [k, v]) => {
            if (v > zv) {
                return [[k], v];
            }
            if (v == zv) {
                zks.push(k);
            }
            return [zks, zv];
        }, [[], -Infinity]);
        return topXs;
    }
    else if (occurences.size == 1) {
        return [occurences.entries().next().value[0]];
    }
    else {
        return [];
    }
}
// [a1, a2], [b1, b2] => [[a1, b1], [a1, b2], [a2, b1], [a2, b2]]
export function recombine(xs, ys) {
    return xs.flatMap(x => {
        return ys.map(y => {
            return [x, y];
        });
    });
}
export function groupBy(arg1, arg2) {
    if (arguments.length == 2) {
        return A_groupBy(arg1, arg2);
    }
    else if (arguments.length == 1) {
        return flippedGroupBy.bind(null, arg1);
    }
    else {
        return groupBy;
    }
}
function flippedGroupBy(groupFn, xs) {
    return A_groupBy(xs, groupFn);
}
export function splitBy(xs, fn) {
    return Object.values(groupBy(xs, fn));
}
export function reduce1(xs, fn) {
    if (!xs.length) {
        throw new Error("array 'xs' must not be empty");
    }
    let [x, ...xs1] = xs;
    return xs1.reduce(fn, x);
}
export function concatCappedLeft(n, xs1, xs2) {
    return xs1.concat(xs2).slice(-n);
}
export function concatCappedRight(n, xs1, xs2) {
    return xs1.concat(xs2).slice(0, n);
}
export function splitInTwo(xs) {
    let r = A_splitAt(xs, Math.ceil(xs.length / 2));
    return r ? r : undefined;
}
export function uniqByLatest(xs, uniqFn) {
    return A_reverse(A_uniqBy(A_reverse(xs), uniqFn));
}
export function min(xs) {
    if (!xs.length) {
        return undefined;
    }
    let [x, ..._xs] = xs;
    return _xs.reduce((z, x) => {
        return x < z ? x : z;
    }, x);
}
export function max(xs) {
    if (!xs.length) {
        return undefined;
    }
    let [x, ..._xs] = xs;
    return _xs.reduce((z, x) => {
        return x > z ? x : z;
    }, x);
}
export function transpose2d(array2d) {
    /*
    [
      [foo1, foo2],       // first results (e.g. skills)
      [bar1, bar2, bar3], // second results
    ]
    =>
    [
      [foo1, foo2, null],
      [bar1, bar2, bar3],
    ]
    =>
    [
      [foo1, bar1],
      [foo2, bar2],
      [bar3, null],
    ]
    =>
    [
      [foo1, bar1], // first order results
      [foo2, bar2], // second order results
      [bar3],       // third order results
    ]
    */
    let maxN = max(array2d.map(row => row.length)) || 0;
    let matrix = array2d.map(row => row.length == maxN
        ? row
        : [...row, ...A_range(0, maxN - row.length - 1).map(() => undefined)]);
    let matrixTransposed = matrix[0].map((col, i) => matrix.map(row => row[i]));
    return matrixTransposed.map(row => row.filter((item) => item != undefined));
}
export function splitAt(xs, offset) {
    let r = A_splitAt(xs, offset); // original impl. returns `undefined` for out-of-bound indexes
    return r ? [r[0], r[1]] : [xs, []]; // currying is lost, we're waiting for the pipe (|>) operator to make it unnecessary
}
export function dropWhile(xs, predicate) {
    for (let [i, x] of xs.entries()) {
        if (!predicate(x)) {
            return xs.slice(i);
        }
    }
    return [];
}
export function replace(xs, fromX, toX) {
    return xs.map(x => x === fromX ? toX : x);
}
