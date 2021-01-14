import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import "core-js/modules/web.dom-collections.for-each";
import { hasDocgen, extractComponentProps } from '../../lib/docgen';
import { convert } from '../../lib/convert';
import { trimQuotes } from '../../lib/convert/utils';
var SECTIONS = ['props', 'events', 'slots'];

var trim = function trim(val) {
  return val && typeof val === 'string' ? trimQuotes(val) : val;
};

export var extractArgTypes = function extractArgTypes(component) {
  if (!hasDocgen(component)) {
    return null;
  }

  var results = {};
  SECTIONS.forEach(function (section) {
    var props = extractComponentProps(component, section);
    props.forEach(function (_ref) {
      var propDef = _ref.propDef,
          docgenInfo = _ref.docgenInfo,
          jsDocTags = _ref.jsDocTags;
      var name = propDef.name,
          type = propDef.type,
          description = propDef.description,
          defaultSummary = propDef.defaultValue,
          required = propDef.required;
      var sbType = section === 'props' ? convert(docgenInfo) : {
        name: 'void'
      };
      var defaultValue = defaultSummary && (defaultSummary.detail || defaultSummary.summary);

      try {
        // eslint-disable-next-line no-eval
        defaultValue = eval(defaultValue); // eslint-disable-next-line no-empty
      } catch (_unused) {}

      results[name] = {
        name: name,
        description: description,
        type: Object.assign({
          required: required
        }, sbType),
        defaultValue: defaultValue,
        table: {
          type: type,
          jsDocTags: jsDocTags,
          defaultValue: defaultSummary,
          category: section
        }
      };
    });
  });
  return results;
};