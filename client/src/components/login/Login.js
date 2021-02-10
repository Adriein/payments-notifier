import React, { useContext } from 'react';
import './Login.scss';

import signinImg from '../../img/log.svg';
import registerImg from '../../img/register.svg';

import useInputState from '../../hooks/useInputState';
import { Context as AuthContext } from '../../context/AuthContext';
import { Redirect } from 'react-router-dom';

import {
  FaUser,
  FaLock,
  FaGoogle,
  FaInstagram,
  FaEnvelope,
} from 'react-icons/fa';

export default function Login() {
  const { signin, getToken } = useContext(AuthContext);
  const [form, handleChange, reset] = useInputState({
    username: '',
    email: '',
    password: '',
  });

  if (getToken) {
    return <Redirect to="/home" />;
  }

  const handleRegister = (event) => {
    event.preventDefault();
  };

  const handleSignin = (event) => {
    event.preventDefault();
    signin({ email: form.email, password: form.password });
    reset();
  };

  //Handle animations
  const handleRegisterForm = () => {
    reset();
    const container = document.querySelector('.container');
    container.classList.add('sign-up-mode');
  };

  const handleLoginForm = () => {
    reset();
    const container = document.querySelector('.container');
    container.classList.remove('sign-up-mode');
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Entrar</h2>
            <div className="input-field">
              <FaUser />
              <input
                name="email"
                type="text"
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
              />
            </div>
            <div className="input-field">
              <FaLock />
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={form.password}
              />
            </div>
            <input
              type="submit"
              value="Login"
              className="btn solid"
              onClick={handleSignin}
            />
            <p className="social-text">
              Accede usando una de tus redes sociales
            </p>
            <div className="social-media">
              <div className="social-icon">
                <FaGoogle />
              </div>
              <div className="social-icon">
                <FaInstagram />
              </div>
            </div>
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Registrarse</h2>
            <div className="input-field">
              <FaUser />
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                value={form.username}
              />
            </div>
            <div className="input-field">
              <FaEnvelope />
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
              />
            </div>
            <div className="input-field">
              <FaLock />
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={form.password}
              />
            </div>
            <input
              type="submit"
              className="btn"
              value="Entrar"
              onClick={handleRegister}
            />
            <p className="social-text">
              Accede usando una de tus redes sociales
            </p>
            <div className="social-media">
              <div className="social-icon">
                <FaGoogle />
              </div>
              <div className="social-icon">
                <FaInstagram />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Eres nuevo ?</h3>
            <p>
              Pincha abajo para registrarte y empezar a disfrutar de todas las
              ventajas que te ofrece IvPay
            </p>
            <button
              onClick={handleRegisterForm}
              className="btn transparent"
              id="sign-up-btn"
            >
              Registrarse
            </button>
          </div>
          <img src={signinImg} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Ya eres uno de nosotros ?</h3>
            <p>
              Genial, pincha abajo y entra para usar todas las ventajas de la
              app
            </p>
            <button
              onClick={handleLoginForm}
              className="btn transparent"
              id="sign-in-btn"
            >
              Entrar
            </button>
          </div>
          <img src={registerImg} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
