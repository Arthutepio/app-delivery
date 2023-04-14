/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MdRemoveShoppingCart } from 'react-icons/md';
import NavBar from '../Componentes/NavBar';
import Context from '../Context/Context';
import { requestLogin, requestData } from '../services/requests';
import '../Css/CustomerCheckout.css';

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
    localStorage.setItem('cart', JSON.stringify([]));
  };

  const onClickRemoveButton = (id) => {
    const newItems = cartStorage.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(newItems));

    setCartStorage(newItems);
  };

  return (
    <div className="customer-checkout-container">
      <NavBar item1="PRODUTOS" item2="MEUS PEDIDOS" item3={ username } item4="Sair" />

      <div className="title-container">
        <h3>Finalizar pedido</h3>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <td className="border-left">Item</td>
              <td>Descrição</td>
              <td>Quantidade</td>
              <td>Valor Unitário</td>
              <td>Sub-total</td>
              <td className="border-right">Remover</td>
            </tr>
          </thead>

          <tbody>
            {
              cartStorage.map(({ id, name, quantity, price, total }, index) => {
                let darkerBg = '';
                if (index % 2 !== 0) darkerBg = 'dark';

                return (
                  <tr key={ id } className={ `product-table ${darkerBg}` }>
                    <td
                      data-testid={
                        `customer_checkout__element-order-table-item-number-${index}`
                      }
                      className="border-left"
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
                      { `R$ ${price}`}
                    </td>

                    <td
                      data-testid={
                        `customer_checkout__element-order-table-sub-total-${index}`
                      }
                    >
                      { `R$ ${total.toFixed(2).replace('.', ',')}`}
                    </td>

                    <td className="border-right">
                      <button
                        type="button"
                        data-testid={
                          `customer_checkout__element-order-table-remove-${index}`
                        }
                        onClick={ () => onClickRemoveButton(id) }
                        className="btn-remove-table"
                      >
                        <MdRemoveShoppingCart />
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>

        <div className="total-price-container">
          <span
            data-testid="customer_checkout__element-order-total-price"
            className="total-price"
          >
            { `Total: R$ ${totalValue.toFixed(2).replace('.', ',')}` }
          </span>

        </div>
      </div>

      <div className="seller-form-container">
        <form
          action=""
          onSubmit={ handleSubmit }
          className="seller-form"
        >
          <div className="inputs-container">
            <label htmlFor="select">
              <span>Vendedor(a):</span>
              <select
                name="sellerId"
                id="select"
                data-testid="customer_checkout__select-seller"
                className="seller-select"
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

            <label htmlFor="address">
              <span>Endereço:</span>
              <input
                name="deliveryAddress"
                type="text"
                id="address"
                data-testid="customer_checkout__input-address"
                onChange={ inputHandler }
                placeholder="Endereço"
                className="address-input"
              />
            </label>

            <label htmlFor="number">
              <span>Número:</span>
              <input
                name="deliveryNumber"
                type="number"
                id="number"
                data-testid="customer_checkout__input-address-number"
                onChange={ inputHandler }
                placeholder="Número"
                className="number-input"
              />
            </label>
          </div>

          <button
            type="submit"
            data-testid="customer_checkout__button-submit-order"
            className="btn-submit"
          >
            Finalizar pedido
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomerCheckout;
