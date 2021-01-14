"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.object.values");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.starts-with");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleStoryComponents = exports.Full = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Tree = require("./Tree");

var _mockdata = require("./mockdata.large");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = {
  component: _Tree.Tree,
  title: 'UI/Sidebar/Tree',
  excludeStories: /.*Data$/,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [function (storyFn) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        maxWidth: '230px'
      }
    }, storyFn());
  }]
};
exports.default = _default;
var refId = _data.DEFAULT_REF_ID;
var storyId = Object.values(_mockdata.stories).find(function (story) {
  return story.isLeaf && !story.isComponent;
}).id;

var log = function log(id) {
  return console.log(id);
};

var Full = function Full() {
  var _React$useState = _react.default.useState(storyId),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      selectedId = _React$useState2[0],
      setSelectedId = _React$useState2[1];

  return /*#__PURE__*/_react.default.createElement(_Tree.Tree, {
    isBrowsing: true,
    isMain: true,
    refId: refId,
    data: _mockdata.stories,
    highlightedRef: {
      current: {
        itemId: selectedId,
        refId: refId
      }
    },
    setHighlightedItemId: log,
    selectedStoryId: selectedId,
    onSelectStoryId: setSelectedId
  });
};

exports.Full = Full;
Full.displayName = "Full";
var singleStoryComponent = {
  single: {
    name: 'Single',
    id: 'single',
    parent: false,
    depth: 0,
    children: ['single--single'],
    isComponent: true,
    isLeaf: false,
    isRoot: false
  },
  'single--single': {
    id: 'single--single',
    kind: 'Single',
    name: 'Single',
    story: 'Single',
    args: {},
    argTypes: {},
    initialArgs: {},
    depth: 1,
    parent: 'single',
    isLeaf: true,
    isComponent: false,
    isRoot: false
  }
};
var tooltipStories = Object.keys(_mockdata.stories).reduce(function (acc, key) {
  if (key === 'tooltip-tooltipselect--default') {
    acc['tooltip-tooltipselect--tooltipselect'] = Object.assign({}, _mockdata.stories[key], {
      id: 'tooltip-tooltipselect--tooltipselect',
      name: 'TooltipSelect'
    });
    return acc;
  }

  if (key === 'tooltip-tooltipselect') {
    acc[key] = Object.assign({}, _mockdata.stories[key], {
      children: ['tooltip-tooltipselect--tooltipselect']
    });
    return acc;
  }

  if (key.startsWith('tooltip')) acc[key] = _mockdata.stories[key];
  return acc;
}, {});

var SingleStoryComponents = function SingleStoryComponents() {
  var _React$useState3 = _react.default.useState('tooltip-tooltipbuildlist--default'),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      selectedId = _React$useState4[0],
      setSelectedId = _React$useState4[1];

  return /*#__PURE__*/_react.default.createElement(_Tree.Tree, {
    isBrowsing: true,
    isMain: true,
    refId: refId,
    data: Object.assign({}, singleStoryComponent, tooltipStories),
    highlightedRef: {
      current: {
        itemId: selectedId,
        refId: refId
      }
    },
    setHighlightedItemId: log,
    selectedStoryId: selectedId,
    onSelectStoryId: setSelectedId
  });
};

exports.SingleStoryComponents = SingleStoryComponents;
SingleStoryComponents.displayName = "SingleStoryComponents";