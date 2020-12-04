import React from 'react';
import { enhanceArgTypes } from './enhanceArgTypes';

const DocsContainer = React.lazy(() => import('../../blocks/DocsContainer'));
const DocsPage = React.lazy(() => import('../../blocks/DocsPage'));

export const parameters = {
  docs: {
    inlineStories: false,
    container: DocsContainer,
    page: DocsPage,
    iframeHeight: 100,
  },
};

export const argTypesEnhancers = [enhanceArgTypes];
