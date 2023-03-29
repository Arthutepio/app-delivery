import React from 'react';

function Login() {
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
          />
        </label>

        <label htmlFor="password-input">
          <span>Password</span>
          <input
            type="password"
            id="password-input"
            data-testid="common_login__input-password"
          />
        </label>

        <button
          type="submit"
          data-testid="common_login__button-login"
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
