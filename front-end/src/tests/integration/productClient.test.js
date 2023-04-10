/* import React from 'react';
import { screen } from '@testing-library/react';
import App from '../../App';
// import * as axios from 'axios';
import renderWithRouterContext from '../utils/renderWithRouterContext';
import localStorageMock from '../mocks/localStorageMock';
// import ProductClient from '../../Pages/ProductClient';
import productsMock from '../mocks/productsMock';

const BUTTON_PRODUTOS = 'customer_products__element-navbar-link-products';
const BUTTON_MEUS_PEDIDOS = 'customer_products__element-navbar-link-orders';
const BUTTON_SAIR = 'customer_products__element-navbar-link-logout';

describe('Case 3: Página ProductClient :', () => {
  beforeEach(() => {
    window.localStorage.setItem('user', JSON.stringify(localStorageMock));
    window.localStorage.setItem('user', JSON.stringify(productsMock));
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('verifica a renderizacao do NavBar', () => {
    renderWithRouterContext(<App />, '/customer/products');
    // renderWithRouterContext(<ProductClient />);
    const btnProdutos = screen.getByTestId(BUTTON_PRODUTOS);
    const btnPedidos = screen.getByTestId(BUTTON_MEUS_PEDIDOS);
    const btnSair = screen.getByTestId(BUTTON_SAIR);

    expect(btnProdutos && btnPedidos && btnSair).toBeInTheDocument();
  });

  it('verifica a renderizacao do botao de carrinho', () => {
    // renderWithRouterContext(<ProductClient />);
    renderWithRouterContext(<App />, '/customer/products');
    const btnCarrinho = screen.getByTestId('customer_products__button-cart');

    expect(btnCarrinho).toBeInTheDocument();
  });
}); */
