import './App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider as AuthProvider } from '../context/AuthContext';
import { Provider as UsersProvider } from '../context/UsersContext';
import Login from './login/Login';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '../pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/" exact component={Login} />
        <UsersProvider>
          <ProtectedRoute path="/home" exact component={HomePage} />
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
