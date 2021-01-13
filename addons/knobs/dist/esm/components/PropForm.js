function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "core-js/modules/es.array.map";
import "core-js/modules/es.function.name";
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
import PropTypes from 'prop-types';
import { Form } from '@storybook/components';
import { getKnobControl } from './types';

var InvalidType = function InvalidType() {
  return /*#__PURE__*/React.createElement("span", null, "Invalid Type");
};

var PropForm = /*#__PURE__*/function (_Component) {
  _inherits(PropForm, _Component);

  var _super = _createSuper(PropForm);

  function PropForm() {
    _classCallCheck(this, PropForm);

    return _super.apply(this, arguments);
  }

  _createClass(PropForm, [{
    key: "makeChangeHandler",
    value: function makeChangeHandler(name, type) {
      var onFieldChange = this.props.onFieldChange;
      return function () {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var change = {
          name: name,
          type: type,
          value: value
        };
        onFieldChange(change);
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          knobs = _this$props.knobs,
          onFieldClick = _this$props.onFieldClick;
      return /*#__PURE__*/React.createElement(Form, null, knobs.map(function (knob) {
        var changeHandler = _this.makeChangeHandler(knob.name, knob.type);

        var InputType = getKnobControl(knob.type) || InvalidType;
        return /*#__PURE__*/React.createElement(Form.Field, {
          key: knob.name,
          label: !knob.hideLabel && "".concat(knob.label || knob.name)
        }, /*#__PURE__*/React.createElement(InputType, {
          knob: knob,
          onChange: changeHandler,
          onClick: onFieldClick
        }));
      }));
    }
  }]);

  return PropForm;
}(Component);

PropForm.displayName = 'PropForm';
PropForm.defaultProps = {
  knobs: [],
  onFieldChange: function onFieldChange() {},
  onFieldClick: function onFieldClick() {}
};
PropForm.propTypes = {
  knobs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.any
  })).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFieldClick: PropTypes.func.isRequired
};
export { PropForm as default };