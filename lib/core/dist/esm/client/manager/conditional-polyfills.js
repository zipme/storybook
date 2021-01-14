import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";
import { window } from 'global';
export var importPolyfills = function importPolyfills() {
  var polyfills = [];

  if (!window.fetch) {
    // manually patch window.fetch;
    //    see issue: <https://github.com/developit/unfetch/issues/101#issuecomment-454451035>
    var patch = function patch(_ref) {
      var fetch = _ref.default;
      window.fetch = fetch;
    };

    polyfills.push(import('unfetch/dist/unfetch').then(patch));
  }

  return Promise.all(polyfills);
};