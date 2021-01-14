"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baseGenerator = require("../baseGenerator");

const generator = async (packageManager, npmOptions, options) => {
  (0, _baseGenerator.baseGenerator)(packageManager, npmOptions, options, 'riot', {
    extraPackages: ['riot-tag-loader']
  });
};

var _default = generator;
exports.default = _default;