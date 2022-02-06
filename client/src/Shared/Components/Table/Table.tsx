import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";
import React from "react";
import { StyledTableContainer } from "./Styles";
import { TableProps } from "./TableProps";
import { ListItemHasId } from "../../types";
import TableBody from "./TableBody";

const Table = <T extends ListItemHasId>({ children }: TableProps<T>) => {
  return (
    <StyledTableContainer>
      {children}
    </StyledTableContainer>
  );
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;

export default Table;