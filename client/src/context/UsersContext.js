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
    case 'activate_settings':
      return { ...state, settings: !state.settings };
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

const settings = (dispatch) => {
  return () => {
    dispatch({ type: 'activate_settings' });
  };
};

export const { Provider, Context } = createDataContext(
  usersReducer,
  { buildReport, settings, changeNotifications },
  { users: [], error: undefined, settings: false }
);
