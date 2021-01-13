import addons from '@storybook/addons';
import { EVENTS } from './constants';
jest.mock('@storybook/addons');
var mockedAddons = addons;
describe('a11yRunner', function () {
  var mockChannel;
  beforeEach(function () {
    mockedAddons.getChannel.mockReset();
    mockChannel = {
      on: jest.fn(),
      emit: jest.fn()
    };
    mockedAddons.getChannel.mockReturnValue(mockChannel);
  });
  it('should listen to events', function () {
    // eslint-disable-next-line global-require
    require('./a11yRunner');

    expect(mockedAddons.getChannel).toHaveBeenCalled();
    expect(mockChannel.on).toHaveBeenCalledWith(EVENTS.REQUEST, expect.any(Function));
    expect(mockChannel.on).toHaveBeenCalledWith(EVENTS.MANUAL, expect.any(Function));
  });
});