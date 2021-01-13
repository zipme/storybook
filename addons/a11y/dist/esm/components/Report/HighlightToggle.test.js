import "core-js/modules/es.array.map";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.freeze";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      highlighted  | elementsToHighlight    | expected\n      ", "        | ", "           | ", "\n      ", " | ", "           | ", "\n      ", " | ", " | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HighlightToggle from './HighlightToggle';
import { A11yContext } from '../A11yContext';

var nodeResult = function nodeResult(target) {
  return {
    html: '',
    target: [target],
    any: [],
    all: [],
    none: []
  };
};

var defaultProviderValue = {
  results: {
    passes: [],
    incomplete: [],
    violations: []
  },
  setResults: jest.fn(),
  highlighted: [],
  toggleHighlight: jest.fn(),
  clearHighlights: jest.fn(),
  tab: 0,
  setTab: jest.fn()
};
describe('<HighlightToggle />', function () {
  it('should render', function () {
    var _render = render( /*#__PURE__*/React.createElement(HighlightToggle, {
      elementsToHighlight: [nodeResult('#root')]
    })),
        container = _render.container;

    expect(container.firstChild).toBeTruthy();
  });
  it('should be checked when all targets are highlighted', function () {
    var _render2 = render( /*#__PURE__*/React.createElement(A11yContext.Provider, {
      value: Object.assign({}, defaultProviderValue, {
        highlighted: ['#root']
      })
    }, /*#__PURE__*/React.createElement(HighlightToggle, {
      elementsToHighlight: [nodeResult('#root')]
    }))),
        getByRole = _render2.getByRole;

    var checkbox = getByRole('checkbox');
    expect(checkbox.checked).toBeTruthy();
  });
  it('should be mixed when some targets are highlighted', function () {
    var _render3 = render( /*#__PURE__*/React.createElement(A11yContext.Provider, {
      value: Object.assign({}, defaultProviderValue, {
        highlighted: ['#root']
      })
    }, /*#__PURE__*/React.createElement(HighlightToggle, {
      elementsToHighlight: [nodeResult('#root'), nodeResult('#root1')]
    }))),
        getByRole = _render3.getByRole;

    var checkbox = getByRole('checkbox');
    expect(checkbox.indeterminate).toBeTruthy();
  });
  describe('toggleHighlight', function () {
    it.each(_templateObject(), [], ['#root'], true, ['#root'], ['#root'], false, ['#root'], ['#root', '#root1'], true)('should be triggered with $expected when highlighted is $highlighted and elementsToHighlight is $elementsToHighlight', function (_ref) {
      var highlighted = _ref.highlighted,
          elementsToHighlight = _ref.elementsToHighlight,
          expected = _ref.expected;

      var _render4 = render( /*#__PURE__*/React.createElement(A11yContext.Provider, {
        value: Object.assign({}, defaultProviderValue, {
          highlighted: highlighted
        })
      }, /*#__PURE__*/React.createElement(HighlightToggle, {
        elementsToHighlight: elementsToHighlight.map(nodeResult)
      }))),
          getByRole = _render4.getByRole;

      var checkbox = getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(defaultProviderValue.toggleHighlight).toHaveBeenCalledWith(elementsToHighlight, expected);
    });
  });
});