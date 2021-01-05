import createDataContext from './createDataContext';
import server from '../api/server';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return { ...state, isSignedIn: true };
    case 'add_error':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const signin = (dispatch) => {
  return async ({ username, password }) => {
    try {
      const [response] = (
        await server.post('api/auth/signin', {
          username,
          password,
        })
      ).data;

      dispatch({ type: 'signin' });
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
  { signin, getToken },
  { isSignedIn: false, error: undefined }
);
