import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.map";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.keys";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { useGlobalTypes } from '@storybook/api';
import { Separator } from '@storybook/components';
import { MenuToolbar } from './MenuToolbar';

var normalize = function normalize(key, argType) {
  return Object.assign({}, argType, {
    name: argType.name || key,
    description: argType.description || key,
    toolbar: Object.assign({}, argType.toolbar, {
      items: argType.toolbar.items.map(function (item) {
        return typeof item === 'string' ? {
          value: item,
          title: item
        } : item;
      })
    })
  });
};
/**
 * A smart component for handling manager-preview interactions.
 */


export var ToolbarManager = function ToolbarManager() {
  var globalTypes = useGlobalTypes();
  var keys = Object.keys(globalTypes).filter(function (key) {
    return !!globalTypes[key].toolbar;
  });
  if (!keys.length) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Separator, null), keys.map(function (key) {
    var normalizedConfig = normalize(key, globalTypes[key]);
    return /*#__PURE__*/React.createElement(MenuToolbar, _extends({
      key: key,
      id: key
    }, normalizedConfig));
  }));
};