/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../Componentes/NavBar';
import Context from '../Context/Context';
import { requestData, updateData } from '../services/requests';

function OrderDetails({ match: { params: { id: saleId } } }) {
  const { username } = useContext(Context);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [orderStatus, setOrderStatus] = useState('');

  const newRequest = async () => {
    const { sellerId } = JSON.parse(localStorage.getItem('customerOrders'))[0];
    const updatedOrders = await requestData(`sale/${sellerId}`);
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
    <div>
      <NavBar item1="PRODUTOS" item2="MEUS PEDIDOS" item3={ username } item4="Sair" />

      <div>
        <span
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          { `Pedido ${id}`}
        </span>

        <span
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          P. Vendedora: Fulana Pereira
        </span>

        <span
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          { new Date(saleDate).toLocaleDateString('pt-BR', { timezone: 'UTC' }) }
        </span>

        <span
          data-testid={
            `customer_order_details__element-order-details-label-delivery-status${id}`
          }
        >
          { orderStatus || status }
        </span>

        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          disabled={ isButtonDisabled }
          onClick={ handleStatus }
        >
          Marcar como entregue
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Descrição</td>
            <td>Quantidade</td>
            <td>Valor Unitário</td>
            <td>Sub-total</td>
          </tr>
        </thead>

        <tbody>

          {
            products.map(({ name, SaleProduct: { quantity }, price }, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${index}`
                  }
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
                >
                  {
                    `R$ ${(Number(price) * Number(quantity))
                      .toFixed(2).replace('.', ',')}`
                  }
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>

      <span
        data-testid="customer_order_details__element-order-total-price"
      >
        { `R$ ${Number(totalPrice).toFixed(2).replace('.', ',')}` }
      </span>
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
