import { useState } from 'react';

const PropTypes = require('prop-types');

function CardProduct({ name, price, image, id }) {
  const [quantity, setQuantity] = useState(0);
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
        onClick={ () => setQuantity(quantity - 1) }
      >
        -
      </button>

      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        type="number"
        min="0"
        value={ quantity }
      />

      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${id}` }
        onClick={ () => setQuantity(quantity + 1) }
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
