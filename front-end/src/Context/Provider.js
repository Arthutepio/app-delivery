import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { requestData } from '../services/requests';

function Provider({ children }) {
  const [products, setProducts] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [isDisabledBtnCart, setIsDisabledBtnCart] = useState(true);
  const [username, setUsername] = useState('');
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const apiProducts = async () => {
      const allProducts = await requestData('products');
      const allSellers = await requestData('sellers');
      console.log('allSellers ===', allSellers);

      setProducts(allProducts);
      setSellers(allSellers);
    };
    apiProducts();
  }, []);

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
  }), [
    products,
    totalCart,
    isDisabledBtnCart,
    username,
    sellers,
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
