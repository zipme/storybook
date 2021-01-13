"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.search");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withLinks = exports.hrefTo = exports.linkTo = exports.navigate = void 0;

var _global = require("global");

var _qs = _interopRequireDefault(require("qs"));

var _addons = _interopRequireWildcard(require("@storybook/addons"));

var _coreEvents = require("@storybook/core-events");

var _csf = require("@storybook/csf");

var _clientLogger = require("@storybook/client-logger");

var _constants = require("./constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var navigate = function navigate(params) {
  return _addons.default.getChannel().emit(_coreEvents.SELECT_STORY, params);
};

exports.navigate = navigate;

var generateUrl = function generateUrl(id) {
  var location = _global.document.location;

  var query = _qs.default.parse(location.search, {
    ignoreQueryPrefix: true
  });

  return "".concat(location.origin + location.pathname, "?").concat(_qs.default.stringify(Object.assign({}, query, {
    id: id
  }), {
    encode: false
  }));
};

var valueOrCall = function valueOrCall(args) {
  return function (value) {
    return typeof value === 'function' ? value.apply(void 0, _toConsumableArray(args)) : value;
  };
};

var linkTo = function linkTo(idOrKindInput, storyInput) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var resolver = valueOrCall(args);

    var _storyStore$getSelect = _global.__STORYBOOK_STORY_STORE__.getSelection(),
        storyId = _storyStore$getSelect.storyId;

    var current = _global.__STORYBOOK_STORY_STORE__.fromId(storyId) || {};
    var kindVal = resolver(idOrKindInput);
    var storyVal = resolver(storyInput);

    var fromid = _global.__STORYBOOK_STORY_STORE__.fromId(kindVal);

    var item = fromid || _global.__STORYBOOK_CLIENT_API__.raw().find(function (i) {
      if (kindVal && storyVal) {
        return i.kind === kindVal && i.story === storyVal;
      }

      if (!kindVal && storyVal) {
        return i.kind === current.kind && i.story === storyVal;
      }

      if (kindVal && !storyVal) {
        return i.kind === kindVal;
      }

      if (!kindVal && !storyVal) {
        return i.kind === current.kind;
      }

      return false;
    });

    if (item) {
      navigate({
        kind: item.kind,
        story: item.story
      });
    } else {
      _clientLogger.logger.error('could not navigate to provided story');
    }
  };
};

exports.linkTo = linkTo;

var hrefTo = function hrefTo(kind, name) {
  return new Promise(function (resolve) {
    var _storyStore$getSelect2 = _global.__STORYBOOK_STORY_STORE__.getSelection(),
        storyId = _storyStore$getSelect2.storyId;

    var current = _global.__STORYBOOK_STORY_STORE__.fromId(storyId);

    resolve(generateUrl((0, _csf.toId)(kind || current.kind, name)));
  });
};

exports.hrefTo = hrefTo;

var linksListener = function linksListener(e) {
  var target = e.target;

  if (!(target instanceof _global.HTMLElement)) {
    return;
  }

  var element = target;
  var _element$dataset = element.dataset,
      kind = _element$dataset.sbKind,
      story = _element$dataset.sbStory;

  if (kind || story) {
    e.preventDefault();
    navigate({
      kind: kind,
      story: story
    });
  }
};

var hasListener = false;

var on = function on() {
  if (!hasListener) {
    hasListener = true;

    _global.document.addEventListener('click', linksListener);
  }
};

var off = function off() {
  if (hasListener) {
    hasListener = false;

    _global.document.removeEventListener('click', linksListener);
  }
};

var withLinks = (0, _addons.makeDecorator)({
  name: 'withLinks',
  parameterName: _constants.PARAM_KEY,
  wrapper: function wrapper(getStory, context, _ref) {
    var parameters = _ref.parameters;
    on();

    _addons.default.getChannel().once(_coreEvents.STORY_CHANGED, off);

    return getStory(context);
  }
});
exports.withLinks = withLinks;