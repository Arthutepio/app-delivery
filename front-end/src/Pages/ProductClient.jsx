import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardProduct from '../Componentes/CardProduct';
import NavBar from '../Componentes/NavBar';
import Context from '../Context/Context';
import { setToken } from '../services/requests';

function ProductClient() {
  const { totalCart, products } = useContext(Context);

  const [username, setUsername] = useState('');

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const user = localStorage.getItem('user') || '';
      const userObj = JSON.parse(user);

      const { name, token } = userObj;
      setUsername(name);

      if (!token) {
        localStorage.removeItem('user');
        return history.push('/login');
      }

      setToken(token);
    })();
  });

  return (
    <>
      <NavBar item1="PRODUTOS" item2="MEUS PEDIDOS" item3={ username } item4="Sair" />
      {
        products.map((product) => (
          <CardProduct
            key={ product.id }
            name={ product.name }
            price={ (product.price).toString().replace('.', ',') }
            image={ product.urlImage }
            id={ product.id }
          />))
      }
      <button
        type="button"
        data-testid="customer_products__button-cart"
      >
        Ver Carrinho:
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          {
            (Math.round(totalCart * 100) / 100)
              .toFixed(2)
              .replace('.', ',')
          }
        </span>
      </button>
    </>

  );
}

export default ProductClient;
