"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseGenerator = baseGenerator;

var _helpers = require("../helpers");

var _configure = require("./configure");

const defaultOptions = {
  extraPackages: [],
  extraAddons: [],
  staticDir: undefined,
  addScripts: true,
  addComponents: true,
  addBabel: true,
  addESLint: false
};

async function baseGenerator(packageManager, npmOptions, {
  language
}, framework, options = defaultOptions) {
  const {
    extraAddons,
    extraPackages,
    staticDir,
    addScripts,
    addComponents,
    addBabel,
    addESLint
  } = Object.assign({}, defaultOptions, options); // added to main.js
  // make sure to update `canUsePrebuiltManager` in dev-server.js and build-manager-config/main.js when this list changes

  const addons = ['@storybook/addon-links', '@storybook/addon-essentials']; // added to package.json

  const addonPackages = [...addons, '@storybook/addon-actions'];
  const yarn2Dependencies = packageManager.type === 'yarn2' ? ['@storybook/addon-docs', '@mdx-js/react'] : [];
  const packages = [`@storybook/${framework}`, ...addonPackages, ...extraPackages, ...extraAddons, ...yarn2Dependencies].filter(Boolean);
  const versionedPackages = await packageManager.getVersionedPackages(...packages);
  (0, _configure.configure)(framework, [...addons, ...extraAddons]);

  if (addComponents) {
    (0, _helpers.copyComponents)(framework, language);
  }

  const packageJson = packageManager.retrievePackageJson();
  const babelDependencies = addBabel ? await (0, _helpers.getBabelDependencies)(packageManager, packageJson) : [];
  packageManager.addDependencies(Object.assign({}, npmOptions, {
    packageJson
  }), [...versionedPackages, ...babelDependencies]);

  if (addScripts) {
    packageManager.addStorybookCommandInScripts({
      port: 6006,
      staticFolder: staticDir
    });
  }

  if (addESLint) {
    packageManager.addESLintConfig();
  }
}