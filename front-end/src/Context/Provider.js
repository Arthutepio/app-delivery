import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { requestData } from '../services/requests';

function Provider({ children }) {
  const [products, setProducts] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [isDisabledBtnCart, setIsDisabledBtnCart] = useState(true);
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [sellers, setSellers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState();
  const [token, setTokenGlobal] = useState('');
  const [updatedOrders, setUpdatedOrders] = useState(
    JSON.parse(localStorage.getItem('orders')),
  );

  useEffect(() => {
    const apiProducts = async () => {
      const allProducts = await requestData('products');
      const allSellers = await requestData('sellers');

      setProducts(allProducts);
      setSellers(allSellers);
    };
    apiProducts();
  }, []);

  const user = JSON.parse(localStorage.getItem('user'));

  const newRequest = async () => {
    const sellerOrders = await requestData(`orders/${user.id}`);
    setUpdatedOrders(sellerOrders);
    return sellerOrders;
  };

  useEffect(() => {
    newRequest();
  }, [updatedOrders]);

  const context = useMemo(() => ({
    products,
    totalCart,
    isDisabledBtnCart,
    setTotalCart,
    setIsDisabledBtnCart,
    username,
    setUsername,
    sellers,
    setSellers,
    userEmail,
    setUserEmail,
    orders,
    setOrders,
    userId,
    setUserId,
    token,
    setTokenGlobal,
    updatedOrders,
    setUpdatedOrders,
  }), [
    products,
    totalCart,
    isDisabledBtnCart,
    username,
    sellers,
    userEmail,
    orders,
    userId,
    token,
    updatedOrders,
  ]);
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
