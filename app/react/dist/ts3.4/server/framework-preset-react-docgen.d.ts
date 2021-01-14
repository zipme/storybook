import { TransformOptions } from '@babel/core';
import { Configuration } from 'webpack';
import { StorybookOptions } from './types';
export declare function babel(config: TransformOptions, { typescriptOptions }: StorybookOptions): TransformOptions;
export declare function webpackFinal(config: Configuration, { typescriptOptions }: StorybookOptions): Configuration;