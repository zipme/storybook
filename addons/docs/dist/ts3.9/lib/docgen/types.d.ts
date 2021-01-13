import { ArgTypes } from '@storybook/api';
import { PropDef } from './PropDef';
import { Component } from '../../blocks/types';
export declare type PropsExtractor = (component: Component) => {
    rows?: PropDef[];
} | null;
export declare type ArgTypesExtractor = (component: Component) => ArgTypes | null;
export interface DocgenType {
    name: string;
    description?: string;
    required?: boolean;
}
export interface DocgenPropType extends DocgenType {
    value?: any;
    raw?: string;
    computed?: boolean;
}
export interface DocgenFlowType extends DocgenType {
    type?: string;
    raw?: string;
    signature?: any;
    elements?: any[];
}
export interface DocgenTypeScriptType extends DocgenType {
}
export interface DocgenPropDefaultValue {
    value: string;
}
export interface DocgenInfo {
    type?: DocgenPropType;
    flowType?: DocgenFlowType;
    tsType?: DocgenTypeScriptType;
    required: boolean;
    description?: string;
    defaultValue?: DocgenPropDefaultValue;
}
export declare enum TypeSystem {
    JAVASCRIPT = "JavaScript",
    FLOW = "Flow",
    TYPESCRIPT = "TypeScript",
    UNKNOWN = "Unknown"
}
export { PropDef };
