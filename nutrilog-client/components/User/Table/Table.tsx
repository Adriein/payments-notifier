import { TableProps } from "./TableProps";
import { StyledTable } from './Styles';
import Header from "./Header/Header";

export const Table = <T extends unknown>({ columns }: TableProps<T>) => {
  return (
    <StyledTable>
      <Header/>
    </StyledTable>
  );
}

export default Table;