import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';
import NavBar from '../Componentes/NavBar';

function SellerOrders() {
  const { username } = useContext(Context);

  const sellerOrders = JSON.parse(localStorage.getItem('sellerOrders'));

  return (
    <div>
      <NavBar item1="PEDIDOS" item3={ username } item4="Sair" />
      {
        sellerOrders.map((
          { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber },
        ) => (
          <Link to={ `/seller/orders/${id}` } key={ id }>
            <div>
              <span
                data-testid={ `seller_orders__element-order-id-${id}` }
              >
                { id }
              </span>
              <span
                data-testid={ `seller_orders__element-delivery-status-${id}` }
              >
                { status }
              </span>
              <span
                data-testid={ `seller_orders__element-order-date-${id}` }
              >
                { new Date(saleDate).toLocaleDateString('pt-BR', { timezone: 'UTC' }) }
              </span>
              <span
                data-testid={ `seller_orders__element-card-price-${id}` }
              >
                { totalPrice.replace('.', ',') }
              </span>
              <span
                data-testid={ `seller_orders__element-card-address-${id}` }
              >
                { `${deliveryAddress}, ${deliveryNumber}` }
              </span>
            </div>
          </Link>
        ))
      }
    </div>
  );
}

export default SellerOrders;
