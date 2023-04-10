import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axios from 'axios';
import Login from '../../Pages/Login';
import renderWithRouterContext from '../utils/renderWithRouterContext';
import App from '../../App';

jest.mock('axios');

const VALID_EMAIL = 'zebirita@email.com';
const VALID_PASSWORD = '$#zebirita#$';
const INVALID_PASSWORD = 'test';

const customer = {
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  token: '$#zebirita#$',
  role: 'customer',
};

describe('Case 1: Página Login', () => {
  afterEach(() => jest.clearAllMocks());

  it('checa se todos elementos esperados são renderizados', () => {
    renderWithRouterContext(<Login />);

    const emailInput = screen.getByLabelText(/Login/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitBtn = screen.getByRole('button', { name: /Login/i });
    const registerBtn = screen.getByRole('button', { name: /Ainda não tenho conta/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(registerBtn).toBeInTheDocument();
  });

  it('checa se o botão fica habilitado com password válido', () => {
    renderWithRouterContext(<Login />);

    const emailInput = screen.getByLabelText(/Login/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitBtn = screen.getByRole('button', { name: /Login/i });

    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);

    expect(submitBtn).not.toBeDisabled();
  });

  it('checa se o botão fica desabilitado com password válido', () => {
    renderWithRouterContext(<Login />);

    const emailInput = screen.getByLabelText(/Login/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitBtn = screen.getByRole('button', { name: /Login/i });

    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);

    expect(submitBtn).toBeDisabled();
  });

  it('Renderiza mensagem de erro quando nao encontrar o usuario', async () => {
    axios.post.mockRejectedValue({ message: 'Not found' });
    renderWithRouterContext(<Login />);

    const emailInput = screen.getByLabelText(/Login/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitBtn = screen.getByRole('button', { name: /Login/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    userEvent.click(submitBtn);

    const errorMessage = await screen.findByText(/Erro/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it.only('Redirects to customer products page with valid customer info', async () => {
    axios.post.mockResolvedValue({ data: { ...customer } });
    const { history } = renderWithRouterContext(<App />);

    const emailInput = screen.getByLabelText(/Login/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitBtn = screen.getByRole('button', { name: /Login/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);

    console.log('inputEmail ---', emailInput.value);
    console.log('inputPassword ---', passwordInput.value);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    userEvent.click(submitBtn);
    await screen.findByText('Sair')
    expect(history.location.pathname).toBe('/customer/products');
    // await waitForElementToBeRemoved(submitBtn);
    // expect(history.location.pathname).toBe('/customer/products');
  });
});
