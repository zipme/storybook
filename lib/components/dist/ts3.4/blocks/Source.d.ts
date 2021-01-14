import { FunctionComponent } from 'react';
export declare enum SourceError {
    NO_STORY = "There\u2019s no story here.",
    SOURCE_UNAVAILABLE = "Oh no! The source is not available."
}
interface SourceErrorProps {
    error?: SourceError;
}
interface SourceCodeProps {
    language?: string;
    code?: string;
    format?: boolean;
    dark?: boolean;
}
export declare type SourceProps = SourceErrorProps & SourceCodeProps;
/**
 * Syntax-highlighted source code for a component (or anything!)
 */
declare const Source: FunctionComponent<SourceProps>;
export { Source };