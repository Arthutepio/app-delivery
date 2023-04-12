import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BiError } from 'react-icons/bi';
import { requestRegister } from '../services/requests';
import Logo from '../Assets/Logo.png';
import '../Css/Register.css';

function Register() {
  const [formInput, setFormInput] = useState({ email: '', password: '', name: '' });
  const [isDisabled, setIsDisabled] = useState(true);
  const [failRegister, setFailRegister] = useState(false);
  const history = useHistory();
  const inputHandler = ({ target: { name, value } }) => {
    setFormInput({ ...formInput, [name]: value });
  };

  const MIN_LENGTH_PASSWORD = 5;
  const MIN_LENGTH_NAME = 11;

  useEffect(() => {
    const validator = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    const validInput = formInput.email && formInput.password && formInput.name
      && (validator.test(formInput.email))
      && formInput.password.length > MIN_LENGTH_PASSWORD
      && formInput.name.length > MIN_LENGTH_NAME;

    setIsDisabled(!validInput);
  }, [formInput]);

  const resgister = async (event) => {
    event.preventDefault();

    const { email, password, name } = formInput;

    try {
      await requestRegister('/register', { name, email, password });
      history.push('/customer/products');
    } catch (error) {
      setFailRegister(true);
    }
  };

  return (
    <div className="register-container">
      <div className="img-container">
        <img src={ Logo } alt="Logo Birita Delivery" />
      </div>
      <div className="form-container">
        <form className="register-form">
          <input
            type="text"
            id="nome"
            name="name"
            data-testid="common_register__input-name"
            className="input-register-form"
            placeholder="Nome completo"
            onChange={ inputHandler }
          />
          <input
            type="email"
            id="email"
            name="email"
            data-testid="common_register__input-email"
            className="input-register-form"
            placeholder="Email"
            onChange={ inputHandler }
          />
          <input
            type="password"
            id="password"
            name="password"
            data-testid="common_register__input-password"
            className="input-register-form"
            placeholder="Senha"
            onChange={ inputHandler }
          />
          <button
            type="button"
            data-testid="common_register__button-register"
            className="btn-register-form"
            disabled={ isDisabled }
            onClick={ (event) => resgister(event) }
          >
            Cadastrar
          </button>
        </form>
        {
          failRegister
        && (
          <div className="error-form">
            <BiError className="error-icon" />
            <span
              data-testid="common_register__element-invalid_register"
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

export default Register;
