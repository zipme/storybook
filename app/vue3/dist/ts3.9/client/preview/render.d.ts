import { RenderContext } from './types';
export declare const propsContainer: {
    props: {
        [x: string]: any;
    };
};
export declare const app: import("vue").App<Element>;
export declare function render({ storyFn, kind, name, args, showMain, showError, showException, }: RenderContext): void;
