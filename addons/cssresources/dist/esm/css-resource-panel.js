function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.reduce";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import React, { Component } from 'react';
import { SyntaxHighlighter, Placeholder, Spaced, Icons } from '@storybook/components';
import { STORY_RENDERED } from '@storybook/core-events';
import { styled } from '@storybook/theming';
import { EVENTS, PARAM_KEY } from './constants';
var maxLimitToUseSyntaxHighlighter = 100000;
var PlainCode = styled.pre({
  textAlign: 'left',
  fontWeight: 'normal'
});
var Warning = styled.div({
  display: 'flex',
  padding: '10px',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#fff3cd',
  fontSize: 12,
  '& svg': {
    marginRight: 10,
    width: 24,
    height: 24
  }
});
export var CssResourcePanel = /*#__PURE__*/function (_Component) {
  _inherits(CssResourcePanel, _Component);

  var _super = _createSuper(CssResourcePanel);

  function CssResourcePanel(props) {
    var _this;

    _classCallCheck(this, CssResourcePanel);

    _this = _super.call(this, props);

    _this.onStoryChange = function (id) {
      var _this$state = _this.state,
          currentList = _this$state.list,
          currentStoryId = _this$state.currentStoryId;
      var api = _this.props.api;
      var list = api.getCurrentParameter(PARAM_KEY);

      if (list && currentStoryId !== id) {
        var existingIds = currentList.reduce(function (lookup, res) {
          // eslint-disable-next-line no-param-reassign
          lookup[res.id] = res;
          return lookup;
        }, {});
        var mergedList = list.map(function (res) {
          var existingItem = existingIds[res.id];
          return existingItem ? Object.assign({}, res, {
            picked: existingItem.picked
          }) : res;
        });
        var picked = mergedList.filter(function (res) {
          return res.picked;
        });

        _this.setState({
          list: mergedList,
          currentStoryId: id
        }, function () {
          return _this.emit(picked);
        });
      }
    };

    _this.onChange = function (event) {
      var oldList = _this.state.list;
      var list = oldList.map(function (i) {
        return Object.assign({}, i, {
          picked: i.id === event.target.id ? event.target.checked : i.picked
        });
      });

      _this.setState({
        list: list
      }, function () {
        return _this.emit(list.filter(function (res) {
          return res.picked;
        }));
      });
    };

    _this.state = {
      currentStoryId: '',
      list: []
    };
    return _this;
  }

  _createClass(CssResourcePanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var api = this.props.api;
      api.on(STORY_RENDERED, this.onStoryChange);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var api = this.props.api;
      api.off(STORY_RENDERED, this.onStoryChange);
    }
  }, {
    key: "emit",
    value: function emit(list) {
      var api = this.props.api;
      api.emit(EVENTS.SET, list);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var list = this.state.list;
      var active = this.props.active;

      if (!active) {
        return null;
      }

      return /*#__PURE__*/React.createElement("div", null, list && list.map(function (_ref) {
        var id = _ref.id,
            code = _ref.code,
            picked = _ref.picked,
            _ref$hideCode = _ref.hideCode,
            hideCode = _ref$hideCode === void 0 ? false : _ref$hideCode;
        return /*#__PURE__*/React.createElement("div", {
          key: id,
          style: {
            padding: 10
          }
        }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
          type: "checkbox",
          checked: picked,
          onChange: _this2.onChange,
          id: id
        }), /*#__PURE__*/React.createElement("span", null, "#", id)), code && !hideCode && code.length < maxLimitToUseSyntaxHighlighter && /*#__PURE__*/React.createElement(SyntaxHighlighter, {
          language: "html"
        }, code), code && !hideCode && code.length >= maxLimitToUseSyntaxHighlighter && /*#__PURE__*/React.createElement(Placeholder, null, /*#__PURE__*/React.createElement(Spaced, {
          row: 1
        }, /*#__PURE__*/React.createElement(PlainCode, null, code.substring(0, maxLimitToUseSyntaxHighlighter), " ..."), /*#__PURE__*/React.createElement(Warning, null, /*#__PURE__*/React.createElement(Icons, {
          icon: "alert"
        }), "Rest of the content cannot be displayed"))));
      }));
    }
  }]);

  return CssResourcePanel;
}(Component);