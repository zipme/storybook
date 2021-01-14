"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsPackageManager = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _semver = require("@storybook/semver");

var _crossSpawn = require("cross-spawn");

var _helpers = require("../helpers");

var _PackageJsonHelper = require("./PackageJsonHelper");

var _versions = _interopRequireDefault(require("../versions.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = console;

class JsPackageManager {
  constructor() {
    this.type = void 0;
  }

  /**
   * Install dependencies listed in `package.json`
   */
  installDependencies() {
    let done = (0, _helpers.commandLog)('Preparing to install dependencies');
    done();
    logger.log();
    logger.log();
    done = (0, _helpers.commandLog)('Installing dependencies');

    try {
      this.runInstall();
    } catch (e) {
      done('An error occurred while installing dependencies.');
      process.exit(1);
    }

    done();
  }

  retrievePackageJson() {
    let packageJson = (0, _PackageJsonHelper.readPackageJson)();

    if (!packageJson) {
      // It will create a new package.json file
      this.initPackageJson(); // read the newly created package.json file

      packageJson = (0, _PackageJsonHelper.readPackageJson)() || {};
    }

    return Object.assign({}, packageJson, {
      dependencies: Object.assign({}, packageJson.dependencies),
      devDependencies: Object.assign({}, packageJson.devDependencies)
    });
  }
  /**
   * Add dependencies to a project using `yarn add` or `npm install`.
   *
   * @param {Object} options contains `skipInstall`, `packageJson` and `installAsDevDependencies` which we use to determine how we install packages.
   * @param {Array} dependencies contains a list of packages to add.
   * @example
   * addDependencies(options, [
   *   `@storybook/react@${storybookVersion}`,
   *   `@storybook/addon-actions@${actionsVersion}`,
   *   `@storybook/addon-links@${linksVersion}`,
   *   `@storybook/addons@${addonsVersion}`,
   * ]);
   */


  addDependencies(options, dependencies) {
    const {
      skipInstall
    } = options;

    if (skipInstall) {
      const {
        packageJson
      } = options;
      const dependenciesMap = dependencies.reduce((acc, dep) => {
        const idx = dep.lastIndexOf('@');
        const packageName = dep.slice(0, idx);
        const packageVersion = dep.slice(idx + 1);
        return Object.assign({}, acc, {
          [packageName]: packageVersion
        });
      }, {});

      if (options.installAsDevDependencies) {
        packageJson.devDependencies = Object.assign({}, packageJson.devDependencies, dependenciesMap);
      } else {
        packageJson.dependencies = Object.assign({}, packageJson.dependencies, dependenciesMap);
      }

      (0, _PackageJsonHelper.writePackageJson)(packageJson);
    } else {
      try {
        this.runAddDeps(dependencies, options.installAsDevDependencies);
      } catch (e) {
        logger.error('An error occurred while installing dependencies.');
        logger.log(e.message);
        process.exit(1);
      }
    }
  }
  /**
   * Return an array of strings matching following format: `<package_name>@<package_latest_version>`
   *
   * @param packageNames
   */


  getVersionedPackages(...packageNames) {
    return Promise.all(packageNames.map(async packageName => `${packageName}@${await this.getVersion(packageName)}`));
  }
  /**
   * Return an array of string standing for the latest version of the input packages.
   * To be able to identify which version goes with which package the order of the input array is keep.
   *
   * @param packageNames
   */


  getVersions(...packageNames) {
    return Promise.all(packageNames.map(packageName => this.getVersion(packageName)));
  }

  async getVersion(packageName, constraint) {
    let current;

    if (/@storybook/.test(packageName)) {
      // @ts-ignore
      current = _versions.default[packageName];
    }

    let latest;

    try {
      latest = await this.latestVersion(packageName, constraint);
    } catch (e) {
      if (current) {
        logger.warn(`\n     ${_chalk.default.yellow(e.message)}`);
        return current;
      }

      logger.error(`\n     ${_chalk.default.red(e.message)}`);
      process.exit(1);
    }

    const versionToUse = current && (!constraint || (0, _semver.satisfies)(current, constraint)) && (0, _semver.gt)(current, latest) ? current : latest;
    return `^${versionToUse}`;
  }
  /**
   * Get the latest version of the package available on npmjs.com.
   * If constraint is set then it returns a version satisfying it, otherwise the latest version available is returned.
   *
   * @param packageName Name of the package
   * @param constraint Version range to use to constraint the returned version
   */


  async latestVersion(packageName, constraint) {
    if (!constraint) {
      return this.runGetVersions(packageName, false);
    }

    const versions = await this.runGetVersions(packageName, true); // Get the latest version satisfying the constraint

    return versions.reverse().find(version => (0, _semver.satisfies)(version, constraint));
  }

  addStorybookCommandInScripts(options) {
    var _options$port;

    const sbPort = (_options$port = options === null || options === void 0 ? void 0 : options.port) !== null && _options$port !== void 0 ? _options$port : 6006;
    const storybookCmd = options !== null && options !== void 0 && options.staticFolder ? `start-storybook -p ${sbPort} -s ${options.staticFolder}` : `start-storybook -p ${sbPort}`;
    const buildStorybookCmd = options !== null && options !== void 0 && options.staticFolder ? `build-storybook -s ${options.staticFolder}` : `build-storybook`;
    const preCommand = options !== null && options !== void 0 && options.preCommand ? this.getRunCommand(options.preCommand) : undefined;
    this.addScripts({
      storybook: [preCommand, storybookCmd].filter(Boolean).join(' && '),
      'build-storybook': [preCommand, buildStorybookCmd].filter(Boolean).join(' && ')
    });
  }

  addESLintConfig() {
    const packageJson = this.retrievePackageJson();
    (0, _PackageJsonHelper.writePackageJson)(Object.assign({}, packageJson, {
      eslintConfig: Object.assign({}, packageJson.eslintConfig, {
        overrides: [...(packageJson.eslintConfig.overrides || []), {
          files: ['**/*.stories.*'],
          rules: {
            'import/no-anonymous-default-export': 'off'
          }
        }]
      })
    }));
  }

  addScripts(scripts) {
    const packageJson = this.retrievePackageJson();
    (0, _PackageJsonHelper.writePackageJson)(Object.assign({}, packageJson, {
      scripts: Object.assign({}, packageJson.scripts, scripts)
    }));
  }

  executeCommand(command, args, stdio) {
    var _commandResult$stdout;

    const commandResult = (0, _crossSpawn.sync)(command, args, {
      stdio: stdio !== null && stdio !== void 0 ? stdio : 'pipe',
      encoding: 'utf-8'
    });

    if (commandResult.status !== 0) {
      var _commandResult$stderr;

      throw new Error((_commandResult$stderr = commandResult.stderr) !== null && _commandResult$stderr !== void 0 ? _commandResult$stderr : '');
    }

    return (_commandResult$stdout = commandResult.stdout) !== null && _commandResult$stdout !== void 0 ? _commandResult$stdout : '';
  }

}

exports.JsPackageManager = JsPackageManager;