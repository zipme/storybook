"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

var _theming = require("@storybook/theming");

var _Array = _interopRequireDefault(require("./Array"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Array', function () {
  it('should subscribe to setKnobs event of channel', function () {
    var onChange = jest.fn();
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
      theme: (0, _theming.convert)(_theming.themes.light)
    }, /*#__PURE__*/_react.default.createElement(_Array.default, {
      onChange: onChange,
      knob: {
        name: 'passions',
        value: ['Fishing', 'Skiing'],
        separator: ','
      }
    }), ' '));

    var input = _react2.screen.getByRole('textbox');

    expect(input).toHaveValue('Fishing,Skiing');

    _userEvent.default.type(input, ',');

    expect(onChange).toHaveBeenLastCalledWith(['Fishing', 'Skiing', '']);
  });
  it('deserializes an Array to an Array', function () {
    var array = ['a', 'b', 'c'];

    var deserialized = _Array.default.deserialize(array);

    expect(deserialized).toEqual(['a', 'b', 'c']);
  });
  it('deserializes an Object to an Array', function () {
    var object = {
      1: 'one',
      0: 'zero',
      2: 'two'
    };

    var deserialized = _Array.default.deserialize(object);

    expect(deserialized).toEqual(['zero', 'one', 'two']);
  });
  it('should change to an empty array when emptied', function () {
    var onChange = jest.fn();
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
      theme: (0, _theming.convert)(_theming.themes.light)
    }, /*#__PURE__*/_react.default.createElement(_Array.default, {
      onChange: onChange,
      knob: {
        name: 'passions',
        value: ['Fishing', 'Skiing'],
        separator: ','
      }
    }), ' '));

    var input = _react2.screen.getByRole('textbox');

    expect(input).toHaveValue('Fishing,Skiing');

    _userEvent.default.clear(input);

    expect(onChange).toHaveBeenLastCalledWith([]);
  });
});