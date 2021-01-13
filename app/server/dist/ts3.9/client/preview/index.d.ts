/// <reference types="webpack-env" />
/// <reference types="node" />
import { ClientStoryApi, Loadable } from '@storybook/addons';
import './globals';
import { StoryFnServerReturnType, IStorybookSection } from './types';
interface ClientApi extends ClientStoryApi<StoryFnServerReturnType> {
    setAddon(addon: any): void;
    configure(loader: Loadable, module: NodeModule): void;
    getStorybook(): IStorybookSection[];
    clearDecorators(): void;
    forceReRender(): void;
    raw: () => any;
}
export declare const storiesOf: ClientApi['storiesOf'];
export declare const configure: ClientApi['configure'];
export declare const addDecorator: any, addParameters: any, clearDecorators: any, setAddon: any, forceReRender: any, getStorybook: any, raw: any;
export {};
