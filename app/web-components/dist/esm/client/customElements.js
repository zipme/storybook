/* eslint-disable no-underscore-dangle */

/* global window */
export function isValidComponent(tagName) {
  if (!tagName) {
    return false;
  }

  if (typeof tagName === 'string') {
    return true;
  }

  throw new Error('Provided component needs to be a string. e.g. component: "my-element"');
}
export function isValidMetaData(customElements) {
  if (!customElements) {
    return false;
  }

  if (customElements.tags && Array.isArray(customElements.tags)) {
    return true;
  }

  throw new Error("You need to setup valid meta data in your config.js via setCustomElements().\n    See the readme of addon-docs for web components for more details.");
}
/**
 * @param customElements any for now as spec is not super stable yet
 */

export function setCustomElements(customElements) {
  // @ts-ignore
  window.__STORYBOOK_CUSTOM_ELEMENTS__ = customElements;
}
export function getCustomElements() {
  // @ts-ignore
  return window.__STORYBOOK_CUSTOM_ELEMENTS__;
}