import { TransformOptions } from '@babel/core';
export declare const plugins: (string | (string | {
    legacy: boolean;
})[] | (string | {
    loose: boolean;
})[] | (string | {
    loose: boolean;
    useBuiltIns: boolean;
})[] | (string | {
    method: string;
    absoluteImports: string;
    version: any;
})[])[];
export declare const presets: (string | (string | {
    shippedProposals: boolean;
})[])[];
export declare const babelConfig: () => TransformOptions;
