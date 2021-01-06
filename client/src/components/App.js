import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Uploader from './uploader/Uploader';

import { Provider as AuthProvider } from '../context/AuthContext';
import { Provider as UsersProvider } from '../context/UsersContext';
import Login from './login/Login';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/" exact component={Login} />
        <UsersProvider>
          <ProtectedRoute path="/home" exact component={Uploader} />
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
