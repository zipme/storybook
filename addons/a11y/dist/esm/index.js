import "core-js/modules/es.array.slice";
import "core-js/modules/es.object.freeze";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    withA11y(options) is deprecated, please configure addon-a11y using the addParameter api:\n\n    addParameters({\n      a11y: options,\n    });\n\n    More at: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#removed-witha11y-decorator\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import deprecate from 'util-deprecate';
import dedent from 'ts-dedent';
export { PARAM_KEY } from './constants';
export * from './highlight';

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}

export var withA11y = deprecate(function (storyFn, storyContext) {
  return storyFn(storyContext);
}, dedent(_templateObject()));