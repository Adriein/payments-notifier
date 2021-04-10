import createDataContext from './createDataContext';
import server from '../api/server';

const FETCH_CONFIG_ACTION = 'fetch_config_action';
const REQUEST_ACTION = 'request_action';

const ADD_ERROR_ACTION = 'add_error_action';
const FINISH_LOADING_ACTION = 'finish_loading_action';

const appConfigReducer = (state, action) => {
  switch (action.type) {
    case FETCH_CONFIG_ACTION:
      return { ...state, config: action.payload };
    case REQUEST_ACTION:
      return { ...state, loading: true };
    case FINISH_LOADING_ACTION:
      return { ...state, loading: false };
    case ADD_ERROR_ACTION:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const formatPricing = () => {
  return (state) => {
    const pricingObject = state.config.pricing ?? {};

    return Object.keys(pricingObject).reduce((acc, pricing) => {
      return [
        ...acc,
        {
          value: pricing,
          label: `${pricing}, ${pricingObject[pricing].duration} días, ${pricingObject[pricing].price} euros`,
        },
      ];
    }, []);
  };
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
      dispatch({ type: REQUEST_ACTION });
      await server.post('/appConfig/pricing', { name, duration, price });
      dispatch({ type: FINISH_LOADING_ACTION });
      getAppConfig(dispatch)();
    } catch (error) {
      addError(dispatch)('Error creando la tarifa');
    }
  };
};

const updateAppConfig = (dispatch) => {
  return async ({ warningDelay, emailContent }) => {
    try {
      dispatch({ type: REQUEST_ACTION });
      await server.put('/appConfig', { warningDelay, emailContent });
      dispatch({ type: FINISH_LOADING_ACTION });
      getAppConfig(dispatch)();
    } catch (error) {
      addError(dispatch)('Error actualizando la configuración');
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
  { getAppConfig, createPricing, updateAppConfig, formatPricing },
  { error: undefined, config: {}, loading: false }
);
