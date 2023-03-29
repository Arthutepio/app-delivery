import React, { useState, useEffect } from 'react';

function Login() {
  const [formInput, setFormInput] = useState({ email: '', password: '' });
  const [isDisabled, setIsDisabled] = useState(true);

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
        >
          Login
        </button>

        <button
          type="button"
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta
        </button>
      </form>

      <span
        data-testid="common_login__element-invalid-email"
      >
        Erro
      </span>

    </div>
  );
}

export default Login;
