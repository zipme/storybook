import { Args as DefaultArgs, Annotations, BaseMeta, BaseStory, Parameters as DefaultParameters } from '@storybook/addons';
import { StoryFnAngularReturnType } from './types';
export { Args, ArgTypes, StoryContext } from '@storybook/addons';
declare type AngularComponent = any;
declare type AngularReturnType = StoryFnAngularReturnType;
/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
export declare type Meta<Args = DefaultArgs> = BaseMeta<AngularComponent> & Annotations<Args, AngularReturnType>;
/**
 * Story function that represents a component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export declare type Story<Args = DefaultArgs> = BaseStory<Args, AngularReturnType> & Annotations<Args, AngularReturnType>;
export declare type Parameters = DefaultParameters & {
    /** Uses legacy angular rendering engine that use dynamic component */
    angularLegacyRendering?: boolean;
};
