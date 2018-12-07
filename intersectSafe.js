"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Original code from http://stackoverflow.com/a/1885660/394013
 */
var intersectSafe = exports.intersectSafe = function intersectSafe(a, b) {
    var ai = 0,
        bi = 0;
    var result = [];

    while (ai < a.length && bi < b.length) {
        if (a[ai] < b[bi]) {
            ai++;
        } else if (a[ai] > b[bi]) {
            bi++;
        } else /* they're equal */
            {
                result.push(a[ai]);
                ai++;
                bi++;
            }
    }

    return result;
};