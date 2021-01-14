"use strict";

require("core-js/modules/es.array.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectFrameworkPreset = detectFrameworkPreset;
exports.isStorybookInstalled = isStorybookInstalled;
exports.detectLanguage = detectLanguage;
exports.detect = detect;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _project_types = require("./project_types");

var _helpers = require("./helpers");

var _jsPackageManager = require("./js-package-manager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hasDependency = (packageJson, name, matcher) => {
  var _packageJson$dependen, _packageJson$devDepen;

  const dependency = ((_packageJson$dependen = packageJson.dependencies) === null || _packageJson$dependen === void 0 ? void 0 : _packageJson$dependen[name]) || ((_packageJson$devDepen = packageJson.devDependencies) === null || _packageJson$devDepen === void 0 ? void 0 : _packageJson$devDepen[name]);
  return typeof matcher === 'function' ? dependency && matcher(dependency) : !!dependency;
};

const hasPeerDependency = (packageJson, name) => {
  var _packageJson$peerDepe;

  return !!((_packageJson$peerDepe = packageJson.peerDependencies) !== null && _packageJson$peerDepe !== void 0 && _packageJson$peerDepe[name]);
};

const getFrameworkPreset = (packageJson, framework) => {
  const matcher = {
    dependencies: [false],
    peerDependencies: [false],
    files: [false]
  };
  const {
    preset,
    files,
    dependencies,
    peerDependencies,
    matcherFunction
  } = framework;

  if (Array.isArray(dependencies)) {
    matcher.dependencies = dependencies.map(name => hasDependency(packageJson, name));
  } else if (typeof dependencies === 'object') {
    matcher.dependencies = Object.entries(dependencies).map(([name, dependencyMatcher]) => hasDependency(packageJson, name, dependencyMatcher));
  }

  if (Array.isArray(peerDependencies) && peerDependencies.length > 0) {
    matcher.peerDependencies = peerDependencies.map(name => hasPeerDependency(packageJson, name));
  }

  if (Array.isArray(files) && files.length > 0) {
    matcher.files = files.map(name => _fs.default.existsSync(_path.default.join(process.cwd(), name)));
  }

  return matcherFunction(matcher) ? preset : null;
};

function detectFrameworkPreset(packageJson = {}) {
  const result = _project_types.supportedTemplates.find(framework => {
    return getFrameworkPreset(packageJson, framework) !== null;
  });

  return result ? result.preset : _project_types.ProjectType.UNDETECTED;
}

function isStorybookInstalled(dependencies, force) {
  if (!dependencies) {
    return false;
  }

  if (!force && dependencies.devDependencies) {
    if (_project_types.SUPPORTED_FRAMEWORKS.reduce((storybookPresent, framework) => storybookPresent || !!dependencies.devDependencies[`@storybook/${framework}`], false)) {
      return _project_types.ProjectType.ALREADY_HAS_STORYBOOK;
    }

    if (dependencies.devDependencies['@kadira/storybook'] || dependencies.devDependencies['@kadira/react-native-storybook']) {
      return _project_types.ProjectType.UPDATE_PACKAGE_ORGANIZATIONS;
    }
  }

  return false;
}

function detectLanguage() {
  let language = _project_types.SupportedLanguage.JAVASCRIPT;
  const packageJson = (0, _jsPackageManager.readPackageJson)();
  const bowerJson = (0, _helpers.getBowerJson)();

  if (!packageJson && !bowerJson) {
    return language;
  }

  if (hasDependency(packageJson || bowerJson, 'typescript')) {
    language = _project_types.SupportedLanguage.TYPESCRIPT;
  }

  return language;
}

function detect(options = {}) {
  const packageJson = (0, _jsPackageManager.readPackageJson)();
  const bowerJson = (0, _helpers.getBowerJson)();

  if (!packageJson && !bowerJson) {
    return _project_types.ProjectType.UNDETECTED;
  }

  const storyBookInstalled = isStorybookInstalled(packageJson, options.force);

  if (storyBookInstalled) {
    return storyBookInstalled;
  }

  if (options.html) {
    return _project_types.ProjectType.HTML;
  }

  return detectFrameworkPreset(packageJson || bowerJson);
}