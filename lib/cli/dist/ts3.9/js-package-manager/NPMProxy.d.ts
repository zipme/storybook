import { JsPackageManager } from './JsPackageManager';
export declare class NPMProxy extends JsPackageManager {
    readonly type = "npm";
    initPackageJson(): string;
    getRunStorybookCommand(): string;
    getRunCommand(command: string): string;
    protected runInstall(): void;
    protected runAddDeps(dependencies: string[], installAsDevDependencies: boolean): void;
    protected runGetVersions<T extends boolean>(packageName: string, fetchAllVersions: T): Promise<T extends true ? string[] : string>;
}
