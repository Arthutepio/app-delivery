/* eslint-disable react/jsx-max-depth */
import React, { useContext, useState, useEffect } from 'react';
import { BiError } from 'react-icons/bi';
import { BsCheckCircleFill } from 'react-icons/bs';
import NavBar from '../Componentes/NavBar';
import Context from '../Context/Context';
import { requestRegister } from '../services/requests';
import '../Css/ManagerUser.css';

export default function ManagerUser() {
  const { username } = useContext(Context);
  const [failRegister, setFailRegister] = useState(false);
  const [formInput, setFormInput] = useState(
    { email: '', password: '', name: '', role: 'seller' },
  );
  const [isDisabled, setIsDisabled] = useState(true);
  const [success, setSuccess] = useState(false);

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
      setSuccess(true);
    } catch (error) {
      setFailRegister(true);
    }
  };

  return (
    <div className="adm-container">
      <NavBar item1="PRODUTOS" item3={ username } item4="Sair" />

      <div className="title-container">
        <h3>Cadastrar novo usuário</h3>
      </div>

      <div className="new-user-form-container">
        <form className="new-user-form">

          <div className="input-container">
            <label htmlFor="nome">
              <span>Nome:</span>
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
              <span>Email:</span>
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
              <span>Senha:</span>
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
              <span>Tipo:</span>
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
          </div>

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
              className="error-new-user"
            >
              <BiError className="error-icon" />
              Ocorreu um erro, por favor tente novamente!
            </span>
          )
        }

        {
          success
          && (
            <span className="error-new-user">
              <BsCheckCircleFill className="error-icon" />
              Usuário criado com sucesso!
            </span>
          )
        }

      </div>

    </div>
  );
}
