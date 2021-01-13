import "core-js/modules/es.array.slice";
import "core-js/modules/es.object.freeze";

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

import deprecate from 'util-deprecate';
import dedent from 'ts-dedent';
export var decorateAction = function decorateAction(_decorators) {
  return deprecate(function () {}, dedent(_templateObject()));
};
var deprecatedCallback = deprecate(function () {}, 'decorate.* is no longer supported as of Storybook 6.0.');
export var decorate = function decorate(_decorators) {
  return deprecate(function () {
    return {
      action: deprecatedCallback,
      actions: deprecatedCallback,
      withActions: deprecatedCallback
    };
  }, dedent(_templateObject2()));
};