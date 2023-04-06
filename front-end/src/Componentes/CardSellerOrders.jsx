import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardOrders({ id, status, price, date }) {
  return (
    <Link to={ `/customer/orders/${id}` }>
      <div>
        <span
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          { id }
        </span>
        <span
          data-testid={ `customer_orders__element-delivery-status-${id}` }
        >
          { status }
        </span>
        <span
          data-testid={ `customer_orders__element-order-date-${id}` }
        >
          { new Date(date).toLocaleDateString('pt-BR', { timezone: 'UTC' }) }
        </span>
        <span
          data-testid={ `customer_orders__element-card-price-${id}` }
        >
          { price.replace('.', ',') }
        </span>
      </div>
    </Link>
  );
}

CardOrders.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  date: PropTypes.string,
  price: PropTypes.number,
}.isRequired;

export default CardOrders;
