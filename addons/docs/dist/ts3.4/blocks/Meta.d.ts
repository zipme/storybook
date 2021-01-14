import { FC } from 'react';
import { Args, ArgTypes, Parameters } from '@storybook/addons';
import { Component } from './types';
declare type Decorator = (...args: any) => any;
interface MetaProps {
    title: string;
    component?: Component;
    subcomponents?: Record<string, Component>;
    decorators?: [
        Decorator
    ];
    parameters?: Parameters;
    args?: Args;
    argTypes?: ArgTypes;
}
/**
 * This component is used to declare component metadata in docs
 * and gets transformed into a default export underneath the hood.
 */
export declare const Meta: FC<MetaProps>;
export {};