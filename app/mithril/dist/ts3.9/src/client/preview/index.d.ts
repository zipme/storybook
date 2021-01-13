/// <reference types="webpack-env" />
/// <reference types="node" />
import './globals';
import { ClientStoryApi, Loadable } from '@storybook/addons';
import { IStorybookSection, StoryFnMithrilReturnType } from './types';
declare const forceReRender: any;
interface ClientApi extends ClientStoryApi<StoryFnMithrilReturnType> {
    setAddon(addon: any): void;
    configure(loader: Loadable, module: NodeModule): void;
    getStorybook(): IStorybookSection[];
    clearDecorators(): void;
    forceReRender(): void;
    raw: () => any;
}
export declare const storiesOf: ClientApi['storiesOf'];
export declare const configure: ClientApi['configure'];
export declare const setAddon: any;
export declare const addDecorator: any;
export declare const addParameters: any;
export declare const clearDecorators: any;
export declare const getStorybook: any;
export declare const raw: any;
export { forceReRender };
