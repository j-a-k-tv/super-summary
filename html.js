'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var cheerio = require('cheerio');
var htmlToText = require('html-to-text');

var convertHTMLToText = exports.convertHTMLToText = function convertHTMLToText(body) {
    return htmlToText.fromString(body.toString(), {
        ignoreHref: true,
        ignoreImage: true
    });
};

var getTitle = exports.getTitle = function getTitle(htmlBody) {
    var $ = cheerio.load(htmlBody);
    return $('title').text() || $('h1').text() || "";
};