import { Component, Input, Output } from '@angular/core';
export declare type ComponentInputsOutputs = {
    inputs: {
        propName: string;
        templateName: string;
    }[];
    outputs: {
        propName: string;
        templateName: string;
    }[];
};
/**
 * Returns component Inputs / Outputs by browsing these properties and decorator
 */
export declare const getComponentInputsOutputs: (component: any) => ComponentInputsOutputs;
/**
 * Returns all component decorator properties
 * is used to get all `@Input` and `@Output` Decorator
 */
export declare const getComponentPropsDecoratorMetadata: (component: any) => Record<string, (Input | Output)[]>;
/**
 * Returns component decorator `@Component`
 */
export declare const getComponentDecoratorMetadata: (component: any) => Component | undefined;
