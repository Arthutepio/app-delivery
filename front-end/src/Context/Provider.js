import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { requestData } from '../services/requests';

function Provider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const apiProducts = async () => {
      const allProducts = await requestData('products');
      setProducts(allProducts);
    };
    apiProducts();
  }, []);

  const context = useMemo(() => ({
    products,
  }), [
    products,
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
