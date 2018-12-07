"use strict";

var _arguments = arguments;

var _html = require("./html");

var _urls = require("./urls");

var _summarizer = require("./summarizer");

var request = require('request');

exports.summarizeFromUrl = function (url, callback) {
	var summaryToolContext = this;
	if ((0, _urls.isValidUrl)(url)) {
		request.get(url, function (error, response, body) {
			var title = (0, _html.getTitle)(body);
			var text = (0, _html.convertHTMLToText)(body);
			var content = (0, _summarizer.onlyGetSentences)(text);
			return summaryToolContext.summarize(title, content, function (err, result, dict) {
				if (err) {
					callback(err, result, dict);
				} else {
					callback(err, result, dict);
				}
			});
		});
	} else {
		callback(true, "Not a valid url. Please try passing a valid url like https://example.com/.");
	}
};

exports.summarize = function (title, content, callback, sentences_dict) {
	var summary = [],
	    paragraphs = [],
	    sentence = '',
	    err = false;
	if (_arguments.length < 3) {
		if (content.constructor === Function) {
			callback = content;
			content = title;
			title = "";
		}
	}
	(0, _summarizer.getSentencesRanks)(content, function (dict) {
		(0, _summarizer.splitContentToParagraphs)(content, function (paragraphs) {
			summary.push(title); // Store the title.

			paragraphs.forEach(function (p) {
				(0, _summarizer.getBestSentence)(p, dict, function (sentence) {
					if (sentence) summary.push(sentence);
				});
			});

			// If we only have a title, then there is an issue.
			if (sentence.length === 2) err = true;
			callback(err, summary.join("\n"), dict);
		});
	}, sentences_dict);
};

exports.getSortedSentences = function (content, n, callback, sentences_dict) {
	if (typeof n === 'function') {
		callback = n;
		n = 0;
	}

	(0, _summarizer.getSentencesRanks)(content, function (dict) {
		(0, _summarizer.getSortedSentences)(content, dict, n, function (sorted_sentences) {
			if (sorted_sentences === '') {
				callback(new Error('Too short to summarize.'));
			} else {
				callback(null, sorted_sentences, dict);
			}
		});
	}, sentences_dict);
};