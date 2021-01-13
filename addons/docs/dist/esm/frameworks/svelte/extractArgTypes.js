import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.function.name";
import "core-js/modules/web.dom-collections.for-each";
import { logger } from '@storybook/client-logger';
export var extractArgTypes = function extractArgTypes(component) {
  try {
    // eslint-disable-next-line new-cap
    var comp = new component({
      props: {}
    }); // eslint-disable-next-line no-underscore-dangle

    var docgen = comp.__docgen;

    if (docgen) {
      return createArgTypes(docgen);
    }
  } catch (err) {
    logger.log("Error extracting argTypes: ".concat(err));
  }

  return {};
};
export var createArgTypes = function createArgTypes(docgen) {
  var results = {};
  docgen.data.forEach(function (item) {
    results[item.name] = {
      control: {
        type: parseType(item.type.type)
      },
      name: item.name,
      description: item.description,
      type: {},
      defaultValue: item.defaultValue,
      table: {
        defaultValue: {
          summary: item.defaultValue
        }
      }
    };
  });
  return results;
};
/**
 * Function to convert the type from sveltedoc-parser to a storybook type
 * @param typeName
 * @returns string
 */

var parseType = function parseType(typeName) {
  switch (typeName) {
    case 'string':
      return 'text';

    case 'enum':
      return 'radio';

    case 'any':
      return 'object';

    default:
      return typeName;
  }
};