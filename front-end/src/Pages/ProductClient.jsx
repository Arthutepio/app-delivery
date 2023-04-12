import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BsCartFill } from 'react-icons/bs';
import CardProduct from '../Componentes/CardProduct';
import NavBar from '../Componentes/NavBar';
import Context from '../Context/Context';
import { setToken } from '../services/requests';
import '../Css/CustomerProducts.css';

function ProductClient() {
  const {
    totalCart, products, isDisabledBtnCart, username, setUsername,
  } = useContext(Context);

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
    <div className="product-client-container">
      <NavBar item1="PRODUTOS" item2="MEUS PEDIDOS" item3={ username } item4="Sair" />

      <div className="cards-container">
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
      </div>

      <button
        type="button"
        data-testid="customer_products__button-cart"
        disabled={ isDisabledBtnCart }
        onClick={ () => history.push('/customer/checkout') }
        className="btn-cart"
      >
        <BsCartFill className="icon-cart" />
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          {
            `R$: ${(Math.round(totalCart * 100) / 100)
              .toFixed(2)
              .replace('.', ',')}`
          }
        </span>

      </button>
    </div>

  );
}

export default ProductClient;
