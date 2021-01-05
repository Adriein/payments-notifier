import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Uploader from './uploader/Uploader';

import { Provider as AuthProvider } from '../context/AuthContext';
import Login from './login/Login';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/" exact component={Login} />
        <ProtectedRoute path="/home" exact component={Uploader} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
