import React from 'react';
import Copyright from '../components/copyright/Copyright';
import NavBar from '../components/nav-bar/NavBar';
import Uploader from '../components/uploader/Uploader';
import UserTable from '../components/user-table/UserTable';

export default function HomePage() {
  return (
    <div className="center">
      <NavBar />
      <Uploader />
      <UserTable />
      <Copyright />
    </div>
  );
}
