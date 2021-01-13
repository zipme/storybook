/* eslint-disable no-console */
import { document } from 'global';
import { useEffect } from '@storybook/client-api';
var root = document && document.getElementById('root');
export var createDecorator = function createDecorator() {
  return function (options) {
    return function (storyFn) {
      useEffect(function () {
        if (root != null) {
          console.log('story was rendered');
          return function () {
            console.log('story was removed');
          };
        }

        return undefined;
      }, [root, options]);
      return storyFn();
    };
  };
};
export var withDecorator = createDecorator();