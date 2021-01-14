"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _baseGenerator = require("../baseGenerator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const generator = async (packageManager, npmOptions, options) => {
  await (0, _baseGenerator.baseGenerator)(packageManager, npmOptions, options, 'react', {
    extraAddons: ['@storybook/preset-create-react-app'],
    // `@storybook/preset-create-react-app` has `@storybook/node-logger` as peerDep
    extraPackages: ['@storybook/node-logger'],
    staticDir: _fs.default.existsSync(_path.default.resolve('./public')) ? 'public' : undefined,
    addBabel: false,
    addESLint: true
  });
};

var _default = generator;
exports.default = _default;