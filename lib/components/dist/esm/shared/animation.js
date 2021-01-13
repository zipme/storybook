import "core-js/modules/es.array.slice";
import "core-js/modules/es.object.freeze";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\tfrom {\n\t\ttransform: rotate(0deg);\n\t}\n\tto {\n\t\ttransform: rotate(360deg);\n\t}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { keyframes } from '@storybook/theming';
export var rotate360 = keyframes(_templateObject());