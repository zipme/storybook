"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upgrade = exports.checkVersionConsistency = exports.isCorePackage = exports.getStorybookVersion = void 0;

var _crossSpawn = require("cross-spawn");

var _semver = _interopRequireDefault(require("@storybook/semver"));

var _nodeLogger = require("@storybook/node-logger");

var _jsPackageManager = require("./js-package-manager");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const versionRegex = /(@storybook\/[^@]+)@(\S+)/;

const getStorybookVersion = line => {
  if (line.startsWith('npm ')) return null;
  const match = versionRegex.exec(line);
  if (!match || !_semver.default.clean(match[2])) return null;
  return {
    package: match[1],
    version: match[2]
  };
};

exports.getStorybookVersion = getStorybookVersion;
const excludeList = ['@storybook/linter-config', '@storybook/design-system', '@storybook/ember-cli-storybook', '@storybook/semver', '@storybook/eslint-config-storybook', '@storybook/bench', '@storybook/addon-bench', '@storybook/addon-console', '@storybook/csf', '@storybook/storybook-deployer'];

const isCorePackage = pkg => pkg.startsWith('@storybook/') && !pkg.startsWith('@storybook/preset-') && !excludeList.includes(pkg);

exports.isCorePackage = isCorePackage;
const deprecatedPackages = [{
  minVersion: '6.0.0-alpha.0',
  url: 'https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#60-deprecations',
  deprecations: ['@storybook/addon-notes', '@storybook/addon-info', '@storybook/addon-contexts', '@storybook/addon-options', '@storybook/addon-centered']
}];

const formatPackage = pkg => `${pkg.package}@${pkg.version}`;

const warnPackages = pkgs => pkgs.forEach(pkg => _nodeLogger.logger.warn(`- ${formatPackage(pkg)}`));

const checkVersionConsistency = () => {
  const lines = (0, _crossSpawn.sync)('npm', ['ls'], {
    stdio: 'pipe'
  }).output.toString().split('\n');
  const storybookPackages = lines.map(getStorybookVersion).filter(Boolean).filter(pkg => isCorePackage(pkg.package));

  if (!storybookPackages.length) {
    _nodeLogger.logger.warn('No storybook core packages found.');

    _nodeLogger.logger.warn(`'npm ls | grep storybook' can show if multiple versions are installed.`);
  }

  storybookPackages.sort((a, b) => _semver.default.rcompare(a.version, b.version));
  const latestVersion = storybookPackages[0].version;
  const outdated = storybookPackages.filter(pkg => pkg.version !== latestVersion);

  if (outdated.length > 0) {
    _nodeLogger.logger.warn(`Found ${outdated.length} outdated packages (relative to '${formatPackage(storybookPackages[0])}')`);

    _nodeLogger.logger.warn('Please make sure your packages are updated to ensure a consistent experience.');

    warnPackages(outdated);
  }

  deprecatedPackages.forEach(({
    minVersion,
    url,
    deprecations
  }) => {
    if (_semver.default.gte(latestVersion, minVersion)) {
      const deprecated = storybookPackages.filter(pkg => deprecations.includes(pkg.package));

      if (deprecated.length > 0) {
        _nodeLogger.logger.warn(`Found ${deprecated.length} deprecated packages since ${minVersion}`);

        _nodeLogger.logger.warn(`See ${url}`);

        warnPackages(deprecated);
      }
    }
  });
};

exports.checkVersionConsistency = checkVersionConsistency;

const upgrade = async ({
  prerelease,
  skipCheck,
  useNpm,
  dryRun
}) => {
  const packageManager = _jsPackageManager.JsPackageManagerFactory.getPackageManager(useNpm);

  (0, _helpers.commandLog)(`Checking for latest versions of '@storybook/*' packages`);
  const flags = [];
  if (!dryRun) flags.push('--upgrade');
  if (prerelease) flags.push('--newest');
  const check = (0, _crossSpawn.sync)('npx', ['npm-check-updates', '/storybook/', ...flags], {
    stdio: 'pipe'
  }).output.toString();

  _nodeLogger.logger.info(check);

  if (!dryRun) {
    (0, _helpers.commandLog)(`Installing upgrades`);
    packageManager.installDependencies();
  }

  if (!skipCheck) checkVersionConsistency();
};

exports.upgrade = upgrade;