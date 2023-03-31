import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardProduct from '../Componentes/CardProduct';
import NavBar from '../Componentes/NavBar';
import Context from '../Context/Context';
import { setToken } from '../services/requests';

function ProductClient() {
  const [username, setUsername] = useState('');
  const { products } = useContext(Context);
  const history = useHistory();
  // console.log(products);

  useEffect(() => {
    (async () => {
      const user = localStorage.getItem('user') || '';
      const userObj = JSON.parse(user);

      const { name, token } = userObj;
      setUsername(name);

      if (!token) return history.push('/');

      setToken(token);
    })();
  });

  return (
    <>
      <NavBar item1="PRODUTOS" item2="MEUS PEDIDOS" item3={ username } item4="Sair" />
      {
        products.map((product) => (
          <CardProduct
            key={ product.id }
            name={ product.name }
            price={ product.price }
            image={ product.urlImage }
            id={ product.id }
          />))
      }
    </>

  );
}

export default ProductClient;
