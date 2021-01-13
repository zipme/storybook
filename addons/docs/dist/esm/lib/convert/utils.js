import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.replace";
var QUOTE_REGEX = /^['"]|['"]$/g;
export var trimQuotes = function trimQuotes(str) {
  return str.replace(QUOTE_REGEX, '');
};