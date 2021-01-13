import React from 'react';
import { h, createApp, reactive } from 'vue'; // Inspired by https://github.com/egoist/vue-to-react,
// modified to store args as props in the root store

export var prepareForInline = function prepareForInline(storyFn, _ref) {
  var args = _ref.args;
  var component = storyFn();
  var el = React.useRef(null);
  var propsContainer = reactive({
    props: args || {}
  });
  var root = createApp({
    components: {
      story: component
    },
    render: function render() {
      return h('div', {
        id: 'root'
      }, [h(component, propsContainer.props)]);
    }
  });
  React.useEffect(function () {
    propsContainer.props = args;
    root.mount(el.current);
    return function () {
      return root.unmount(el.current);
    };
  });
  return /*#__PURE__*/React.createElement('div', null, /*#__PURE__*/React.createElement('div', {
    ref: el
  }));
};