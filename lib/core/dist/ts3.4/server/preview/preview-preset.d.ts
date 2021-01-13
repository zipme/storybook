export declare const webpack: (_: unknown, options: any) => Promise<{
    mode: string;
    bail: boolean;
    devtool: string;
    entry: any;
    output: {
        path: string;
        filename: string;
        publicPath: string;
    };
    plugins: any[];
    module: {
        rules: (import("webpack").RuleSetRule | {
            test: RegExp;
            use: {
                loader: string;
                options: any;
            }[];
            include: string[];
            exclude: RegExp;
        })[];
    };
    resolve: {
        extensions: string[];
        modules: string[];
        mainFields: string[];
        alias: any;
        plugins: any[];
    };
    resolveLoader: {
        plugins: any[];
    };
    optimization: {
        splitChunks: {
            chunks: string;
        };
        runtimeChunk: boolean;
        sideEffects: boolean;
        usedExports: boolean;
        concatenateModules: boolean;
        minimizer: import("terser-webpack-plugin")[];
    };
    performance: {
        hints: string | boolean;
    };
}>;
export declare const entries: (_: unknown, options: any) => Promise<string[]>;
export * from '../common/common-preset';
