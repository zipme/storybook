"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildStaticStandalone = buildStaticStandalone;
exports.buildStatic = buildStatic;

var _chalk = _interopRequireDefault(require("chalk"));

var _cpy = _interopRequireDefault(require("cpy"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _nodeLogger = require("@storybook/node-logger");

var _cli = require("./cli");

var _config = _interopRequireDefault(require("./config"));

var _managerConfig = _interopRequireDefault(require("./manager/manager-config"));

var _logConfig = require("./logConfig");

var _prebuiltManager = require("./utils/prebuilt-manager");

var _staticFiles = require("./utils/static-files");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

async function compileManager(managerConfig, managerStartTime) {
  _nodeLogger.logger.info('=> Compiling manager..');

  return new Promise(function (resolve, reject) {
    (0, _webpack.default)(managerConfig).run(function (error, stats) {
      if (error || !stats || stats.hasErrors()) {
        _nodeLogger.logger.error('=> Failed to build the manager');

        if (error) {
          _nodeLogger.logger.error(error.message);
        }

        if (stats && (stats.hasErrors() || stats.hasWarnings())) {
          var _stats$toJson = stats.toJson(managerConfig.stats),
              warnings = _stats$toJson.warnings,
              errors = _stats$toJson.errors;

          errors.forEach(function (e) {
            return _nodeLogger.logger.error(e);
          });
          warnings.forEach(function (e) {
            return _nodeLogger.logger.error(e);
          });
        }

        process.exitCode = 1;
        reject(error || stats);
        return;
      }

      _nodeLogger.logger.trace({
        message: '=> Manager built',
        time: process.hrtime(managerStartTime)
      });

      stats.toJson(managerConfig.stats).warnings.forEach(function (e) {
        return _nodeLogger.logger.warn(e);
      });
      resolve(stats);
    });
  });
}

async function watchPreview(previewConfig) {
  _nodeLogger.logger.info('=> Compiling preview in watch mode..');

  return new Promise(function () {
    (0, _webpack.default)(previewConfig).watch({
      aggregateTimeout: 1
    }, function (error, stats) {
      if (!error) {
        var statsConfig = previewConfig.stats ? previewConfig.stats : {
          colors: true
        }; // eslint-disable-next-line no-console

        console.log(stats.toString(statsConfig));
      } else {
        _nodeLogger.logger.error(error.message);
      }
    });
  });
}

async function compilePreview(previewConfig, previewStartTime) {
  _nodeLogger.logger.info('=> Compiling preview..');

  return new Promise(function (resolve, reject) {
    (0, _webpack.default)(previewConfig).run(function (error, stats) {
      if (error || !stats || stats.hasErrors()) {
        _nodeLogger.logger.error('=> Failed to build the preview');

        process.exitCode = 1;

        if (error) {
          _nodeLogger.logger.error(error.message);

          return reject(error);
        }

        if (stats && (stats.hasErrors() || stats.hasWarnings())) {
          var _stats$toJson2 = stats.toJson(previewConfig.stats),
              warnings = _stats$toJson2.warnings,
              errors = _stats$toJson2.errors;

          errors.forEach(function (e) {
            return _nodeLogger.logger.error(e);
          });
          warnings.forEach(function (e) {
            return _nodeLogger.logger.error(e);
          });
          return reject(stats);
        }
      }

      _nodeLogger.logger.trace({
        message: '=> Preview built',
        time: process.hrtime(previewStartTime)
      });

      if (stats) {
        stats.toJson(previewConfig.stats).warnings.forEach(function (e) {
          return _nodeLogger.logger.warn(e);
        });
      }

      return resolve(stats);
    });
  });
}

async function copyAllStaticFiles(staticDirs, outputDir) {
  if (staticDirs && staticDirs.length > 0) {
    await Promise.all(staticDirs.map(async function (dir) {
      try {
        var _await$parseStaticDir = await (0, _staticFiles.parseStaticDir)(dir),
            staticDir = _await$parseStaticDir.staticDir,
            staticPath = _await$parseStaticDir.staticPath,
            targetDir = _await$parseStaticDir.targetDir;

        var targetPath = _path.default.join(outputDir, targetDir);

        _nodeLogger.logger.info((0, _chalk.default)`=> Copying static files: {cyan ${staticDir}} => {cyan ${targetDir}}`); // Storybook's own files should not be overwritten, so we skip such files if we find them


        var skipPaths = ['index.html', 'iframe.html'].map(function (f) {
          return _path.default.join(targetPath, f);
        });
        await _fsExtra.default.copy(staticPath, targetPath, {
          filter: function (_, dest) {
            return !skipPaths.includes(dest);
          }
        });
      } catch (e) {
        _nodeLogger.logger.error(e.message);

        process.exit(-1);
      }
    }));
  }
}

async function buildManager(configType, outputDir, configDir, options) {
  _nodeLogger.logger.info('=> Building manager..');

  var managerStartTime = process.hrtime();

  _nodeLogger.logger.info('=> Loading manager config..');

  var managerConfig = await (0, _managerConfig.default)(_objectSpread(_objectSpread({}, options), {}, {
    configType: configType,
    outputDir: outputDir,
    configDir: configDir,
    corePresets: [require.resolve('./manager/manager-preset.js')]
  }));

  if (options.debugWebpack) {
    (0, _logConfig.logConfig)('Manager webpack config', managerConfig);
  }

  return compileManager(managerConfig, managerStartTime);
}

async function buildPreview(configType, outputDir, packageJson, options) {
  var watch = options.watch,
      debugWebpack = options.debugWebpack;

  _nodeLogger.logger.info('=> Building preview..');

  var previewStartTime = process.hrtime();

  _nodeLogger.logger.info('=> Loading preview config..');

  var previewConfig = await (0, _config.default)(_objectSpread(_objectSpread({}, options), {}, {
    configType: configType,
    outputDir: outputDir,
    packageJson: packageJson,
    corePresets: [require.resolve('./preview/preview-preset.js')],
    overridePresets: [require.resolve('./preview/custom-webpack-preset.js')]
  }));

  if (debugWebpack) {
    (0, _logConfig.logConfig)('Preview webpack config', previewConfig);
  }

  if (watch) {
    return watchPreview(previewConfig);
  }

  return compilePreview(previewConfig, previewStartTime);
}

async function buildStaticStandalone(options) {
  var staticDir = options.staticDir,
      configDir = options.configDir,
      packageJson = options.packageJson;
  var configType = 'PRODUCTION';
  var outputDir = _path.default.isAbsolute(options.outputDir) ? options.outputDir : _path.default.join(process.cwd(), options.outputDir);

  var defaultFavIcon = require.resolve('./public/favicon.ico');

  _nodeLogger.logger.info((0, _chalk.default)`=> Cleaning outputDir: {cyan ${outputDir}}`);

  if (outputDir === '/') throw new Error("Won't remove directory '/'. Check your outputDir!");
  await _fsExtra.default.remove(outputDir);
  await (0, _cpy.default)(defaultFavIcon, outputDir);
  await copyAllStaticFiles(staticDir, outputDir);
  var prebuiltDir = await (0, _prebuiltManager.getPrebuiltDir)({
    configDir: configDir,
    options: options
  });

  if (prebuiltDir) {
    await (0, _cpy.default)('**', outputDir, {
      cwd: prebuiltDir,
      parents: true
    });
  } else {
    await buildManager(configType, outputDir, configDir, options);
  }

  if (options.managerOnly) {
    _nodeLogger.logger.info(`=> Not building preview`);
  } else {
    await buildPreview(configType, outputDir, packageJson, options);
  }

  _nodeLogger.logger.info(`=> Output directory: ${outputDir}`);
}

function buildStatic(_ref) {
  var packageJson = _ref.packageJson,
      loadOptions = _objectWithoutProperties(_ref, ["packageJson"]);

  var cliOptions = (0, _cli.getProdCli)(packageJson);
  return buildStaticStandalone(_objectSpread(_objectSpread(_objectSpread({}, cliOptions), loadOptions), {}, {
    packageJson: packageJson,
    configDir: loadOptions.configDir || cliOptions.configDir || './.storybook',
    outputDir: loadOptions.outputDir || cliOptions.outputDir || './storybook-static',
    ignorePreview: !!cliOptions.previewUrl,
    docsMode: !!cliOptions.docs
  })).catch(function (e) {
    _nodeLogger.logger.error(e);

    process.exit(1);
  });
}