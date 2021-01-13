import React from 'react';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import { Consumer } from '@storybook/api';
import { PARAM_KEY } from '.';
import { reIndentQuery, getDefaultFetcher } from './shared';

var GQL = function GQL(_ref) {
  var active = _ref.active;
  return active ? /*#__PURE__*/React.createElement(Consumer, null, function (_ref2) {
    var api = _ref2.api,
        state = _ref2.state;
    var story = api.getData(state.storyId, state.refId);
    var parameters = story ? api.getCurrentParameter(PARAM_KEY) : null;

    if (parameters) {
      var query = reIndentQuery(parameters.query);
      var variables = parameters.variables || '{}';
      var url = parameters.url || '';
      var fetcher = parameters.fetcher || getDefaultFetcher(url);
      return /*#__PURE__*/React.createElement(GraphiQL, {
        query: query,
        variables: variables,
        fetcher: fetcher
      });
    }

    return /*#__PURE__*/React.createElement("div", null, "You have not configured GraphiQL yet");
  }) : null;
};

export default GQL;