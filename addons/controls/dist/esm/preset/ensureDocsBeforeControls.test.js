import { verifyDocsBeforeControls } from './ensureDocsBeforeControls';
describe.each([[[]], [['@storybook/addon-controls']], [['@storybook/addon-docs']], [['@storybook/addon-controls', '@storybook/addon-docs']], [['@storybook/addon-essentials', '@storybook/addon-docs']], [['@storybook/addon-controls', '@storybook/addon-essentials']], [['@storybook/addon-essentials', '@storybook/addon-controls', '@storybook/addon-docs']]])('verifyDocsBeforeControls', function (input) {
  it("invalid ".concat(input), function () {
    expect(verifyDocsBeforeControls(input)).toBeFalsy();
  });
});
describe.each([[['@storybook/addon-docs', '@storybook/addon-controls']], [['@storybook/addon-docs', 'foo/node_modules/@storybook/addon-controls']], [[{
  name: '@storybook/addon-docs'
}, '@storybook/addon-controls']], [['@storybook/addon-essentials', '@storybook/addon-controls']], [['@storybook/addon-essentials']]])('verifyDocsBeforeControls', function (input) {
  it("valid ".concat(input), function () {
    expect(verifyDocsBeforeControls(input)).toBeTruthy();
  });
});