"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderNgAppService = void 0;
/* eslint-disable no-undef */
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var rxjs_1 = require("rxjs");
var app_token_1 = require("./app.token");
var ComponentClassFromStoryComponent_1 = require("./ComponentClassFromStoryComponent");
var ComponentClassFromStoryTemplate_1 = require("./ComponentClassFromStoryTemplate");
var NgModulesAnalyzer_1 = require("./NgModulesAnalyzer");
/**
 * Bootstrap angular application and allows to change the rendering dynamically
 * To be used as a singleton so has to set global properties of render function
 */
var RenderNgAppService = /** @class */ (function () {
    function RenderNgAppService() {
        this.staticRoot = document.getElementById('root');
        this.getNgModuleMetadata = function (storyFnAngular, storyProps$) {
            var _a, _b, _c, _d, _e;
            var component = storyFnAngular.component, _f = storyFnAngular.moduleMetadata, moduleMetadata = _f === void 0 ? {} : _f;
            var ComponentToInject = createComponentToInject(storyFnAngular);
            // Look recursively (deep) if the component is not already declared by an import module
            var requiresComponentDeclaration = component &&
                !NgModulesAnalyzer_1.isComponentAlreadyDeclaredInModules(component, moduleMetadata.declarations, moduleMetadata.imports);
            return {
                declarations: __spreadArrays((requiresComponentDeclaration ? [component] : []), [
                    ComponentToInject
                ], ((_a = moduleMetadata.declarations) !== null && _a !== void 0 ? _a : [])),
                imports: __spreadArrays([platform_browser_1.BrowserModule], ((_b = moduleMetadata.imports) !== null && _b !== void 0 ? _b : [])),
                providers: __spreadArrays([app_token_1.storyPropsProvider(storyProps$)], ((_c = moduleMetadata.providers) !== null && _c !== void 0 ? _c : [])),
                entryComponents: __spreadArrays(((_d = moduleMetadata.entryComponents) !== null && _d !== void 0 ? _d : [])),
                schemas: __spreadArrays(((_e = moduleMetadata.schemas) !== null && _e !== void 0 ? _e : [])),
                bootstrap: [ComponentToInject],
            };
        };
        // Adds DOM element that angular will use as bootstrap component
        var storybookWrapperElement = document.createElement(RenderNgAppService.SELECTOR_STORYBOOK_WRAPPER);
        this.staticRoot.innerHTML = '';
        this.staticRoot.appendChild(storybookWrapperElement);
        if (typeof NODE_ENV === 'string' && NODE_ENV !== 'development') {
            try {
                core_1.enableProdMode();
            }
            catch (e) {
                // eslint-disable-next-line no-console
                console.debug(e);
            }
        }
        // platform should be set after enableProdMode()
        this.platform = platform_browser_dynamic_1.platformBrowserDynamic();
    }
    RenderNgAppService.getInstance = function () {
        if (!RenderNgAppService.instance) {
            RenderNgAppService.instance = new RenderNgAppService();
        }
        return RenderNgAppService.instance;
    };
    /**
     * Bootstrap main angular module with main component or send only new `props` with storyProps$
     *
     * @param storyFn {StoryFn<StoryFnAngularReturnType>}
     * @param forced {boolean} If :
     * - true render will only use the StoryFn `props' in storyProps observable that will update sotry's component/template properties. Improves performance without reloading the whole module&component if props changes
     * - false fully recharges or initializes angular module & component
     */
    RenderNgAppService.prototype.render = function (storyFn, forced) {
        return __awaiter(this, void 0, void 0, function () {
            var storyObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storyObj = storyFn();
                        if (forced && this.storyProps$) {
                            this.storyProps$.next(storyObj.props);
                            return [2 /*return*/];
                        }
                        // Complete last BehaviorSubject and create a new one for the current module
                        if (this.storyProps$) {
                            this.storyProps$.complete();
                        }
                        this.storyProps$ = new rxjs_1.BehaviorSubject(storyObj.props);
                        return [4 /*yield*/, this.platform.bootstrapModule(createModuleFromMetadata(this.getNgModuleMetadata(storyObj, this.storyProps$)))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RenderNgAppService.SELECTOR_STORYBOOK_WRAPPER = 'storybook-wrapper';
    return RenderNgAppService;
}());
exports.RenderNgAppService = RenderNgAppService;
var createModuleFromMetadata = function (ngModule) {
    var StoryBookAppModule = /** @class */ (function () {
        function StoryBookAppModule() {
        }
        StoryBookAppModule = __decorate([
            core_1.NgModule(ngModule)
        ], StoryBookAppModule);
        return StoryBookAppModule;
    }());
    return StoryBookAppModule;
};
/**
 * Create a specific component according to whether the story uses a template or a component.
 */
var createComponentToInject = function (_a) {
    var template = _a.template, styles = _a.styles, component = _a.component, props = _a.props;
    // Template has priority over the component
    var isCreatingComponentFromTemplate = !!template;
    return isCreatingComponentFromTemplate
        ? ComponentClassFromStoryTemplate_1.createComponentClassFromStoryTemplate(template, styles)
        : ComponentClassFromStoryComponent_1.createComponentClassFromStoryComponent(component, props);
};
