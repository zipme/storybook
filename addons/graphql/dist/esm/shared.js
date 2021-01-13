import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.split";
import "core-js/modules/es.string.trim";
import { fetch } from 'global';
var FETCH_OPTIONS = {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  }
};
export var getDefaultFetcher = function getDefaultFetcher(url) {
  return function (params) {
    var body = JSON.stringify(params);
    var options = Object.assign({
      body: body
    }, FETCH_OPTIONS);
    return fetch(url, options).then(function (res) {
      return res.json();
    });
  };
};
export var reIndentQuery = function reIndentQuery(query) {
  var lines = query.trim().split('\n');
  var spaces = lines[lines.length - 1].length - 1;
  return lines.map(function (l, i) {
    return i === 0 ? l : l.slice(spaces);
  }).join('\n');
};