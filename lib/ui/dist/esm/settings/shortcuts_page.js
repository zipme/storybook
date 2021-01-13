import "core-js/modules/es.object.assign";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Consumer } from '@storybook/api';
import { ShortcutsScreen } from './shortcuts';

var ShortcutsPage = function ShortcutsPage() {
  return /*#__PURE__*/React.createElement(Consumer, null, function (_ref) {
    var _ref$api = _ref.api,
        getShortcutKeys = _ref$api.getShortcutKeys,
        setShortcut = _ref$api.setShortcut,
        restoreDefaultShortcut = _ref$api.restoreDefaultShortcut,
        restoreAllDefaultShortcuts = _ref$api.restoreAllDefaultShortcuts;
    return /*#__PURE__*/React.createElement(ShortcutsScreen, _extends({
      shortcutKeys: getShortcutKeys()
    }, {
      setShortcut: setShortcut,
      restoreDefaultShortcut: restoreDefaultShortcut,
      restoreAllDefaultShortcuts: restoreAllDefaultShortcuts
    }));
  });
};

ShortcutsPage.displayName = "ShortcutsPage";
export { ShortcutsPage };