import "core-js/modules/es.array.reduce";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import { extractProps } from './extractProps';
export var extractArgTypes = function extractArgTypes(component) {
  if (component) {
    var _extractProps = extractProps(component),
        rows = _extractProps.rows;

    if (rows) {
      return rows.reduce(function (acc, row) {
        var type = row.type,
            sbType = row.sbType,
            defaultSummary = row.defaultValue,
            jsDocTags = row.jsDocTags,
            required = row.required;
        var defaultValue = defaultSummary && (defaultSummary.detail || defaultSummary.summary);

        try {
          // eslint-disable-next-line no-eval
          defaultValue = eval(defaultValue); // eslint-disable-next-line no-empty
        } catch (_unused) {}

        acc[row.name] = Object.assign({}, row, {
          defaultValue: defaultValue,
          type: Object.assign({
            required: required
          }, sbType),
          table: {
            type: type,
            jsDocTags: jsDocTags,
            defaultValue: defaultSummary
          }
        });
        return acc;
      }, {});
    }
  }

  return null;
};