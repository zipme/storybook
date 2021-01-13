import * as React from 'react';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import { FullScreen } from './components/FullScreen';
import { reIndentQuery, getDefaultFetcher } from './shared';
export var setupGraphiQL = function setupGraphiQL(config) {
  return function (_query) {
    var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '{}';
    var query = reIndentQuery(_query);
    var fetcher = config.fetcher || getDefaultFetcher(config.url);
    return function () {
      return /*#__PURE__*/React.createElement(FullScreen, null, /*#__PURE__*/React.createElement(GraphiQL, {
        query: query,
        variables: variables,
        fetcher: fetcher
      }));
    };
  };
};