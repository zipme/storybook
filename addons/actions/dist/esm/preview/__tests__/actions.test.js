import "core-js/modules/es.array.some";
import "core-js/modules/es.object.keys";
import addons from '@storybook/addons';
import { actions } from '../..';
jest.mock('@storybook/addons');

var createChannel = function createChannel() {
  var channel = {
    emit: jest.fn()
  };
  addons.getChannel.mockReturnValue(channel);
  return channel;
};

var getChannelData = function getChannelData(channel, callIndex) {
  return channel.emit.mock.calls[callIndex][1].data;
};

var getChannelOptions = function getChannelOptions(channel, callIndex) {
  return channel.emit.mock.calls[callIndex][1].options;
};

describe('Actions', function () {
  it('with one argument', function () {
    var channel = createChannel();
    var actionsResult = actions('test-action');
    expect(Object.keys(actionsResult)).toEqual(['test-action']);
    actionsResult['test-action']('one');
    expect(getChannelData(channel, 0)).toEqual({
      name: 'test-action',
      args: ['one']
    });
  });
  it('with multiple arguments', function () {
    var channel = createChannel();
    var actionsResult = actions('test-action', 'test-action2');
    expect(Object.keys(actionsResult)).toEqual(['test-action', 'test-action2']);
    actionsResult['test-action']('one');
    actionsResult['test-action2']('two');
    expect(getChannelData(channel, 0)).toEqual({
      name: 'test-action',
      args: ['one']
    });
    expect(getChannelData(channel, 1)).toEqual({
      name: 'test-action2',
      args: ['two']
    });
  });
  it('with multiple arguments + config', function () {
    var channel = createChannel();
    var actionsResult = actions('test-action', 'test-action2', {
      some: 'config'
    });
    expect(Object.keys(actionsResult)).toEqual(['test-action', 'test-action2']);
    actionsResult['test-action']('one');
    actionsResult['test-action2']('two');
    expect(getChannelData(channel, 0)).toEqual({
      name: 'test-action',
      args: ['one']
    });
    expect(getChannelData(channel, 1)).toEqual({
      name: 'test-action2',
      args: ['two']
    });
    expect(getChannelOptions(channel, 0).some).toEqual('config');
    expect(getChannelOptions(channel, 1).some).toEqual('config');
  });
  it('with multiple arguments as object', function () {
    var channel = createChannel();
    var actionsResult = actions({
      'test-action': 'test action',
      'test-action2': 'test action two'
    });
    expect(Object.keys(actionsResult)).toEqual(['test-action', 'test-action2']);
    actionsResult['test-action']('one');
    actionsResult['test-action2']('two');
    expect(getChannelData(channel, 0)).toEqual({
      name: 'test action',
      args: ['one']
    });
    expect(getChannelData(channel, 1)).toEqual({
      name: 'test action two',
      args: ['two']
    });
  });
  it('with first argument as array of arguments + config', function () {
    var channel = createChannel();
    var actionsResult = actions(['test-action', 'test-action2', {
      some: 'config'
    }]);
    expect(Object.keys(actionsResult)).toEqual(['test-action', 'test-action2']);
    actionsResult['test-action']('one');
    actionsResult['test-action2']('two');
    expect(getChannelData(channel, 0)).toEqual({
      name: 'test-action',
      args: ['one']
    });
    expect(getChannelData(channel, 1)).toEqual({
      name: 'test-action2',
      args: ['two']
    });
    expect(getChannelOptions(channel, 0).some).toEqual('config');
    expect(getChannelOptions(channel, 1).some).toEqual('config');
  });
});