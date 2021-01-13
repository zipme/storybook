import { StoryFn } from '@storybook/addons';
import { IRegistry, IContainer } from 'aurelia';
import { StoryFnAureliaReturnType } from './types';
export declare const addRegistries: (...items: IRegistry[]) => (storyFn: StoryFn<StoryFnAureliaReturnType>) => {
    items: IRegistry[];
    customElement: import("aurelia").Constructable<{}>;
    components: Component[] | unknown[];
    template: unknown;
    container: IContainer;
    state: any;
};
export interface Component {
    item?: unknown;
    aliases?: string[];
}
export declare const addComponents: (...components: Component[] | unknown[]) => (storyFn: StoryFn<StoryFnAureliaReturnType>) => {
    components: Component[] | unknown[];
    customElement: import("aurelia").Constructable<{}>;
    template: unknown;
    items: IRegistry[];
    container: IContainer;
    state: any;
};
export declare const addContainer: (container: IContainer) => (storyFn: StoryFn<StoryFnAureliaReturnType>) => {
    container: IContainer;
    customElement: import("aurelia").Constructable<{}>;
    components: Component[] | unknown[];
    template: unknown;
    items: IRegistry[];
    state: any;
};
