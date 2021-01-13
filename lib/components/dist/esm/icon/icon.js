import "core-js/modules/es.symbol";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.object.keys";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled } from '@storybook/theming';
import icons from './icons';
import Svg from './svg';
var Path = styled.path({
  fill: 'currentColor'
});
// TODO: if we can resize the 1024 to 20, we can remove the size attributes
export var Icons = function Icons(_ref) {
  var icon = _ref.icon,
      props = _objectWithoutProperties(_ref, ["icon"]);

  return /*#__PURE__*/React.createElement(Svg, _extends({
    viewBox: "0 0 1024 1024"
  }, props), /*#__PURE__*/React.createElement(Path, {
    d: icons[icon]
  }));
};
Icons.displayName = "Icons";