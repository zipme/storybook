import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.search";
import { document } from 'global';
import qs from 'qs';
export var getQueryParams = function getQueryParams() {
  // document.location is not defined in react-native
  if (document && document.location && document.location.search) {
    return qs.parse(document.location.search, {
      ignoreQueryPrefix: true
    });
  }

  return {};
};
export var getQueryParam = function getQueryParam(key) {
  var params = getQueryParams();
  return params[key];
};