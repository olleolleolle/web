/** @type { import('@web/storybook-framework-web-components').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.stories.js'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@web/storybook-framework-web-components',
    builder: {
      // TODO: custom config
    },
  },
  wdsFinal(config) {
    return {
      ...config,
      middleware: [
        // TODO: custom middleware
      ],
    };
  },
  rollupFinal(config) {
    return {
      ...config,
      // TODO: custom config */
    };
  },
};
export default config;
