import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import Context from '../../Context/Context';

const renderWithRouterContext = (
  component,
  userContextValue = {},
) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        <Context.Provider value={ userContextValue }>
          {component}
        </Context.Provider>
      </Router>,
    ),
    history,
  });
};
export default renderWithRouterContext;
