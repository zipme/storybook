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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeAssetPatterns = exports.getAngularCliParts = exports.isBuildAngularInstalled = exports.filterOutStylingRules = void 0;
var fs_1 = __importDefault(require("fs"));
var core_1 = require("@angular-devkit/core");
var node_logger_1 = require("@storybook/node-logger");
// We need to dynamically require theses functions as they are not part of the public api and so their paths
// aren't the same in all versions of Angular
var angularWebpackConfig;
try {
    // First we look for webpack config according to directory structure of Angular 11
    // eslint-disable-next-line global-require
    angularWebpackConfig = require('@angular-devkit/build-angular/src/webpack/configs');
}
catch (e) {
    // We fallback on directory structure of Angular 10 (and below)
    // eslint-disable-next-line global-require
    angularWebpackConfig = require('@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs');
}
var getCommonConfig = angularWebpackConfig.getCommonConfig, getStylesConfig = angularWebpackConfig.getStylesConfig;
function isDirectory(assetPath) {
    try {
        return fs_1.default.statSync(assetPath).isDirectory();
    }
    catch (e) {
        return false;
    }
}
function getAssetsParts(resolvedAssetPath, assetPath) {
    if (isDirectory(core_1.getSystemPath(resolvedAssetPath))) {
        return {
            glob: '**/*',
            input: assetPath,
        };
    }
    return {
        glob: core_1.basename(assetPath),
        input: core_1.dirname(assetPath),
    };
}
function isStylingRule(rule) {
    var test = rule.test;
    if (!test) {
        return false;
    }
    if (!(test instanceof RegExp)) {
        return false;
    }
    return test.test('.css') || test.test('.scss') || test.test('.sass');
}
function filterOutStylingRules(config) {
    return config.module.rules.filter(function (rule) { return !isStylingRule(rule); });
}
exports.filterOutStylingRules = filterOutStylingRules;
function isBuildAngularInstalled() {
    try {
        require.resolve('@angular-devkit/build-angular');
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.isBuildAngularInstalled = isBuildAngularInstalled;
// todo add type
function getAngularCliParts(cliWebpackConfigOptions) {
    try {
        return {
            cliCommonConfig: getCommonConfig(cliWebpackConfigOptions),
            cliStyleConfig: getStylesConfig(cliWebpackConfigOptions),
        };
    }
    catch (e) {
        node_logger_1.logger.warn("Failed to load the Angular CLI config. Using Storybook's default config instead.");
        node_logger_1.logger.warn(e);
        return null;
    }
}
exports.getAngularCliParts = getAngularCliParts;
// todo fix any
function normalizeAssetPatterns(assetPatterns, dirToSearch, sourceRoot) {
    if (!assetPatterns || !assetPatterns.length) {
        return [];
    }
    // todo fix any
    return assetPatterns.map(function (assetPattern) {
        if (typeof assetPattern === 'object') {
            return assetPattern;
        }
        var assetPath = core_1.normalize(assetPattern);
        var resolvedSourceRoot = core_1.resolve(dirToSearch, sourceRoot);
        var resolvedAssetPath = core_1.resolve(dirToSearch, assetPath);
        var parts = getAssetsParts(resolvedAssetPath, assetPath);
        // Output directory for both is the relative path from source root to input.
        var output = core_1.relative(resolvedSourceRoot, core_1.resolve(dirToSearch, parts.input));
        // Return the asset pattern in object format.
        return __assign(__assign({}, parts), { output: output });
    });
}
exports.normalizeAssetPatterns = normalizeAssetPatterns;