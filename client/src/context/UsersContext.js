import createDataContext from './createDataContext';
import server from '../api/server';

const orderByExpiredSubscription = (users) => {
  return users.sort((a, b) => {
    if (a.defaulter < b.defaulter) {
      return -1;
    }

    if (a.defaulter > b.defaulter) {
      return 1;
    }

    return 0;
  });
};

const buildFilters = (filters) => {
  return `?${filters
    .map(
      (filter) => `${filter.field.toLowerCase()}=${filter.value.toLowerCase()}`
    )
    .join('&')}`;
};

const usersReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_action':
      return {
        ...state,
        users: orderByExpiredSubscription([...action.payload]),
      };
    case 'start_edit_action':
      return { ...state, editingUser: action.payload };
    case 'start_create_action':
      return { ...state, createUser: action.payload };
    case 'add_success':
      return { ...state, success: action.payload };
    case 'add_error':
      return { ...state, error: action.payload };
    case 'reset_notifications_action':
      return { ...state, error: undefined, success: undefined };
    default:
      return state;
  }
};

const buildReport = (dispatch) => {
  return async (filters = []) => {
    let url = '/calculatedReport';
    if (filters.length) {
      url = url.concat(buildFilters(filters));
    }

    try {
      const response = (await server.get(url)).data;
      dispatch({ type: 'fetch_action', payload: response });
    } catch (error) {
      dispatch({ type: 'add_error', payload: 'Error fetching report' });
    }
  };
};

const changeNotifications = (dispatch) => {
  return async (user) => {
    try {
      await server.post('/users/config/notifications', user);
      const response = (await server.get('/calculatedReport')).data;
      dispatch({ type: 'fetch_action', payload: response });
      dispatch({
        type: 'add_success',
        payload: `Se ha actualizado correctamente la notificación para el usuario ${user.username}`,
      });
    } catch (error) {
      dispatch({ type: 'add_error', payload: 'Error fetching report' });
    }
  };
};

const edit = (dispatch) => {
  return (user = {}) => {
    dispatch({ type: 'start_edit_action', payload: user });
  };
};

const create = (dispatch) => {
  return (user = { status: true }) => {
    dispatch({ type: 'start_create_action', payload: user });
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
      dispatch({ type: 'fetch_action', payload: response });
      dispatch({
        type: 'add_success',
        payload: `El usuario ${user.username} ha sido actualizado correctamente`,
      });
    } catch (error) {
      dispatch({
        type: 'add_error',
        payload: `El usuario ${user.username} no ha podido ser actualizado compruebe que los campos son correctos`,
      });
    }
  };
};

const del = (dispatch) => {
  return async (email) => {
    try {
      await server.delete(`/users/${email}`);
      const response = (await server.get('/calculatedReport')).data;
      dispatch({ type: 'fetch_action', payload: response });
      dispatch({
        type: 'add_success',
        payload: `El usuario se ha borrado correctamente`,
      });
    } catch (error) {
      dispatch({
        type: 'add_error',
        payload: `El usuario no ha podido ser borrado correctamente`,
      });
    }
  };
};

const registerPayment = (dispatch) => {
  return async (email) => {
    try {
      await server.post('/users/subscription/payment', { email });
      const response = (await server.get('/calculatedReport')).data;
      dispatch({ type: 'fetch_action', payload: response });
      dispatch({
        type: 'add_success',
        payload: `Se ha registrado correctamente el pago para el usuario con email ${email}`,
      });
    } catch (error) {
      dispatch({
        type: 'add_error',
        payload: `El pago para el usuario con email ${email} no ha podido ser actualizado`,
      });
    }
  };
};

const resetToastState = (dispatch) => {
  return () => {
    dispatch({
      type: 'reset_notifications_action',
    });
  };
};

export const { Provider, Context } = createDataContext(
  usersReducer,
  {
    create,
    buildReport,
    edit,
    changeNotifications,
    save,
    del,
    registerPayment,
    resetToastState,
  },
  {
    users: [],
    error: undefined,
    success: undefined,
    editingUser: {},
    createUser: {},
  }
);
