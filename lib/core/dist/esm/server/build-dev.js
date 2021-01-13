import "core-js/modules/es.symbol.description";
import "core-js/modules/es.promise";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import fs from 'fs-extra';
import chalk from 'chalk';
import { logger, colors, instance as npmLog } from '@storybook/node-logger';
import fetch from 'node-fetch';
import Cache from 'file-system-cache';
import boxen from 'boxen';
import semver from '@storybook/semver';
import dedent from 'ts-dedent';
import Table from 'cli-table3';
import prettyTime from 'pretty-hrtime';
import prompts from 'prompts';
import detectFreePort from 'detect-port';
import { storybookDevServer } from './dev-server';
import { getDevCli } from './cli';
import { resolvePathInStorybookCache } from './utils/resolve-path-in-sb-cache';
var _process$env$STORYBOO = process.env.STORYBOOK_VERSION_BASE,
    STORYBOOK_VERSION_BASE = _process$env$STORYBOO === void 0 ? 'https://storybook.js.org' : _process$env$STORYBOO;
var cache = Cache({
  basePath: resolvePathInStorybookCache('dev-server'),
  ns: 'storybook' // Optional. A grouping namespace for items.

});

var writeStats = async function (name, stats) {
  var filePath = resolvePathInStorybookCache(`public/${name}-stats.json`);
  await fs.writeFile(filePath, JSON.stringify(stats.toJson(), null, 2), 'utf8');
  return filePath;
};

var getFreePort = function (port) {
  return detectFreePort(port).catch(function (error) {
    logger.error(error);
    process.exit(-1);
  });
};

var updateCheck = async function (version) {
  var result;
  var time = Date.now();

  try {
    var fromCache = await cache.get('lastUpdateCheck', {
      success: false,
      time: 0
    }); // if last check was more then 24h ago

    if (time - 86400000 > fromCache.time) {
      var fromFetch = await Promise.race([fetch(`${STORYBOOK_VERSION_BASE}/versions.json?current=${version}`), // if fetch is too slow, we won't wait for it
      new Promise(function (res, rej) {
        return global.setTimeout(rej, 1500);
      })]);
      var data = await fromFetch.json();
      result = {
        success: true,
        data: data,
        time: time
      };
      await cache.set('lastUpdateCheck', result);
    } else {
      result = fromCache;
    }
  } catch (error) {
    result = {
      success: false,
      error: error,
      time: time
    };
  }

  return result;
}; // We only expect to have release notes available for major and minor releases.
// For this reason, we convert the actual version of the build here so that
// every place that relies on this data can reference the version of the
// release notes that we expect to use.


var getReleaseNotesVersion = function (version) {
  var _semver$parse = semver.parse(version),
      major = _semver$parse.major,
      minor = _semver$parse.minor;

  var _semver$coerce = semver.coerce(`${major}.${minor}`),
      releaseNotesVersion = _semver$coerce.version;

  return releaseNotesVersion;
};

var getReleaseNotesFailedState = function (version) {
  return {
    success: false,
    currentVersion: getReleaseNotesVersion(version),
    showOnFirstLaunch: false
  };
};

export var RELEASE_NOTES_CACHE_KEY = 'releaseNotesData';
export var getReleaseNotesData = async function (currentVersionToParse, fileSystemCache) {
  var result;

  try {
    var fromCache = (await fileSystemCache.get('releaseNotesData', []).catch(function () {})) || [];
    var releaseNotesVersion = getReleaseNotesVersion(currentVersionToParse);
    var versionHasNotBeenSeen = !fromCache.includes(releaseNotesVersion);

    if (versionHasNotBeenSeen) {
      await fileSystemCache.set('releaseNotesData', [...fromCache, releaseNotesVersion]);
    }

    var sortedHistory = semver.sort(fromCache);
    var highestVersionSeenInThePast = sortedHistory.slice(-1)[0];
    var isUpgrading = false;
    var isMajorOrMinorDiff = false;

    if (highestVersionSeenInThePast) {
      isUpgrading = semver.gt(releaseNotesVersion, highestVersionSeenInThePast);
      var versionDiff = semver.diff(releaseNotesVersion, highestVersionSeenInThePast);
      isMajorOrMinorDiff = versionDiff === 'major' || versionDiff === 'minor';
    }

    result = {
      success: true,
      showOnFirstLaunch: versionHasNotBeenSeen && // Only show the release notes if this is not the first time Storybook
      // has been built.
      !!highestVersionSeenInThePast && isUpgrading && isMajorOrMinorDiff,
      currentVersion: releaseNotesVersion
    };
  } catch (e) {
    result = getReleaseNotesFailedState(currentVersionToParse);
  }

  return result;
};

function createUpdateMessage(updateInfo, version) {
  var updateMessage;

  try {
    var suffix = semver.prerelease(updateInfo.data.latest.version) ? '--prerelease' : '';
    var upgradeCommand = `npx sb@latest upgrade ${suffix}`.trim();
    updateMessage = updateInfo.success && semver.lt(version, updateInfo.data.latest.version) ? dedent`
          ${colors.orange(`A new version (${chalk.bold(updateInfo.data.latest.version)}) is available!`)}

          ${chalk.gray('Upgrade now:')} ${colors.green(upgradeCommand)}

          ${chalk.gray('Read full changelog:')} ${chalk.gray.underline('https://git.io/fhFYe')}
        ` : '';
  } catch (e) {
    updateMessage = '';
  }

  return updateMessage;
}

