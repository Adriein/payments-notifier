import { TableBodyProps } from "./TableBodyProps";
import { ListItemHasId } from "../../../types";
import { StyledTableBody, StyledTableBodyHeaderRow, StyledTableCell, StyledTableContainer } from "./Styles";

const TableBody = <T extends ListItemHasId>({ collection, renderRow, rows }: TableBodyProps<T>) => {
  return (
    <StyledTableBody>
      <StyledTableContainer>
        <StyledTableBodyHeaderRow>
          {rows.map((row: string, index: number) => <StyledTableCell key={index}>{row}</StyledTableCell>)}
        </StyledTableBodyHeaderRow>
        {collection.map((item: T, index: number) => renderRow(item, index))}
      </StyledTableContainer>
    </StyledTableBody>
  );
}

export default TableBody;