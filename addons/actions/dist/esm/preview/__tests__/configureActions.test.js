import { config } from '../configureActions';
import { configureActions } from '../..';
describe('Configure Actions', function () {
  it('can configure actions', function () {
    var depth = 100;
    var clearOnStoryChange = false;
    var limit = 20;
    configureActions({
      depth: depth,
      clearOnStoryChange: clearOnStoryChange,
      limit: limit
    });
    expect(config).toEqual({
      depth: depth,
      clearOnStoryChange: clearOnStoryChange,
      limit: limit
    });
  });
});