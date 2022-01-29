import { TableBodyProps } from "./TableBodyProps";
import { ListItemHasId } from "../../../../Shared/types";
import { StyledTableContainer } from "./Styles";

const TableBody = <T extends ListItemHasId>({ collection, renderRow }: TableBodyProps<T>) => {
  return (
    <StyledTableContainer>
      {collection.map((item: T, index: number) => renderRow(item, index))}
    </StyledTableContainer>
  );
}

export default TableBody;