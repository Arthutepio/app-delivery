/* eslint-disable react/jsx-max-depth */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GiCheckMark } from 'react-icons/gi';
import NavBar from '../Componentes/NavBar';
import Context from '../Context/Context';
import '../Css/OrderDetails.css';
import { requestData, updateData } from '../services/requests';

function OrderDetails({ match: { params: { id: saleId } } }) {
  const { username } = useContext(Context);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [orderStatus, setOrderStatus] = useState('');

  const newRequest = async () => {
    const updatedOrders = await requestData(`sale/${2}`);
    localStorage.setItem('orderDetails', JSON.stringify(updatedOrders));
    localStorage.setItem('customerOrders', JSON.stringify(updatedOrders));
    const especificOrder = updatedOrders.find(({ id }) => id === Number(saleId));
    if (especificOrder.status === 'Em Trânsito') {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => newRequest(), []);

  const allOrders = JSON.parse(localStorage.getItem('orderDetails'));
  const details = allOrders.find((order) => order.id === Number(saleId));
  const { id, saleDate, status, totalPrice, products } = details;

  const handleStatus = async () => {
    const { data } = await updateData(`/sale/${id}`, { status: 'Entregue' });
    setOrderStatus(data.message);
    setIsButtonDisabled(true);
  };

  return (
    <div className="order-details-container">
      <NavBar item1="PRODUTOS" item2="MEUS PEDIDOS" item3={ username } item4="Sair" />

      <div className="details-title-container">
        <h3>Detalhes do pedido</h3>
      </div>

      <div className="order-details">
        <div className="order-infos">
          <span
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            { `Pedido ${id}`}
          </span>

          <span
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            Vendedor(a): Fulana Pereira
          </span>

          <span
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            { new Date(saleDate).toLocaleDateString('pt-BR', { timezone: 'UTC' }) }
          </span>

          <span
            data-testid={
              `customer_order_details__element-order-details-label-delivery-status-${id}`
            }
          >
            { orderStatus || status }
          </span>

          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            disabled={ isButtonDisabled }
            onClick={ handleStatus }
            className="btn-deliver"
          >
            Marcar como entregue
            <GiCheckMark className="icon-check" />
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <td className="border-left">Item</td>
              <td>Descrição</td>
              <td>Quantidade</td>
              <td>Valor Unitário</td>
              <td className="border-right">Sub-total</td>
            </tr>
          </thead>

          <tbody>
            {
              products.map(({ name, SaleProduct: { quantity }, price }, index) => {
                let darkerBg = '';
                if (index % 2 !== 0) darkerBg = 'dark';

                return (
                  <tr key={ index } className={ `product-table ${darkerBg}` }>
                    <td
                      data-testid={
                        `customer_order_details__element-order-table-item-number-${index}`
                      }
                      className="border-left"
                    >
                      { index + 1 }
                    </td>
                    <td
                      data-testid={
                        `customer_order_details__element-order-table-name-${index}`
                      }
                    >
                      { name }
                    </td>
                    <td
                      data-testid={
                        `customer_order_details__element-order-table-quantity-${index}`
                      }
                    >
                      { quantity }
                    </td>
                    <td
                      data-testid={
                        `customer_order_details__element-order-table-unit-price-${index}`
                      }
                    >
                      { `R$ ${Number(price).toFixed(2).replace('.', ',')}` }
                    </td>
                    <td
                      data-testid={
                        `customer_order_details__element-order-table-sub-total-${index}`
                      }
                      className="border-right"
                    >
                      {
                        `R$ ${(Number(price) * Number(quantity))
                          .toFixed(2).replace('.', ',')}`
                      }
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>

        <div className="total-price-container">
          <span
            data-testid="customer_order_details__element-order-total-price"
            className="total-price"
          >
            { `Total: R$ ${Number(totalPrice).toFixed(2).replace('.', ',')}` }
          </span>
        </div>
      </div>
    </div>
  );
}

OrderDetails.propTypes = {
  match: {
    params: {
      id: PropTypes.string,
    },
  },
}.isRequired;

export default OrderDetails;
