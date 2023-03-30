import React, { useState, useEffect } from 'react';

function Register() {
  const [formInput, setFormInput] = useState({ email: '', password: '', name: '' });
  const [isDisabled, setIsDisabled] = useState(true);
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
        >
          Cadastrar
        </button>
      </form>
      <span data-testid="common_register__element-invalid_register">Error</span>
    </div>
  );
}

export default Register;
