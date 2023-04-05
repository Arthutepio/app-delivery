import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { requestLogin, setToken } from '../services/requests';
import Context from '../Context/Context';

function Login() {
  const { setUserEmail, setUserId, setTokenGlobal } = useContext(Context);
  const [formInput, setFormInput] = useState({ email: '', password: '' });
  const [isDisabled, setIsDisabled] = useState(true);
  const [failLogin, setFailLogin] = useState(false);
  const history = useHistory();

  const inputHandler = ({ target: { name, value } }) => {
    setFormInput({ ...formInput, [name]: value });
  };

  const MIN_LENGTH_PASSWORD = 5;

  useEffect(() => {
    const validator = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    const validInput = formInput.email && formInput.password
      && (validator.test(formInput.email))
      && formInput.password.length > MIN_LENGTH_PASSWORD;

    setIsDisabled(!validInput);
  }, [formInput]);

  const login = async (event) => {
    event.preventDefault();

    const { email, password } = formInput;

    try {
      const result = await requestLogin('/login', { email, password });

      const { token, name, role, id } = result;
      setToken(token);
      const storageObj = { name, email, role, token, id };
      localStorage.setItem('user', JSON.stringify(storageObj));
      setUserEmail(email);
      setUserId(id);
      setTokenGlobal(token);

      switch (result.role) {
      case 'administrator':
        history.push('/admin/manage');
        break;
      case 'customer':
        history.push('/customer/products');
        break;
      case 'seller':
        history.push('/seller/orders');
        break;
      default:
        history.push('/');
      }
    } catch (error) {
      setFailLogin(true);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form action="">
        <label htmlFor="email-input">
          <span>Login</span>
          <input
            type="email"
            id="email-input"
            data-testid="common_login__input-email"
            name="email"
            required
            onChange={ inputHandler }
          />
        </label>

        <label htmlFor="password-input">
          <span>Password</span>
          <input
            type="password"
            id="password-input"
            data-testid="common_login__input-password"
            name="password"
            required
            onChange={ inputHandler }
          />
        </label>

        <button
          type="submit"
          data-testid="common_login__button-login"
          disabled={ isDisabled }
          onClick={ (event) => login(event) }
        >
          Login
        </button>

        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>
      </form>

      {
        failLogin
        && (
          <span
            data-testid="common_login__element-invalid-email"
          >
            Erro
          </span>
        )

      }

    </div>
  );
}

export default Login;
