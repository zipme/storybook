import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { Fragment, useState } from 'react';
import { styled, themes, convert } from '@storybook/theming';
import { Icons } from '@storybook/components';
import Message from './Message';
var Wrapper = styled.div(function (_ref) {
  var theme = _ref.theme,
      status = _ref.status;
  return {
    display: 'flex',
    width: '100%',
    borderTop: "1px solid ".concat(theme.appBorderColor),
    '&:hover': {
      background: status === "failed" ? theme.background.hoverable : null
    }
  };
});
var HeaderBar = styled.div(function (_ref2) {
  var theme = _ref2.theme,
      status = _ref2.status;
  return {
    padding: theme.layoutMargin,
    paddingLeft: theme.layoutMargin - 3,
    background: 'none',
    color: 'inherit',
    textAlign: 'left',
    cursor: status === "failed" ? 'pointer' : null,
    borderLeft: '3px solid transparent',
    width: '100%',
    display: 'flex',
    '&:focus': {
      outline: '0 none',
      borderLeft: "3px solid ".concat(theme.color.secondary)
    }
  };
});
var Icon = styled(Icons)(function (_ref3) {
  var theme = _ref3.theme;
  return {
    height: 10,
    width: 10,
    minWidth: 10,
    color: theme.color.mediumdark,
    marginRight: 10,
    transition: 'transform 0.1s ease-in-out',
    alignSelf: 'center',
    display: 'inline-flex'
  };
});

var capitalizeFirstLetter = function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase().concat(text.slice(1));
};

export function Result(props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var onToggle = function onToggle() {
    setIsOpen(!isOpen);
  };

  var fullName = props.fullName,
      title = props.title,
      failureMessages = props.failureMessages,
      status = props.status;
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Wrapper, {
    status: status
  }, /*#__PURE__*/React.createElement(HeaderBar, {
    onClick: onToggle,
    role: "button",
    status: status
  }, status === "failed" ? /*#__PURE__*/React.createElement(Icon, {
    icon: "chevrondown",
    size: 10,
    color: convert(themes.normal).color.mediumdark,
    style: {
      transform: "rotate(".concat(isOpen ? 0 : -90, "deg)")
    }
  }) : null, /*#__PURE__*/React.createElement("div", null, capitalizeFirstLetter(fullName) || capitalizeFirstLetter(title)))), isOpen ? /*#__PURE__*/React.createElement(Fragment, null, failureMessages.map(function (msg, i) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement(Message, {
        msg: msg,
        key: i
      })
    );
  })) : null);
}
export default Result;