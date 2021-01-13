var packageJson = require('../../package.json');

export default {
  packageJson: packageJson,
  framework: 'vue3',
  frameworkPresets: [require.resolve('./framework-preset-vue.js')]
};