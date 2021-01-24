import createDataContext from './createDataContext';
import server from '../api/server';

const orderByExpiredSubscription = (users) => {
  return users.sort((a, b) => {
    if (a.username < b.username) {
      return -1;
    }

    if (a.defaulter > b.defaulter) {
      return 1;
    }

    return 0;
  });
};

const usersReducer = (state, action) => {
  switch (action.type) {
    case 'build_calculated_report':
      return {
        ...state,
        users: orderByExpiredSubscription([...action.payload]),
      };
    case 'edit':
      return { ...state, editingUser: action.payload };
    case 'add_error':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const buildReport = (dispatch) => {
  return async () => {
    try {
      const response = (await server.get('/calculatedReport')).data;
      dispatch({ type: 'build_calculated_report', payload: response });
    } catch (error) {
      dispatch({ type: 'add_error', payload: 'Error fetching report' });
    }
  };
};

const changeNotifications = (dispatch) => {
  return async (updatedUser) => {
    try {
      await server.post('/users/config/notifications', updatedUser);
      const response = (await server.get('/calculatedReport')).data;
      dispatch({ type: 'build_calculated_report', payload: response });
    } catch (error) {
      dispatch({ type: 'add_error', payload: 'Error fetching report' });
    }
  };
};

const edit = (dispatch) => {
  return (user) => {
    dispatch({ type: 'edit', payload: user });
  };
};

const save = (dispatch) => {
  return async (user) => {
    try {
      await server.put('/users', {
        id: user.id,
        username: user.username,
        email: user.email,
        pricing: user.subscription.pricing,
      });
      const response = (await server.get('/calculatedReport')).data;
      dispatch({ type: 'build_calculated_report', payload: response });
    } catch (error) {
      dispatch({ type: 'add_error', payload: 'Error fetching report' });
    }
  };
};

const del = (dispatch) => {
  return async (email) => {
    try {
      await server.delete(`/users/${email}`);
      const response = (await server.get('/calculatedReport')).data;
      dispatch({ type: 'build_calculated_report', payload: response });
    } catch (error) {
      dispatch({ type: 'add_error', payload: 'Error fetching report' });
    }
  };
};

const registerPayment = (dispatch) => {
  return async (email) => {
    try {
      await server.post('/users/subscription/payment', { email });
      const response = (await server.get('/calculatedReport')).data;
      dispatch({ type: 'build_calculated_report', payload: response });
    } catch (error) {
      dispatch({ type: 'add_error', payload: 'Error fetching report' });
    }
  };
};

export const { Provider, Context } = createDataContext(
  usersReducer,
  { buildReport, edit, changeNotifications, save, del, registerPayment },
  {
    users: [],
    error: undefined,
    editingUser: {},
  }
);
