import React from 'react';

function Register() {
  return (
    <div>
      <form>
        <label htmlFor="nome">
          Nome
          <input
            type="text"
            id="nome"
            data-testid="common_register__input-name"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            data-testid="common_register__input-email"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            data-testid="common_register__input-password"
          />
        </label>
        <button
          type="button"
          data-testid="common_register__button-register"
        >
          Cadastrar
        </button>
      </form>
      <span data-testid="common_register__element-invalid_register">Error</span>
    </div>
  );
}

export default Register;
