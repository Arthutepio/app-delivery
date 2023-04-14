/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { HiOutlineTruck } from 'react-icons/hi';
import { BsBagCheckFill } from 'react-icons/bs';
import NavBar from '../Componentes/NavBar';
import Context from '../Context/Context';
import { updateData, requestData } from '../services/requests';
import '../Css/SellerOrderDetails.css';

function SellerOrderDetails({ match: { params: { id: saleId } } }) {
  const { username } = useContext(Context);
  const [orderStatus, setOrderStatus] = useState('');
  const [disableBTN, setDisableBTN] = useState(false);
  const [disableBTN2, setDisableBTN2] = useState(true);

  const updateDetails = async () => {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const response = await requestData(`sale/${userId}`);
    localStorage.setItem('sellerOrders', JSON.stringify(response));
    const especificOrder = response.find((order) => order.id === Number(saleId));
    localStorage.setItem('orderStatus', JSON.stringify(especificOrder.status));
    if (especificOrder.status === 'Preparando') {
      setDisableBTN(true);
      setDisableBTN2(false);
    }
    if (especificOrder.status === 'Em Trânsito') {
      setDisableBTN(true);
      setDisableBTN2(true);
    }
    if (especificOrder.status === 'Entregue') {
      setDisableBTN(true);
      setDisableBTN2(true);
    }
  };

  useEffect(() => {
    updateDetails();
  }, []);

  const allSellerOrders = JSON.parse(localStorage.getItem('sellerOrders'));
  const details = allSellerOrders.find((order) => order.id === Number(saleId));
  const { id, saleDate, status, totalPrice, products } = details;

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
    <div className="seller-details-container">
      <NavBar item2="PEDIDOS" item3={ username } item4="Sair" />

      <div className="details-title-container">
        <h3>Detalhes do pedido</h3>
      </div>

      <div className="order-details seller-details">

        <div className="order-infos">
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
            className="btn-deliver"
          >
            Preparar Pedido
            <BsBagCheckFill className="btn-icon" />
          </button>

          <button
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
            onClick={ () => onClickButton2('Em Trânsito') }
            disabled={ disableBTN2 }
            className="btn-deliver"
          >
            Saiu para entrega
            <HiOutlineTruck className="btn-icon" />
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
                        `seller_order_details__element-order-table-item-number-${index}`
                      }
                      className="border-left"
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
            data-testid="seller_order_details__element-order-total-price"
            className="total-price"
          >
            { `Total: R$ ${Number(totalPrice).toFixed(2).replace('.', ',')}` }
          </span>
        </div>

      </div>
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
