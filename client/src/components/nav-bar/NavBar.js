import React, { useContext, useState } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import './Navbar.scss';
import { FiMoon, FiSquare } from 'react-icons/fi';
import logo from '../../img/cover.png';
import { version } from '../../../package.json';

export default function NavBar() {
  const { getUsername, createAvatar } = useContext(AuthContext);
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="header-menu">
        <span className="active">Usuarios</span>
        <span>Dietas</span>
        <span>Rutinas</span>
      </div>
      <div className="user-settings">
        {/* <div className="dark-light">
          <FiMoon size="24px" />
        </div>
        <div className="user-menu">
          <FiSquare size="24px" />
        </div> */}
        <span className="header__app-version">{`v${version}`}</span>
        <div className="user-profile" onClick={() => setOpen(!isOpen)}>
          <div className="avatar">{createAvatar()}</div>
          <span>{getUsername()}</span>
          {isOpen && (
            <>
              <div className="triangle"></div>
              <div className="menu">
                <ul>
                  <li>Configuración</li>
                  <li>Salir</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
