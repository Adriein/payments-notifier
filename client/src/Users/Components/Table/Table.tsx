import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";
import React, { useEffect } from "react";
import { StyledTableContainer } from "./Styles";
import { TableProps } from "./TableProps";

const Table = <T, >({ addFilter, collection, renderRow, itemPerPage }: TableProps<T>) => {
  useEffect(() => {

  }, []);
  return (
    <StyledTableContainer>
      <TableHeader addFilter={addFilter}/>
      {collection.map((item: T, index: number) => index < itemPerPage && renderRow(item))}
      <TableFooter collection={collection} itemPerPage={itemPerPage}/>
    </StyledTableContainer>
  );
}

export default Table;