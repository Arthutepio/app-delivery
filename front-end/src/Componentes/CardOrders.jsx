import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardOrders({ id, status, price, date }) {
  return (
    <Link to={ `/customer/orders/${id}` }>
      <div className="card-order">
        <div className="order-number-container">
          <span className="order-number-text">
            Pedido
          </span>
          <span
            data-testid={ `customer_orders__element-order-id-${id}` }
            className="order-number"
          >
            { `000${id}` }
          </span>
        </div>
        <span
          data-testid={ `customer_orders__element-delivery-status-${id}` }
          className="order-status"
        >
          { status }
        </span>
        <div className="order-data">
          <span
            data-testid={ `customer_orders__element-order-date-${id}` }
            className="order-date"
          >
            { new Date(date).toLocaleDateString('pt-BR', { timezone: 'UTC' }) }
          </span>
          <span
            data-testid={ `customer_orders__element-card-price-${id}` }
            className="order-price"
          >
            { price.replace('.', ',') }
          </span>
        </div>
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
