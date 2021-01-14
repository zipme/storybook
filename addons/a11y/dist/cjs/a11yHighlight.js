"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

var _global = require("global");

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _coreEvents = require("@storybook/core-events");

var _constants = require("./constants");

var _highlight = require("./highlight");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}

var channel = _addons.default.getChannel();

var highlight = function highlight(infos) {
  var id = _constants.HIGHLIGHT_STYLE_ID;
  resetHighlight();

  var sheet = _global.document.createElement('style');

  sheet.setAttribute('id', id);
  sheet.innerHTML = infos.elements.map(function (target) {
    return "".concat(target, "{ \n          ").concat((0, _highlight.highlightStyle)(infos.color), "\n         }");
  }).join(' ');

  _global.document.head.appendChild(sheet);
};

var resetHighlight = function resetHighlight() {
  var id = _constants.HIGHLIGHT_STYLE_ID;

  var sheetToBeRemoved = _global.document.getElementById(id);

  if (sheetToBeRemoved) {
    sheetToBeRemoved.parentNode.removeChild(sheetToBeRemoved);
  }
};

channel.on(_coreEvents.STORY_CHANGED, resetHighlight);
channel.on(_constants.EVENTS.HIGHLIGHT, highlight);