function outputStartupInformation(options) {
  var updateInfo = options.updateInfo,
      version = options.version,
      address = options.address,
      networkAddress = options.networkAddress,
      managerTotalTime = options.managerTotalTime,
      previewTotalTime = options.previewTotalTime;
  var updateMessage = createUpdateMessage(updateInfo, version);
  var serveMessage = new Table({
    chars: {
      top: '',
      'top-mid': '',
      'top-left': '',
      'top-right': '',
      bottom: '',
      'bottom-mid': '',
      'bottom-left': '',
      'bottom-right': '',
      left: '',
      'left-mid': '',
      mid: '',
      'mid-mid': '',
      right: '',
      'right-mid': '',
      middle: ''
    },
    // @ts-ignore
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  });
  serveMessage.push(['Local:', chalk.cyan(address)], ['On your network:', chalk.cyan(networkAddress)]);
  var timeStatement = [managerTotalTime && `${chalk.underline(prettyTime(managerTotalTime))} for manager`, previewTotalTime && `${chalk.underline(prettyTime(previewTotalTime))} for preview`].filter(Boolean).join(' and '); // eslint-disable-next-line no-console

  console.log(boxen(dedent`
          ${colors.green(`Storybook ${chalk.bold(version)} started`)}
          ${chalk.gray(timeStatement)}

          ${serveMessage.toString()}${updateMessage ? `\n\n${updateMessage}` : ''}
        `, {
    borderStyle: 'round',
    padding: 1,
    borderColor: '#F1618C'
  }));
}

async function outputStats(previewStats, managerStats) {
  if (previewStats) {
    var filePath = await writeStats('preview', previewStats);
    logger.info(`=> preview stats written to ${chalk.cyan(filePath)}`);
  }

  if (managerStats) {
    var _filePath = await writeStats('manager', managerStats);

    logger.info(`=> manager stats written to ${chalk.cyan(_filePath)}`);
  }
}

export async function buildDevStandalone(options) {
  try {
    var packageJson = options.packageJson,
        versionUpdates = options.versionUpdates,
        releaseNotes = options.releaseNotes;
    var version = packageJson.version; // updateInfo and releaseNotesData are cached, so this is typically pretty fast

    var _await$Promise$all = await Promise.all([getFreePort(options.port), versionUpdates ? updateCheck(version) : Promise.resolve({
      success: false,
      data: {},
      time: Date.now()
    }), releaseNotes ? getReleaseNotesData(version, cache) : Promise.resolve(getReleaseNotesFailedState(version))]),
        _await$Promise$all2 = _slicedToArray(_await$Promise$all, 3),
        port = _await$Promise$all2[0],
        updateInfo = _await$Promise$all2[1],
        releaseNotesData = _await$Promise$all2[2];

    if (!options.ci && !options.smokeTest && options.port != null && port !== options.port) {
      var _await$prompts = await prompts({
        type: 'confirm',
        initial: true,
        name: 'shouldChangePort',
        message: `Port ${options.port} is not available. Would you like to run Storybook on port ${port} instead?`
      }),
          shouldChangePort = _await$prompts.shouldChangePort;

      if (!shouldChangePort) process.exit(1);
    }
    /* eslint-disable no-param-reassign */


    options.port = port; // @ts-ignore

    options.versionCheck = updateInfo; // @ts-ignore

    options.releaseNotesData = releaseNotesData;
    /* eslint-enable no-param-reassign */

    var _await$storybookDevSe = await storybookDevServer(options),
        address = _await$storybookDevSe.address,
        networkAddress = _await$storybookDevSe.networkAddress,
        previewStats = _await$storybookDevSe.previewStats,
        managerStats = _await$storybookDevSe.managerStats,
        managerTotalTime = _await$storybookDevSe.managerTotalTime,
        previewTotalTime = _await$storybookDevSe.previewTotalTime;

    if (options.smokeTest) {
      await outputStats(previewStats, managerStats);
      var hasManagerWarnings = managerStats && managerStats.toJson().warnings.length > 0;
      var hasPreviewWarnings = previewStats && previewStats.toJson().warnings.length > 0;
      process.exit(hasManagerWarnings || hasPreviewWarnings && !options.ignorePreview ? 1 : 0);
      return;
    }

    outputStartupInformation({
      updateInfo: updateInfo,
      version: version,
      address: address,
      networkAddress: networkAddress,
      managerTotalTime: managerTotalTime,
      previewTotalTime: previewTotalTime
    });
  } catch (error) {
    // this is a weird bugfix, somehow 'node-pre-gyp' is polluting the npmLog header
    npmLog.heading = '';

    if (error instanceof Error) {
      if (error.error) {
        logger.error(error.error);
      } else if (error.stats && error.stats.compilation.errors) {
        error.stats.compilation.errors.forEach(function (e) {
          return logger.plain(e);
        });
      } else {
        logger.error(error);
      }
    }

    logger.line();
    logger.warn(error.close ? dedent`
            FATAL broken build!, will close the process,
            Fix the error below and restart storybook.
          ` : dedent`
            Broken build, fix the error above.
            You may need to refresh the browser.
          `);
    logger.line();

    if (options.smokeTest || error && error.close) {
      process.exit(1);
    }
  }
}
export async function buildDev(_ref) {
  var packageJson = _ref.packageJson,
      loadOptions = _objectWithoutProperties(_ref, ["packageJson"]);

  var cliOptions = await getDevCli(packageJson);
  await buildDevStandalone(_objectSpread(_objectSpread(_objectSpread({}, cliOptions), loadOptions), {}, {
    packageJson: packageJson,
    configDir: loadOptions.configDir || cliOptions.configDir || './.storybook',
    ignorePreview: !!cliOptions.previewUrl,
    docsMode: !!cliOptions.docs,
    cache: cache
  }));
}