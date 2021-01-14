import { LoadedPreset, PresetConfig, Presets, StorybookConfigOptions } from './types';
/**
 * Parse an addon into either a managerEntries or a preset. Throw on invalid input.
 *
 * Valid inputs:
 * - '@storybook/addon-actions/register'
 *   =>  { type: 'managerEntries', item }
 *
 * - '@storybook/addon-docs/preset'
 *   =>  { type: 'presets', item }
 *
 * - '@storybook/addon-docs'
 *   =>  { type: 'presets', item: '@storybook/addon-docs/preset' }
 *
 * - { name: '@storybook/addon-docs(/preset)?', options: { ... } }
 *   =>  { type: 'presets', item: { name: '@storybook/addon-docs/preset', options } }
 */
export declare const resolveAddonName: (configDir: string, name: string) => {
    name: string;
    type: string;
};
export declare function loadPreset(input: PresetConfig, level: number, storybookOptions: StorybookConfigOptions): LoadedPreset[];
declare function getPresets(presets: PresetConfig[], storybookOptions?: StorybookConfigOptions): Presets;
export default getPresets;