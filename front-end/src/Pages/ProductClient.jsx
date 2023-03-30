import PropTypes from 'prop-types';

function ProductClient({ nome }) {
  console.log(nome);
  return (

    <div>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-products"
      >
        PRODUTOS
      </button>

      <button
        type="button"
        data-testid="customer_products__element-navbar-link-orders"
      >
        MEUS PEDIDOS
      </button>
      <p data-testid="customer_products__element-navbar-user-full-name">
        { nome }
      </p>

      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </div>
  );
}

ProductClient.propTypes = {
  nome: PropTypes.string,
}.isRequired;

export default ProductClient;
