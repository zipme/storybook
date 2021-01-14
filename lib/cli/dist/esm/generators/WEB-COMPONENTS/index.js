"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baseGenerator = require("../baseGenerator");

var _helpers = require("../../helpers");

const generator = async (packageManager, npmOptions, options) => {
  (0, _baseGenerator.baseGenerator)(packageManager, npmOptions, options, 'web-components', {
    extraPackages: ['lit-html']
  });
  (0, _helpers.copyTemplate)(__dirname, options.storyFormat);
};

var _default = generator;
exports.default = _default;