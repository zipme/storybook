import React from 'react';
import { styled } from '@storybook/theming';
import { Link } from '@storybook/components';
var NoControlsWrapper = styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    background: theme.background.warning,
    padding: '10px 15px',
    lineHeight: '20px',
    boxShadow: "".concat(theme.appBorderColor, " 0 -1px 0 0 inset")
  };
});
export var NoControlsWarning = function NoControlsWarning() {
  return /*#__PURE__*/React.createElement(NoControlsWrapper, null, "This story is not configured to handle controls.\xA0", /*#__PURE__*/React.createElement(Link, {
    href: "https://github.com/storybookjs/storybook/blob/next/addons/controls/README.md#writing-stories",
    target: "_blank",
    cancel: false
  }, "Learn how to add controls \xBB"));
};