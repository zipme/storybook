import { Configuration } from 'webpack';
import { PresetsOptions, Ref, StorybookConfigOptions } from '../types';
export declare const getAutoRefs: (options: {
    configDir: string;
}, disabledRefs?: string[]) => Promise<Ref[]>;
declare const loadConfig: (options: PresetsOptions & StorybookConfigOptions) => Promise<Configuration>;
export default loadConfig;