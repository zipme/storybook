import { TransformOptions } from '@babel/core';
import { Configuration } from 'webpack';
import { StorybookOptions } from '@storybook/core/types';
export declare function babel(config: TransformOptions, options: StorybookOptions): Promise<TransformOptions>;
export declare function babelDefault(config: TransformOptions): Promise<{
    presets: (string | object)[];
    plugins: (string | object)[];
    ast?: boolean;
    auxiliaryCommentAfter?: string;
    auxiliaryCommentBefore?: string;
    root?: string;
    rootMode?: "root" | "upward" | "upward-optional";
    configFile?: string | boolean;
    babelrc?: boolean;
    babelrcRoots?: string | boolean | RegExp | ((filename: string, context: import("@babel/core").MatchPatternContext) => boolean) | import("@babel/core").MatchPattern[];
    envName?: string;
    exclude?: string | RegExp | ((filename: string, context: import("@babel/core").MatchPatternContext) => boolean) | import("@babel/core").MatchPattern[];
    code?: boolean;
    comments?: boolean;
    compact?: boolean | "auto";
    cwd?: string;
    caller?: import("@babel/core").TransformCaller;
    env?: {
        [index: string]: TransformOptions;
    };
    extends?: string;
    filename?: string;
    filenameRelative?: string;
    generatorOpts?: import("@babel/generator").GeneratorOptions;
    getModuleId?: (moduleName: string) => string;
    highlightCode?: boolean;
    ignore?: import("@babel/core").MatchPattern[];
    include?: string | RegExp | ((filename: string, context: import("@babel/core").MatchPatternContext) => boolean) | import("@babel/core").MatchPattern[];
    inputSourceMap?: object;
    minified?: boolean;
    moduleId?: string;
    moduleIds?: boolean;
    moduleRoot?: string;
    only?: import("@babel/core").MatchPattern[];
    overrides?: TransformOptions[];
    parserOpts?: import("@babel/parser").ParserOptions;
    retainLines?: boolean;
    shouldPrintComment?: (commentContents: string) => boolean;
    sourceFileName?: string;
    sourceMaps?: boolean | "inline" | "both";
    sourceRoot?: string;
    sourceType?: "script" | "module" | "unambiguous";
    test?: string | RegExp | ((filename: string, context: import("@babel/core").MatchPatternContext) => boolean) | import("@babel/core").MatchPattern[];
    wrapPluginVisitorMethod?: (pluginAlias: string, visitorType: "enter" | "exit", callback: (path: import("@babel/traverse").NodePath<import("@babel/types").Node>, state: any) => void) => (path: import("@babel/traverse").NodePath<import("@babel/types").Node>, state: any) => void;
}>;
export declare function webpackFinal(config: Configuration, options: StorybookOptions): Promise<Configuration>;