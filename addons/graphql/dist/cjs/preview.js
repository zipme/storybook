"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupGraphiQL = void 0;

var React = _interopRequireWildcard(require("react"));

var _graphiql = _interopRequireDefault(require("graphiql"));

require("graphiql/graphiql.css");

var _FullScreen = require("./components/FullScreen");

var _shared = require("./shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var setupGraphiQL = function setupGraphiQL(config) {
  return function (_query) {
    var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '{}';
    var query = (0, _shared.reIndentQuery)(_query);
    var fetcher = config.fetcher || (0, _shared.getDefaultFetcher)(config.url);
    return function () {
      return /*#__PURE__*/React.createElement(_FullScreen.FullScreen, null, /*#__PURE__*/React.createElement(_graphiql.default, {
        query: query,
        variables: variables,
        fetcher: fetcher
      }));
    };
  };
};

exports.setupGraphiQL = setupGraphiQL;