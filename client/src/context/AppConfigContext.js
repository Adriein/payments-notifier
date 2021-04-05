import createDataContext from './createDataContext';
import server from '../api/server';

const FETCH_CONFIG_ACTION = 'fetch_config_action';
const CREATE_PRICING_ACTION = 'create_pricing_action';

const ADD_ERROR_ACTION = 'add_error_action';
const FINISH_LOADING_ACTION = 'finish_loading_action';

const appConfigReducer = (state, action) => {
  switch (action.type) {
    case FETCH_CONFIG_ACTION:
      return { ...state, config: action.payload };
    case CREATE_PRICING_ACTION:
      return { ...state, loading: true };
    case FINISH_LOADING_ACTION:
      return { ...state, loading: false };
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
  return async ({ name, duration, price }) => {
    try {
      dispatch({ type: CREATE_PRICING_ACTION });
      await server.post('/appConfig/pricing', { name, duration, price });
      dispatch({ type: FINISH_LOADING_ACTION });
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
  { error: undefined, config: {}, loading: false }
);
