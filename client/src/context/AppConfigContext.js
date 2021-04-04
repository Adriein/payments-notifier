import createDataContext from './createDataContext';
import server from '../api/server';

const FETCH_CONFIG_ACTION = 'fetch_config_action';
const ADD_ERROR_ACTION = 'add_error_action';

const appConfigReducer = (state, action) => {
  switch (action.type) {
    case FETCH_CONFIG_ACTION:
      return { ...state, config: action.payload };
    case ADD_ERROR_ACTION:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const getAppConfig = (dispatch) => {
  return async () => {
    try {
      const config = await server.get('/appConfig');
      dispatch({ type: FETCH_CONFIG_ACTION, payload: config });
    } catch (error) {
      addError(dispatch)('Error cargando la configuración');
    }
  };
};

const createPricing = (dispatch) => {
  return async (name, duration, price) => {
    try {
      await server.post('/appConfig/pricing', { name, duration, price });
      getAppConfig(dispatch)();
    } catch (error) {
      addError(dispatch)('Error creando la tarifa');
    }
  };
};

const addError = (dispatch) => {
  return (msg) => {
    dispatch({
      type: ADD_ERROR_ACTION,
      payload: msg,
    });
  };
};

export const { Provider, Context } = createDataContext(
  appConfigReducer,
  { getAppConfig, createPricing },
  { error: undefined, config: {} }
);
