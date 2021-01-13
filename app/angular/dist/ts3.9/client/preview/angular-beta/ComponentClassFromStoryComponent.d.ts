import { Type } from '@angular/core';
import { ICollection } from '../types';
/**
 * Wraps the story component into a component
 *
 * @param component
 * @param initialProps
 */
export declare const createComponentClassFromStoryComponent: (component: any, initialProps?: ICollection) => Type<any>;
