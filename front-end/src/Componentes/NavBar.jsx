import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function NavBar({ item1, item2, item3, item4 }) {
  const history = useHistory();

  const clearLocalStora = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (

    <div>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-products"
      >
        {item1}
      </button>

      <button
        type="button"
        data-testid="customer_products__element-navbar-link-orders"
        onClick={ () => history.push('orders') }
      >
        {item2}
      </button>
      <p data-testid="customer_products__element-navbar-user-full-name">
        {item3}
      </p>

      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ clearLocalStora }
      >
        {item4}
      </button>
    </div>
  );
}

NavBar.propTypes = {
  item1: PropTypes.string,
  item2: PropTypes.string,
  item3: PropTypes.string,
  item4: PropTypes.string,
}.isRequired;

export default NavBar;
