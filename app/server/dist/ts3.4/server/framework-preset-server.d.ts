import { Configuration } from 'webpack';
export declare function webpack(config: Configuration): {
    module: {
        rules: (import("webpack").RuleSetRule | {
            type: string;
            test: RegExp;
            use: {
                loader: string;
            }[];
        })[];
        noParse?: RegExp | RegExp[] | ((content: string) => boolean);
        unknownContextRequest?: string;
        unknownContextRecursive?: boolean;
        unknownContextRegExp?: RegExp;
        unknownContextCritical?: boolean;
        exprContextRequest?: string;
        exprContextRegExp?: RegExp;
        exprContextRecursive?: boolean;
        exprContextCritical?: boolean;
        wrappedContextRegExp?: RegExp;
        wrappedContextRecursive?: boolean;
        wrappedContextCritical?: boolean;
        strictExportPresence?: boolean;
    };
    mode?: "development" | "production" | "none";
    name?: string;
    context?: string;
    entry?: string | string[] | import("webpack").Entry | import("webpack").EntryFunc;
    devtool?: import("webpack").Options.Devtool;
    output?: import("webpack").Output;
    resolve?: import("webpack").Resolve;
    resolveLoader?: import("webpack").ResolveLoader;
    externals?: string | RegExp | import("webpack").ExternalsObjectElement | import("webpack").ExternalsFunctionElement | import("webpack").ExternalsElement[];
    target?: "web" | "webworker" | "node" | "async-node" | "node-webkit" | "atom" | "electron" | "electron-renderer" | "electron-preload" | "electron-main" | ((compiler?: any) => void);
    bail?: boolean;
    profile?: boolean;
    cache?: boolean | object;
    watch?: boolean;
    watchOptions?: import("webpack").ICompiler.WatchOptions;
    node?: false | import("webpack").Node;
    amd?: {
        [moduleName: string]: boolean;
    };
    recordsPath?: string;
    recordsInputPath?: string;
    recordsOutputPath?: string;
    plugins?: import("webpack").Plugin[];
    stats?: import("webpack").Stats.ToStringOptions;
    performance?: false | import("webpack").Options.Performance;
    parallelism?: number;
    optimization?: import("webpack").Options.Optimization;
};
