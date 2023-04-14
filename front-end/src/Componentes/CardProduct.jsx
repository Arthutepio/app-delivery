import { useContext, useState } from 'react';
import { BsCartPlusFill, BsCartDashFill } from 'react-icons/bs';
import Context from '../Context/Context';

const PropTypes = require('prop-types');

function CardProduct({ name, price, image, id }) {
  const [quantity, setQuantity] = useState(0);
  const { setTotalCart, setIsDisabledBtnCart } = useContext(Context);

  const totalPriceCart = () => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    const total = items.reduce((acc, curr) => curr.total + acc, 0);
    if (total > 0) {
      setIsDisabledBtnCart(false);
    }
    setTotalCart(total);
  };

  const updateGlobalQuantity = (newQuantity) => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    const total = newQuantity * Number(price.replace(',', '.'));

    if (newQuantity > 0) {
      const NUMBER_NEGATIVE = -1;
      const productIndex = items.findIndex((item) => item.id === id);

      if (productIndex !== NUMBER_NEGATIVE) {
        items[productIndex].quantity = newQuantity;
        items[productIndex].total = total;
      } else {
        const newItem = { id, name, image, price, quantity: newQuantity, total };
        items.push(newItem);
      }

      localStorage.setItem('cart', JSON.stringify(items));
    }

    if (newQuantity === 0) {
      const result = items.filter((item) => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(result));
    }

    totalPriceCart();
  };

  const handleIncreaseButton = () => {
    const newQuanity = quantity + 1;
    setQuantity(newQuanity);
    updateGlobalQuantity(newQuanity);
  };

  const handleDecreaseButton = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart.length === 1 || 0) setIsDisabledBtnCart(true);

    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateGlobalQuantity(newQuantity);
    }

    if (quantity === 0) {
      const newQuantity = 0;
      setQuantity(newQuantity);
      updateGlobalQuantity(newQuantity);
    }
  };

  const handleInputChange = ({ target }) => {
    const { value } = target;
    setQuantity(Number(value));
    updateGlobalQuantity(Number(value));
  };

  return (
    <div className="card-product">

      <img
        src={ image }
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        className="img-card"
      />

      <div className="name-price-container">
        <span
          data-testid={ `customer_products__element-card-title-${id}` }
          className="name-card"
        >
          { name }
        </span>

        <span
          data-testid={ `customer_products__element-card-price-${id}` }
          className="price-card"
        >
          { `R$ ${price}` }
        </span>
      </div>

      <div className="quantity-container">
        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          onClick={ handleDecreaseButton }
          className="btn-card-minus"
        >
          <BsCartDashFill />
        </button>

        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          type="number"
          min="0"
          value={ quantity }
          onChange={ handleInputChange }
          className="input-card"
        />

        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ handleIncreaseButton }
          className="btn-card-plus"
        >
          <BsCartPlusFill />
        </button>
      </div>

    </div>
  );
}

CardProduct.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  image: PropTypes.string,
}.isRequired;

export default CardProduct;
