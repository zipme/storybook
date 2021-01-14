export declare type SupportedFrameworks = 'react' | 'react-native' | 'vue' | 'vue3' | 'angular' | 'mithril' | 'riot' | 'ember' | 'marionette' | 'marko' | 'meteor' | 'preact' | 'svelte' | 'rax' | 'aurelia' | 'html' | 'web-components';
export declare enum ProjectType {
    UNDETECTED = "UNDETECTED",
    REACT_SCRIPTS = "REACT_SCRIPTS",
    METEOR = "METEOR",
    REACT = "REACT",
    REACT_NATIVE = "REACT_NATIVE",
    REACT_PROJECT = "REACT_PROJECT",
    WEBPACK_REACT = "WEBPACK_REACT",
    VUE = "VUE",
    VUE3 = "VUE3",
    SFC_VUE = "SFC_VUE",
    ANGULAR = "ANGULAR",
    EMBER = "EMBER",
    ALREADY_HAS_STORYBOOK = "ALREADY_HAS_STORYBOOK",
    UPDATE_PACKAGE_ORGANIZATIONS = "UPDATE_PACKAGE_ORGANIZATIONS",
    WEB_COMPONENTS = "WEB_COMPONENTS",
    MITHRIL = "MITHRIL",
    MARIONETTE = "MARIONETTE",
    MARKO = "MARKO",
    HTML = "HTML",
    RIOT = "RIOT",
    PREACT = "PREACT",
    SVELTE = "SVELTE",
    RAX = "RAX",
    AURELIA = "AURELIA"
}
export declare const SUPPORTED_FRAMEWORKS: SupportedFrameworks[];
export declare enum StoryFormat {
    CSF = "csf",
    /** @deprecated only template-csf left for some frameworks */
    CSF_TYPESCRIPT = "csf-ts",
    /** @deprecated only template-csf left for some frameworks */
    MDX = "mdx"
}
export declare enum SupportedLanguage {
    JAVASCRIPT = "javascript",
    TYPESCRIPT = "typescript"
}
export declare type TemplateMatcher = {
    files?: boolean[];
    dependencies?: boolean[];
    peerDependencies?: boolean[];
};
export declare type TemplateConfiguration = {
    preset: ProjectType;
    /** will be checked both against dependencies and devDependencies */
    dependencies?: string[] | {
        [key: string]: (version: string) => boolean;
    };
    peerDependencies?: string[] | {
        [key: string]: (version: string) => boolean;
    };
    files?: string[];
    matcherFunction: (matcher: TemplateMatcher) => boolean;
};
/**
 * Configuration to match a storybook preset template.
 *
 * This has to be an array sorted in order of specificity/priority.
 * Reason: both REACT and WEBPACK_REACT have react as dependency,
 * therefore WEBPACK_REACT has to come first, as it's more specific.
 */
export declare const supportedTemplates: TemplateConfiguration[];
export declare const installableProjectTypes: string[];