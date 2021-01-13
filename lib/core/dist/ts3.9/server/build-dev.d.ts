import { DevCliOptions } from './cli';
import { ReleaseNotesData, PackageJson, LoadOptions } from './types';
export declare const RELEASE_NOTES_CACHE_KEY = "releaseNotesData";
export declare const getReleaseNotesData: (currentVersionToParse: string, fileSystemCache: any) => Promise<ReleaseNotesData>;
export declare function buildDevStandalone(options: DevCliOptions & LoadOptions & {
    packageJson: PackageJson;
    ignorePreview: boolean;
    docsMode: boolean;
    configDir: string;
    cache: any;
}): Promise<void>;
export declare function buildDev({ packageJson, ...loadOptions }: {
    packageJson: PackageJson;
} & LoadOptions): Promise<void>;
