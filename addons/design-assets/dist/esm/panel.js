import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.match";
import "core-js/modules/es.string.replace";
import "core-js/modules/web.dom-collections.iterator";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { Fragment, useMemo } from 'react';
import { useParameter, useAddonState, useStorybookState } from '@storybook/api';
import { styled } from '@storybook/theming';
import { ActionBar } from '@storybook/components';
import { PARAM_KEY, ADDON_ID } from './constants';
var Iframe = styled.iframe({
  width: '100%',
  height: '100%',
  border: '0 none'
});
var Img = styled.img({
  width: '100%',
  height: '100%',
  border: '0 none',
  objectFit: 'contain'
});

var Asset = function Asset(_ref) {
  var url = _ref.url;

  if (!url) {
    return null;
  }

  if (url.match(/\.(png|apng|gif|jpeg|tiff|svg|webp)/)) {
    // do image viewer
    return /*#__PURE__*/React.createElement(Img, {
      alt: "",
      src: url
    });
  }

  if (url.match(/\.(mp4|ogv|webm)/)) {
    // do video viewer
    return /*#__PURE__*/React.createElement("div", null, "not implemented yet, sorry");
  }

  return /*#__PURE__*/React.createElement(Iframe, {
    title: url,
    src: url
  });
};

var getUrl = function getUrl(input) {
  return typeof input === 'string' ? input : input.url;
};

export var Panel = function Panel() {
  var results = useParameter(PARAM_KEY, []);

  var _useAddonState = useAddonState(ADDON_ID, 0),
      _useAddonState2 = _slicedToArray(_useAddonState, 2),
      selected = _useAddonState2[0],
      setSelected = _useAddonState2[1];

  var _useStorybookState = useStorybookState(),
      storyId = _useStorybookState.storyId;

  return useMemo(function () {
    if (results.length === 0) {
      return null;
    }

    if (results.length && !results[selected]) {
      setSelected(0);
      return null;
    }

    var url = getUrl(results[selected]).replace('{id}', storyId);
    return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Asset, {
      url: url
    }), results.length > 1 ? /*#__PURE__*/React.createElement(ActionBar, {
      key: "actionbar",
      actionItems: results.map(function (i, index) {
        return {
          title: typeof i === 'string' ? "asset #".concat(index + 1) : i.name,
          onClick: function onClick() {
            return setSelected(index);
          }
        };
      })
    }) : null);
  }, [results, selected, storyId]);
};