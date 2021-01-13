import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.replace";
import qs from 'qs';
export var stringifyQueryParams = function stringifyQueryParams(queryParams) {
  return qs.stringify(queryParams, {
    addQueryPrefix: true,
    encode: true
  }).replace(/^\?/, '&');
};