import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";
import React, { useEffect } from "react";
import { StyledTableContainer } from "./Styles";
import { TableProps } from "./TableProps";

const Table = <T, >({ addFilter, collection, children }: TableProps<T>) => {
  useEffect(() => {

  }, []);
  return (
    <StyledTableContainer>
      <TableHeader addFilter={addFilter}/>
      {children}
      <TableFooter collection={collection} itemPerPage={5}/>
    </StyledTableContainer>
  );
}

export default Table;