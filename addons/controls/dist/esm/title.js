import "core-js/modules/es.array.filter";
import "core-js/modules/es.object.values";
import { useArgTypes } from '@storybook/api';
export function getTitle() {
  var rows = useArgTypes();
  var controlsCount = Object.values(rows).filter(function (argType) {
    return argType === null || argType === void 0 ? void 0 : argType.control;
  }).length;
  var suffix = controlsCount === 0 ? '' : " (".concat(controlsCount, ")");
  return "Controls".concat(suffix);
}