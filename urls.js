"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var isValidUrl = exports.isValidUrl = function isValidUrl(url) {
    var pattern = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
    var regexQuery = new RegExp(pattern, 'i');
    return regexQuery.test(url) ? true : false;
};