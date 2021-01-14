"use strict";

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.freeze");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorate = exports.decorateAction = void 0;

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    decorate is deprecated, please configure addon-actions using the addParameter api:\n      \n      addParameters({\n        actions: {\n          handles: options\n        },\n      });\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    decorateAction is no longer supported as of Storybook 6.0.\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var decorateAction = function decorateAction(_decorators) {
  return (0, _utilDeprecate.default)(function () {}, (0, _tsDedent.default)(_templateObject()));
};

exports.decorateAction = decorateAction;
var deprecatedCallback = (0, _utilDeprecate.default)(function () {}, 'decorate.* is no longer supported as of Storybook 6.0.');

var decorate = function decorate(_decorators) {
  return (0, _utilDeprecate.default)(function () {
    return {
      action: deprecatedCallback,
      actions: deprecatedCallback,
      withActions: deprecatedCallback
    };
  }, (0, _tsDedent.default)(_templateObject2()));
};

exports.decorate = decorate;