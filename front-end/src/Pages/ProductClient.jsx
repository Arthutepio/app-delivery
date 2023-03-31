import { useContext } from 'react';
import CardProduct from '../Componentes/CardProduct';
import NavBar from '../Componentes/NavBar';
import Context from '../Context/Context';

function ProductClient() {
  const { products } = useContext(Context);
  console.log(products);

  return (
    <>
      <NavBar item1="PRODUTOS" item2="MEUS PEDIDOS" item3="NOME" item4="Sair" />
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
