import React from 'react';
import { AuthProvider } from './Auth/Context/AuthContext';
import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import RequireAuth from "./Pages/RequireAuth";
import Clients from "./Pages/Clients";


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/clients" element={
          <RequireAuth>
            <Clients/>
          </RequireAuth>
        }/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
