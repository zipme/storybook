"use strict";

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('@storybook/addons');
var mockedAddons = _addons.default;
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
    expect(mockChannel.on).toHaveBeenCalledWith(_constants.EVENTS.REQUEST, expect.any(Function));
    expect(mockChannel.on).toHaveBeenCalledWith(_constants.EVENTS.MANUAL, expect.any(Function));
  });
});