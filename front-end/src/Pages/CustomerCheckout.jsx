import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../Componentes/NavBar';
import Context from '../Context/Context';
import { requestLogin, requestData } from '../services/requests';

function CustomerCheckout() {
  const { username, sellers } = useContext(Context);
  const cartItems = JSON.parse(localStorage.getItem('cart'));
  const [formInput, setFormInput] = useState({});
  const [email, setEmail] = useState('');
  const [cartStorage, setCartStorage] = useState(cartItems);
  const [totalValue, setTotalValue] = useState(0);
  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const newTotal = cartStorage.reduce((acc, curr) => acc + curr.total, 0);
    setTotalValue(newTotal);

    const user = JSON.parse(localStorage.getItem('user'));
    setEmail(user.email);

    const listProducts = [];
    cartStorage.map(({ id, quantity }) => listProducts.push({ id, quantity }));
    setProducts(listProducts);
  }, [cartStorage]);

  const inputHandler = ({ target: { name, value } }) => {
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { deliveryAddress, deliveryNumber } = formInput;

    const objAPI = {
      email,
      sellerId: 2,
      totalPrice: totalValue,
      deliveryAddress,
      deliveryNumber,
      products,
    };

    const idSale = await requestLogin('createsale', objAPI);
    const user = JSON.parse(localStorage.getItem('user'));
    const allOrders = await requestData(`orders/${user.id}`);
    localStorage.setItem('orders', JSON.stringify(allOrders));

    const result = await requestData(`orders/${user.id}`);
    localStorage.setItem('orderDetails', JSON.stringify(result));

    history.push(`/customer/orders/${idSale}`);
  };

  const onClickRemoveButton = (id) => {
    const newItems = cartStorage.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(newItems));

    setCartStorage(newItems);
  };

  return (
    <div>
      <h1>Customer Checkout</h1>
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

      <form action="" onSubmit={ handleSubmit }>
        <label htmlFor="select">
          <span>P. Vendedora Responsável</span>
          <select
            name="sellerId"
            id="select"
            data-testid="customer_checkout__select-seller"
          >
            {
              sellers.map(({ id, name }) => (
                <option
                  key={ id }
                  value={ id }
                >
                  { name }
                </option>
              ))
            }
          </select>
        </label>

        <br />

        <label htmlFor="address">
          <span>Endereço</span>
          <input
            name="deliveryAddress"
            type="text"
            id="address"
            data-testid="customer_checkout__input-address"
            onChange={ inputHandler }
          />
        </label>

        <br />

        <label htmlFor="number">
          <span>Número</span>
          <input
            name="deliveryNumber"
            type="number"
            id="number"
            data-testid="customer_checkout__input-address-number"
            onChange={ inputHandler }
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
