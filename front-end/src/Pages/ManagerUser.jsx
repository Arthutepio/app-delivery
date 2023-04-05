import React, { useContext, useState } from 'react';
import NavBar from '../Componentes/NavBar';
import Context from '../Context/Context';

export default function ManagerUser() {
  const { username } = useContext(Context);

  const [formInput, setFormInput] = useState(
    { email: '', password: '', name: '', tipo: 'seller' },
  );

  const inputHandler = ({ target: { name, value } }) => {
    setFormInput({ ...formInput, [name]: value });
  };

  return (
    <>
      <NavBar item1="PRODUTOS" item3={ username } item4="Sair" />
      <span>Cadastro novo usuário</span>

      <form>
        <label htmlFor="nome">
          Nome
          <input
            type="text"
            id="nome"
            name="name"
            data-testid="admin_manage__input-name"
            onChange={ inputHandler }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            data-testid="admin_manage__input-email"
            onChange={ inputHandler }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            name="password"
            data-testid="admin_manage__input-password"
            onChange={ inputHandler }
          />
        </label>
        <label htmlFor="select">
          <span>Tipo</span>
          <select
            name="tipo"
            id="select"
            data-testid="admin_manage__select-role"
            onChange={ inputHandler }
          >
            <option selected value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrator</option>

          </select>
        </label>
        <button
          type="button"
          data-testid="admin_manage__button-register"
        >
          Cadastrar
        </button>
      </form>
    </>
  );
}
