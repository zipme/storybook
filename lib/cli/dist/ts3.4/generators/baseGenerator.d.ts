import { NpmOptions } from '../NpmOptions';
import { StoryFormat, SupportedLanguage, SupportedFrameworks } from '../project_types';
import { JsPackageManager } from '../js-package-manager';
export declare type GeneratorOptions = {
    language: SupportedLanguage;
    storyFormat: StoryFormat;
};
export interface FrameworkOptions {
    extraPackages?: string[];
    extraAddons?: string[];
    staticDir?: string;
    addScripts?: boolean;
    addComponents?: boolean;
    addBabel?: boolean;
    addESLint?: boolean;
}
export declare type Generator = (packageManager: JsPackageManager, npmOptions: NpmOptions, options: GeneratorOptions) => Promise<void>;
export declare function baseGenerator(packageManager: JsPackageManager, npmOptions: NpmOptions, { language }: GeneratorOptions, framework: SupportedFrameworks, options?: FrameworkOptions): Promise<void>;