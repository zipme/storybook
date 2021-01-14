"use strict";

require("core-js/modules/es.array.sort");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _updateNotifier = require("update-notifier");

var _chalk = _interopRequireDefault(require("chalk"));

var _prompts = _interopRequireDefault(require("prompts"));

var _detect = require("./detect");

var _project_types = require("./project_types");

var _helpers = require("./helpers");

var _ANGULAR = _interopRequireDefault(require("./generators/ANGULAR"));

var _AURELIA = _interopRequireDefault(require("./generators/AURELIA"));

var _EMBER = _interopRequireDefault(require("./generators/EMBER"));

var _METEOR = _interopRequireDefault(require("./generators/METEOR"));

var _REACT = _interopRequireDefault(require("./generators/REACT"));

var _REACT_NATIVE = _interopRequireDefault(require("./generators/REACT_NATIVE"));

var _REACT_SCRIPTS = _interopRequireDefault(require("./generators/REACT_SCRIPTS"));

var _SFC_VUE = _interopRequireDefault(require("./generators/SFC_VUE"));

var _UPDATE_PACKAGE_ORGANIZATIONS = _interopRequireDefault(require("./generators/UPDATE_PACKAGE_ORGANIZATIONS"));

var _VUE = _interopRequireDefault(require("./generators/VUE"));

var _VUE2 = _interopRequireDefault(require("./generators/VUE3"));

var _WEBPACK_REACT = _interopRequireDefault(require("./generators/WEBPACK_REACT"));

var _MITHRIL = _interopRequireDefault(require("./generators/MITHRIL"));

var _MARIONETTE = _interopRequireDefault(require("./generators/MARIONETTE"));

var _MARKO = _interopRequireDefault(require("./generators/MARKO"));

var _HTML = _interopRequireDefault(require("./generators/HTML"));

var _WEBCOMPONENTS = _interopRequireDefault(require("./generators/WEB-COMPONENTS"));

var _RIOT = _interopRequireDefault(require("./generators/RIOT"));

var _PREACT = _interopRequireDefault(require("./generators/PREACT"));

var _SVELTE = _interopRequireDefault(require("./generators/SVELTE"));

var _RAX = _interopRequireDefault(require("./generators/RAX"));

var _warn = require("./warn");

