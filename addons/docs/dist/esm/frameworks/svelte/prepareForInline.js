import React from 'react'; // @ts-ignore

import HOC from './HOC.svelte';
export var prepareForInline = function prepareForInline(storyFn, context) {
  // @ts-ignore
  var story = storyFn();
  var el = React.useRef(null);
  React.useEffect(function () {
    var root = new HOC({
      target: el.current,
      props: {
        component: story.Component,
        context: context,
        props: story.props,
        slot: story.Component
      }
    });
    return function () {
      return root.$destroy();
    };
  });
  return /*#__PURE__*/React.createElement('div', {
    ref: el
  });
};