"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileCsfModule = compileCsfModule;

var _stringifier = require("./stringifier");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function createStory(storyArgs) {
  var name = storyArgs.name,
      options = _objectWithoutProperties(storyArgs, ["name"]);

  return Object.assign({
    name: name,
    storyFn: '(args) => {}'
  }, options);
}

function createSection(args) {
  var title = args.title,
      stories = args.stories,
      options = _objectWithoutProperties(args, ["title", "stories"]);

  return Object.assign({
    imports: {},
    decorators: [],
    title: title,
    stories: stories.map(function (storyArgs) {
      return createStory(storyArgs);
    })
  }, options);
}

function compileCsfModule(args) {
  return (0, _stringifier.stringifySection)(createSection(args));
}