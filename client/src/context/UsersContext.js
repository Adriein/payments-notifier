import createDataContext from './createDataContext';
import server from '../api/server';

const usersReducer = (state, action) => {
  switch (action.type) {
    case 'build_calculated_report':
      return { ...state, users: [...action.payload] };
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

export const { Provider, Context } = createDataContext(
  usersReducer,
  { buildReport },
  { users: [], error: undefined }
);
