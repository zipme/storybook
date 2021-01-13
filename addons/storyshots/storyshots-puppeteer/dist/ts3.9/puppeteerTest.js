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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.puppeteerTest = void 0;
var node_logger_1 = require("@storybook/node-logger");
var url_1 = require("./url");
var config_1 = require("./config");
exports.puppeteerTest = function (customConfig) {
    if (customConfig === void 0) { customConfig = {}; }
    var _a = __assign(__assign({}, config_1.defaultPuppeteerTestConfig), customConfig), storybookUrl = _a.storybookUrl, chromeExecutablePath = _a.chromeExecutablePath, getGotoOptions = _a.getGotoOptions, customizePage = _a.customizePage, getCustomBrowser = _a.getCustomBrowser, testBody = _a.testBody, setupTimeout = _a.setupTimeout, testTimeout = _a.testTimeout;
    var browser; // holds ref to browser. (ie. Chrome)
    var page; // Hold ref to the page to screenshot.
    var testFn = function (_a) {
        var context = _a.context;
        return __awaiter(void 0, void 0, void 0, function () {
            var kind, framework, name, id, url, options, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        kind = context.kind, framework = context.framework, name = context.name, id = context.id;
                        if (framework === 'react-native') {
                            // Skip tests since RN is not a browser environment.
                            node_logger_1.logger.error("It seems you are running puppeteer test on RN app and it's not supported. Skipping test.");
                            return [2 /*return*/];
                        }
                        url = url_1.constructUrl(storybookUrl, id);
                        options = { context: context, url: url };
                        if (testBody.filter != null && !testBody.filter(options)) {
                            return [2 /*return*/];
                        }
                        if (!browser || !page) {
                            node_logger_1.logger.error("Error when running puppeteer test for " + kind + " - " + name + " : It seems the headless browser is not running.");
                            throw new Error('no-headless-browser-running');
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, customizePage(page)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, page.goto(url, getGotoOptions(options))];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        node_logger_1.logger.error("Error when connecting to " + url + ", did you start or build the storybook first? A storybook instance should be running or a static version should be built when using puppeteer test feature.");
                        throw e_1;
                    case 5: return [4 /*yield*/, testBody(page, options)];
                    case 6:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    testFn.timeout = testTimeout;
    var cleanup = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(getCustomBrowser && page)) return [3 /*break*/, 2];
                    return [4 /*yield*/, page.close()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    if (!browser) return [3 /*break*/, 4];
                    return [4 /*yield*/, browser.close()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    process.on('SIGINT', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cleanup()];
                case 1:
                    _a.sent();
                    process.exit();
                    return [2 /*return*/];
            }
        });
    }); });
    testFn.afterAll = cleanup;
    var beforeAll = function () { return __awaiter(void 0, void 0, void 0, function () {
        var puppeteer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!getCustomBrowser) return [3 /*break*/, 2];
                    return [4 /*yield*/, getCustomBrowser()];
                case 1:
                    browser = _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    puppeteer = require('puppeteer');
                    return [4 /*yield*/, puppeteer.launch({
                            args: ['--no-sandbox ', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
                            executablePath: chromeExecutablePath,
                        })];
                case 3:
                    // add some options "no-sandbox" to make it work properly on some Linux systems as proposed here: https://github.com/Googlechrome/puppeteer/issues/290#issuecomment-322851507
                    browser = _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, browser.newPage()];
                case 5:
                    page = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    beforeAll.timeout = setupTimeout;
    testFn.beforeAll = beforeAll;
    return testFn;
};
