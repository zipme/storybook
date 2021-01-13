import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.replace";
import "core-js/modules/es.string.trim";
import { mount, tag2 as tag } from 'riot';
import compiler from 'riot-compiler';
import { alreadyCompiledMarker, getRidOfRiotNoise } from '../compileStageFunctions';
export default function renderRaw(sourceCode) {
  var tag2 = tag; // eslint-disable-next-line no-eval

  eval(getRidOfRiotNoise("".concat(compiler.compile(sourceCode.replace(alreadyCompiledMarker, '').trim(), {}))));
  mount('root', /tag2\s*\(\s*'([^']+)'/.exec(sourceCode)[1], {});
}