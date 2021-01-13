import "core-js/modules/es.object.keys";
import { SET } from './shared';
export function createTitleListener(api) {
  var knobsCount = 0;
  api.on(SET, function (_ref) {
    var knobs = _ref.knobs;
    knobsCount = Object.keys(knobs).length;
  });
  return function () {
    return knobsCount === 0 ? 'Knobs' : "Knobs (".concat(knobsCount, ")");
  };
}