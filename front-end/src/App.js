import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
    </Switch>
  );
}

export default App;
