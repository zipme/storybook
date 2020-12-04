import type { StorybookConfig } from '@storybook/react/types';

module.exports = {
  stories: ['./src/*.stories.*'],
  logLevel: 'debug',
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        sourceLoaderOptions: {
          parser: 'typescript',
          injectStoryParameters: false,
        },
      },
    },
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/addon-storysource',
  ],
  typescript: {
    check: true,
    checkOptions: {},
    reactDocgenTypescriptOptions: {
      propFilter: (prop) => ['label', 'disabled'].includes(prop.name),
    },
  },
} as StorybookConfig;
