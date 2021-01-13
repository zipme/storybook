import { FunctionComponent } from 'react';
import { DocsContextProps } from './DocsContext';
interface TitleProps {
    children?: JSX.Element | string;
}
export declare const extractTitle: ({ kind, parameters }: DocsContextProps) => string;
export declare const Title: FunctionComponent<TitleProps>;
export {};
