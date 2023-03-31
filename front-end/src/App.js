import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './Pages/Login';

import ProductClient from './Pages/ProductClient';
import Register from './Pages/Register';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route path="/customer/products" component={ ProductClient } />
      <Route exact path="/register" component={ Register } />

    </Switch>
  );
}

export default App;
