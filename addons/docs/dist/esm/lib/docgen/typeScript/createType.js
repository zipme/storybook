import "core-js/modules/es.function.name";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.replace";
import { createSummaryValue } from '../../utils';
export function createType(_ref) {
  var tsType = _ref.tsType,
      required = _ref.required;

  // A type could be null if a defaultProp has been provided without a type definition.
  if (tsType == null) {
    return null;
  }

  if (!required) {
    return createSummaryValue(tsType.name.replace(' | undefined', ''));
  }

  return createSummaryValue(tsType.name);
}