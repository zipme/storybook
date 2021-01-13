"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.search");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.url");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withQuery = void 0;

var _global = require("global");

var _qs = _interopRequireDefault(require("qs"));

var _addons = require("@storybook/addons");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withQuery = (0, _addons.makeDecorator)({
  name: 'withQuery',
  parameterName: _constants.PARAM_KEY,
  skipIfNoParametersOrOptions: true,
  wrapper: function wrapper(getStory, context, _ref) {
    var parameters = _ref.parameters;
    var location = _global.document.location;

    var currentQuery = _qs.default.parse(location.search, {
      ignoreQueryPrefix: true
    });

    var additionalQuery = typeof parameters === 'string' ? _qs.default.parse(parameters, {
      ignoreQueryPrefix: true
    }) : parameters;
    var newLocation = new URL(_global.document.location.href);
    newLocation.search = _qs.default.stringify(Object.assign({}, currentQuery, additionalQuery));

    _global.history.replaceState({}, _global.document.title, newLocation.toString());

    return getStory(context);
  }
});
exports.withQuery = withQuery;

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}