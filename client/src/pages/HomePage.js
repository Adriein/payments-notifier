import React from 'react';
import Copyright from '../components/copyright/Copyright';
import Uploader from '../components/uploader/Uploader';
import UserTable from '../components/UserTable/UserTable';

export default function HomePage() {
  return (
    <div className="center">
      <Uploader />
      <UserTable />
      <Copyright />
    </div>
  );
}
