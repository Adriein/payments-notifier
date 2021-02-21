import './App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider as AuthProvider } from '../context/AuthContext';
import { Provider as UsersProvider } from '../context/UsersContext';
import { Provider as ModalProvider } from '../context/ModalContext';
import { ToastProvider } from 'react-toast-notifications';

import Login from './login/Login';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '../pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/" exact component={Login} />
        <UsersProvider>
          <ToastProvider autoDismiss={true} placement="bottom-right">
            <ModalProvider>
              <ProtectedRoute path="/home" exact component={HomePage} />
            </ModalProvider>
          </ToastProvider>
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
