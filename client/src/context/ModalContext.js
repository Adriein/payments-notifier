import createDataContext from './createDataContext';

const modalReducer = (state, action) => {
  switch (action.type) {
    case 'save_action':
      return {
        ...state,
        visible: true,
        callback: action.callbacks,
        type: 'save',
      };
    case 'payment_action':
      return {
        ...state,
        visible: true,
        callback: action.callback,
        type: 'payment',
      };
    case 'delete_action':
      return {
        ...state,
        visible: true,
        callback: action.callback,
        type: 'hardDelete',
      };
    case 'close_action':
      return {
        ...state,
        visible: false,
        callback: undefined,
        type: '',
      };

    default:
      return state;
  }
};

const saveModal = (dispatch) => {
  return (callbacks) => {
    dispatch({
      type: 'save_action',
      callbacks,
    });
  };
};

const paymentModal = (dispatch) => {
  return (callback) => {
    dispatch({
      type: 'payment_action',
      callback,
    });
  };
};

const deleteModal = (dispatch) => {
  return (callback) => {
    dispatch({
      type: 'delete_action',
      callback,
    });
  };
};

const closeModal = (dispatch) => {
  return () => {
    dispatch({
      type: 'close_action',
    });
  };
};

export const { Provider, Context } = createDataContext(
  modalReducer,
  { saveModal, paymentModal, deleteModal, closeModal },
  {
    visible: false,
    type: '',
    callback: undefined,
  }
);
