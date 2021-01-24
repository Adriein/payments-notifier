import React, { useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import './Navbar.scss';
import { FiMoon, FiSquare } from 'react-icons/fi';
import logo from '../../img/logo.svg';

export default function NavBar() {
  const { logout } = useContext(AuthContext);
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="header-menu">
        <a href="#" className="active">
          Usuarios
        </a>
        <a href="#">Dietas</a>
        <a href="#">Rutinas</a>
      </div>
      <div className="user-settings">
        <div className="dark-light">
          <FiMoon size="24px" />
        </div>
        <div className="user-menu">
          <FiSquare size="24px" />
        </div>

        <img
          className="user-profile"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png"
          alt=""
        />
        <div className="user-name">Suhayel Nasim</div>
      </div>
    </div>
  );
}
