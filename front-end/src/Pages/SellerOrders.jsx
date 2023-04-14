/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
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

      <main className="seller-order-container">
        {
          sellerOrders.map((
            { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber },
          ) => (
            <Link
              to={ `/seller/orders/${id}` }
              key={ id }
            >
              <div className="card-order seller">
                <div className="seller-order-number-container">
                  <span className="order-number-text">
                    Pedido
                  </span>
                  <span
                    data-testid={ `seller_orders__element-order-id-${id}` }
                    className="order-number"
                  >
                    { (id)
                      .toLocaleString('en-US', { minimumIntegerDigits: 4, useGrouping: false }) }
                  </span>
                </div>

                <div className="right-card">
                  <div className="seller-order-data-container">

                    <div className={ `seller-status-container ${status}` }>
                      <span
                        data-testid={ `seller_orders__element-delivery-status-${id}` }
                        className="order-status"
                      >
                        { status }
                      </span>
                    </div>

                    <div className="seller-order-data">
                      <div className="seller-date-container">
                        <span
                          data-testid={ `seller_orders__element-order-date-${id}` }
                          className="seller-order-date"
                        >
                          {
                            new Date(saleDate)
                              .toLocaleDateString('pt-BR', { timezone: 'UTC' })
                          }
                        </span>
                      </div>

                      <div className="seller-price-container">
                        <span
                          data-testid={ `seller_orders__element-card-price-${id}` }
                          className="seller-order-price"
                        >
                          { `Total: R$: ${totalPrice.replace('.', ',')}` }
                        </span>

                      </div>
                    </div>
                  </div>

                  <div className="address-container">
                    <span
                      data-testid={ `seller_orders__element-card-address-${id}` }
                      className="order-adress"
                    >
                      { `${deliveryAddress}, ${deliveryNumber}` }
                    </span>
                  </div>
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