var _jsPackageManager = require("./js-package-manager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = console;

const installStorybook = (projectType, options) => {
  const packageManager = _jsPackageManager.JsPackageManagerFactory.getPackageManager(options.useNpm);

  const npmOptions = {
    installAsDevDependencies: true,
    skipInstall: options.skipInstall
  };
  const language = (0, _detect.detectLanguage)();
  const hasTSDependency = language === _project_types.SupportedLanguage.TYPESCRIPT;
  (0, _warn.warn)({
    hasTSDependency
  });
  const defaultStoryFormat = hasTSDependency ? _project_types.StoryFormat.CSF_TYPESCRIPT : _project_types.StoryFormat.CSF;
  const generatorOptions = {
    storyFormat: options.storyFormat || defaultStoryFormat,
    language
  };

  const end = () => {
    if (!options.skipInstall) {
      packageManager.installDependencies();
    }

    logger.log('\nTo run your Storybook, type:\n');
    (0, _helpers.codeLog)([packageManager.getRunStorybookCommand()]);
    logger.log('\nFor more information visit:', _chalk.default.cyan('https://storybook.js.org')); // Add a new line for the clear visibility.

    logger.log();
  };

  const REACT_NATIVE_REPO = 'https://github.com/storybookjs/react-native';

  const runGenerator = () => {
    switch (projectType) {
      case _project_types.ProjectType.ALREADY_HAS_STORYBOOK:
        logger.log();
        (0, _helpers.paddedLog)('There seems to be a Storybook already available in this project.');
        (0, _helpers.paddedLog)('Apply following command to force:\n');
        (0, _helpers.codeLog)(['sb init [options] -f']); // Add a new line for the clear visibility.

        logger.log();
        return Promise.resolve();

      case _project_types.ProjectType.UPDATE_PACKAGE_ORGANIZATIONS:
        return (0, _UPDATE_PACKAGE_ORGANIZATIONS.default)(packageManager, options.parser, npmOptions).then(() => null) // commandLog doesn't like to see output
        .then((0, _helpers.commandLog)('Upgrading your project to the new Storybook packages.')).then(end);

      case _project_types.ProjectType.REACT_SCRIPTS:
        return (0, _REACT_SCRIPTS.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "Create React App" based project')).then(end);

      case _project_types.ProjectType.REACT:
        return (0, _REACT.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "React" app')).then(end);

      case _project_types.ProjectType.REACT_NATIVE:
        {
          return (options.yes ? Promise.resolve({
            server: true
          }) : (0, _prompts.default)([{
            type: 'confirm',
            name: 'server',
            message: 'Do you want to install dependencies necessary to run Storybook server? You can manually do it later by install @storybook/react-native-server',
            initial: false
          }])).then(({
            server
          }) => (0, _REACT_NATIVE.default)(packageManager, npmOptions, server, generatorOptions)).then((0, _helpers.commandLog)('Adding Storybook support to your "React Native" app')).then(end).then(() => {
            logger.log(_chalk.default.red('NOTE: installation is not 100% automated.'));
            logger.log(`To quickly run Storybook, replace contents of your app entry with:\n`);
            (0, _helpers.codeLog)(["export {default} from './storybook';"]);
            logger.log('\n For more in information, see the github readme:\n');
            logger.log(_chalk.default.cyan(REACT_NATIVE_REPO));
            logger.log();
          });
        }

      case _project_types.ProjectType.METEOR:
        return (0, _METEOR.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "Meteor" app')).then(end);

      case _project_types.ProjectType.WEBPACK_REACT:
        return (0, _WEBPACK_REACT.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "Webpack React" app')).then(end);

      case _project_types.ProjectType.REACT_PROJECT:
        return (0, _REACT.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "React" library')).then(end);

      case _project_types.ProjectType.SFC_VUE:
        return (0, _SFC_VUE.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "Single File Components Vue" app')).then(end);

      case _project_types.ProjectType.VUE:
        return (0, _VUE.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "Vue" app')).then(end);

      case _project_types.ProjectType.VUE3:
        return (0, _VUE2.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "Vue 3" app')).then(end);

      case _project_types.ProjectType.ANGULAR:
        return (0, _ANGULAR.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "Angular" app')).then(end);

      case _project_types.ProjectType.EMBER:
        return (0, _EMBER.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "Ember" app')).then(end);

      case _project_types.ProjectType.MITHRIL:
        return (0, _MITHRIL.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "Mithril" app')).then(end);

      case _project_types.ProjectType.MARIONETTE:
        return (0, _MARIONETTE.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "Marionette.js" app')).then(end);

      case _project_types.ProjectType.MARKO:
        return (0, _MARKO.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "Marko" app')).then(end);

      case _project_types.ProjectType.HTML:
        return (0, _HTML.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "HTML" app')).then(end);

      case _project_types.ProjectType.WEB_COMPONENTS:
        return (0, _WEBCOMPONENTS.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "web components" app')).then(end);

      case _project_types.ProjectType.RIOT:
        return (0, _RIOT.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "riot.js" app')).then(end);

      case _project_types.ProjectType.PREACT:
        return (0, _PREACT.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "Preact" app')).then(end);

      case _project_types.ProjectType.SVELTE:
        return (0, _SVELTE.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "Svelte" app')).then(end);

      case _project_types.ProjectType.RAX:
        return (0, _RAX.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "Rax" app')).then(end);

      case _project_types.ProjectType.AURELIA:
        return (0, _AURELIA.default)(packageManager, npmOptions, generatorOptions).then((0, _helpers.commandLog)('Adding Storybook support to your "Aurelia" app')).then(end);

      default:
        (0, _helpers.paddedLog)(`We couldn't detect your project type. (code: ${projectType})`);
        (0, _helpers.paddedLog)('You can specify a project type explicitly via `sb init --type <type>` or follow some of the slow start guides: https://storybook.js.org/basics/slow-start-guide/'); // Add a new line for the clear visibility.

        logger.log();
        return projectTypeInquirer(options);
    }
  };

  return runGenerator().catch(ex => {
    logger.error(`\n     ${_chalk.default.red(ex.stack)}`);
    process.exit(1);
  });
};

const projectTypeInquirer = async options => {
  const manualAnswer = options.yes ? true : await (0, _prompts.default)([{
    type: 'confirm',
    name: 'manual',
    message: 'Do you want to manually choose a Storybook project type to install?'
  }]);

  if (manualAnswer !== true && manualAnswer.manual) {
    const frameworkAnswer = await (0, _prompts.default)([{
      type: 'list',
      name: 'manualFramework',
      message: 'Please choose a project type from the following list:',
      choices: _project_types.installableProjectTypes.map(type => ({
        title: type,
        value: type.toUpperCase()
      }))
    }]);
    return installStorybook(frameworkAnswer.manualFramework, options);
  }

  return Promise.resolve();
};

function _default(options, pkg) {
  const welcomeMessage = 'sb init - the simplest way to add a Storybook to your project.';
  logger.log(_chalk.default.inverse(`\n ${welcomeMessage} \n`)); // Update notify code.

  new _updateNotifier.UpdateNotifier({
    pkg,
    updateCheckInterval: 1000 * 60 * 60 // every hour (we could increase this later on.)

  }).notify();
  let projectType;
  const projectTypeProvided = options.type;
  const infoText = projectTypeProvided ? 'Installing Storybook for user specified project type' : 'Detecting project type';
  const done = (0, _helpers.commandLog)(infoText);

  try {
    if (projectTypeProvided) {
      if (_project_types.installableProjectTypes.includes(options.type)) {
        const storybookInstalled = (0, _detect.isStorybookInstalled)((0, _jsPackageManager.readPackageJson)(), options.force);
        projectType = storybookInstalled ? _project_types.ProjectType.ALREADY_HAS_STORYBOOK : options.type.toUpperCase();
      } else {
        done(`The provided project type was not recognized by Storybook.`);
        logger.log(`\nThe project types currently supported by Storybook are:\n`);

        _project_types.installableProjectTypes.sort().forEach(framework => (0, _helpers.paddedLog)(`- ${framework}`));

        logger.log();
        process.exit(1);
      }
    } else {
      projectType = (0, _detect.detect)(options);
    }
  } catch (ex) {
    done(ex.message);
    process.exit(1);
  }

  done();
  const cleanOptions = Object.assign({}, options);

  if (options.storyFormat === _project_types.StoryFormat.MDX) {
    logger.warn('   The MDX CLI template is deprecated. The JS and TS templates already include MDX examples!');
    cleanOptions.storyFormat = undefined;
  }

  return installStorybook(projectType, cleanOptions);
}