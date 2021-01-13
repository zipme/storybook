export var typeScriptDefaults = {
  check: false,
  // 'react-docgen' faster but produces lower quality typescript results
  reactDocgen: 'react-docgen-typescript',
  reactDocgenTypescriptOptions: {
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
    propFilter: function (prop) {
      return prop.parent ? !/node_modules/.test(prop.parent.fileName) : true;
    }
  }
};