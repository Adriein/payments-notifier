import { useState } from "react";
import { Pagination } from "../types";

const usePagination = () => {
  const [ state, setState ] = useState<Pagination>({ page: 1, quantity: 20 });

  return {
    pagination: state,
    setPage: (page: number) => setState({ ...state, page }),
    setQuantity: (quantity: number) => setState({ ...state, quantity })
  }
}

export default usePagination;