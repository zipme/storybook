/// <reference types="webpack-env" />
/// <reference types="node" />
import { ConfigApi, ClientApi, StoryStore } from '@storybook/client-api';
import { Loadable } from './types';
export declare const loadCsf: ({ clientApi, storyStore, configApi, }: {
    clientApi: ClientApi;
    storyStore: StoryStore;
    configApi: ConfigApi;
}) => (framework: string, loadable: Loadable, m: NodeModule, showDeprecationWarning?: boolean) => void;
