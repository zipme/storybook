export default function (configDir: string): {
    transpileOnly: boolean;
    compilerOptions: {
        emitDecoratorMetadata: boolean;
    };
    configFile: string;
};
