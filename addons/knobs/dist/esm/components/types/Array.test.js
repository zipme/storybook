import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, themes, convert } from '@storybook/theming';
import ArrayType from './Array';
describe('Array', function () {
  it('should subscribe to setKnobs event of channel', function () {
    var onChange = jest.fn();
    render( /*#__PURE__*/React.createElement(ThemeProvider, {
      theme: convert(themes.light)
    }, /*#__PURE__*/React.createElement(ArrayType, {
      onChange: onChange,
      knob: {
        name: 'passions',
        value: ['Fishing', 'Skiing'],
        separator: ','
      }
    }), ' '));
    var input = screen.getByRole('textbox');
    expect(input).toHaveValue('Fishing,Skiing');
    userEvent.type(input, ',');
    expect(onChange).toHaveBeenLastCalledWith(['Fishing', 'Skiing', '']);
  });
  it('deserializes an Array to an Array', function () {
    var array = ['a', 'b', 'c'];
    var deserialized = ArrayType.deserialize(array);
    expect(deserialized).toEqual(['a', 'b', 'c']);
  });
  it('deserializes an Object to an Array', function () {
    var object = {
      1: 'one',
      0: 'zero',
      2: 'two'
    };
    var deserialized = ArrayType.deserialize(object);
    expect(deserialized).toEqual(['zero', 'one', 'two']);
  });
  it('should change to an empty array when emptied', function () {
    var onChange = jest.fn();
    render( /*#__PURE__*/React.createElement(ThemeProvider, {
      theme: convert(themes.light)
    }, /*#__PURE__*/React.createElement(ArrayType, {
      onChange: onChange,
      knob: {
        name: 'passions',
        value: ['Fishing', 'Skiing'],
        separator: ','
      }
    }), ' '));
    var input = screen.getByRole('textbox');
    expect(input).toHaveValue('Fishing,Skiing');
    userEvent.clear(input);
    expect(onChange).toHaveBeenLastCalledWith([]);
  });
});