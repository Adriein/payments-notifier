import { useState } from "react";

const usePagination = () => {
  const [ state, setState ] = useState({ page: 1, quantity: 20 });

  return {
    pagination: state,
    setPage: (page: number) => setState({ ...state, page }),
    setQuantity: (quantity: number) => setState({ ...state, quantity })
  }
}

export default usePagination;