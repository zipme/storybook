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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentDecoratorMetadata = exports.getComponentPropsDecoratorMetadata = exports.getComponentInputsOutputs = void 0;
var core_1 = require("@angular/core");
/**
 * Returns component Inputs / Outputs by browsing these properties and decorator
 */
exports.getComponentInputsOutputs = function (component) {
    var _a, _b;
    var componentMetadata = exports.getComponentDecoratorMetadata(component);
    var componentPropsMetadata = exports.getComponentPropsDecoratorMetadata(component);
    var initialValue = {
        inputs: [],
        outputs: [],
    };
    // Adds the I/O present in @Component metadata
    if (componentMetadata && componentMetadata.inputs) {
        (_a = initialValue.inputs).push.apply(_a, componentMetadata.inputs.map(function (i) { return ({ propName: i, templateName: i }); }));
    }
    if (componentMetadata && componentMetadata.outputs) {
        (_b = initialValue.outputs).push.apply(_b, componentMetadata.outputs.map(function (i) { return ({ propName: i, templateName: i }); }));
    }
    if (!componentPropsMetadata) {
        return initialValue;
    }
    // Browses component properties to extract I/O
    // Filters properties that have the same name as the one present in the @Component property
    return Object.entries(componentPropsMetadata).reduce(function (previousValue, _a) {
        var _b, _c;
        var propertyName = _a[0], value = _a[1][0];
        if (value instanceof core_1.Input) {
            var inputToAdd = {
                propName: propertyName,
                templateName: (_b = value.bindingPropertyName) !== null && _b !== void 0 ? _b : propertyName,
            };
            var previousInputsFiltered = previousValue.inputs.filter(function (i) { return i.templateName !== propertyName; });
            return __assign(__assign({}, previousValue), { inputs: __spreadArrays(previousInputsFiltered, [inputToAdd]) });
        }
        if (value instanceof core_1.Output) {
            var outputToAdd = {
                propName: propertyName,
                templateName: (_c = value.bindingPropertyName) !== null && _c !== void 0 ? _c : propertyName,
            };
            var previousOutputsFiltered = previousValue.outputs.filter(function (i) { return i.templateName !== propertyName; });
            return __assign(__assign({}, previousValue), { outputs: __spreadArrays(previousOutputsFiltered, [outputToAdd]) });
        }
        return previousValue;
    }, initialValue);
};
/**
 * Returns all component decorator properties
 * is used to get all `@Input` and `@Output` Decorator
 */
exports.getComponentPropsDecoratorMetadata = function (component) {
    var decoratorKey = '__prop__metadata__';
    var propsDecorators = Reflect &&
        Reflect.getOwnPropertyDescriptor &&
        Reflect.getOwnPropertyDescriptor(component, decoratorKey)
        ? Reflect.getOwnPropertyDescriptor(component, decoratorKey).value
        : component[decoratorKey];
    return propsDecorators;
};
/**
 * Returns component decorator `@Component`
 */
exports.getComponentDecoratorMetadata = function (component) {
    var decoratorKey = '__annotations__';
    var decorators = Reflect &&
        Reflect.getOwnPropertyDescriptor &&
        Reflect.getOwnPropertyDescriptor(component, decoratorKey)
        ? Reflect.getOwnPropertyDescriptor(component, decoratorKey).value
        : component[decoratorKey];
    return (decorators || []).find(function (d) { return d instanceof core_1.Component; });
};
