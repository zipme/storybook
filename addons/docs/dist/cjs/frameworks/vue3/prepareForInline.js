"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareForInline = void 0;

var _react = _interopRequireDefault(require("react"));

var _vue = require("vue");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Inspired by https://github.com/egoist/vue-to-react,
// modified to store args as props in the root store
var prepareForInline = function prepareForInline(storyFn, _ref) {
  var args = _ref.args;
  var component = storyFn();

  var el = _react.default.useRef(null);

  var propsContainer = (0, _vue.reactive)({
    props: args || {}
  });
  var root = (0, _vue.createApp)({
    components: {
      story: component
    },
    render: function render() {
      return (0, _vue.h)('div', {
        id: 'root'
      }, [(0, _vue.h)(component, propsContainer.props)]);
    }
  });

  _react.default.useEffect(function () {
    propsContainer.props = args;
    root.mount(el.current);
    return function () {
      return root.unmount(el.current);
    };
  });

  return /*#__PURE__*/_react.default.createElement('div', null, /*#__PURE__*/_react.default.createElement('div', {
    ref: el
  }));
};

exports.prepareForInline = prepareForInline;