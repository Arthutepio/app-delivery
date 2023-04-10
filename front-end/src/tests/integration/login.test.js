import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../Pages/Login';
import renderWithRouterContext from '../utils/renderWithRouterContext';
import renderWithRouterApp from '../utils/renderWithRouterApp';
import App from '../../App';
import mockAxios from '../mocks/mockAxios';

// jest.mock('axios');

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

  it('Redireciona corretamente ao efetuar o login', async () => {
    mockAxios.post.mockResolvedValue({ data: { ...customer } });
    mockAxios.get.mockResolvedValue({ data: {} });

    const { history } = renderWithRouterApp(<App />);

    const emailInput = screen.getByLabelText(/Login/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitBtn = screen.getByRole('button', { name: /Login/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);

    userEvent.click(submitBtn);

    await screen.findByText('Sair');
    expect(history.location.pathname).toBe('/customer/products');
  });
});
