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
exports.webpack = void 0;
var path_1 = __importDefault(require("path"));
var webpack_1 = require("webpack");
var autoprefixer_1 = __importDefault(require("autoprefixer"));
var ts_config_1 = __importDefault(require("./ts_config"));
var create_fork_ts_checker_plugin_1 = __importDefault(require("./create-fork-ts-checker-plugin"));
function webpack(config, _a) {
    var configDir = _a.configDir;
    var tsLoaderOptions = ts_config_1.default(configDir);
    return __assign(__assign({}, config), { module: __assign(__assign({}, config.module), { rules: __spreadArrays(config.module.rules, [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: require.resolve('ts-loader'),
                            options: tsLoaderOptions,
                        },
                        { loader: path_1.default.resolve(__dirname, 'ngx-template-loader') },
                    ],
                },
                {
                    test: /[/\\]@angular[/\\]core[/\\].+\.js$/,
                    parser: { system: true },
                },
                {
                    test: /\.html$/,
                    loader: require.resolve('raw-loader'),
                    exclude: /\.async\.html$/,
                },
                {
                    test: /\.s(c|a)ss$/,
                    use: [
                        { loader: require.resolve('raw-loader') },
                        {
                            loader: require.resolve('postcss-loader'),
                            options: {
                                plugins: [autoprefixer_1.default()],
                            },
                        },
                        { loader: require.resolve('sass-loader') },
                    ],
                },
            ]) }), resolve: __assign({}, config.resolve), plugins: __spreadArrays(config.plugins, [
            // See https://github.com/angular/angular/issues/11580#issuecomment-401127742
            new webpack_1.ContextReplacementPlugin(/@angular(\\|\/)core(\\|\/)(fesm5|bundles)/, path_1.default.resolve(__dirname, '..')),
            create_fork_ts_checker_plugin_1.default(tsLoaderOptions),
        ]) });
}
exports.webpack = webpack;