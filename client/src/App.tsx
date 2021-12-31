import React, { Suspense } from 'react';
import { AuthProvider } from './Auth/Context/AuthContext';
import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import RequireAuth from "./Pages/RequireAuth";
import Clients from "./Pages/Clients";
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <Suspense fallback={'loading'}>
      <Toaster/>
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
    </Suspense>
  );
}

export default App;
