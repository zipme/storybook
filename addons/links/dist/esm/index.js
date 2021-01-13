import "core-js/modules/es.array.slice";
import "core-js/modules/es.object.freeze";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      LinkTo has moved to addon-links/react:\n      import LinkTo from '@storybook/addon-links/react';\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import dedent from 'ts-dedent';
var hasWarned = false;
export function LinkTo() {
  if (!hasWarned) {
    // eslint-disable-next-line no-console
    console.error(dedent(_templateObject()));
    hasWarned = true;
  }

  return null;
}
export { linkTo, hrefTo, withLinks, navigate } from './preview';

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}