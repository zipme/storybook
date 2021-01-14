"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var read_pkg_up_1 = require("read-pkg-up");
exports.default = {
    packageJson: read_pkg_up_1.sync({ cwd: __dirname }).packageJson,
    framework: 'angular',
    frameworkPresets: [
        require.resolve('./framework-preset-angular.js'),
        require.resolve('./framework-preset-angular-cli.js'),
    ],
};