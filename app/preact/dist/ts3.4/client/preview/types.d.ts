/// <reference types="webpack-env" />
/// <reference types="node" />
import { ClientStoryApi, Loadable } from '@storybook/addons';
export { RenderContext } from '@storybook/core';
export declare type StoryFnPreactReturnType = string | Node | preact.JSX.Element;
export interface ShowErrorArgs {
    title: string;
    description: string;
}
export interface IStorybookStory {
    name: string;
    render: () => any;
}
export interface IStorybookSection {
    kind: string;
    stories: IStorybookStory[];
}
export interface ClientApi extends ClientStoryApi<StoryFnPreactReturnType> {
    setAddon(addon: any): void;
    configure(loader: Loadable, module: NodeModule): void;
    getStorybook(): IStorybookSection[];
    clearDecorators(): void;
    forceReRender(): void;
    raw: () => any;
    load: (...args: any[]) => void;
}
