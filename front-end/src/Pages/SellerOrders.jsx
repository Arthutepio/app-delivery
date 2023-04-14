import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';
import NavBar from '../Componentes/NavBar';
import '../Css/SellerOrders.css';

function SellerOrders() {
  const { username } = useContext(Context);

  const sellerOrders = JSON.parse(localStorage.getItem('sellerOrders'));

  return (
    <div>
      <NavBar item2="PEDIDOS" item3={ username } item4="Sair" />
      <main className="sellerorder-container">

        {
          sellerOrders.map((
            { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber },
          ) => (
            <Link
              to={ `/seller/orders/${id}` }
              key={ id }
            >
              <div className="card-order">
                <div className="seller-order-number-container">
                  <span className="order-number-text">
                    Pedido
                  </span>
                  <span
                    data-testid={ `seller_orders__element-order-id-${id}` }
                    className="order-number"
                  >
                    { id }
                  </span>
                </div>
                <div>
                  <div className="seller-order-data">
                    <span
                      data-testid={ `seller_orders__element-delivery-status-${id}` }
                      className={ `order-status ${status}` }
                    >
                      { status }
                    </span>
                    <div className="order-data">
                      <span
                        data-testid={ `seller_orders__element-order-date-${id}` }
                        className="seller-order-date"
                      >
                        {
                          new Date(saleDate)
                            .toLocaleDateString('pt-BR', { timezone: 'UTC' })
                        }
                      </span>
                      <span
                        data-testid={ `seller_orders__element-card-price-${id}` }
                        className="seller-order-price"
                      >
                        { totalPrice.replace('.', ',') }
                      </span>
                    </div>
                  </div>
                  <span
                    data-testid={ `seller_orders__element-card-address-${id}` }
                    className="order-adress"
                  >
                    { `${deliveryAddress}, ${deliveryNumber}` }
                  </span>
                </div>
              </div>
            </Link>
          ))
        }
      </main>
    </div>
  );
}

export default SellerOrders;
