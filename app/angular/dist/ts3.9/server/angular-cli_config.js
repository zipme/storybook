"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyAngularCliWebpackConfig = exports.getAngularCliWebpackConfigOptions = exports.getLeadingAngularCliProject = exports.getAngularCliConfig = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var node_logger_1 = require("@storybook/node-logger");
var tsconfig_paths_webpack_plugin_1 = require("tsconfig-paths-webpack-plugin");
var strip_json_comments_1 = __importDefault(require("strip-json-comments"));
var angular_cli_utils_1 = require("./angular-cli_utils");
function getTsConfigOptions(tsConfigPath) {
    var basicOptions = {
        options: {},
        raw: {},
        fileNames: [],
        errors: [],
    };
    if (!fs_1.default.existsSync(tsConfigPath)) {
        return basicOptions;
    }
    var tsConfig = JSON.parse(strip_json_comments_1.default(fs_1.default.readFileSync(tsConfigPath, 'utf8')));
    var baseUrl = tsConfig.compilerOptions.baseUrl;
    if (baseUrl) {
        var tsConfigDirName = path_1.default.dirname(tsConfigPath);
        basicOptions.options.baseUrl = path_1.default.resolve(tsConfigDirName, baseUrl);
    }
    return basicOptions;
}
function getAngularCliConfig(dirToSearch) {
    var possibleConfigNames = ['angular.json', 'workspace.json'];
    var possibleConfigPaths = possibleConfigNames.map(function (name) { return path_1.default.join(dirToSearch, name); });
    var validIndex = possibleConfigPaths.findIndex(function (configPath) { return fs_1.default.existsSync(configPath); });
    if (validIndex === -1) {
        node_logger_1.logger.error("Could not find angular.json using " + possibleConfigPaths[0]);
        return undefined;
    }
    return JSON.parse(strip_json_comments_1.default(fs_1.default.readFileSync(possibleConfigPaths[validIndex], 'utf8')));
}
exports.getAngularCliConfig = getAngularCliConfig;
function getLeadingAngularCliProject(ngCliConfig) {
    if (!ngCliConfig) {
        return null;
    }
    var defaultProject = ngCliConfig.defaultProject;
    var projects = ngCliConfig.projects;
    if (!projects || !Object.keys(projects).length) {
        throw new Error('angular.json must have projects entry.');
    }
    var projectName;
    var firstProjectName = Object.keys(projects)[0];
    var environmentProjectName = process.env.STORYBOOK_ANGULAR_PROJECT;
    if (environmentProjectName) {
        projectName = environmentProjectName;
    }
    else if (projects.storybook) {
        projectName = 'storybook';
    }
    else if (defaultProject && projects[defaultProject]) {
        projectName = defaultProject;
    }
    else if (projects[firstProjectName]) {
        projectName = firstProjectName;
    }
    var project = projects[projectName];
    if (!project) {
        node_logger_1.logger.error("Could not find angular project '" + projectName + "' in angular.json.");
    }
    else {
        node_logger_1.logger.info("=> Using angular project '" + projectName + "' for configuring Storybook.");
    }
    if (project && !project.architect.build) {
        node_logger_1.logger.error("architect.build is not defined for project '" + projectName + "'.");
    }
    return project;
}
exports.getLeadingAngularCliProject = getLeadingAngularCliProject;
function getAngularCliWebpackConfigOptions(dirToSearch) {
    var angularCliConfig = getAngularCliConfig(dirToSearch);
    var project = getLeadingAngularCliProject(angularCliConfig);
    if (!angularCliConfig || !project.architect.build) {
        return null;
    }
    var projectOptions = project.architect.build.options;
    var normalizedAssets = angular_cli_utils_1.normalizeAssetPatterns(projectOptions.assets, dirToSearch, project.sourceRoot);
    var projectRoot = path_1.default.resolve(dirToSearch, project.root);
    var tsConfigPath = path_1.default.resolve(dirToSearch, projectOptions.tsConfig);
    var tsConfig = getTsConfigOptions(tsConfigPath);
    var budgets = projectOptions.budgets || [];
    var scripts = projectOptions.scripts || [];
    var outputPath = projectOptions.outputPath || 'dist/storybook-angular';
    var styles = projectOptions.styles || [];
    return {
        root: dirToSearch,
        projectRoot: projectRoot,
        tsConfigPath: tsConfigPath,
        tsConfig: tsConfig,
        supportES2015: false,
        buildOptions: __assign(__assign({ sourceMap: false, optimization: {} }, projectOptions), { assets: normalizedAssets, budgets: budgets,
            scripts: scripts,
            styles: styles,
            outputPath: outputPath }),
    };
}
exports.getAngularCliWebpackConfigOptions = getAngularCliWebpackConfigOptions;
// todo add types
function applyAngularCliWebpackConfig(baseConfig, cliWebpackConfigOptions) {
    if (!cliWebpackConfigOptions) {
        return baseConfig;
    }
    if (!angular_cli_utils_1.isBuildAngularInstalled()) {
        node_logger_1.logger.info('=> Using base config because @angular-devkit/build-angular is not installed.');
        return baseConfig;
    }
    var cliParts = angular_cli_utils_1.getAngularCliParts(cliWebpackConfigOptions);
    if (!cliParts) {
        node_logger_1.logger.warn('=> Failed to get angular-cli webpack config.');
        return baseConfig;
    }
    node_logger_1.logger.info('=> Get angular-cli webpack config.');
    var cliCommonConfig = cliParts.cliCommonConfig, cliStyleConfig = cliParts.cliStyleConfig;
    // Don't use storybooks styling rules because we have to use rules created by @angular-devkit/build-angular
    // because @angular-devkit/build-angular created rules have include/exclude for global style files.
    var rulesExcludingStyles = angular_cli_utils_1.filterOutStylingRules(baseConfig);
    // cliStyleConfig.entry adds global style files to the webpack context
    // todo add type for acc
    var entry = __spreadArrays(baseConfig.entry, Object.values(cliStyleConfig.entry).reduce(function (acc, item) { return acc.concat(item); }, []));
    var module = __assign(__assign({}, baseConfig.module), { rules: __spreadArrays(cliStyleConfig.module.rules, rulesExcludingStyles) });
    // We use cliCommonConfig plugins to serve static assets files.
    var plugins = __spreadArrays(cliStyleConfig.plugins, cliCommonConfig.plugins, baseConfig.plugins);
    var resolve = __assign(__assign({}, baseConfig.resolve), { modules: Array.from(new Set(__spreadArrays(baseConfig.resolve.modules, cliCommonConfig.resolve.modules))), plugins: [
            new tsconfig_paths_webpack_plugin_1.TsconfigPathsPlugin({
                configFile: cliWebpackConfigOptions.buildOptions.tsConfig,
                // After ng build my-lib the default value of 'main' in the package.json is 'umd'
                // This causes that you cannot import components directly from dist
                // https://github.com/angular/angular-cli/blob/9f114aee1e009c3580784dd3bb7299bdf4a5918c/packages/angular_devkit/build_angular/src/angular-cli-files/models/webpack-configs/browser.ts#L68
                mainFields: __spreadArrays((cliWebpackConfigOptions.supportES2015 ? ['es2015'] : []), [
                    'browser',
                    'module',
                    'main',
                ]),
            }),
        ] });
    return __assign(__assign({}, baseConfig), { entry: entry,
        module: module,
        plugins: plugins,
        resolve: resolve, resolveLoader: cliCommonConfig.resolveLoader });
}
exports.applyAngularCliWebpackConfig = applyAngularCliWebpackConfig;