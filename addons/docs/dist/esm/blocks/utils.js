import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.includes";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.includes";
import "core-js/modules/es.string.split";

/* eslint-disable no-underscore-dangle */
export var getDocsStories = function getDocsStories(context) {
  var storyStore = context.storyStore,
      kind = context.kind;

  if (!storyStore) {
    return [];
  }

  return storyStore.getStoriesForKind(kind).filter(function (s) {
    return !(s.parameters && s.parameters.docs && s.parameters.docs.disable);
  });
};

var titleCase = function titleCase(str) {
  return str.split('-').map(function (part) {
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join('');
};

export var getComponentName = function getComponentName(component) {
  if (!component) {
    return undefined;
  }

  if (typeof component === 'string') {
    if (component.includes('-')) {
      return titleCase(component);
    }

    return component;
  }

  if (component.__docgenInfo && component.__docgenInfo.displayName) {
    return component.__docgenInfo.displayName;
  }

  return component.name;
};
export function scrollToElement(element) {
  var block = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'start';
  element.scrollIntoView({
    behavior: 'smooth',
    block: block,
    inline: 'nearest'
  });
}