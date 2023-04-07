import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../Componentes/NavBar';
import Context from '../Context/Context';
import { updateData, requestData } from '../services/requests';

function SellerOrderDetails({ match: { params: { id: saleId } } }) {
  const { username } = useContext(Context);
  const [orderStatus, setOrderStatus] = useState('');
  const [disableBTN, setDisableBTN] = useState(false);
  const [disableBTN2, setDisableBTN2] = useState(true);

  const newRequest = async () => {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const updatedOrders = await requestData(`sale/${userId}`);
    const especificOrder = updatedOrders.find(({ id }) => id === Number(saleId));
    localStorage.setItem('sellerOrderDetails', JSON.stringify(especificOrder));
  };

  useEffect(() => { newRequest(); }, []);

  const sellerOrdersDetails = JSON.parse(localStorage.getItem('sellerOrderDetails'));

  // const orderDetails = JSON.parse(localStorage.getItem('sellerOrderDetails'));
  // const { id, saleDate, status, totalPrice, products } = orderDetails;

  // const url = window.location.pathname;
  // function apenasNumeros(string) {
  //   const numString = string.replace(/[^0-9]/g, '');
  //   const number = parseInt(numString, 10);
  //   return number;
  // }

  // const newNumber = apenasNumeros(url);

  // const currentOrder = sellerOrdersDetails.find((order) => order.id === Number(saleId));
  const { id, saleDate, status, totalPrice, products } = sellerOrdersDetails;

  const updateStatus = async (newStatus) => {
    const { data } = await updateData(`/sale/${id}`, { status: newStatus });
    setOrderStatus(data.message);
  };

  const onClickButton = (newStatus) => {
    updateStatus(newStatus);
    setDisableBTN(!disableBTN);
    setDisableBTN2(!disableBTN2);
  };

  const onClickButton2 = (newStatus) => {
    updateStatus(newStatus);
    setDisableBTN2(!disableBTN2);
  };

  return (
    <div>
      <NavBar item1="PEDIDOS" item2="" item3={ username } item4="Sair" />

      <div>
        <span
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          { `Pedido ${id}`}
        </span>

        <span
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          { new Date(saleDate).toLocaleDateString('pt-BR', { timezone: 'UTC' }) }
        </span>

        <span
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          { orderStatus || status }
        </span>

        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          onClick={ () => onClickButton('Preparando') }
          disabled={ disableBTN }
        >
          Preparar Pedido
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          onClick={ () => onClickButton2('Em Trânsito') }
          disabled={ disableBTN2 }
        >
          Saiu para entrega
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
                    `seller_order_details__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-name-${index}`
                  }
                >
                  { name }
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-quantity-${index}`
                  }
                >
                  { quantity }
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  { `R$ ${Number(price).toFixed(2).replace('.', ',')}` }
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-sub-total-${index}`
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
        data-testid="seller_order_details__element-order-total-price"
      >
        { `R$ ${Number(totalPrice).toFixed(2).replace('.', ',')}` }
      </span>

    </div>
  );
}

SellerOrderDetails.propTypes = {
  match: {
    params: {
      id: PropTypes.string,
    },
  },
}.isRequired;

export default SellerOrderDetails;
