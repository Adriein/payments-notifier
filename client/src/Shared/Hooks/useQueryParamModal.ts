import { useLocation, useNavigate } from 'react-router-dom';
import { addToQueryString, omitFromQueryString, queryStringToObject } from "../Components/Utils/Url";


const useQueryParamModal = (param: string) => {
  const navigate = useNavigate();
  const location = useLocation();

  const open = (param: string) => {
    return navigate({
      pathname: location.pathname,
      search: addToQueryString(location.search, {
        [`modal-${param}`]: true,
      }),
    });
  }


  const close = (param: string) => {
    return navigate({
      pathname: location.pathname,
      search: omitFromQueryString(location.search, [ `modal-${param}` ]),
    });
  }


  const isOpen = (param: string) => !!queryStringToObject(location.search)[`modal-${param}`];

  return {
    open: () => open(param),
    close: () => close(param),
    isOpen: () => isOpen(param),
  };
};

export default useQueryParamModal;
