"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processHashtags = void 0;
var processHashtags = function processHashtags(caption) {
  var hashtags = caption.match(/#[\w]+/g) || [];
  // map returns array
  return hashtags.map(function (hashtag) {
    return {
      where: {
        hashtag: hashtag
      },
      create: {
        hashtag: hashtag
      }
    };
  });
};
exports.processHashtags = processHashtags;