import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.map";
import "core-js/modules/es.object.keys";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.dom-collections.iterator";
import PropTypes from 'prop-types';
import { hasDocgen, extractComponentProps, TypeSystem } from '../../lib/docgen';
import { enhancePropTypesProps } from './propTypes/handleProp';
import { enhanceTypeScriptProps } from './typeScript/handleProp';
import { isMemo } from './lib';
var propTypesMap = new Map();
Object.keys(PropTypes).forEach(function (typeName) {
  // @ts-ignore
  var type = PropTypes[typeName];
  propTypesMap.set(type, typeName);
  propTypesMap.set(type.isRequired, typeName);
});

function getPropDefs(component, section) {
  var processedComponent = component; // eslint-disable-next-line react/forbid-foreign-prop-types

  if (!hasDocgen(component) && !component.propTypes && isMemo(component)) {
    processedComponent = component.type;
  }

  var extractedProps = extractComponentProps(processedComponent, section);

  if (extractedProps.length === 0) {
    return [];
  }

  switch (extractedProps[0].typeSystem) {
    case TypeSystem.JAVASCRIPT:
      return enhancePropTypesProps(extractedProps, component);

    case TypeSystem.TYPESCRIPT:
      return enhanceTypeScriptProps(extractedProps);

    default:
      return extractedProps.map(function (x) {
        return x.propDef;
      });
  }
}

export var extractProps = function extractProps(component) {
  return {
    rows: getPropDefs(component, 'props')
  };
};