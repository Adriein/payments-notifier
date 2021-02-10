import React, { useContext } from 'react';
import './HomePage.scss';
import { Context as UsersContext } from '../context/UsersContext';
import Copyright from '../components/copyright/Copyright';
import NavBar from '../components/nav-bar/NavBar';
import Uploader from '../components/uploader/Uploader';
import UserTable from '../components/user-table/UserTable';
import UserForm from '../components/user-form/UserForm';

export default function HomePage() {
  const { state } = useContext(UsersContext);
  return (
    <div className="page__container--main">
      <NavBar />
      <div className="wrapper">
        {/* <Uploader /> */}
        {state.createUser.status === 'create' ? <UserForm /> : <UserTable />}
        {/* <Copyright /> */}
      </div>
    </div>
  );
}
