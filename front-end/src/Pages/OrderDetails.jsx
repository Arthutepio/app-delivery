import React, { useContext } from 'react';
import NavBar from '../Componentes/NavBar';
import Context from '../Context/Context';

function OrderDetails() {
  const { username } = useContext(Context);
  const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
  const { id, saleDate, status, totalPrice, products } = orderDetails;

  const setDisabled = () => status === 'Entregue' && setIsButtonDisabled(true);
  setDisabled();

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
          { status }
        </span>

        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          disabled
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

export default OrderDetails;
