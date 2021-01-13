import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.replace";
export function generateFuncSignature(params, returns) {
  var hasParams = params != null;
  var hasReturns = returns != null;

  if (!hasParams && !hasReturns) {
    return '';
  }

  var funcParts = [];

  if (hasParams) {
    var funcParams = params.map(function (x) {
      var prettyName = x.getPrettyName();
      var typeName = x.getTypeName();

      if (typeName != null) {
        return "".concat(prettyName, ": ").concat(typeName);
      }

      return prettyName;
    });
    funcParts.push("(".concat(funcParams.join(', '), ")"));
  } else {
    funcParts.push('()');
  }

  if (hasReturns) {
    funcParts.push("=> ".concat(returns.getTypeName()));
  }

  return funcParts.join(' ');
}
export function generateShortFuncSignature(params, returns) {
  var hasParams = params != null;
  var hasReturns = returns != null;

  if (!hasParams && !hasReturns) {
    return '';
  }

  var funcParts = [];

  if (hasParams) {
    funcParts.push('( ... )');
  } else {
    funcParts.push('()');
  }

  if (hasReturns) {
    funcParts.push("=> ".concat(returns.getTypeName()));
  }

  return funcParts.join(' ');
}
export function toMultilineSignature(signature) {
  return signature.replace(/,/g, ',\r\n');
}