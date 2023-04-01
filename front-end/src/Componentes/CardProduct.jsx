import { useContext, useState } from 'react';
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
    }

    localStorage.setItem('cart', JSON.stringify(items));
    totalPriceCart();
  };

  const handleIncreaseButton = () => {
    const newQuanity = quantity + 1;
    setQuantity(newQuanity);
    updateGlobalQuantity(newQuanity);
  };

  const handleDecreaseButton = () => {
    if (quantity > 0) {
      const newQuanity = quantity - 1;
      setQuantity(newQuanity);
      updateGlobalQuantity(newQuanity);
    }
  };

  const handleInputChange = ({ target }) => {
    const { value } = target;
    setQuantity(Number(value));
    updateGlobalQuantity(Number(value));
  };

  return (
    <div>
      <span data-testid={ `customer_products__element-card-title-${id}` }>
        { name }
      </span>

      <span data-testid={ `customer_products__element-card-price-${id}` }>
        { price }
      </span>

      <img
        src={ image }
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        width="50px"
      />

      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        onClick={ handleDecreaseButton }
      >
        -
      </button>

      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        type="number"
        min="0"
        value={ quantity }
        onChange={ handleInputChange }
      />

      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${id}` }
        onClick={ handleIncreaseButton }
      >
        +
      </button>
    </div>
  );
}

CardProduct.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  image: PropTypes.string,
}.isRequired;

export default CardProduct;
