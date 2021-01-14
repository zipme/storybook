"use strict";

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.iterator");

var _commander = _interopRequireDefault(require("commander"));

var _path = _interopRequireDefault(require("path"));

var _chalk = _interopRequireDefault(require("chalk"));

var _envinfo = _interopRequireDefault(require("envinfo"));

var _leven = _interopRequireDefault(require("leven"));

var _readPkgUp = require("read-pkg-up");

var _initiate = _interopRequireDefault(require("./initiate"));

var _add = require("./add");

var _migrate = require("./migrate");

var _extract = require("./extract");

var _upgrade = require("./upgrade");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pkg = (0, _readPkgUp.sync)({
  cwd: __dirname
}).packageJson;
const logger = console;

_commander.default.command('init').description('Initialize Storybook into your project.').option('-f --force', 'Force add Storybook').option('-s --skip-install', 'Skip installing deps').option('-N --use-npm', 'Use npm to install deps').option('-p --parser <babel | babylon | flow | ts | tsx>', 'jscodeshift parser').option('-t --type <type>', 'Add Storybook for a specific project type').option('--story-format <csf | csf-ts | mdx >', 'Generate stories in a specified format').option('-y --yes', 'Answer yes to all prompts').action(options => (0, _initiate.default)(options, pkg));

_commander.default.command('add <addon>').description('Add an addon to your Storybook').option('-N --use-npm', 'Use NPM to build the Storybook server').option('-s --skip-postinstall', 'Skip package specific postinstall config modifications').action((addonName, options) => (0, _add.add)(addonName, options));

_commander.default.command('upgrade').description('Upgrade your Storybook packages to the latest').option('-N --use-npm', 'Use NPM to build the Storybook server').option('-n --dry-run', 'Only check for upgrades, do not install').option('-p --prerelease', 'Upgrade to the pre-release packages').option('-s --skip-check', 'Skip postinstall version consistency checks').action(options => (0, _upgrade.upgrade)(options));

_commander.default.command('info').description('Prints debugging information about the local environment').action(() => {
  logger.log(_chalk.default.bold('\nEnvironment Info:'));

  _envinfo.default.run({
    System: ['OS', 'CPU'],
    Binaries: ['Node', 'Yarn', 'npm'],
    Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
    npmPackages: '@storybook/*',
    npmGlobalPackages: '@storybook/*'
  }).then(logger.log);
});

_commander.default.command('migrate [migration]').description('Run a Storybook codemod migration on your source files').option('-l --list', 'List available migrations').option('-g --glob <glob>', 'Glob for files upon which to apply the migration', '**/*.js').option('-p --parser <babel | babylon | flow | ts | tsx>', 'jscodeshift parser').option('-n --dry-run', 'Dry run: verify the migration exists and show the files to which it will be applied').option('-r --rename <from-to>', 'Rename suffix of matching files after codemod has been applied, e.g. ".js:.ts"').action((migration, {
  configDir,
  glob,
  dryRun,
  list,
  rename,
  parser
}) => {
  (0, _migrate.migrate)(migration, {
    configDir,
    glob,
    dryRun,
    list,
    rename,
    parser,
    logger
  }).catch(err => {
    logger.error(err);
    process.exit(1);
  });
});

_commander.default.command('extract [location] [output]').description('extract stories.json from a built version').action((location = 'storybook-static', output = _path.default.join(location, 'stories.json')) => (0, _extract.extract)(location, output).catch(e => {
  logger.error(e);
  process.exit(1);
}));

_commander.default.on('command:*', ([invalidCmd]) => {
  logger.error(' Invalid command: %s.\n See --help for a list of available commands.', invalidCmd); // eslint-disable-next-line

  const availableCommands = _commander.default.commands.map(cmd => cmd._name);

  const suggestion = availableCommands.find(cmd => (0, _leven.default)(cmd, invalidCmd) < 3);

  if (suggestion) {
    logger.log(`\n Did you mean ${suggestion}?`);
  }

  process.exit(1);
});

_commander.default.usage('<command> [options]').version(pkg.version).parse(process.argv);

if (_commander.default.rawArgs.length < 3) {
  _commander.default.help();
}