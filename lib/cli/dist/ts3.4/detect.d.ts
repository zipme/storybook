import { ProjectType, SupportedLanguage } from './project_types';
import { PackageJson } from './js-package-manager';
export declare function detectFrameworkPreset(packageJson?: {}): ProjectType.UNDETECTED | ProjectType;
export declare function isStorybookInstalled(dependencies: PackageJson | false, force?: boolean): false | ProjectType.ALREADY_HAS_STORYBOOK | ProjectType.UPDATE_PACKAGE_ORGANIZATIONS;
export declare function detectLanguage(): SupportedLanguage;
export declare function detect(options?: {
    force?: boolean;
    html?: boolean;
}): ProjectType.UNDETECTED | ProjectType.UNDETECTED | ProjectType.REACT_SCRIPTS | ProjectType.METEOR | ProjectType;