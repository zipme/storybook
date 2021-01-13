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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponentClassFromStoryComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var app_token_1 = require("./app.token");
var NgComponentAnalyzer_1 = require("./NgComponentAnalyzer");
var RenderNgAppService_1 = require("./RenderNgAppService");
var getNamesOfInputsOutputsDefinedInProps = function (ngComponentInputsOutputs, props) {
    if (props === void 0) { props = {}; }
    var inputs = ngComponentInputsOutputs.inputs
        .filter(function (i) { return i.templateName in props; })
        .map(function (i) { return i.templateName; });
    var outputs = ngComponentInputsOutputs.outputs
        .filter(function (o) { return o.templateName in props; })
        .map(function (o) { return o.templateName; });
    return {
        inputs: inputs,
        outputs: outputs,
        otherProps: Object.keys(props).filter(function (k) { return !__spreadArrays(inputs, outputs).includes(k); }),
    };
};
/**
 * Wraps the story component into a component
 *
 * @param component
 * @param initialProps
 */
exports.createComponentClassFromStoryComponent = function (component, initialProps) {
    var ngComponentMetadata = NgComponentAnalyzer_1.getComponentDecoratorMetadata(component);
    var ngComponentInputsOutputs = NgComponentAnalyzer_1.getComponentInputsOutputs(component);
    var _a = getNamesOfInputsOutputsDefinedInProps(ngComponentInputsOutputs, initialProps), initialInputs = _a.inputs, initialOutputs = _a.outputs, initialOtherProps = _a.otherProps;
    var templateInputs = initialInputs.map(function (i) { return "[" + i + "]=\"" + i + "\""; }).join(' ');
    var templateOutputs = initialOutputs.map(function (i) { return "(" + i + ")=\"" + i + "($event)\""; }).join(' ');
    var StoryBookComponentWrapperComponent = /** @class */ (function () {
        function StoryBookComponentWrapperComponent(storyProps$, changeDetectorRef) {
            this.storyProps$ = storyProps$;
            this.changeDetectorRef = changeDetectorRef;
            // Initializes template Inputs/Outputs values
            Object.assign(this, initialProps);
        }
        StoryBookComponentWrapperComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            // Initializes properties that are not Inputs | Outputs
            // Allows story props to override local component properties
            initialOtherProps.forEach(function (p) {
                _this.storyComponentElementRef[p] = initialProps[p];
            });
            // `markForCheck` the component in case this uses changeDetection: OnPush
            // And then forces the `detectChanges`
            this.storyComponentViewContainerRef.injector.get(core_1.ChangeDetectorRef).markForCheck();
            this.changeDetectorRef.detectChanges();
            // Once target component has been initialized, the storyProps$ observable keeps target component inputs up to date
            this.storyPropsSubscription = this.storyProps$
                .pipe(operators_1.skip(1), operators_1.map(function (props) {
                // removes component output in props
                var outputsKeyToRemove = ngComponentInputsOutputs.outputs.map(function (o) { return o.templateName; });
                return Object.entries(props).reduce(function (prev, _a) {
                    var _b;
                    var key = _a[0], value = _a[1];
                    return (__assign(__assign({}, prev), (!outputsKeyToRemove.includes(key) && (_b = {}, _b[key] = value, _b))));
                }, {});
            }), operators_1.map(function (props) {
                // In case a component uses an input with `bindingPropertyName` (ex: @Input('name'))
                // find the value of the local propName in the component Inputs
                // otherwise use the input key
                return Object.entries(props).reduce(function (prev, _a) {
                    var _b, _c;
                    var propKey = _a[0], value = _a[1];
                    var input = ngComponentInputsOutputs.inputs.find(function (o) { return o.templateName === propKey; });
                    return __assign(__assign({}, prev), (input ? (_b = {}, _b[input.propName] = value, _b) : (_c = {}, _c[propKey] = value, _c)));
                }, {});
            }))
                .subscribe(function (props) {
                // Replace inputs with new ones from props
                Object.assign(_this.storyComponentElementRef, props);
                // `markForCheck` the component in case this uses changeDetection: OnPush
                // And then forces the `detectChanges`
                _this.storyComponentViewContainerRef.injector.get(core_1.ChangeDetectorRef).markForCheck();
                _this.changeDetectorRef.detectChanges();
            });
        };
        StoryBookComponentWrapperComponent.prototype.ngOnDestroy = function () {
            if (this.storyPropsSubscription != null) {
                this.storyPropsSubscription.unsubscribe();
            }
        };
        __decorate([
            core_1.ViewChild('storyComponentRef', { static: true }),
            __metadata("design:type", core_1.ElementRef)
        ], StoryBookComponentWrapperComponent.prototype, "storyComponentElementRef", void 0);
        __decorate([
            core_1.ViewChild('storyComponentRef', { read: core_1.ViewContainerRef, static: true }),
            __metadata("design:type", core_1.ViewContainerRef)
        ], StoryBookComponentWrapperComponent.prototype, "storyComponentViewContainerRef", void 0);
        StoryBookComponentWrapperComponent = __decorate([
            core_1.Component({
                selector: RenderNgAppService_1.RenderNgAppService.SELECTOR_STORYBOOK_WRAPPER,
                // Simulates the `component` integration in a template
                // `props` are converted into Inputs/Outputs to be added directly in the template so as the component can use them during its initailization
                // - The outputs are connected only once here
                // - Only inputs present in initial `props` value are added. They will be overwritten and completed as necessary after the component is initialized
                template: "<" + ngComponentMetadata.selector + " " + templateInputs + " " + templateOutputs + " #storyComponentRef></" + ngComponentMetadata.selector + ">",
            }),
            __param(0, core_1.Inject(app_token_1.STORY_PROPS)),
            __metadata("design:paramtypes", [rxjs_1.Subject,
                core_1.ChangeDetectorRef])
        ], StoryBookComponentWrapperComponent);
        return StoryBookComponentWrapperComponent;
    }());
    return StoryBookComponentWrapperComponent;
};
