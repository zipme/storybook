"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("../../helpers");

var _baseGenerator = require("../baseGenerator");

function addStorybookExcludeGlobToTsConfig() {
  const tsConfigJson = (0, _helpers.readFileAsJson)('tsconfig.json', true);
  const glob = '**/*.stories.ts';

  if (!tsConfigJson) {
    return;
  }

  const {
    exclude = []
  } = tsConfigJson;

  if (exclude.includes(glob)) {
    return;
  }

  tsConfigJson.exclude = [...exclude, glob];
  (0, _helpers.writeFileAsJson)('tsconfig.json', tsConfigJson);
}

const generator = async (packageManager, npmOptions, options) => {
  addStorybookExcludeGlobToTsConfig();
  (0, _baseGenerator.baseGenerator)(packageManager, npmOptions, options, 'aurelia', {
    extraPackages: ['aurelia']
  });
  (0, _helpers.copyTemplate)(__dirname, options.storyFormat);
};

var _default = generator;
exports.default = _default;