const PropTypes = require('prop-types');

function CardProduct({ name, price, image, id }) {
  return (
    <div>
      <p data-testid={ `customer_products__img-card-bg-title-${id}` }>
        { name }
      </p>
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        { price }
      </p>
      <img
        src={ image }
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />

      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
      >
        -

      </button>
      <span
        data-testid={ `customer_products__input-card-quantity-${id}` }
      >
        ESTADO INICIANDO EM 0

      </span>
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${id}` }
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
