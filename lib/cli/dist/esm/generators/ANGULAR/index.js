"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _angularHelpers = require("./angular-helpers");

var _helpers = require("../../helpers");

var _baseGenerator = require("../baseGenerator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function editAngularAppTsConfig() {
  const tsConfigJson = (0, _angularHelpers.getAngularAppTsConfigJson)();
  const glob = '**/*.stories.*';

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
  (0, _helpers.writeFileAsJson)((0, _angularHelpers.getAngularAppTsConfigPath)(), tsConfigJson);
}

const generator = async (packageManager, npmOptions, options) => {
  if (!(0, _angularHelpers.isDefaultProjectSet)()) {
    throw new Error('Could not find a default project in your Angular workspace.\nSet a defaultProject in your angular.json and re-run the installation.');
  }

  (0, _baseGenerator.baseGenerator)(packageManager, npmOptions, options, 'angular', {
    extraPackages: ['@compodoc/compodoc'],
    addScripts: false
  });
  (0, _helpers.copyTemplate)(__dirname, options.storyFormat);
  editAngularAppTsConfig();
  (0, _angularHelpers.editStorybookTsConfig)(_path.default.resolve('./.storybook/tsconfig.json')); // edit scripts to generate docs

  const tsConfigFile = await (0, _angularHelpers.getBaseTsConfigName)();
  packageManager.addScripts({
    'docs:json': `compodoc -p ./${tsConfigFile} -e json -d .`
  });
  packageManager.addStorybookCommandInScripts({
    port: 6006,
    preCommand: 'docs:json'
  });
};

var _default = generator;
exports.default = _default;