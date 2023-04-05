import React, { useContext, useState, useEffect } from 'react';
import NavBar from '../Componentes/NavBar';
import Context from '../Context/Context';
import { requestRegister } from '../services/requests';

export default function ManagerUser() {
  const { username } = useContext(Context);
  const [failRegister, setFailRegister] = useState(false);
  const [formInput, setFormInput] = useState(
    { email: '', password: '', name: '', role: 'seller' },
  );
  const [isDisabled, setIsDisabled] = useState(true);

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

  const inputHandler = ({ target: { name, value } }) => {
    setFormInput({ ...formInput, [name]: value });
  };

  const cadastrarUser = async (event) => {
    event.preventDefault();
    try {
      await requestRegister('/registeradm', { ...formInput });
      setFormInput({ email: '', password: '', name: '', role: 'seller' });
    } catch (error) {
      setFailRegister(true);
    }
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
            value={ formInput.name }
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
            value={ formInput.email }
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
            value={ formInput.password }
            data-testid="admin_manage__input-password"
            onChange={ inputHandler }
          />
        </label>
        <label htmlFor="select">
          <span>Tipo</span>
          <select
            defaultValue="seller"
            name="role"
            id="select"
            data-testid="admin_manage__select-role"
            onChange={ inputHandler }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrator</option>

          </select>
        </label>
        <button
          type="button"
          data-testid="admin_manage__button-register"
          onClick={ (event) => cadastrarUser(event) }
          disabled={ isDisabled }
        >
          Cadastrar
        </button>
      </form>

      {
        failRegister
        && (
          <span
            data-testid="admin_manage__element-invalid-register"
          >
            Erro
          </span>
        )
      }
    </>
  );
}
