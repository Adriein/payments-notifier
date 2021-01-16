import React, { useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import './Navbar.scss';
import { FiLogOut } from 'react-icons/fi';

export default function NavBar() {
  const { logout } = useContext(AuthContext);
  return (
    <ul className="nav-bar">
      <li>Hola Iván 😄</li>
      <li onClick={logout}>
        <FiLogOut />
      </li>
    </ul>
  );
}
