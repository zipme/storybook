"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAngularAppTsConfigPath = getAngularAppTsConfigPath;
exports.getAngularAppTsConfigJson = getAngularAppTsConfigJson;
exports.editStorybookTsConfig = editStorybookTsConfig;
exports.isDefaultProjectSet = isDefaultProjectSet;
exports.getBaseTsConfigName = getBaseTsConfigName;

var path = _interopRequireWildcard(require("path"));

var fs = _interopRequireWildcard(require("fs"));

var _fsExtra = require("fs-extra");

var _helpers = require("../../helpers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function getAngularAppTsConfigPath() {
  const angularJson = (0, _helpers.readFileAsJson)('angular.json', true);
  const {
    defaultProject
  } = angularJson;
  const tsConfigPath = angularJson.projects[defaultProject].architect.build.options.tsConfig;

  if (!tsConfigPath || !fs.existsSync(path.resolve(tsConfigPath))) {
    return false;
  }

  return tsConfigPath;
}

function getAngularAppTsConfigJson() {
  const tsConfigPath = getAngularAppTsConfigPath();

  if (!tsConfigPath) {
    return false;
  }

  return (0, _helpers.readFileAsJson)(tsConfigPath, true);
}

function setStorybookTsconfigExtendsPath(tsconfigJson) {
  const angularProjectTsConfigPath = getAngularAppTsConfigPath();
  const newTsconfigJson = Object.assign({}, tsconfigJson);
  newTsconfigJson.extends = `../${angularProjectTsConfigPath}`;
  return newTsconfigJson;
}

function editStorybookTsConfig(tsconfigPath) {
  let tsConfigJson;

  try {
    tsConfigJson = (0, _helpers.readFileAsJson)(tsconfigPath);
  } catch (e) {
    if (e.name === 'SyntaxError' && e.message.indexOf('Unexpected token /') > -1) {
      throw new Error(`Comments are disallowed in ${tsconfigPath}`);
    }

    throw e;
  }

  tsConfigJson = setStorybookTsconfigExtendsPath(tsConfigJson);
  (0, _helpers.writeFileAsJson)(tsconfigPath, tsConfigJson);
}

function isDefaultProjectSet() {
  const angularJson = (0, _helpers.readFileAsJson)('angular.json', true);
  return angularJson && !!angularJson.defaultProject;
}

async function getBaseTsConfigName() {
  return (await (0, _fsExtra.pathExists)('./tsconfig.base.json')) ? 'tsconfig.base.json' : 'tsconfig.json';
}