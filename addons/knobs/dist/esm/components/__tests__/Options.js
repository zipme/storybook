import "core-js/modules/es.array.find";
import React from 'react';
import { mount } from 'enzyme';
import ReactSelect from 'react-select';
import OptionsType from '../types/Options';
var mockOn = jest.fn();
describe('Options', function () {
  var knob;
  var wrapper;
  var firstLabel;
  var firstInput;
  var lastInput;
  describe('renders checkbox input', function () {
    beforeEach(function () {
      knob = {
        name: 'Color',
        defaultValue: ['#0ff'],
        options: {
          Red: '#f00',
          Green: '#090',
          Blue: '#0ff'
        },
        optionsObj: {
          display: 'check'
        }
      };
      wrapper = mount( /*#__PURE__*/React.createElement(OptionsType, {
        knob: knob,
        onChange: mockOn
      }));
      firstLabel = wrapper.find('label').first();
      firstInput = wrapper.find('input').first();
      lastInput = wrapper.find('input').last();
    });
    it('correctly renders label', function () {
      expect(firstLabel.text()).toEqual('Red');
    });
    it('correctly sets checkbox value', function () {
      expect(firstInput.prop('value')).toEqual('#f00');
    });
    it('marks the correct default checkbox as checked', function () {
      expect(firstInput.prop('checked')).toEqual(false);
      expect(lastInput.prop('checked')).toEqual(true);
    });
    it('updates on change event', function () {
      expect(wrapper.props().knob.defaultValue).toEqual(['#0ff']);
      firstInput.simulate('change');
      expect(mockOn).toHaveBeenCalled();
      expect(wrapper.props().knob.defaultValue).toEqual(['#0ff', '#f00']);
    });
  });
  describe('renders radio input', function () {
    beforeEach(function () {
      knob = {
        name: 'Color',
        value: '#0ff',
        options: {
          Red: '#f00',
          Green: '#090',
          Blue: '#0ff'
        },
        optionsObj: {
          display: 'radio'
        }
      };
      wrapper = mount( /*#__PURE__*/React.createElement(OptionsType, {
        knob: knob,
        onChange: mockOn
      }));
      firstLabel = wrapper.find('label').first();
      firstInput = wrapper.find('input').first();
      lastInput = wrapper.find('input').last();
    });
    it('correctly renders label', function () {
      expect(firstLabel.text()).toEqual('Red');
    });
    it('correctly sets radio input value', function () {
      expect(firstInput.prop('value')).toEqual('#f00');
    });
    it('marks the correct default radio input as checked', function () {
      expect(firstInput.prop('checked')).toEqual(false);
      expect(lastInput.prop('checked')).toEqual(true);
    });
    it('updates on change event', function () {
      firstInput.simulate('change');
      expect(mockOn).toHaveBeenCalled();
    });
  });
  describe('renders select input', function () {
    var selectInput;
    beforeEach(function () {
      knob = {
        name: 'Color',
        value: '#0ff',
        options: {
          Red: '#f00',
          Green: '#090',
          Blue: '#0ff'
        },
        optionsObj: {
          display: 'select'
        }
      };
      wrapper = mount( /*#__PURE__*/React.createElement(OptionsType, {
        knob: knob,
        onChange: mockOn
      }));
      selectInput = wrapper.find(ReactSelect).find('input');
    });
    it('updates when dropdown is opened and first option selected', function () {
      // Simulate the arrow down event to open the dropdown menu.
      selectInput.simulate('keyDown', {
        key: 'ArrowDown',
        keyCode: 40
      }); // Simulate the enter key to select the first option.

      selectInput.simulate('keyDown', {
        key: 'Enter',
        keyCode: 13
      }); // selectInput.simulate('change');

      expect(mockOn).toHaveBeenCalled();
    });
  });
});