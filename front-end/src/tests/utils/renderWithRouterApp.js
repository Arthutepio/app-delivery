import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import Provider from '../../Context/Provider';

const renderWithRouterApp = (
  component,
) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        <Provider>
          {component}
        </Provider>
      </Router>,
    ),
    history,
  });
};
export default renderWithRouterApp;
