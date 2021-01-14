import { Configuration } from 'webpack';
import { PresetConfig, PresetsOptions, StorybookConfigOptions } from './types';
export declare function filterPresetsConfig(presetsConfig: PresetConfig[]): PresetConfig[];
declare const loadConfig: (options: PresetsOptions & StorybookConfigOptions) => Promise<Configuration>;
export default loadConfig;