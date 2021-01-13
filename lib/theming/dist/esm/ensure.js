import "core-js/modules/es.array.slice";
import "core-js/modules/es.object.freeze";
import "core-js/modules/es.object.keys";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n          Your theme is missing properties, you should update your theme!\n\n          theme-data missing:\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { logger } from '@storybook/client-logger';
import { deletedDiff } from 'deep-object-diff';
import dedent from 'ts-dedent';
import light from './themes/light';
import { convert } from './convert';
export var ensure = function ensure(input) {
  if (!input) {
    return convert(light);
  }

  var missing = deletedDiff(light, input);

  if (Object.keys(missing).length) {
    logger.warn(dedent(_templateObject()), missing);
  }

  return convert(input);
};