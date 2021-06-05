import './App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider as AuthProvider } from '../context/AuthContext';
import { Provider as UsersProvider } from '../context/UsersContext';
import { Provider as ModalProvider } from '../context/ModalContext';
import { Provider as AppConfigProvider } from '../context/AppConfigContext';
import { ToastProvider } from 'react-toast-notifications';

import Login from './login/Login';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '../pages/HomePage';
import LandingPage from '../pages/Landing/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider autoDismiss={true} placement="bottom-right">
        <AuthProvider>
          <Route path="/" exact component={LandingPage} />
          <AppConfigProvider>
            <UsersProvider>
              <ModalProvider>
                <ProtectedRoute path="/home" exact component={HomePage} />
              </ModalProvider>
            </UsersProvider>
          </AppConfigProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
