import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";
import "core-js/modules/web.url";
import React, { useContext } from 'react';
import { document } from 'global';
import { Anchor } from './Anchor';
import { DocsContext } from './DocsContext';
import { getDocsStories } from './utils';

function getFirstStoryId(docsContext) {
  var stories = getDocsStories(docsContext);
  return stories.length > 0 ? stories[0].id : null;
}

function renderAnchor() {
  var context = useContext(DocsContext);
  var anchorId = getFirstStoryId(context) || context.id;
  return /*#__PURE__*/React.createElement(Anchor, {
    storyId: anchorId
  });
}
/**
 * This component is used to declare component metadata in docs
 * and gets transformed into a default export underneath the hood.
 */


export var Meta = function Meta() {
  var params = new URL(document.location).searchParams;
  var isDocs = params.get('viewMode') === 'docs';
  return isDocs ? renderAnchor() : null;
};