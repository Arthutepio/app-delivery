import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BiError } from 'react-icons/bi';
import { requestData, requestLogin, setToken } from '../services/requests';
import Context from '../Context/Context';
import '../Css/Login.css';
import Logo from '../Assets/Logo.png';

function Login() {
  const { setUserEmail, setUserId, setTokenGlobal,
    setUsername, setSellerOrders } = useContext(Context);
  const [formInput, setFormInput] = useState({ email: '', password: '' });
  const [isDisabled, setIsDisabled] = useState(true);
  const [failLogin, setFailLogin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user !== null) {
      switch (user.role) {
      case 'customer':
        history.push('/customer/products');
        break;
      case 'seller':
        history.push('/seller/orders');
        break;
      case 'administrator':
        history.push('/admin/manage');
        break;
      default:
        break;
      }
    }
  }, []);

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
      localStorage.setItem('token', token);
      setToken(token);
      const storageObj = { name, email, role, token, id };
      localStorage.setItem('user', JSON.stringify(storageObj));
      setUsername(name);
      setUserEmail(email);
      setUserId(id);
      setTokenGlobal(token);
      setUsername(name);

      const response = await requestData(`sale/${id}`);
      setSellerOrders(response);
      localStorage.setItem('sellerOrders', JSON.stringify(response));

      const allOrders = await requestData(`orders/${id}`);
      localStorage.setItem('customerOrders', JSON.stringify(allOrders));
      localStorage.setItem('orderDetails', JSON.stringify(allOrders));

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
      console.log(error);
      setFailLogin(true);
    }
  };

  return (
    <div className="login-container">
      <div className="img-container">
        <img src={ Logo } alt="Logo Birita Delivery" />
      </div>

      <div className="form-container">
        <form action="" className="login-form">
          <label htmlFor="email-input">
            <input
              type="email"
              id="email-input"
              data-testid="common_login__input-email"
              name="email"
              required
              onChange={ inputHandler }
              placeholder="Digite seu email"
              className="input-form"
            />
          </label>

          <label htmlFor="password-input">
            <input
              type="password"
              id="password-input"
              data-testid="common_login__input-password"
              name="password"
              required
              onChange={ inputHandler }
              placeholder="Digite sua senha"
              className="input-form"
            />
          </label>

          <div className="btn-container">
            <button
              type="submit"
              data-testid="common_login__button-login"
              disabled={ isDisabled }
              onClick={ (event) => login(event) }
              className="btn-form"
            >
              Login
            </button>

            <button
              type="button"
              data-testid="common_login__button-register"
              onClick={ () => history.push('/register') }
              className="btn-form"
            >
              Ainda não tenho conta
            </button>
          </div>
        </form>

        {
          failLogin
        && (
          <div className="error-form">
            <BiError className="error-icon" />
            <span
              data-testid="common_login__element-invalid-email"
            >
              Dados inválidos, tente novamente!
            </span>
          </div>

        )

        }
      </div>

    </div>
  );
}

export default Login;
