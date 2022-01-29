import { useState } from "react";
import { Pagination } from "../types";

const usePagination = ({ total }: { total: number }) => {
  const [ state, setState ] = useState<Pagination>({ page: 1, quantity: 10 });

  const setPage = (page: number) => {
    const pages = Math.floor((total + state.quantity - 1) / state.quantity);

    if (page < 1 || page > pages) {
      return;
    }

    setState({ ...state, page })
  }

  return {
    pagination: state,
    setPage,
    setQuantity: (quantity: number) => setState({ ...state, quantity })
  }
}

export default usePagination;