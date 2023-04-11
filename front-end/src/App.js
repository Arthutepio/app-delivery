import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import './Css/App.css';
import Login from './Pages/Login';
import ProductClient from './Pages/ProductClient';
import Register from './Pages/Register';
import CustomerCheckout from './Pages/CustomerCheckout';
import CustomerOrder from './Pages/CustomerOrder';
import ManagerUser from './Pages/ManagerUser';
import OrderDetails from './Pages/OrderDetails';
import SellerOrders from './Pages/SellerOrders';
import SellerOrderDetails from './Pages/SellerOrderDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route path="/customer/products" component={ ProductClient } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/checkout" component={ CustomerCheckout } />
      <Route exact path="/customer/orders/" component={ CustomerOrder } />
      <Route exact path="/admin/manage" component={ ManagerUser } />
      <Route exact path="/customer/orders/:id" component={ OrderDetails } />
      <Route exact path="/seller/orders" component={ SellerOrders } />
      <Route exact path="/seller/orders/:id" component={ SellerOrderDetails } />
    </Switch>
  );
}

export default App;
