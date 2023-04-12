import PropTypes from 'prop-types';
import { BiShoppingBag } from 'react-icons/bi';
import { AiOutlineShop } from 'react-icons/ai';
import { IoMdExit } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import '../Css/Navbar.css';
import Logo from '../Assets/logo-white.png';

function NavBar({ item1, item2, item3 }) {
  const history = useHistory();

  const clearLocalStora = () => {
    localStorage.removeItem('user');
    history.push('/');
  };
  const { role } = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="navbar">
      <div className="shop-container">
        <div className="birita-delivery">
          <img src={ Logo } alt="Logo Birita Delivery" height="50px" />
          <span>Birita Delivery</span>
        </div>
      </div>

      <div className="client-container">
        <span data-testid="customer_products__element-navbar-user-full-name">
          {item3}
        </span>

        {
          item1 && (
            <a href="/customer/products">
              <button
                type="button"
                data-testid="customer_products__element-navbar-link-products"
                className="btn-nav"
              >
                <BiShoppingBag className="icon-nav" />
                {/* {item1} */}
              </button>
            </a>)
        }

        {
          item2 && (
            <a href={ role === 'seller' ? '/seller/orders' : '/customer/orders' }>
              <button
                type="button"
                data-testid="customer_products__element-navbar-link-orders"
                className="btn-nav"
              >
                <AiOutlineShop className="icon-nav" />
                {/* {item2} */}
              </button>
            </a>
          )
        }

        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ clearLocalStora }
          className="btn-nav"
        >
          {/* {item4} */}
          <IoMdExit className="icon-nav" />
        </button>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  item1: PropTypes.string,
  item2: PropTypes.string,
  item3: PropTypes.string,
  item4: PropTypes.string,
}.isRequired;

export default NavBar;
