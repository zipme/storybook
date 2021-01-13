import { extractComponentDescription } from '../../lib/docgen';
export declare const parameters: {
    docs: {
        inlineStories: boolean;
        prepareForInline: (storyFn: import("@storybook/addons").StoryFn<unknown>, context: import("@storybook/addons").StoryContext) => import("react").DetailedReactHTMLElement<import("react").HTMLAttributes<any>, any>;
        extractArgTypes: import("../../lib/docgen").ArgTypesExtractor;
        extractComponentDescription: typeof extractComponentDescription;
    };
};
