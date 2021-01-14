import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.includes";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.splice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.keys";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.string.includes";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState } from 'react';
import { styled } from '@storybook/theming';
import { selectedKeys, selectedValues } from './helpers';
var Wrapper = styled.div(function (_ref) {
  var isInline = _ref.isInline;
  return isInline ? {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    label: {
      display: 'inline-flex',
      marginRight: 15
    }
  } : {
    label: {
      display: 'flex'
    }
  };
});
var Text = styled.span({});
var Label = styled.label({
  lineHeight: '20px',
  alignItems: 'center',
  marginBottom: 8,
  '&:last-child': {
    marginBottom: 0
  },
  input: {
    margin: 0,
    marginRight: 6
  }
});
export var CheckboxControl = function CheckboxControl(_ref2) {
  var name = _ref2.name,
      options = _ref2.options,
      value = _ref2.value,
      onChange = _ref2.onChange,
      isInline = _ref2.isInline;
  var initial = selectedKeys(value, options);

  var _useState = useState(initial),
      _useState2 = _slicedToArray(_useState, 2),
      selected = _useState2[0],
      setSelected = _useState2[1];

  var handleChange = function handleChange(e) {
    var option = e.target.value;

    var updated = _toConsumableArray(selected);

    if (updated !== null && updated !== void 0 && updated.includes(option)) {
      updated.splice(updated.indexOf(option), 1);
    } else {
      updated.push(option);
    }

    onChange(selectedValues(updated, options));
    setSelected(updated);
  };

  return /*#__PURE__*/React.createElement(Wrapper, {
    isInline: isInline
  }, Object.keys(options).map(function (key) {
    var id = "".concat(name, "-").concat(key);
    return /*#__PURE__*/React.createElement(Label, {
      key: id,
      htmlFor: id
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      id: id,
      name: id,
      value: key,
      onChange: handleChange,
      checked: selected === null || selected === void 0 ? void 0 : selected.includes(key)
    }), /*#__PURE__*/React.createElement(Text, null, key));
  }));
};
CheckboxControl.displayName = "CheckboxControl";