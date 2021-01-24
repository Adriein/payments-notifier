import createDataContext from './createDataContext';
import server from '../api/server';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return { ...state, isSignedIn: true };
    case 'signout':
      return { ...state, isSignedIn: false };
    case 'add_error':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const [response] = (
        await server.post('/signin', {
          email,
          password,
        })
      ).data;

      console.log('aclaret.dev');

      dispatch({ type: 'signin' });
    } catch (error) {
      dispatch({ type: 'add_error', payload: 'Invalid Credentials' });
    }
  };
};

const logout = (dispatch) => {
  return async () => {
    try {
      await server.post('/signout', {});

      dispatch({ type: 'signout' });
    } catch (error) {
      dispatch({ type: 'add_error', payload: 'Invalid Credentials' });
    }
  };
};

const getToken = () => {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('express'));
  if (cookie) return cookie.split('=')[1];

  return undefined;
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, getToken, logout },
  { isSignedIn: false, error: undefined }
);
