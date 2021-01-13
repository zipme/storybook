import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.includes";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.function.name";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.includes";
import "core-js/modules/es.string.match";
import "core-js/modules/es.string.replace";
import "core-js/modules/es.string.trim";
import "core-js/modules/web.dom-collections.for-each";
import { mount, unregister, tag2 as tag } from 'riot';
import * as riot from 'riot';
import compiler from 'riot-compiler';
import { document } from 'global';
import { alreadyCompiledMarker, getRidOfRiotNoise, setConstructor } from '../compileStageFunctions';

function guessRootName(stringified) {
  var whiteSpaceLocation = stringified.indexOf(' ', stringified.indexOf('<') + 1);
  var firstWhitespace = whiteSpaceLocation === -1 ? stringified.length : whiteSpaceLocation;
  var supposedName = stringified.trim().match(/^<[^ >]+\/>$/) ? stringified.trim().replace(/[<>/]/g, '') : stringified.substring(stringified.indexOf('<') + 1, Math.min(firstWhitespace, stringified.indexOf('>')));
  var matchingBuiltInTag = document.createElement(supposedName).constructor.name;
  return matchingBuiltInTag === 'HTMLUnknownElement' ? supposedName : 'root';
}

function compileText(code, rootName) {
  var sourceCodeEndOfHtml = (Math.min(code.indexOf('<style') + 1, code.indexOf('<script') + 1) || code.length + 1) - 1;
  var sourceCodeReformatted = code.substring(0, sourceCodeEndOfHtml).replace(/[\n\r\s]+/g, ' ') + code.substring(sourceCodeEndOfHtml);
  var sourceCode = rootName === 'root' ? "<root>".concat(sourceCodeReformatted, "</root>") : sourceCodeReformatted;
  return compiler.compile(sourceCode, {}).replace(alreadyCompiledMarker, '').trim();
}

export default function renderStringified(_ref) {
  var tags = _ref.tags,
      _ref$template = _ref.template,
      template = _ref$template === void 0 ? "<".concat((tags[0] || []).boundAs || guessRootName(tags[0] || ''), "/>") : _ref$template,
      tagConstructor = _ref.tagConstructor;
  var tag2 = tag;
  tags.forEach(function (input) {
    var oneTag = input || {};
    var rootName = oneTag.boundAs || guessRootName(oneTag);
    var content = oneTag.content;
    var code = content ? content.trim() : input || '';
    var compiled = code.includes(alreadyCompiledMarker) ? code : compileText(code, rootName);
    unregister(rootName);
    eval(getRidOfRiotNoise("".concat(compiled))); // eslint-disable-line no-eval
  });
  var sourceCode = compiler.compile("<root>".concat(template, "</root>"), {});
  var final;

  if (tagConstructor) {
    final = setConstructor(sourceCode, tagConstructor);
  } else {
    final = sourceCode;
  }

  if (template !== '<root/>') {
    eval(getRidOfRiotNoise(final)); // eslint-disable-line no-eval
  }

  mount('*');
}