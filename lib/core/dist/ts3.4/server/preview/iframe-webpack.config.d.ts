import TerserWebpackPlugin from 'terser-webpack-plugin';
declare const _default: ({ configDir, babelOptions, entries, stories, outputDir, quiet, packageJson, configType, framework, frameworkPath, presets, typescriptOptions, }: any) => Promise<{
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
        minimizer: TerserWebpackPlugin[];
    };
    performance: {
        hints: string | boolean;
    };
}>;
export default _default;
