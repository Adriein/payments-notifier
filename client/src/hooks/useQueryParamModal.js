import { useHistory } from 'react-router-dom';
import {
  queryStringToObject,
  addToQueryString,
  omitFromQueryString,
} from '../shared/utils/url';

const useQueryParamModal = () => {
  const history = useHistory();
  const open = (param) =>
    history.push({
      pathname: history.location.pathname,
      search: addToQueryString(history.location.search, {
        [`modal-${param}`]: true,
      }),
    });

  const close = (param) =>
    history.push({
      pathname: history.location.pathname,
      search: omitFromQueryString(history.location.search, [`modal-${param}`]),
    });

  const isOpen = (param) =>
    !!queryStringToObject(history.location.search)[`modal-${param}`];

  return {
    open: (param) => open(param),
    close: (param) => close(param),
    isOpen: (param) => isOpen(param),
  };
};

export default useQueryParamModal;
