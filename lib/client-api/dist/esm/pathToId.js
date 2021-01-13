import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.match";
export default function pathToId(path) {
  var match = (path || '').match(/^\/story\/(.+)/);

  if (!match) {
    throw new Error("Invalid path '".concat(path, "',  must start with '/story/'"));
  }

  return match[1];
}