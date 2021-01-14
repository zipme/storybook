import "core-js/modules/es.symbol";
import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.array.map";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.keys";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useContext } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { toId, storyNameFromExport } from '@storybook/csf';
import { resetComponents, Preview as PurePreview } from '@storybook/components';
import { DocsContext } from './DocsContext';
import { SourceContext } from './SourceContainer';
import { getSourceProps } from './Source';
export var SourceState;

(function (SourceState) {
  SourceState["OPEN"] = "open";
  SourceState["CLOSED"] = "closed";
  SourceState["NONE"] = "none";
})(SourceState || (SourceState = {}));

var getPreviewProps = function getPreviewProps(_ref, docsContext, sourceContext) {
  var _ref$withSource = _ref.withSource,
      withSource = _ref$withSource === void 0 ? SourceState.CLOSED : _ref$withSource,
      mdxSource = _ref.mdxSource,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["withSource", "mdxSource", "children"]);

  if (withSource === SourceState.NONE) {
    return props;
  }

  if (mdxSource) {
    return Object.assign({}, props, {
      withSource: getSourceProps({
        code: decodeURI(mdxSource)
      }, docsContext, sourceContext)
    });
  }

  var childArray = Array.isArray(children) ? children : [children];
  var stories = childArray.filter(function (c) {
    return c.props && (c.props.id || c.props.name);
  });
  var mdxComponentMeta = docsContext.mdxComponentMeta,
      mdxStoryNameToKey = docsContext.mdxStoryNameToKey;
  var targetIds = stories.map(function (s) {
    return s.props.id || toId(mdxComponentMeta.id || mdxComponentMeta.title, storyNameFromExport(mdxStoryNameToKey[s.props.name]));
  });
  var sourceProps = getSourceProps({
    ids: targetIds
  }, docsContext, sourceContext);
  return Object.assign({}, props, {
    // pass through columns etc.
    withSource: sourceProps,
    isExpanded: withSource === SourceState.OPEN
  });
};

export var Canvas = function Canvas(props) {
  var docsContext = useContext(DocsContext);
  var sourceContext = useContext(SourceContext);
  var previewProps = getPreviewProps(props, docsContext, sourceContext);
  var children = props.children;
  return /*#__PURE__*/React.createElement(MDXProvider, {
    components: resetComponents
  }, /*#__PURE__*/React.createElement(PurePreview, previewProps, children));
};