import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.find";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React from 'react';
import { useGlobals } from '@storybook/api';
import { Icons, IconButton, WithTooltip, TooltipLinkList, TabButton } from '@storybook/components';
export var MenuToolbar = function MenuToolbar(_ref) {
  var id = _ref.id,
      name = _ref.name,
      description = _ref.description,
      _ref$toolbar = _ref.toolbar,
      icon = _ref$toolbar.icon,
      items = _ref$toolbar.items;

  var _useGlobals = useGlobals(),
      _useGlobals2 = _slicedToArray(_useGlobals, 2),
      globals = _useGlobals2[0],
      updateGlobals = _useGlobals2[1];

  var selectedValue = globals[id];
  var active = selectedValue != null;
  var selectedItem = active && items.find(function (item) {
    return item.value === selectedValue;
  });
  var selectedIcon = selectedItem && selectedItem.icon || icon;
  return /*#__PURE__*/React.createElement(WithTooltip, {
    placement: "top",
    trigger: "click",
    tooltip: function tooltip(_ref2) {
      var onHide = _ref2.onHide;
      var links = items.map(function (item) {
        var value = item.value,
            left = item.left,
            title = item.title,
            right = item.right;
        return {
          id: value,
          left: left,
          title: title,
          right: right,
          active: selectedValue === value,
          onClick: function onClick() {
            updateGlobals(_defineProperty({}, id, value));
            onHide();
          }
        };
      });
      return /*#__PURE__*/React.createElement(TooltipLinkList, {
        links: links
      });
    },
    closeOnClick: true
  }, selectedIcon ? /*#__PURE__*/React.createElement(IconButton, {
    key: name,
    active: active,
    title: description
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: selectedIcon
  })) : /*#__PURE__*/React.createElement(TabButton, {
    active: active
  }, name));
};