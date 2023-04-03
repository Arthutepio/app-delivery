import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../Componentes/NavBar';
import Context from '../Context/Context';

function CustomerCheckout() {
  const { username } = useContext(Context);
  const cartItems = JSON.parse(localStorage.getItem('cart'));

  const [totalValue, setTotalValue] = useState(0);
  const [cartStorage, setCartStorage] = useState(cartItems);

  useEffect(() => {
    const newTotal = cartStorage.reduce((acc, curr) => acc + curr.total, 0);
    setTotalValue(newTotal);
  }, [cartStorage]);

  const onClickRemoveButton = (id) => {
    const newItems = cartStorage.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(newItems));

    setCartStorage(newItems);
  };

  return (
    <div>
      <h1>Customer Ceckout</h1>
      <NavBar item1="PRODUTOS" item2="MEUS PEDIDOS" item3={ username } item4="Sair" />

      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Descrição</td>
            <td>Quantidade</td>
            <td>Valor Unitário</td>
            <td>Sub-total</td>
            <td>Remover Item</td>
          </tr>
        </thead>

        <tbody>
          {
            cartStorage.map(({ id, name, quantity, price, total }, index) => (
              <tr key={ id }>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>

                <td
                  data-testid={
                    `customer_checkout__element-order-table-name-${index}`
                  }
                >
                  { name }
                </td>

                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  { quantity }
                </td>

                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  { price }
                </td>

                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  { total.toFixed(2).replace('.', ',') }
                </td>

                <td>
                  <button
                    type="button"
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                    onClick={ () => onClickRemoveButton(id) }
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <span>Total: R$ </span>
      <span
        data-testid="customer_checkout__element-order-total-price"
      >
        { totalValue.toFixed(2).replace('.', ',') }
      </span>

      <form action="">
        <label htmlFor="select">
          <span>P. Vendedora Responsável</span>
          <select
            name=""
            id="select"
            data-testid="customer_checkout__select-seller"
          >
            <option value="teste">Teste</option>
          </select>
        </label>

        <br />

        <label htmlFor="address">
          <span>Endereço</span>
          <input
            type="text"
            id="address"
            data-testid="customer_checkout__input-address"
          />
        </label>

        <br />

        <label htmlFor="number">
          <span>Número</span>
          <input
            type="text"
            id="number"
            data-testid="customer_checkout__input-address-number"
          />
        </label>

        <br />

        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar pedido
        </button>
      </form>
    </div>
  );
}

export default CustomerCheckout;
