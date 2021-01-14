import { FC } from 'react';
import { PreviewProps as PurePreviewProps } from '@storybook/components';
export declare enum SourceState {
    OPEN = "open",
    CLOSED = "closed",
    NONE = "none"
}
declare type CanvasProps = PurePreviewProps & {
    withSource?: SourceState;
    mdxSource?: string;
};
export declare const Canvas: FC<CanvasProps>;
export {};