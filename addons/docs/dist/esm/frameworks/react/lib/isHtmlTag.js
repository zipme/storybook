import "core-js/modules/es.array.includes";
import "core-js/modules/es.string.includes";
import htmlTags from 'html-tags';
export function isHtmlTag(tagName) {
  return htmlTags.includes(tagName.toLowerCase());
}