import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { requestRegister } from '../services/requests';

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
    <div>
      <form>
        <label htmlFor="nome">
          Nome
          <input
            type="text"
            id="nome"
            name="name"
            data-testid="common_register__input-name"
            onChange={ inputHandler }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            data-testid="common_register__input-email"
            onChange={ inputHandler }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            name="password"
            data-testid="common_register__input-password"
            onChange={ inputHandler }
          />
        </label>
        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ isDisabled }
          onClick={ (event) => resgister(event) }
        >
          Cadastrar
        </button>
      </form>

      {
        failRegister
        && (
          <span
            data-testid="common_register__element-invalid_register"
          >
            Erro
          </span>
        )
      }
    </div>
  );
}

export default Register;
