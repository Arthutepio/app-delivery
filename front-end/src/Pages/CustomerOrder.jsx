import React, { useContext } from 'react';
import NavBar from '../Componentes/NavBar';
import Context from '../Context/Context';
import CardOrders from '../Componentes/CardOrders';

function CustomerOrder() {
  const { username } = useContext(Context);
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  return (
    <div>
      <NavBar item1="PRODUTOS" item2="MEUS PEDIDOS" item3={ username } item4="Sair" />
      <main>
        {
          orders.map(({ id, status, saleDate, totalPrice }) => (
            <CardOrders
              key={ id }
              id={ id }
              status={ status }
              date={ saleDate }
              price={ totalPrice }
            />
          ))
        }
      </main>
    </div>
  );
}

export default CustomerOrder;
