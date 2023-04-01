import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { requestData } from '../services/requests';

function Provider({ children }) {
  const [products, setProducts] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [isDisabledBtnCart, setIsDisabledBtnCart] = useState(true);

  useEffect(() => {
    const apiProducts = async () => {
      const allProducts = await requestData('products');
      setProducts(allProducts);
    };
    apiProducts();
  }, []);

  const context = useMemo(() => ({
    products,
    totalCart,
    isDisabledBtnCart,
    setTotalCart,
    setIsDisabledBtnCart,
  }), [
    products,
    totalCart,
    isDisabledBtnCart,
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
