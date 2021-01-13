import { NgModule } from '@angular/core';
import { StoryFn } from '@storybook/addons';
import { Subject } from 'rxjs';
import { ICollection, StoryFnAngularReturnType } from '../types';
/**
 * Bootstrap angular application and allows to change the rendering dynamically
 * To be used as a singleton so has to set global properties of render function
 */
export declare class RenderNgAppService {
    private static instance;
    static getInstance(): RenderNgAppService;
    static SELECTOR_STORYBOOK_WRAPPER: string;
    private platform;
    private staticRoot;
    private storyProps$;
    constructor();
    /**
     * Bootstrap main angular module with main component or send only new `props` with storyProps$
     *
     * @param storyFn {StoryFn<StoryFnAngularReturnType>}
     * @param forced {boolean} If :
     * - true render will only use the StoryFn `props' in storyProps observable that will update sotry's component/template properties. Improves performance without reloading the whole module&component if props changes
     * - false fully recharges or initializes angular module & component
     */
    render(storyFn: StoryFn<StoryFnAngularReturnType>, forced: boolean): Promise<void>;
    getNgModuleMetadata: (storyFnAngular: StoryFnAngularReturnType, storyProps$: Subject<ICollection>) => NgModule;
}
