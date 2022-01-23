import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";
import React, { useEffect } from "react";
import { StyledTableContainer } from "./Styles";
import { TableProps } from "./TableProps";
import { ListItemHasId } from "../../../Shared/types";

const Table = <T extends ListItemHasId>({
  addFilter,
  collection,
  renderRow,
  itemPerPage,
  totalItems
}: TableProps<T>) => {
  useEffect(() => {

  }, []);
  return (
    <StyledTableContainer>
      <TableHeader addFilter={addFilter}/>
      {collection.map((item: T) => renderRow(item))}
      <TableFooter totalItems={totalItems} itemPerPage={itemPerPage}/>
    </StyledTableContainer>
  );
}

export default Table;